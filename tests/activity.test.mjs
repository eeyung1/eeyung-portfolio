import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const compiled = ts.transpileModule(
  fs.readFileSync("app/api/activity/route.ts", "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;
function route(fetch) {
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    fetch,
    AbortSignal,
    require: (name) => {
      assert.equal(name, "next/server");
      return {
        NextResponse: {
          json: (body, options = {}) => ({
            body,
            status: options.status || 200,
            headers: options.headers,
          }),
        },
      };
    },
  });
  return exports.GET;
}
const repo = (name, extra = {}) => ({
  name,
  html_url: `https://github.com/eeyung1/${name}`,
  pushed_at: "2026-10-20T10:00:00Z",
  language: "Go",
  ...extra,
});
test("returns at most three eligible public repository records from a fixed upstream", async () => {
  const get = route(async (url, options) => {
    assert.equal(
      url,
      "https://api.github.com/users/eeyung1/repos?sort=pushed&direction=desc&per_page=12",
    );
    assert.equal(options.next.revalidate, 1800);
    assert.ok(options.signal);
    return {
      ok: true,
      json: async () => [
        repo("fork", { fork: true }),
        repo("archived", { archived: true }),
        repo("unsafe", { html_url: "javascript:alert(1)" }),
        repo("bad-date", { pushed_at: "invalid" }),
        repo("one"),
        repo("two"),
        repo("three"),
        repo("four"),
      ],
    };
  });
  const response = await get();
  assert.equal(response.status, 200);
  assert.equal(
    JSON.stringify(response.body.repositories.map((r) => r.name)),
    JSON.stringify(["one", "two", "three"]),
  );
  assert.match(response.headers["Cache-Control"], /s-maxage=1800/);
});
test("upstream errors do not return fabricated data or cache an error", async () => {
  for (const fetch of [
    async () => ({ ok: false }),
    async () => {
      throw new Error("timeout");
    },
    async () => ({ ok: true, json: async () => ({ message: "bad shape" }) }),
  ]) {
    const response = await route(fetch)();
    assert.equal(response.status, 503);
    assert.equal(response.headers["Cache-Control"], "no-store");
    assert.equal(response.body.repositories, undefined);
  }
});
test("an empty GitHub result stays empty", async () => {
  const response = await route(async () => ({
    ok: true,
    json: async () => [],
  }))();
  assert.equal(response.status, 200);
  assert.equal(response.body.repositories.length, 0);
});

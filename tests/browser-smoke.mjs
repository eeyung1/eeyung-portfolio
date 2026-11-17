import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const origin = "http://127.0.0.1:3100";
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", "3100"], { stdio: "inherit" });
let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    try { if ((await fetch(origin)).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  assert.ok(ready, "production server starts");
  browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(origin);
  const canvas = page.locator(".network-background canvas");
  await page.waitForFunction(() => document.querySelector("canvas")?.dataset.networkState === "running");
  const pixels = () => canvas.evaluate(node => node.toDataURL());
  assert.ok(await canvas.evaluate(node => node.getContext("2d").getImageData(0, 0, node.width, node.height).data.some((value, index) => index % 4 === 3 && value > 0)), "network renders visible pixels");
  const first = await pixels();
  await page.waitForTimeout(250);
  assert.notEqual(await pixels(), first, "network positions visibly change over time");
  await page.getByRole("button", { name: "Pause background animation", exact: true }).click();
  await page.waitForFunction(() => document.querySelector("canvas")?.dataset.networkState === "paused");
  const paused = await pixels();
  await page.waitForTimeout(250);
  assert.equal(await pixels(), paused, "pause freezes network");
  const role = await page.locator(".hero-role").innerText();
  await page.waitForTimeout(250);
  assert.equal(await page.locator(".hero-role").innerText(), role, "pause also freezes typewriter");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, `no horizontal overflow at ${width}px`);
  }
  assert.equal(await page.locator(".project-card").count(), 4);
  await page.getByRole("button", { name: "Explore all 8 projects" }).click();
  assert.equal(await page.locator(".project-card").count(), 8);
  await page.getByRole("button", { name: "AI & automation", exact: true }).first().click();
  assert.equal(await page.locator(".project-card").count(), 1);
  await page.getByRole("button", { name: "All work" }).click();
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  await page.reload();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light", "theme preference survives reload");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.getByRole("button", { name: "Pause background animation", exact: true }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await mkdir("test-results", { recursive: true });
  await page.screenshot({ path: "test-results/desktop-network.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "test-results/mobile-network.png" });
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page.getByRole("navigation").getByRole("link", { name: "Work", exact: true }).click();
  assert.equal(await page.locator("#menu-toggle").getAttribute("aria-expanded"), "false");
  await page.getByRole("link", { name: "Read L2EStudyLink case study" }).click();
  await page.waitForURL("**/work/l2estudylink");
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.getByRole("link", { name: "All selected work", exact: false }).click();
  await page.waitForURL("**/#work");
  assert.equal(await page.locator(".network-background canvas").count(), 1, "one background survives navigation");
  const stillContext = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
  const stillPage = await stillContext.newPage();
  await stillPage.goto(origin);
  await stillPage.waitForFunction(() => document.querySelector("canvas")?.width > 300);
  assert.equal(await stillPage.locator("canvas").getAttribute("data-network-state"), "reduced");
  assert.equal(await stillPage.getByRole("button", { name: "Animation disabled by reduced-motion preference" }).isDisabled(), true);
  const staticFrame = await stillPage.locator("canvas").evaluate(node => node.toDataURL());
  await stillPage.waitForTimeout(250);
  assert.equal(await stillPage.locator("canvas").evaluate(node => node.toDataURL()), staticFrame, "OS reduced-motion renders a static network");
  assert.deepEqual(errors, []);
  console.log("Browser checks passed: animated pixels, pause, reduced motion, responsive widths, filters, theme persistence, mobile menu and case-study navigation.");
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}

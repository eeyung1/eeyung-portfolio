"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { advanceNetwork, createNetwork, networkEdges, type NetworkNode } from "@/lib/network";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const serverReducedMotion = () => true;

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<NetworkNode[]>([]);
  const dimensions = useRef({ width: 0, height: 0 });
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, getReducedMotion, serverReducedMotion);
  const still = paused || reduced;

  useEffect(() => {
    document.documentElement.dataset.motion = still ? "paused" : "running";
    return () => { delete document.documentElement.dataset.motion; };
  }, [still]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let lastDraw = 0;
    let dark = document.documentElement.dataset.theme !== "light";
    let pointer: { x: number; y: number } | null = null;
    const finePointer = window.matchMedia("(pointer: fine)");

    function paint() {
      if (!context) return;
      const { width, height } = dimensions.current;
      context.clearRect(0, 0, width, height);
      const nodes = nodesRef.current;
      const rgb = dark ? "44, 177, 228" : "16, 95, 154";
      for (const edge of networkEdges(nodes, width < 761 ? 145 : 195)) {
        const from = nodes[edge.from], to = nodes[edge.to];
        context.beginPath();
        context.moveTo(from.x, from.y); context.lineTo(to.x, to.y);
        context.strokeStyle = `rgba(${rgb},${edge.opacity * (dark ? .38 : .26)})`;
        context.lineWidth = .8; context.stroke();
      }
      for (const node of nodes) {
        if (pointer) {
          const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
          if (distance < 170) {
            context.beginPath(); context.moveTo(node.x, node.y); context.lineTo(pointer.x, pointer.y);
            context.strokeStyle = `rgba(${rgb},${(1 - distance / 170) * .5})`;
            context.stroke();
          }
        }
        context.beginPath(); context.arc(node.x, node.y, node.radius * 2.7, 0, Math.PI * 2);
        context.fillStyle = `rgba(${rgb},.06)`; context.fill();
        context.beginPath(); context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${rgb},${dark ? .8 : .6})`; context.fill();
      }
    }
    function tick(now: number) {
      if (now - lastDraw >= 1000 / 30) {
        advanceNetwork(nodesRef.current, dimensions.current.width, dimensions.current.height, lastDraw ? (now - lastDraw) / 1000 : 0);
        lastDraw = now; paint();
      }
      frame = requestAnimationFrame(tick);
    }
    function resize() {
      if (!canvas || !context) return;
      const width = window.innerWidth, height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (dimensions.current.width !== width || dimensions.current.height !== height) {
        dimensions.current = { width, height };
        nodesRef.current = createNetwork(width, height);
      }
      paint();
    }
    function visibility() {
      cancelAnimationFrame(frame);
      lastDraw = 0;
      if (!document.hidden && !still) frame = requestAnimationFrame(tick);
    }
    function pointerMove(event: PointerEvent) {
      if (finePointer.matches && !still) pointer = { x: event.clientX, y: event.clientY };
    }
    function pointerLeave() { pointer = null; }
    const themeObserver = new MutationObserver(() => {
      dark = document.documentElement.dataset.theme !== "light";
      paint();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    resize(); visibility();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", pointerMove, { passive: true });
    document.addEventListener("pointerleave", pointerLeave);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame); themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointerMove);
      document.removeEventListener("pointerleave", pointerLeave);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [still]);

  return (
    <>
      <div className="network-background" aria-hidden="true">
        <div className="network-aurora" />
        <canvas ref={canvasRef} data-network-state={reduced ? "reduced" : paused ? "paused" : "running"} />
      </div>
      <button className="motion-control" type="button" disabled={reduced} aria-pressed={!still}
        onClick={() => setPaused(value => !value)}
        aria-label={reduced ? "Animation disabled by reduced-motion preference" : paused ? "Play background animation" : "Pause background animation"}>
        <span aria-hidden="true">{still ? "▷" : "Ⅱ"}</span>
        {reduced ? "Motion off" : paused ? "Play motion" : "Pause motion"}
      </button>
    </>
  );
}

const roles = ["Backend Engineer", "AI Workflow Builder", "Product Engineer"];
export function AnimatedRole() {
  const [text, setText] = useState(roles[0]);
  const reduced = useSyncExternalStore(subscribeMotion, getReducedMotion, serverReducedMotion);
  useEffect(() => {
    if (reduced) return;
    let index = 0, count = roles[0].length, deleting = true, wait = 18;
    const timer = window.setInterval(() => {
      if (document.hidden || document.documentElement.dataset.motion === "paused") return;
      if (wait > 0) { wait--; return; }
      if (deleting) {
        count--;
        if (count === 0) { deleting = false; index = (index + 1) % roles.length; wait = 3; }
      } else {
        count++;
        if (count === roles[index].length) { deleting = true; wait = 24; }
      }
      setText(roles[index].slice(0, count));
    }, 85);
    return () => window.clearInterval(timer);
  }, [reduced]);
  return <p className="hero-role"><span className="sr-only">Backend engineer, AI workflow builder, and product engineer.</span><span aria-hidden="true">{reduced ? roles[0] : text}<span className="typing-cursor">|</span></span></p>;
}

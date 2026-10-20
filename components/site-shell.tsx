"use client";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { profile } from "@/lib/portfolio";

let memoryTheme: boolean | null = null;
function subscribeTheme(callback: () => void) {
  const onStorage = () => { memoryTheme = null; callback(); };
  window.addEventListener("storage", onStorage);
  window.addEventListener("portfolio-theme-change", callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("portfolio-theme-change", callback);
  };
}
function getTheme() {
  if (memoryTheme !== null) return memoryTheme;
  try {
    return localStorage.getItem("portfolio-theme") === "dark";
  } catch {
    return false;
  }
}

export function Header() {
  const [open, setOpen] = useState(false);
  const dark = useSyncExternalStore(subscribeTheme, getTheme, () => false);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  function toggleTheme() {
    memoryTheme = !dark;
    try {
      localStorage.setItem("portfolio-theme", memoryTheme ? "dark" : "light");
    } catch {}
    window.dispatchEvent(new Event("portfolio-theme-change"));
  }
  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link
          className="wordmark"
          href="/"
          aria-label="Emmanuel Eyung home"
          onClick={() => setOpen(false)}
        >
          eyung<span>.</span>
        </Link>
        <nav
          className={open ? "navigation is-open" : "navigation"}
          id="site-navigation"
          aria-label="Main navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              document.getElementById("menu-toggle")?.focus();
            }
          }}
        >
          {[
            ["Work", "/#work"],
            ["About", "/#about"],
            ["Services", "/#services"],
          ].map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link
            className="nav-contact"
            href="/#contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <span aria-hidden="true">↗</span>
          </Link>
        </nav>
        <button
          className="theme-button"
          onClick={toggleTheme}
          aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
        >
          {dark ? "☀" : "◐"}
        </button>
        <button
          id="menu-toggle"
          className="menu-button"
          aria-controls="site-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="container footer">
      <Link className="wordmark" href="/">
        eyung<span>.</span>
      </Link>
      <p>Built with care. Improved with evidence.</p>
      <div>
        <a href={profile.github}>GitHub ↗</a>
        <a href={profile.linkedin}>LinkedIn ↗</a>
        <a href={profile.x}>X ↗</a>
        <a href={profile.whatsapp}>WhatsApp ↗</a>
      </div>
      <small>© {new Date().getFullYear()} Emmanuel Eyung</small>
    </footer>
  );
}

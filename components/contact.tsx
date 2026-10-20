"use client";
import { useState } from "react";
import { profile } from "@/lib/portfolio";
export function Contact() {
  const [service, setService] = useState("A new product");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [opened, setOpened] = useState(false);
  const href = `mailto:${profile.email}?subject=${encodeURIComponent(`Project enquiry: ${service}`)}&body=${encodeURIComponent(`Hi Emmanuel,\n\nI'm interested in ${service.toLowerCase()}.\n\n${message}\n\nMy preferred timeline:\nMy budget range:\n\nBest,\n`)}`;
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">
            <span className="status-dot" /> OPEN TO PROJECTS & COLLABORATION
          </p>
          <h2>
            Have something
            <br />
            worth <em>building?</em>
          </h2>
          <p className="contact-intro">
            Tell me where you are, what you need, and what success looks like.
            Let’s work out the next step.
          </p>
          <a className="email-link" href={`mailto:${profile.email}`}>
            {profile.email} ↗
          </a>
          <p className="contact-intro">
            <a className="text-link" href={profile.whatsapp}>
              WhatsApp: {profile.phone} ↗
            </a>
            <br />
            <a className="text-link" href={profile.x}>
              Follow @eeyung1 on X ↗
            </a>
          </p>
          <button className="copy-button" onClick={copy}>
            {copied ? "Email copied ✓" : "Copy email address"}
          </button>
          <span role="status" className="copy-status">
            {copyError
              ? `Copy unavailable. Email me at ${profile.email}.`
              : copied
                ? "Email address copied to clipboard."
                : ""}
          </span>
        </div>
        <div className="enquiry">
          <h3>What are you working on?</h3>
          <div className="service-options">
            {[
              "A new product",
              "An integration",
              "AI & automation",
              "An existing app",
            ].map((s) => (
              <button
                key={s}
                aria-pressed={service === s}
                onClick={() => {
                  setService(s);
                  setOpened(false);
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <label htmlFor="project-brief">A little about your project</label>
          <textarea
            id="project-brief"
            maxLength={1500}
            rows={4}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setOpened(false);
            }}
            placeholder="The problem, the people it helps, and what you’d like to build…"
          />
          <a
            className="button button-accent"
            href={href}
            onClick={() => setOpened(true)}
          >
            Let’s start a conversation <span>↗</span>
          </a>
          <p className="form-note" role="status">
            {opened
              ? "Your email app should open with your brief. Review it and press send there. If it did not open, use the email address alongside."
              : "Opens your email app with a ready-to-edit brief. Nothing is submitted or stored on this website."}
          </p>
        </div>
      </div>
    </section>
  );
}

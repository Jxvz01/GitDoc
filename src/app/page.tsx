"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ── Feature cards data ── */
const features = [
  {
    title: "Architecture Diagrams",
    description: "Visualize system structure, dependencies, and data flows in beautiful diagrams.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Code Quality Analysis",
    description: "AI-powered insights on code quality, complexity, and maintainability.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Security Review",
    description: "Identify vulnerabilities, risks, and security best practice violations.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "README Generation",
    description: "Generate professional documentation that explains your project perfectly.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1.5 1.5 0 011.06.44l4.914 4.914a1.5 1.5 0 01.44 1.06V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Performance Insights",
    description: "Find bottlenecks and get actionable performance improvement suggestions.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "& Much More",
    description: "Code smells, tech stack detection, contributor guides, and advanced metrics.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function Home() {
  const router = useRouter();
  const [repoUrl, setRepoUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) {
      setErrorMsg("Please enter a GitHub repository URL");
      return;
    }
    const cleanUrl = repoUrl.trim();
    if (!cleanUrl.includes("github.com/")) {
      setErrorMsg("Invalid GitHub repository URL format. Example: https://github.com/owner/repository");
      return;
    }
    setErrorMsg("");
    router.push(`/analyze?repo=${encodeURIComponent(cleanUrl)}`);
  };

  return (
    <div className="p-8">
      {/* ── Page Frame ── */}
      <div className="max-w-[1400px] mx-auto min-h-screen relative border-4 border-black p-8 bg-white/50">

        {/* ── Compass Decoration ── */}
        <div
          className="absolute top-5 left-5 pointer-events-none"
          style={{ width: 60, height: 60, opacity: 0.6 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeDasharray="2,2" strokeWidth="1" />
            <line x1="50" x2="50" y1="10" y2="90" stroke="black" strokeWidth="1" />
            <line x1="10" x2="90" y1="50" y2="50" stroke="black" strokeWidth="1" />
            <text className="sketch-text" fontSize="8" x="46" y="8">N</text>
            <text className="sketch-text" fontSize="8" x="46" y="98">S</text>
            <text className="sketch-text" fontSize="8" x="92" y="53">E</text>
            <text className="sketch-text" fontSize="8" x="2" y="53">W</text>
          </svg>
        </div>

        {/* ── Header ── */}
        <header className="flex justify-between items-center mb-16 relative">
          {/* Logo */}
          <Link href="/" className="relative px-4 py-2 border-2 border-black bg-white">
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-black" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-black" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-black" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black" />
            <span className="text-3xl font-bold tracking-tighter block">GitDoc</span>
            <span className="text-[10px] block text-right" style={{ fontFamily: "var(--font-mono)" }}>v1.0</span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center sketch-border p-2 bg-white">
            <Link href="/" className="nav-link font-bold underline">Home</Link>
            <Link href="/features" className="nav-link">Features</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/docs" className="nav-link">Docs</Link>
            <Link href="/about" className="nav-link">About</Link>
            <button
              onClick={() => router.push("/analyze")}
              className="ml-4 btn-sketch px-4 py-2 font-bold gap-2"
            >
              Analyze Repository <span className="text-xl">→</span>
            </button>
          </nav>
        </header>

        {/* ── Hero Section ── */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">

          {/* Left — Content */}
          <div className="space-y-8">
            <div>
              {/* Giant GitDoc heading */}
              <h2
                className="text-8xl font-black mb-4 tracking-tighter"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                GitDoc
              </h2>
              {/* Subtitle */}
              <p className="text-3xl font-bold sketch-text">
                Understand Code. Not Just Repositories.
              </p>
              {/* Description */}
              <p className="mt-4 text-gray-600 max-w-md" style={{ fontFamily: "var(--font-mono)" }}>
                Paste any GitHub repository and watch AI transform thousands of lines of code into a beautifully documented engineering blueprint.
              </p>
            </div>

            {/* Input group */}
            <div className="relative max-w-xl">
              {/* START HERE label */}
              <div className="absolute -top-6 left-0 sketch-text text-sm italic">
                START HERE ———&gt;
              </div>

              <form onSubmit={handleAnalyze}>
                {/* URL input bar */}
                <div className="flex items-center border-4 border-black p-4 bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                  {/* GitHub icon */}
                  <svg className="w-6 h-6 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <input
                    type="text"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="flex-grow border-none outline-none text-lg bg-transparent"
                    style={{ fontFamily: "var(--font-mono)" }}
                    placeholder="https://github.com/owner/repository"
                  />
                  <button type="submit" className="text-2xl ml-2">→</button>
                </div>

                {/* CTA button */}
                <button
                  type="submit"
                  className="mt-8 w-full bg-black text-white p-5 text-xl font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-3"
                >
                  Analyze Repository
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </form>

              {errorMsg && (
                <div className="mt-2 text-xs font-bold text-red-600 sketch-text border border-red-500 p-2 bg-red-50">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Bottom label + dots */}
              <div className="mt-4 flex justify-between items-center px-2">
                <span className="sketch-text text-sm">LET AI ARCHITECT YOUR CODEBASE</span>
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full border border-black inline-block" />
                  <span className="w-2 h-2 rounded-full border border-black inline-block" />
                  <span className="w-2 h-2 rounded-full border border-black inline-block" />
                </div>
              </div>
            </div>
          </div>

          {/* Right — Illustration */}
          <div className="relative">
            <div className="relative w-full aspect-square bg-white border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden">
              {/* Blueprint image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLvpiD9FIrLAs81PYf1UW-vMenSS3xl7VRkGe-BHdMkJ86lM7Z7zxMgh72gPhZJmew4Xf2oWrFeoDq8MkVfGj_fdoBGhz52mQJAx0ssf2-e-ryeQ8qgZ-FimlqJlaXq-DFwp6n9eA5T30F0iQGtnAXTVK360W7KdzPoIR7szkuIWfSujcZ6WiCXvEc2ZsmAT1g16akH13zT4oTA6o9d6Xft5cbbjkiI-piQg5-x0M45Y86aXsLHJDmHmESiVlLfXxtza5zxpYgk45I"
                alt="Architecture Blueprint"
                className="w-full h-full object-contain p-4 grayscale opacity-80"
              />

              {/* INPUT annotation */}
              <div className="absolute top-10 right-10 sketch-text text-xs leading-tight border-l-2 border-black pl-2">
                INPUT:<br />
                - REPOSITORY URL<br />
                - AI ANALYSIS<br />
                - CONTEXT
              </div>

              {/* OUTPUT annotation */}
              <div className="absolute bottom-10 right-10 sketch-text text-xs leading-tight border-l-2 border-black pl-2">
                OUTPUT:<br />
                - DOCUMENTATION<br />
                - ARCHITECTURE<br />
                - INSIGHTS<br />
                - IMPROVEMENTS
              </div>
            </div>
          </div>
        </main>

        {/* ── Partners Bar ── */}
        <section className="mb-24 border-y-2 border-black py-4 flex items-center justify-around flex-wrap gap-8 grayscale">
          <span className="sketch-text font-bold text-sm">TRUSTED BY DEVELOPERS AT</span>
          <div className="flex items-center gap-8 text-xl font-bold flex-wrap">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="black" viewBox="0 0 24 24">
                <path d="M24 22.525H0l12-21.05 12 21.05z" />
              </svg>
              Vercel
            </span>
            <span>IVC</span>
            <span>supabase</span>
            <span>tailwindcss</span>
            <span>OneBar</span>
            <span>MongoDB</span>
            <span>GitHub</span>
            <span className="sketch-text text-sm">&amp; MORE</span>
          </div>
        </section>

        {/* ── Features Grid ── */}
        <section id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 border-2 border-black relative group hover:bg-neutral-50 transition-colors"
            >
              {/* Corner square */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-white border-2 border-black" />

              <div className="flex items-start gap-4 mb-4">
                {/* Icon box */}
                <div className="w-12 h-12 border-2 border-black flex items-center justify-center bg-white flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-xl uppercase">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ── Blueprint Footer ── */}
        <footer className="mt-24 border-t border-black pt-4 flex justify-between sketch-text text-[10px] opacity-40">
          <div>DIM: 1376px x 768px</div>
          <div>SHEET: LANDING_PAGE_01</div>
          <div>© 2024 GITDOC AI SYSTEMS</div>
        </footer>
      </div>
    </div>
  );
}

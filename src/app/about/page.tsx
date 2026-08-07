"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="p-4 md:p-8">
      {/* ── Page Outer Blueprint Frame ── */}
      <div className="max-w-[1400px] mx-auto min-h-screen relative border-4 border-black p-6 md:p-8 bg-white/50">

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

        {/* ── Standardized Header Navigation ── */}
        <header className="flex justify-between items-center mb-16 relative flex-wrap gap-4">
          <Link className="relative px-4 py-2 border-2 border-black bg-white" href="/">
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-black" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-black" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-black" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black" />
            <span className="text-3xl font-bold tracking-tighter block">GitDoc</span>
            <span className="text-[10px] block text-right font-mono">v1.0</span>
          </Link>
          <nav className="flex items-center sketch-border p-2 bg-white flex-wrap gap-2">
            <Link className="nav-link" href="/">Home</Link>
            <Link className="nav-link" href="/features">Features</Link>
            <Link className="nav-link" href="/pricing">Pricing</Link>
            <Link className="nav-link" href="/docs">Docs</Link>
            <Link className="nav-link font-bold underline" href="/about">About</Link>
            <Link href="/analyze" className="ml-4 btn-sketch px-4 py-2 font-bold gap-2">
              Analyze Repository <span className="text-xl">→</span>
            </Link>
          </nav>
        </header>

        <main className="relative">

          {/* ── Hero Section ── */}
          <section className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
            {/* Left */}
            <div className="lg:w-1/2 pt-4">
              <span className="text-xs font-bold block mb-4 uppercase tracking-widest font-mono">
                FIG. 07 — ABOUT GITDOC ARCHITECTURE
              </span>
              <h1
                className="text-5xl md:text-7xl font-bold font-mono mb-8 tracking-tighter"
                style={{ lineHeight: 1.1 }}
              >
                Built by developers,<br />for developers.
              </h1>
              <div className="max-w-md space-y-4 text-sm font-medium leading-relaxed font-mono">
                <p>
                  GitDoc is an AI-powered software architect that helps you understand, document, and improve any codebase in seconds.
                </p>
                <p>
                  We believe every codebase has a story. Our mission is to make that story clear, beautiful, and actionable through software blueprints.
                </p>
              </div>
              {/* Arrow decoration */}
              <div className="mt-8 ml-8">
                <svg fill="none" height="50" viewBox="0 0 100 50" width="100">
                  <path d="M5 45C25 40 60 40 90 5M90 5L80 8M90 5L85 15" stroke="black" strokeLinecap="round" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Right — Inline SVG Blueprint Illustration (0ms instant loading, no remote image dependence) */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end w-full">
              <div className="w-full max-w-[480px] aspect-square bg-white border-4 border-black p-6 relative shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col justify-between overflow-hidden">
                <div className="absolute top-2 left-2 text-[10px] font-mono font-bold border-b border-black pb-0.5">
                  DRAFTING TABLE SPEC // SHEET A-01
                </div>

                <div className="flex-grow flex flex-col justify-center items-center relative my-4">
                  {/* Vector SVG Blueprint Drafting Table Artwork */}
                  <svg viewBox="0 0 300 240" className="w-full h-full max-h-[220px]">
                    {/* Drafting Table Stand */}
                    <path d="M60 220 L110 140 L190 140 L240 220" stroke="black" strokeWidth="3" fill="none" />
                    <line x1="80" y1="180" x2="220" y2="180" stroke="black" strokeWidth="2" strokeDasharray="4,4" />

                    {/* Table Surface */}
                    <polygon points="30,140 270,140 250,70 50,70" fill="#f8fafc" stroke="black" strokeWidth="3" />

                    {/* Grid lines on Table */}
                    <line x1="70" y1="70" x2="55" y2="140" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="110" y1="70" x2="95" y2="140" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="150" y1="70" x2="135" y2="140" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="190" y1="70" x2="175" y2="140" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="230" y1="70" x2="215" y2="140" stroke="#cbd5e1" strokeWidth="1" />

                    <line x1="45" y1="90" x2="255" y2="90" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="40" y1="115" x2="260" y2="115" stroke="#cbd5e1" strokeWidth="1" />

                    {/* T-Square Ruler */}
                    <rect x="20" y="60" width="15" height="90" fill="black" />
                    <rect x="20" y="95" width="220" height="12" fill="white" stroke="black" strokeWidth="2" />

                    {/* Blueprint Sheet on Table */}
                    <polygon points="80,125 210,125 195,80 65,80" fill="white" stroke="black" strokeWidth="2" />
                    <rect x="90" y="90" width="40" height="25" fill="none" stroke="black" strokeWidth="1" strokeDasharray="2,2" />
                    <circle cx="160" cy="100" r="10" fill="none" stroke="black" strokeWidth="1" />
                    <line x1="150" y1="100" x2="170" y2="100" stroke="black" strokeWidth="1" />

                    {/* Compass Tool */}
                    <path d="M230 40 L210 90 M230 40 L250 90 M215 65 L245 65" stroke="black" strokeWidth="2" fill="none" />
                    <circle cx="230" cy="40" r="3" fill="black" />
                  </svg>
                </div>

                <div className="flex justify-between items-center border-t-2 border-black pt-2 font-mono text-[10px]">
                  <span>SCALE: 1:1 DETERMINISTIC</span>
                  <span className="font-bold">GITDOC CORE ENGINE</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Stats Bar ── */}
          <section className="mb-12">
            <div className="sketch-border flex flex-wrap divide-x-2 divide-black bg-white">
              {[
                { emoji: "📚", value: "10K+", label: "Repositories Analyzed" },
                { emoji: "👤", value: "5K+", label: "Developers Trust Us" },
                { emoji: "✔️", value: "99.9%", label: "Analysis Accuracy" },
                { emoji: "🕒", value: "24/7", label: "Always Analyzing" },
                { emoji: "⭐", value: "4.9/5", label: "Developer Rating" },
              ].map((stat) => (
                <div key={stat.label} className="flex-1 min-w-[180px] p-6 flex items-center gap-4">
                  <div className="text-3xl">{stat.emoji}</div>
                  <div>
                    <div className="text-2xl font-bold font-mono">{stat.value}</div>
                    <div className="text-[10px] uppercase font-bold text-gray-600 font-mono">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Card Grid ── */}
          <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">

            {/* Card 01 */}
            <div className="sketch-border p-6 flex flex-col items-center text-center bg-white">
              <div className="text-xs self-start font-bold font-mono mb-4">01</div>
              <div className="h-24 flex items-center justify-center mb-4">
                <svg fill="none" height="60" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 60 60" width="60">
                  <path d="M10 20 H20 V10 H30 V20 H40 V30 H30 V40 H20 V30 H10 V20Z" strokeDasharray="2 2" />
                  <path d="M40 15 H50 V25 H40 V15Z" />
                  <path d="M15 40 H25 V50 H15 V40Z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2 font-mono uppercase text-sm">Why We Built GitDoc</h3>
              <p className="text-[11px] leading-relaxed font-mono text-gray-600">
                Codebases are complex. Documentation is outdated. Understanding takes hours. We built GitDoc to change that.
              </p>
            </div>

            {/* Card 02 */}
            <div className="sketch-border p-6 flex flex-col items-center text-center bg-white">
              <div className="text-xs self-start font-bold font-mono mb-4">02</div>
              <div className="h-24 flex items-center justify-center mb-4">
                <svg fill="none" height="60" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 60 60" width="60">
                  <circle cx="30" cy="30" r="4" />
                  <circle cx="10" cy="15" r="3" />
                  <circle cx="50" cy="15" r="3" />
                  <circle cx="10" cy="45" r="3" />
                  <circle cx="50" cy="45" r="3" />
                  <path d="M30 30 L10 15 M30 30 L50 15 M30 30 L10 45 M30 30 L50 45" />
                </svg>
              </div>
              <h3 className="font-bold mb-2 font-mono uppercase text-sm">Our Approach</h3>
              <p className="text-[11px] leading-relaxed font-mono text-gray-600">
                We combine static analysis, AST parsing, and software architecture principles to reverse-engineer codebases into clear blueprints.
              </p>
            </div>

            {/* Card 03 */}
            <div className="sketch-border p-6 flex flex-col items-center text-center bg-white">
              <div className="text-xs self-start font-bold font-mono mb-4">03</div>
              <div className="h-24 flex items-center justify-center mb-4">
                <svg fill="none" height="60" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 60 60" width="60">
                  <circle cx="30" cy="30" r="20" />
                  <circle cx="30" cy="30" r="12" />
                  <circle cx="30" cy="30" r="4" />
                  <path d="M45 15 L32 28" />
                </svg>
              </div>
              <h3 className="font-bold mb-2 font-mono uppercase text-sm">What Makes Us Different</h3>
              <p className="text-[11px] leading-relaxed font-mono text-gray-600">
                We don&apos;t just summarize code. We architect it. We connect the dots. We reveal the bigger picture.
              </p>
            </div>

            {/* Card 04 */}
            <div className="sketch-border p-6 flex flex-col items-center text-center bg-white">
              <div className="text-xs self-start font-bold font-mono mb-4">04</div>
              <div className="h-24 flex items-center justify-center mb-4">
                <svg fill="none" height="60" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 60 60" width="60">
                  <rect height="15" rx="2" width="20" x="20" y="30" />
                  <path d="M25 30 V25 A5 5 0 0 1 35 25 V30" />
                  <path d="M45 25 C45 20 40 20 38 22" strokeDasharray="2 2" />
                </svg>
              </div>
              <h3 className="font-bold mb-2 font-mono uppercase text-sm">Privacy First</h3>
              <p className="text-[11px] leading-relaxed font-mono text-gray-600">
                Your code stays yours. We respect your privacy and process public repository structures without storing code logic.
              </p>
            </div>

            {/* Card 05 */}
            <div className="sketch-border p-6 flex flex-col items-center text-center bg-white">
              <div className="text-xs self-start font-bold font-mono mb-4">05</div>
              <div className="h-24 flex items-center justify-center mb-4">
                <svg fill="none" height="60" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 60 60" width="60">
                  <path d="M10 50 L10 10 M10 50 L50 50" />
                  <path d="M10 40 L25 30 L35 35 L50 15 M50 15 L42 16 M50 15 L49 23" />
                </svg>
              </div>
              <h3 className="font-bold mb-2 font-mono uppercase text-sm">Built for Scale</h3>
              <p className="text-[11px] leading-relaxed font-mono text-gray-600">
                From tiny single-file projects to massive monorepos, GitDoc scales with your codebase and team.
              </p>
            </div>
          </section>

          {/* ── Footer ── */}
          <footer className="mt-24 border-t border-black pt-4 flex justify-between sketch-text text-[10px] opacity-40 font-mono">
            <div>DIM: 1376px x 768px</div>
            <div>SHEET: ABOUT_PAGE_01</div>
            <div>© 2024 GITDOC AI SYSTEMS</div>
          </footer>

          {/* Visual accents */}
          <div className="absolute -top-4 -left-4 text-[10px] font-bold font-mono">X</div>
          <div className="absolute -top-4 -right-4 text-[10px] font-bold font-mono">Y</div>
          <div className="absolute -bottom-4 -left-4 text-[10px] font-bold font-mono">0,0</div>
        </main>
      </div>
    </div>
  );
}

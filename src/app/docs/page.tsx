"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const docSections = [
  {
    title: "1. Quick Start",
    items: [
      "Submitting a Repository URL",
      "Understanding the Analysis Dashboard",
      "Navigating Architecture Diagrams",
      "Exporting Blueprint Reports",
    ],
  },
  {
    title: "2. Analysis Engine",
    items: [
      "Static Analysis Overview",
      "AI Code Summarization",
      "Security Vulnerability Audits",
      "Code Smell & Anti-Pattern Detection",
    ],
  },
  {
    title: "3. Integrations & API",
    items: [
      "GitHub Actions Integration",
      "REST API Reference",
      "Monorepo Configuration",
      "Enterprise SSO Setup",
    ],
  },
];

export default function DocsPage() {
  const router = useRouter();

  return (
    <div className="p-8">
      {/* ── Page Frame ── */}
      <div className="max-w-350 mx-auto min-h-screen relative border-4 border-black p-8 bg-white/50">

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

        {/* ── Header Navigation ── */}
        <header className="flex justify-between items-center mb-16 relative">
          <Link href="/" className="relative px-4 py-2 border-2 border-black bg-white">
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-black" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-black" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-black" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black" />
            <span className="text-3xl font-bold tracking-tighter block">GitDoc</span>
            <span className="text-[10px] block text-right" style={{ fontFamily: "var(--font-mono)" }}>v1.0</span>
          </Link>

          <nav className="flex items-center sketch-border p-2 bg-white">
            <Link href="/" className="nav-link font-bold">Home</Link>
            <Link href="/features" className="nav-link">Features</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/docs" className="nav-link underline font-bold">Docs</Link>
            <Link href="/about" className="nav-link">About</Link>
            <button
              onClick={() => router.push("/analyze")}
              className="ml-4 btn-sketch px-4 py-2 font-bold gap-2"
            >
              Analyze Repository <span className="text-xl">→</span>
            </button>
          </nav>
        </header>

        {/* ── Title Banner ── */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <span className="sketch-text text-sm font-bold block mb-2 tracking-widest uppercase text-gray-500">
            FIG. 09 — SYSTEM DOCUMENTATION
          </span>
          <h1
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Documentation &amp; Guides
          </h1>
          <p className="sketch-text text-2xl font-bold text-gray-700">
            Everything you need to master codebase architecture analysis with GitDoc.
          </p>
        </section>

        {/* ── Documentation Sections Grid ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {docSections.map((sec) => (
            <div key={sec.title} className="p-6 border-2 border-black bg-white relative">
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-white border-2 border-black" />
              <h3 className="font-bold text-lg uppercase mb-4 border-b-2 border-black pb-2">{sec.title}</h3>
              <ul className="space-y-3 text-xs">
                {sec.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 hover:underline cursor-pointer">
                    <span className="text-gray-400">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* ── Blueprint Footer ── */}
        <footer className="mt-24 border-t border-black pt-4 flex justify-between sketch-text text-[10px] opacity-40">
          <div>DIM: 1376px x 768px</div>
          <div>SHEET: DOCS_PAGE_01</div>
          <div>© 2024 GITDOC AI SYSTEMS</div>
        </footer>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FeaturesPage() {
  const router = useRouter();

  return (
    <div className="bg-[#f9f9f7] text-[#1a1c1b] font-body-sm blueprint-grid min-h-screen">
      {/* ── TopNavBar ── */}
      <nav className="flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto bg-[#f9f9f7] border-b-2 border-black relative after:content-[''] after:absolute after:-bottom-1 after:-right-1 after:w-2 after:h-2 after:bg-black">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-3xl font-headline-md font-extrabold tracking-tighter text-black"
          >
            GitDoc
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-xs font-semibold tracking-wider">
          <Link
            href="/"
            className="text-[#4c4546] hover:text-black transition-colors"
          >
            HOME
          </Link>
          <Link
            href="/features"
            className="text-black border-b-2 border-black pb-1 font-bold"
          >
            FEATURES
          </Link>
          <Link
            href="/pricing"
            className="text-[#4c4546] hover:text-black transition-colors"
          >
            PRICING
          </Link>
          <Link
            href="/docs"
            className="text-[#4c4546] hover:text-black transition-colors"
          >
            DOCUMENTATION
          </Link>
          <Link
            href="/about"
            className="text-[#4c4546] hover:text-black transition-colors"
          >
            ABOUT
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/analyze")}
            className="flex items-center gap-2 border border-black px-4 py-2 hover:bg-black hover:text-white transition-all cursor-pointer font-mono text-xs font-bold"
          >
            <span>Analyze Repository →</span>
          </button>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-8 pt-12 pb-24">
        {/* FIG 14 - Intro Section */}
        <section className="mb-20">
          <div className="flex items-start justify-between mb-2">
            <span className="font-fig-number text-xs text-[#7e7576] font-mono font-bold tracking-widest uppercase">
              FIG. 14 — ARCHITECTURAL ANALYSIS OVERVIEW
            </span>
            <span className="handwritten text-black text-lg -rotate-2">
              Initial concept phase
            </span>
          </div>

          <div className="hand-drawn-border bg-white p-8 mb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="font-headline-md text-5xl font-extrabold mb-6 leading-none tracking-tight">
                  Mapping the Structural{" "}
                  <span className="italic font-normal handwritten block mt-2 text-black/70">
                    Integrity of Code
                  </span>
                </h1>
                <p className="font-body-lg text-base text-[#4c4546] font-mono max-w-xl mb-8 leading-relaxed">
                  GitDoc analyzes your repository not just as lines of text, but as a physical structure. We measure load-bearing modules, identify architectural debt, and blueprint the evolution of your system over time.
                </p>
                <div className="flex gap-6 font-mono text-xs">
                  <div className="flex items-center gap-2 text-black font-bold">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      architecture
                    </span>
                    <span>CAD EXPORT ENABLED</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#7e7576]">
                    <span className="material-symbols-outlined">layers</span>
                    <span>V.042-STABLE</span>
                  </div>
                </div>
              </div>

              {/* Technical Diagram Illustration */}
              <div className="relative h-64 border border-dashed border-[#cfc4c5] p-6 flex flex-col justify-between overflow-hidden bg-white select-none">
                {/* Top-right dimension label */}
                <div className="absolute top-4 right-4 font-mono text-sm tracking-wider text-black font-medium">
                  840.00mm
                </div>

                {/* Top-left giant A- */}
                <div className="text-8xl font-serif font-black text-black/25 tracking-tighter leading-none">
                  A-
                </div>

                {/* Middle dimension label + grid symbol */}
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 flex items-center gap-6 font-mono text-base font-bold text-black">
                  <span>1280.00mm</span>
                  <span className="text-black/20 text-xl font-normal">♯</span>
                </div>

                {/* Bottom-left giant 01 + Primary System label */}
                <div>
                  <div className="text-7xl font-mono font-bold text-black/20 leading-none mb-1">
                    01
                  </div>
                  <div className="handwritten text-xl text-[#1a1c1b]">
                    Primary System
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {/* Card 1: Architecture Diagrams */}
          <div className="flex flex-col gap-2">
            <span className="font-fig-number text-xs text-[#7e7576] font-mono font-bold">
              FIG. 14.1
            </span>
            <div className="hand-drawn-border bg-white p-6 h-full flex flex-col group hover:bg-[#eeeeec] transition-colors">
              <div className="mb-6 relative h-40 border border-black/5 flex items-center justify-center overflow-hidden bg-gray-50">
                <svg viewBox="0 0 200 120" className="w-full h-full p-2 bg-[#fafafa]" fill="none" stroke="black" strokeWidth="1.5">
                  <rect x="10" y="10" width="180" height="100" strokeDasharray="3 3" />
                  <rect x="30" y="30" width="40" height="30" fill="white" strokeWidth="1.5" />
                  <rect x="130" y="30" width="40" height="30" fill="white" strokeWidth="1.5" />
                  <rect x="80" y="70" width="40" height="30" fill="white" strokeWidth="1.5" />
                  <line x1="70" y1="45" x2="130" y2="45" strokeDasharray="2 2" />
                  <line x1="50" y1="60" x2="80" y2="85" strokeDasharray="2 2" />
                  <line x1="150" y1="60" x2="120" y2="85" strokeDasharray="2 2" />
                </svg>
                {/* Annotation */}
                <div className="absolute bottom-2 left-2 handwritten text-[10px] text-black/60 bg-white/80 px-1 border border-black/10">
                  Isolating Dependency Hubs
                </div>
              </div>
              <h3 className="font-headline-md text-xl font-bold mb-3 uppercase tracking-tight">
                Architecture Diagrams
              </h3>
              <p className="font-body-sm text-xs text-[#4c4546] font-mono mb-6 grow leading-relaxed">
                Generate real-time isometric building representations of your microservices and modules.
              </p>
              <div className="flex justify-between items-center border-t border-black/10 pt-4 font-mono text-xs">
                <span className="font-bold text-black">MODULE VIEW</span>
                <span className="material-symbols-outlined text-[18px]">open_in_full</span>
              </div>
            </div>
          </div>

          {/* Card 2: Code Quality */}
          <div className="flex flex-col gap-2">
            <span className="font-fig-number text-xs text-[#7e7576] font-mono font-bold uppercase">
              FIG. 15 — System Load Integrity
            </span>
            <div className="hand-drawn-border bg-white p-6 h-full flex flex-col group hover:bg-[#eeeeec] transition-colors">
              <div className="mb-6 flex flex-col items-center justify-center h-40 border border-black/5 bg-gray-50">
                {/* Circular Gauge */}
                <div className="relative w-24 h-24 border-2 border-black rounded-full flex items-center justify-center bg-white">
                  <div className="absolute inset-1 border border-dashed border-[#cfc4c5] rounded-full animate-spin [animation-duration:10s]" />
                  <span className="font-headline-md text-2xl font-bold">94.2</span>
                  <span className="absolute -bottom-4 font-mono text-[10px] font-bold bg-white px-2 border border-black">
                    OPTIMAL
                  </span>
                </div>
                <div className="mt-4 handwritten text-[11px] text-black/60">
                  Static analysis score (A-Grade)
                </div>
              </div>
              <h3 className="font-headline-md text-xl font-bold mb-3 uppercase tracking-tight">
                Technical Score
              </h3>
              <p className="font-body-sm text-xs text-[#4c4546] font-mono mb-6 grow leading-relaxed">
                Quantifiable metrics for maintainability, technical debt, and architectural drift.
              </p>
              <div className="flex justify-between items-center border-t border-black/10 pt-4 font-mono text-xs">
                <span className="font-bold text-black">ANALYTICS ENGINE</span>
                <span className="material-symbols-outlined text-[18px]">monitoring</span>
              </div>
            </div>
          </div>

          {/* Card 3: Security Scan */}
          <div className="flex flex-col gap-2">
            <span className="font-fig-number text-xs text-[#7e7576] font-mono font-bold">
              FIG. 16
            </span>
            <div className="hand-drawn-border bg-white p-6 h-full flex flex-col group hover:bg-[#eeeeec] transition-colors">
              <div className="mb-6 h-40 border border-black/5 flex items-center justify-center bg-gray-50">
                <div className="relative">
                  <span className="material-symbols-outlined text-[64px] text-black">shield</span>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 material-symbols-outlined text-[24px] text-white">
                    lock
                  </span>
                  <div className="absolute -top-4 -right-4 bg-black text-white font-mono px-2 py-0.5 text-[10px] font-bold">
                    SECURE
                  </div>
                </div>
              </div>
              <h3 className="font-headline-md text-xl font-bold mb-3 uppercase tracking-tight">
                Security Protocol
              </h3>
              <p className="font-body-sm text-xs text-[#4c4546] font-mono mb-6 grow leading-relaxed">
                Automated vulnerability scanning with structural risk assessment across all nodes.
              </p>
              <div className="flex justify-between items-center border-t border-black/10 pt-4 font-mono text-xs">
                <span className="font-bold text-black">ISO-27001</span>
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </div>
            </div>
          </div>

          {/* Card 4: Documentation */}
          <div className="flex flex-col gap-2">
            <span className="font-fig-number text-xs text-[#7e7576] font-mono font-bold">
              FIG. 17
            </span>
            <div className="hand-drawn-border bg-white p-6 h-full flex flex-col group hover:bg-[#eeeeec] transition-colors">
              <div className="mb-6 h-40 border border-black/5 flex items-center justify-center overflow-hidden bg-gray-50">
                <div className="flex gap-1 items-end">
                  <div className="w-4 h-16 border border-black bg-[#eeeeec]" />
                  <div className="w-16 h-32 border border-black bg-white flex flex-col p-2 gap-1 overflow-hidden">
                    <div className="w-full h-1 bg-black/10" />
                    <div className="w-3/4 h-1 bg-black/10" />
                    <div className="w-full h-1 bg-black/10" />
                    <div className="w-1/2 h-1 bg-black/20 mt-4" />
                    <div className="w-full h-1 bg-black/10" />
                  </div>
                  <div className="w-4 h-16 border border-black bg-[#eeeeec]" />
                </div>
              </div>
              <h3 className="font-headline-md text-xl font-bold mb-3 uppercase tracking-tight">
                Blueprinted Docs
              </h3>
              <p className="font-body-sm text-xs text-[#4c4546] font-mono mb-6 grow leading-relaxed">
                Auto-generated documentation that stays in sync with your structural changes.
              </p>
              <div className="flex justify-between items-center border-t border-black/10 pt-4 font-mono text-xs">
                <span className="font-bold text-black">LIVE SPEC</span>
                <span className="material-symbols-outlined text-[18px]">description</span>
              </div>
            </div>
          </div>
        </section>

        {/* Annotation Detail */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-dashed border-[#cfc4c5] relative bg-white">
            <div className="absolute -top-3 left-4 bg-[#f9f9f7] px-2 font-mono text-[10px] text-[#7e7576] uppercase tracking-widest">
              Structural Note A-12
            </div>
            <p className="handwritten text-sm leading-relaxed text-[#4c4546]">
              All components listed are currently integrated with GitDoc Core v2.0. The isometric rendering engine (FIG. 14.1) requires a minimum of 8GB allocated system memory for complex graph traversals.
            </p>
          </div>

          <div className="md:col-span-2 flex items-center justify-center hand-drawn-border border-dashed p-8 bg-white">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-headline-md text-2xl font-bold uppercase mb-4 tracking-tight">
                Ready to draft your first system?
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={() => router.push("/analyze")}
                  className="bg-black text-white px-8 py-3 font-mono text-xs font-bold uppercase tracking-wider hover:translate-x-1 hover:-translate-y-1 transition-transform border border-black cursor-pointer"
                >
                  START NEW BLUEPRINT
                </button>
                <button
                  onClick={() => router.push("/docs")}
                  className="border border-black px-8 py-3 font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#e8e8e6] transition-colors cursor-pointer"
                >
                  DOWNLOAD SDK
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-8 gap-6 bg-[#eeeeec] border-t border-dashed border-[#cfc4c5] mt-16 font-mono">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-xs font-bold text-black uppercase">GITDOC SYSTEMS</span>
          <p className="text-xs text-[#4c4546]">© 2024 GitDoc Systems - Ref: ARCH-SPEC-001</p>
        </div>
        <div className="flex gap-8 text-xs text-[#4c4546]">
          {["System Status", "API Docs", "Privacy Protocol", "Legal"].map((link) => (
            <a key={link} href="#" className="hover:text-black underline decoration-dashed">
              {link}
            </a>
          ))}
        </div>
        <div className="handwritten text-[10px] text-[#7e7576] max-w-[160px] text-right italic">
          &ldquo;Design is the silent ambassador of your code.&rdquo; — Revision B
        </div>
      </footer>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen p-4 md:p-8 grid-20"
      style={{ fontFamily: "var(--font-code)", color: "#1a1a1a" }}
    >
      {/* ── Navigation ── */}
      <nav className="max-w-7xl mx-auto mb-12 flex justify-between items-center border-b-2 border-black pb-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-bold font-marker">GitDoc</Link>
          <span className="text-xs mt-2">v1.0</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/features" className="hover:underline">Features</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <Link href="/docs" className="hover:underline">Docs</Link>
          <Link href="/about" className="hover:underline border-b-2 border-black">About</Link>
        </div>
        <button
          onClick={() => router.push("/analyze")}
          className="sketched-border px-4 py-2 text-sm font-bold hover:bg-gray-100 transition-colors"
        >
          Analyze Repository →
        </button>
      </nav>

      <main className="max-w-7xl mx-auto relative">

        {/* ── Hero Section ── */}
        <section className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          {/* Left */}
          <div className="lg:w-1/2 pt-8">
            <span className="text-xs font-bold block mb-4 uppercase tracking-widest">
              Fig. 07 — About GitDoc
            </span>
            <h1
              className="text-5xl md:text-7xl font-marker mb-8"
              style={{ lineHeight: 1.1 }}
            >
              Built by developers,<br />for developers.
            </h1>
            <div className="max-w-md space-y-4 text-sm font-medium leading-relaxed">
              <p>
                GitDoc is an AI-powered software architect that helps you understand, document, and improve any codebase in seconds.
              </p>
              <p>
                We believe every codebase has a story. Our mission is to make that story clear, beautiful, and actionable.
              </p>
            </div>
            {/* Arrow decoration */}
            <div className="mt-8 ml-12">
              <svg fill="none" height="50" viewBox="0 0 100 50" width="100">
                <path d="M5 45C25 40 60 40 90 5M90 5L80 8M90 5L85 15" stroke="black" strokeLinecap="round" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Right — illustration */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="sketched-border overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLu0zbONz0ykcaHDUJEQyE3NgT0KMx5KnuFq2DmfWT3aiV8PZB6ANY2fGPqzu25PPlKO7b1j3pOH5Xo326eKonjObTaLetmxw4yLRzHdMqJ2LiftoK-D9MXtqqmMLdrpm0NLL3XH2ePbUIOKyxGpTB-HEfjcHWJfPgW8oUsxsg3z5ANu9F8SMwBiTi-K-H26r66-Gg79K6hGJucKlKeNp2kSUspf68CXZYtnI6LQ8NjbnIr43asqmhEaLiY"
                alt="Technical Blueprint of Drafting Table"
                className="w-full h-auto block grayscale contrast-125"
                style={{ maxWidth: 480 }}
              />
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="mb-12">
          <div className="sketched-border flex flex-wrap divide-x-2 divide-black">
            {[
              { emoji: "📚", value: "10K+", label: "Repositories Analyzed" },
              { emoji: "👤", value: "5K+", label: "Developers Trust Us" },
              { emoji: "✔️", value: "99.9%", label: "Analysis Accuracy" },
              { emoji: "🕒", value: "24/7", label: "Always Analyzing" },
              { emoji: "⭐", value: "4.9/5", label: "Developer Rating" },
            ].map((stat) => (
              <div key={stat.label} className="flex-1 min-w-50 p-6 flex items-center gap-4">
                <div className="text-3xl">{stat.emoji}</div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-[10px] uppercase font-bold text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Card Grid ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">

          {/* Card 01 */}
          <div className="sketched-border p-6 flex flex-col items-center text-center">
            <div className="text-xs self-start font-bold mb-4">01</div>
            <div className="h-24 flex items-center justify-center mb-4">
              <svg fill="none" height="60" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 60 60" width="60">
                <path d="M10 20 H20 V10 H30 V20 H40 V30 H30 V40 H20 V30 H10 V20Z" strokeDasharray="2 2" />
                <path d="M40 15 H50 V25 H40 V15Z" />
                <path d="M15 40 H25 V50 H15 V40Z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Why We Built GitDoc</h3>
            <p className="text-[11px] leading-relaxed">
              Codebases are complex. Documentation is outdated. Understanding takes hours. We built GitDoc to change that.
            </p>
          </div>

          {/* Card 02 */}
          <div className="sketched-border p-6 flex flex-col items-center text-center">
            <div className="text-xs self-start font-bold mb-4">02</div>
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
            <h3 className="font-bold mb-2">Our Approach</h3>
            <p className="text-[11px] leading-relaxed">
              We combine static analysis, AI understanding, and software architecture principles to reverse-engineer codebases into clear blueprints.
            </p>
          </div>

          {/* Card 03 */}
          <div className="sketched-border p-6 flex flex-col items-center text-center">
            <div className="text-xs self-start font-bold mb-4">03</div>
            <div className="h-24 flex items-center justify-center mb-4">
              <svg fill="none" height="60" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 60 60" width="60">
                <circle cx="30" cy="30" r="20" />
                <circle cx="30" cy="30" r="12" />
                <circle cx="30" cy="30" r="4" />
                <path d="M45 15 L32 28" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">What Makes Us Different</h3>
            <p className="text-[11px] leading-relaxed">
              We don&apos;t just summarize code. We architect it. We connect the dots. We reveal the bigger picture.
            </p>
          </div>

          {/* Card 04 */}
          <div className="sketched-border p-6 flex flex-col items-center text-center">
            <div className="text-xs self-start font-bold mb-4">04</div>
            <div className="h-24 flex items-center justify-center mb-4">
              <svg fill="none" height="60" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 60 60" width="60">
                <rect height="15" rx="2" width="20" x="20" y="30" />
                <path d="M25 30 V25 A5 5 0 0 1 35 25 V30" />
                <path d="M45 25 C45 20 40 20 38 22" strokeDasharray="2 2" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Privacy First</h3>
            <p className="text-[11px] leading-relaxed">
              Your code stays yours. We respect your privacy and never store your private repositories.
            </p>
          </div>

          {/* Card 05 */}
          <div className="sketched-border p-6 flex flex-col items-center text-center">
            <div className="text-xs self-start font-bold mb-4">05</div>
            <div className="h-24 flex items-center justify-center mb-4">
              <svg fill="none" height="60" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 60 60" width="60">
                <path d="M10 50 L10 10 M10 50 L50 50" />
                <path d="M10 40 L25 30 L35 35 L50 15 M50 15 L42 16 M50 15 L49 23" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Built for Scale</h3>
            <p className="text-[11px] leading-relaxed">
              From tiny projects to massive monorepos, GitDoc scales with your codebase and your team.
            </p>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          {/* Quote box */}
          <div className="sketched-border p-6 italic text-sm">
            &ldquo;Code is more than syntax. It&apos;s architecture, decisions, trade-offs, and intent. We make it visible.&rdquo; — The GitDoc Team
          </div>

          {/* Blueprint note */}
          <div className="flex items-center gap-6 justify-end">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg fill="none" height="40" stroke="black" strokeWidth="1" viewBox="0 0 40 40" width="40">
                <path d="M20 5 L10 35 M20 5 L30 35 M10 30 Q20 25 30 30" />
                <circle cx="20" cy="5" fill="white" r="2" />
              </svg>
            </div>
            <div className="sketched-border p-4 bg-white relative max-w-sm">
              <div className="text-[10px] font-bold uppercase mb-1">Blueprint Note</div>
              <p className="text-[11px]">
                GitDoc continues to evolve with one goal in mind: Make every codebase understandable.
              </p>
              {/* Corner fold */}
              <div className="absolute bottom-0 right-0 w-4 h-4 border-l border-t border-black bg-white" />
            </div>
          </div>
        </footer>

        {/* Visual accents */}
        <div className="absolute -top-4 -left-4 text-[10px] font-bold">X</div>
        <div className="absolute -top-4 -right-4 text-[10px] font-bold">Y</div>
        <div className="absolute -bottom-4 -left-4 text-[10px] font-bold">0,0</div>
      </main>
    </div>
  );
}

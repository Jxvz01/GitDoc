"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();

  return (
    <div className="bg-[#f9f9f7] text-[#1a1c1b] font-body-lg blueprint-grid min-h-screen selection:bg-[#bfddfe]">
      {/* ── TopNavBar ── */}
      <header className="bg-[#f9f9f7] w-full top-0 border-b border-[#7e7576] sticky z-50">
        <nav className="flex justify-between items-center px-8 py-4 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="font-headline-md text-3xl font-bold text-black tracking-tighter"
            >
              GitDoc
            </Link>
            <div className="hidden md:flex gap-6">
              <Link
                href="/"
                className="font-body-sm text-sm text-[#4c4546] hover:text-black transition-colors duration-150"
              >
                Home
              </Link>
              <Link
                href="/features"
                className="font-body-sm text-sm text-[#4c4546] hover:text-black transition-colors duration-150"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="font-body-sm text-sm text-black border-b-2 border-black pb-1 font-semibold"
              >
                Pricing
              </Link>
              <Link
                href="/docs"
                className="font-body-sm text-sm text-[#4c4546] hover:text-black transition-colors duration-150"
              >
                Docs
              </Link>
              <Link
                href="/about"
                className="font-body-sm text-sm text-[#4c4546] hover:text-black transition-colors duration-150"
              >
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/analyze")}
              className="font-body-sm text-sm px-4 py-2 border border-black hover:bg-[#bfddfe] transition-colors duration-150 cursor-pointer font-bold"
            >
              Analyze Repository →
            </button>
          </div>
        </nav>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-screen-2xl mx-auto px-8 py-16 relative overflow-hidden">
        {/* Technical Annotations */}
        <div className="absolute top-10 left-10 opacity-30 select-none">
          <p className="font-fig-number text-xs font-mono">AXIS_REF: 44.029.00</p>
          <p className="font-fig-number text-xs font-mono mt-1">SCALE: 1:1 REALITY</p>
        </div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 relative z-10">
            <div className="mb-4 inline-block px-3 py-1 border border-[#7e7576] font-fig-number text-xs uppercase font-mono">
              Project: GitDoc Finance Div
            </div>
            <h1 className="font-headline-md text-5xl md:text-6xl font-extrabold mb-8 tracking-tight leading-tight">
              IT&apos;S FREAKING FREE<br />
              <span className="handwritten text-[#43617d] italic">Why do you wanna pay?</span>
            </h1>
            <p className="font-body-lg text-base max-w-xl text-[#4c4546] mb-10 leading-relaxed font-mono">
              Our architectural model for code intelligence is built on the philosophy that structural clarity shouldn&apos;t have a tax. We&apos;ve eliminated the overhead so you can focus on the blueprint.
            </p>

            {/* CTA Area */}
            <div className="flex flex-wrap gap-6 items-center">
              <button
                onClick={() => router.push("/analyze")}
                className="bg-black text-white px-8 py-4 font-label-caps text-xs font-bold uppercase tracking-wider border border-black hover:bg-[#4c4546] active:translate-y-px transition-all cursor-pointer"
              >
                DEPLOY NOW (FREE)
              </button>
              <div className="flex items-center gap-2 text-[#4c4546]">
                <span className="material-symbols-outlined">verified</span>
                <span className="font-body-sm text-sm font-mono">Zero hidden schematics</span>
              </div>
            </div>
          </div>

          {/* Primary Illustration */}
          <div className="lg:col-span-5 relative">
            <div className="border border-[#7e7576] p-2 bg-white relative shadow-sm">
              <div className="bracket-corner bracket-tl" />
              <div className="bracket-corner bracket-tr" />
              <div className="bracket-corner bracket-bl" />
              <div className="bracket-corner bracket-br" />
              <div className="technical-header">
                <span>Fig. 25: Structural Economy</span>
                <span>0.00 USD</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnauoUjkJB4T46PnCfeY6_3ITtVZW2yHzMbRkXii4ENJVnmfAcVMLwFISmYiwHM-JoXpL6c9_pY98cvqBzu-nDhilOf8j0GeCkrJPEDKxKbbHH-Okrd_lL9fJ-DSKGT1WWWpNKYVtI5tvbWQi9NU1fdP6ZLrWw0YuMOAhOjlyvJA-AKJS8Sy3BNePLWfvtdUy7DhmxQ5PYTkQ5IpY5-QElHlLlhinbXAej-yXyvw7PLLu-7RZGpPRZUn5g41X2RsG7st3VsRzHrQ2S"
                alt="Construction workers on a site assembling a giant word FREE using cranes and scaffolding in a technical blueprint style"
                className="w-full grayscale contrast-125 mix-blend-multiply"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-20 pointer-events-none">
              <span className="material-symbols-outlined text-8xl">architecture</span>
            </div>
          </div>
        </section>

        {/* Pricing Tiers Grid */}
        <section className="mb-32 relative">
          <div className="construction-line w-full top-0 left-0" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12">

            {/* Obsolete Piggy Bank Graphic */}
            <div className="md:col-span-4 flex flex-col justify-center items-center">
              <div className="max-w-[280px] text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNPFsXc3BvS_reG0XUgV03xN3Ek9Xv34EzGk7ZqmJ6jTDpPWtAMQvA_BxwjzKpoD3l01SDdmmWltq_R9_tkd6ZUvNE3kOAnzlml5HfBla4vbeGHUKKP6itCmdf_OqTQ1k1jLGfKpkj5bZTxXckr2OevTFBqXvgsmhrRRj8ViMknC8lUzx6zx_z8UPgrbSjc7Q6jdOi53NPRhtB6d0axj4S8hxXJICZbM8NoxZC5LfWb_ysbDxfo2v1479ZhMZmbJ4mONrbws8PFoMt"
                  alt="A technical drawing of a piggy bank crossed out with a large X, labeled as Obsolete Design on a grid background"
                  className="w-full mix-blend-multiply opacity-80 mb-6"
                />
                <p className="handwritten text-[#43617d] text-lg">
                  Traditional monetization is an obsolete architecture.
                </p>
                <div className="mt-4 font-fig-number text-xs font-mono border-t border-[#cfc4c5] pt-2">
                  FIG. 24 - LEGACY COST MODEL
                </div>
              </div>
            </div>

            {/* Main Pricing Card */}
            <div className="md:col-span-8">
              <div className="bg-white border-2 border-black relative p-12 hover:translate-x-1 hover:-translate-y-1 transition-transform duration-200">
                <div className="absolute -top-3 -left-3 bg-black text-white font-label-caps text-xs px-4 py-1 uppercase tracking-widest font-mono">
                  Recommended Architecture
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                  <div>
                    <h2 className="font-headline-md text-3xl font-bold mb-2">Architect Plan</h2>
                    <p className="font-body-sm text-sm text-[#4c4546] uppercase tracking-widest font-mono">
                      Permanent Zero-Cost Structural Analysis
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-md text-6xl font-extrabold">$0</span>
                    <span className="font-body-sm text-sm text-[#4c4546] font-mono"> /FOREVER</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="handwritten text-2xl leading-none text-black">✓</span>
                      <div>
                        <p className="font-body-lg text-base font-bold font-mono">Unlimited analysis</p>
                        <p className="font-body-sm text-xs text-[#4c4546] font-mono">Analyze every branch, every commit.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="handwritten text-2xl leading-none text-black">✓</span>
                      <div>
                        <p className="font-body-lg text-base font-bold font-mono">Architecture diagrams</p>
                        <p className="font-body-sm text-xs text-[#4c4546] font-mono">Auto-generated system blueprints.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="handwritten text-2xl leading-none text-black">✓</span>
                      <div>
                        <p className="font-body-lg text-base font-bold font-mono">Security reviews</p>
                        <p className="font-body-sm text-xs text-[#4c4546] font-mono">Identify structural vulnerabilities.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="handwritten text-2xl leading-none text-black">✓</span>
                      <div>
                        <p className="font-body-lg text-base font-bold font-mono">AI summaries</p>
                        <p className="font-body-sm text-xs text-[#4c4546] font-mono">Natural language code explanations.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-[#cfc4c5] flex justify-between items-center">
                  <div className="font-fig-number text-xs font-mono uppercase opacity-50">
                    FIG. 04 - ZERO COST ANALYSIS
                  </div>
                  <Link
                    href="/analyze"
                    className="font-label-caps text-xs font-bold uppercase tracking-wider border-b border-black pb-1 hover:text-[#43617d] transition-all font-mono"
                  >
                    READ SPECIFICATIONS →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Secondary Info */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-6 border border-[#7e7576] border-dashed border-opacity-50">
            <div className="text-[#43617d] font-fig-number mb-4 text-xs font-mono">001. TRANSPARENCY</div>
            <h3 className="font-headline-md text-xl font-bold mb-3">Open Schematics</h3>
            <p className="font-body-sm text-sm text-[#4c4546] font-mono leading-relaxed">
              Our source is visible. Our pricing is transparent. There is no paywall to hide the quality of our engineering.
            </p>
          </div>

          <div className="p-6 border border-[#7e7576] border-dashed border-opacity-50">
            <div className="text-[#43617d] font-fig-number mb-4 text-xs font-mono">002. PERFORMANCE</div>
            <h3 className="font-headline-md text-xl font-bold mb-3">Low Overhead</h3>
            <p className="font-body-sm text-sm text-[#4c4546] font-mono leading-relaxed">
              By automating the analysis architecture, we&apos;ve reduced operational costs to a level that allows for total user freedom.
            </p>
          </div>

          <div className="p-6 border border-[#7e7576] border-dashed border-opacity-50">
            <div className="text-[#43617d] font-fig-number mb-4 text-xs font-mono">003. GROWTH</div>
            <h3 className="font-headline-md text-xl font-bold mb-3">Community Scale</h3>
            <p className="font-body-sm text-sm text-[#4c4546] font-mono leading-relaxed">
              The more architects using GitDoc, the better the underlying model becomes. Your usage is the currency of improvement.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f9f9f7] w-full border-t border-[#7e7576] relative">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-8 w-full max-w-screen-2xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2 mb-6 md:mb-0">
            <span className="font-label-caps text-xs font-bold uppercase text-black font-mono">
              GitDoc ARCHITECTURAL DIV.
            </span>
            <span className="font-fig-number text-xs font-mono text-[#4c4546] uppercase">
              © 2024 GITDOC ARCHITECTURAL DIV. ALL RIGHTS RESERVED.
            </span>
          </div>

          <div className="flex gap-8">
            {["Terminal", "Logs", "Schematics", "Support"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-fig-number text-xs font-mono uppercase text-[#4c4546] hover:text-black underline transition-opacity duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

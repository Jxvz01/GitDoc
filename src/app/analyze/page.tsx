"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GitDocReport, FileNode } from "@/lib/types";

/* ── Sidebar navigation items ── */
const sidebarItems = [
  { icon: "🔲", label: "Overview", figId: "fig-01" },
  { icon: "🤖", label: "AI Summary", figId: "fig-06" },
  { icon: "📐", label: "Architecture", figId: "fig-03" },
  { icon: "📂", label: "Folder Explorer", figId: "fig-04" },
  { icon: "🛠️", label: "Tech Stack", figId: "fig-05" },
  { icon: "📖", label: "README", figId: "fig-07" },
  { icon: "🛡️", label: "Security", figId: "fig-08" },
  { icon: "💨", label: "Code Smells", figId: "fig-09" },
  { icon: "🔧", label: "Maintainability", figId: "fig-10" },
  { icon: "⚡", label: "Performance", figId: "fig-11" },
  { icon: "📝", label: "Documentation", figId: "fig-12" },
  { icon: "👥", label: "Contributor Guide", figId: "fig-13" },
];

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const repoParam = searchParams.get("repo") || "";

  const [repoUrl, setRepoUrl] = useState(repoParam);
  const [activeSection, setActiveSection] = useState("Overview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<GitDocReport | null>(null);
  const [copiedReadme, setCopiedReadme] = useState(false);
  const [selectedFolderNode, setSelectedFolderNode] = useState<FileNode | null>(null);

  const runAnalysis = async (targetUrl: string) => {
    if (!targetUrl.trim()) return;
    const cacheKey = "gitdoc_cache_" + targetUrl.trim().toLowerCase();

    // Check client sessionStorage cache
    if (typeof window !== "undefined") {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setReport(parsed);
          if (parsed.folderTree) setSelectedFolderNode(parsed.folderTree);
          return;
        } catch {
          // Ignore cache parse error
        }
      }
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: targetUrl.trim() }),
      });

      const contentType = res.headers.get("content-type") || "";
      let data: any = {};
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error(`API Endpoint Error (${res.status}). Please check deployment.`);
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze repository.");
      }
      setReport(data);
      if (data.folderTree) {
        setSelectedFolderNode(data.folderTree);
      }
      if (typeof window !== "undefined") {
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching analysis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (repoParam) {
      setRepoUrl(repoParam);
      runAnalysis(repoParam);
    }
  }, [repoParam]);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;
    runAnalysis(repoUrl);
  };

  const handleExportPDF = () => {
    if (typeof window !== "undefined") {
      // 1. Download structured JSON blueprint file
      if (report) {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(report, null, 2))}`;
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", jsonString);
        downloadAnchor.setAttribute("download", `${report.metadata.repo}-blueprint.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      }

      // 2. Open browser print dialog for PDF export
      window.print();
    }
  };

  const handleCopyReadme = () => {
    if (report?.readmeContent) {
      navigator.clipboard.writeText(report.readmeContent);
      setCopiedReadme(true);
      setTimeout(() => setCopiedReadme(false), 2000);
    }
  };

  const handleSectionClick = (item: typeof sidebarItems[0]) => {
    setActiveSection(item.label);
    const element = document.getElementById(item.figId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div
      className="grid-20 p-4"
      style={{ fontFamily: "var(--font-sketch)", color: "#1a1a1a", minWidth: 1376 }}
    >
      {/* ── Main Container ── */}
      <div className="max-w-[1340px] mx-auto border-4 border-black p-1 bg-white relative">

        {/* ── Top Bar ── */}
        <header className="flex items-center justify-between border-b-2 border-black pb-4 mb-4 p-2">
          <div className="flex items-center gap-8">
            {/* Logo — Links back to Home */}
            <Link
              href="/"
              className="text-4xl font-bold tracking-tighter font-shadow hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer"
              title="Return to Homepage"
            >
              GitDoc <span className="text-sm font-normal align-top" style={{ fontFamily: "var(--font-sketch)" }}>v1.0</span>
            </Link>

            {/* Breadcrumb + URL input */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-bold hover:underline cursor-pointer bg-neutral-100 hover:bg-neutral-200 px-3 py-1 border border-black transition-colors"
                title="Return to Homepage"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="2" />
                </svg>
                Home
              </Link>

              <span className="text-sm opacity-50">/</span>

              <span className="text-sm font-bold">Analyze Repository</span>

              <div className="relative">
                <form onSubmit={handleAnalyze}>
                  <input
                    type="text"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="input-sketch w-[340px]"
                    placeholder="Enter GitHub repository URL..."
                    disabled={loading}
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" disabled={loading}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 items-center">
            <Link href="/features" className="btn-sketch px-3 py-1 text-sm">
              Features
            </Link>
            <Link href="/docs" className="btn-sketch px-3 py-1 text-sm">
              Docs
            </Link>
            <Link href="/pricing" className="btn-sketch px-3 py-1 text-sm">
              Pricing
            </Link>
            <button
              onClick={handleExportPDF}
              className="btn-sketch px-3 py-1 text-sm gap-2"
              title="Export blueprint report as PDF"
            >
              Export Report
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </header>

        {/* ── Global Error Notification Bar ── */}
        {error && (
          <div className="mx-2 mb-4 p-3 border-2 border-red-600 bg-red-50 text-red-700 text-xs font-bold flex justify-between items-center">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)} className="underline cursor-pointer">Dismiss</button>
          </div>
        )}

        {/* ── Body: Sidebar + Main + Right sidebar ── */}
        <div className="flex gap-4 p-1">

          {/* ── Left Sidebar ── */}
          <aside className="w-56 shrink-0">
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase mb-4 border-b border-black pb-1">Report Sections</h3>
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <div
                    key={item.label}
                    className={`sidebar-item${item.label === activeSection ? " active" : ""}`}
                    onClick={() => handleSectionClick(item)}
                  >
                    <span>{item.icon === "🔲" ? (
                      <span className="w-4 h-4 border border-black grid grid-cols-2 gap-0.5 p-0.5">
                        <span className="bg-black/20" /><span className="bg-black/20" />
                        <span className="bg-black/20" /><span className="bg-black/20" />
                      </span>
                    ) : item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </nav>
            </div>

            {/* Report Status */}
            <div className="sketch-border p-4 mt-4 bg-white">
              <h3 className="text-xs font-bold uppercase mb-2">Report Status</h3>
              <div className="flex items-center gap-2 text-sm mb-2 font-bold">
                <span className={`w-3 h-3 border border-black rounded-full inline-block ${loading ? "bg-amber-400 animate-pulse" : report ? "bg-emerald-400" : "bg-gray-200"}`} />
                {loading ? "Analyzing..." : report ? "Analysis Ready" : "Ready to analyze"}
              </div>
              <p className="text-xs opacity-70 leading-relaxed">
                {loading
                  ? "Parsing AST, fetching git tree, scanning manifests & security patterns..."
                  : report
                  ? `Successfully generated report for ${report.metadata.fullName}.`
                  : "No repository analyzed yet. Submit a GitHub URL to generate your blueprint."}
              </p>
              <div className="mt-8 text-[10px] italic">FIG. R. 01</div>
            </div>
          </aside>

          {/* ── Main Dashboard Grid ── */}
          <main className="grow grid grid-cols-12 gap-4">

            {/* FIG. 01 — Overview */}
            <div id="fig-01" className="col-span-4 sketch-border p-4 h-64 relative overflow-hidden">
              <span className="fig-label">FIG. 01</span>
              <h3 className="font-bold border-b border-black mb-4 uppercase text-sm">Overview</h3>
              {loading ? (
                <div className="dashed-placeholder w-full h-24 mb-4 flex items-center justify-center text-center px-4 text-xs animate-pulse">
                  Analyzing repository metadata...
                </div>
              ) : report ? (
                <div className="mb-4">
                  <div className="font-bold text-base truncate">{report.metadata.fullName}</div>
                  <p className="text-[11px] text-gray-600 line-clamp-2 mt-1">{report.metadata.description}</p>
                  <div className="flex gap-4 text-xs mt-3 font-mono font-bold">
                    <span>⭐ {report.metadata.stars.toLocaleString()}</span>
                    <span>🍴 {report.metadata.forks.toLocaleString()}</span>
                    <span>👁️ {report.metadata.watchers.toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <div className="dashed-placeholder w-full h-24 mb-4 flex items-center justify-center text-center px-4 text-xs">
                  Repository Overview<br />will appear here
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">+</span>
                </div>
              )}
              <div className="flex justify-between items-end">
                <ul className="text-xs space-y-1">
                  <li><span className="list-bullet" />{report ? `License: ${report.metadata.license}` : "Repository name, description"}</li>
                  <li><span className="list-bullet" />{report ? `Branch: ${report.metadata.defaultBranch}` : "Stars, forks, watchers"}</li>
                  <li><span className="list-bullet" />{report ? `Files: ${report.codeMetrics.totalFiles} | Dirs: ${report.codeMetrics.totalDirectories}` : "Language breakdown"}</li>
                </ul>
                <div className="flex items-end gap-1 pb-1">
                  <div className="w-2 h-4 border border-black" />
                  <div className="w-2 h-8 border border-black" />
                  <div className="w-2 h-6 border border-black" />
                  <div className="w-2 h-10 border border-black" />
                  <div className="w-2 h-7 border border-black" />
                </div>
              </div>
            </div>

            {/* FIG. 02 — Health Score */}
            <div id="fig-02" className="col-span-4 sketch-border p-4 h-64 relative">
              <span className="fig-label">FIG. 02</span>
              <h3 className="font-bold border-b border-black mb-4 uppercase text-sm">Health Score</h3>
              <div className="flex items-center justify-between h-36">
                <div className="relative w-32 h-32 border-2 border-black rounded-full flex items-center justify-center shrink-0 bg-white">
                  <div className="absolute inset-2 border border-dashed border-gray-400 rounded-full" />
                  <div className="text-center text-xs px-2">
                    {report ? (
                      <div>
                        <span className="text-3xl font-black block">{report.healthScore}</span>
                        <span className="text-[10px] font-bold uppercase">/ 100 Health</span>
                      </div>
                    ) : (
                      <>Health Score<br />will appear here</>
                    )}
                  </div>
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs">+</span>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs">+</span>
                  <span className="absolute top-1/2 -left-1 -translate-y-1/2 text-xs">+</span>
                  <span className="absolute top-1/2 -right-1 -translate-y-1/2 text-xs">+</span>
                </div>
                <div className="grow ml-4 space-y-2">
                  {[
                    ["Code Quality", report ? `${report.codeQuality.maintainabilityIndex}/100` : "---"],
                    ["Security", report ? `${report.security.score}/100` : "---"],
                    ["Maintainability", report ? `${report.codeQuality.cyclomaticComplexity}` : "---"],
                    ["Performance", report ? `${report.performance.score}/100` : "---"],
                    ["Documentation", report ? `${report.documentation.score}/100` : "---"],
                  ].map(([m, val]) => (
                    <div key={m} className="text-[10px] flex justify-between border-b border-black font-mono">
                      <span>{m}</span><span className="font-bold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FIG. 03 — Architecture */}
            <div id="fig-03" className="col-span-4 sketch-border p-4 h-64 relative overflow-hidden">
              <span className="fig-label">FIG. 03</span>
              <h3 className="font-bold border-b border-black mb-2 uppercase text-sm">Architecture Diagram</h3>
              {report ? (
                <div
                  className="w-full h-36 flex items-center justify-center p-1 border border-black bg-neutral-50 overflow-auto"
                  dangerouslySetInnerHTML={{ __html: report.architecture.svgContent }}
                />
              ) : (
                <div className="dashed-placeholder w-full h-32 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <span className="text-3xl">+</span><br />
                    <span className="text-xs">Architecture diagram<br />will be generated here</span>
                  </div>
                </div>
              )}
              <p className="text-[10px] italic mt-2">Interactive diagram showing system structure and components</p>
            </div>

            {/* FIG. 04 — Folder Explorer */}
            <div id="fig-04" className="col-span-4 sketch-border p-4 h-64 relative overflow-hidden">
              <span className="fig-label">FIG. 04</span>
              <h3 className="font-bold border-b border-black mb-4 uppercase text-sm">Folder Explorer</h3>
              <div className="flex gap-4">
                <div className="w-2/5 border-r border-black pr-2 space-y-1 text-xs overflow-y-auto max-h-36 font-mono">
                  {report ? (
                    <div className="space-y-1">
                      <div className="font-bold">📁 {report.metadata.repo}/</div>
                      {report.folderTree.children?.slice(0, 8).map((child) => (
                        <div
                          key={child.path}
                          onClick={() => setSelectedFolderNode(child)}
                          className={`ml-2 cursor-pointer hover:underline truncate ${selectedFolderNode?.path === child.path ? "font-bold text-black bg-neutral-100 px-1" : "text-gray-700"}`}
                        >
                          {child.type === "dir" ? "📂" : "📄"} {child.path}
                        </div>
                      ))}
                    </div>
                  ) : (
                    [["📁","w-8"],["📂","w-6"],["📂","w-6"],["📂","w-6"],["📄","w-6"]].map(([icon, w], i) => (
                      <div key={i} className={`text-xs flex items-center gap-1 ${i > 0 ? "ml-4" : ""}`}>
                        <span>{icon}</span>
                        <div className={`${w} h-3 border border-black`} />
                      </div>
                    ))
                  )}
                </div>
                <div className="grow">
                  {report ? (
                    <div className="border border-black p-2 h-28 bg-neutral-50 overflow-y-auto text-[10px] font-mono">
                      <div className="font-bold uppercase border-b border-black pb-1 mb-1">
                        Node: {selectedFolderNode?.path || report.metadata.repo}
                      </div>
                      {selectedFolderNode?.children ? (
                        <div className="space-y-1">
                          {selectedFolderNode.children.map((c) => (
                            <div key={c.path} className="flex justify-between">
                              <span>{c.type === "dir" ? "📂" : "📄"} {c.path}</span>
                              <span className="text-gray-500">{c.size ? `${Math.round(c.size / 1024)}KB` : "dir"}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>Type: {selectedFolderNode?.type || "Directory"}<br />Path: {selectedFolderNode?.path}</div>
                      )}
                    </div>
                  ) : (
                    <div className="dashed-placeholder w-full h-24 mb-2 flex items-center justify-center text-[10px] text-center">
                      Folder structure<br />will appear here
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">+</span>
                    </div>
                  )}
                  <p className="text-[10px] mt-1">Browse repository files and directories</p>
                </div>
              </div>
            </div>

            {/* FIG. 05 — Tech Stack */}
            <div id="fig-05" className="col-span-4 sketch-border p-4 h-64 relative overflow-hidden">
              <span className="fig-label">FIG. 05</span>
              <h3 className="font-bold border-b border-black mb-4 uppercase text-sm">Tech Stack</h3>
              {report ? (
                <div className="h-36 overflow-y-auto pr-1">
                  <div className="flex flex-wrap gap-2">
                    {report.techStack.map((tech) => (
                      <div key={tech.name} className="border border-black px-2 py-1 bg-neutral-50 text-xs font-mono font-bold flex items-center gap-1">
                        <span>{tech.name}</span>
                        <span className="text-[9px] font-normal text-gray-500 border-l border-black pl-1">
                          {tech.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="dashed-placeholder w-full h-32 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <span className="text-3xl">+</span><br />
                    <span className="text-xs">Technology stack<br />will be detected here</span>
                  </div>
                </div>
              )}
              <p className="text-[10px] text-center mt-1">Languages, frameworks, libraries, and tools</p>
            </div>

            {/* FIG. 06 — AI Summary */}
            <div id="fig-06" className="col-span-4 sketch-border p-4 h-64 relative overflow-hidden">
              <span className="fig-label">FIG. 06</span>
              <h3 className="font-bold border-b border-black mb-2 uppercase text-sm">AI Summary</h3>
              <div className="border border-black bg-white shadow-md p-3 h-40 relative overflow-y-auto font-mono text-[10px] leading-relaxed">
                {report ? (
                  <p className="whitespace-pre-line">{report.aiSummary}</p>
                ) : (
                  <div className="ml-6 space-y-4">
                    <div className="border-b border-black h-4 w-full" />
                    <div className="border-b border-black h-4 w-full text-center text-[10px]">AI-generated summary will appear here</div>
                    <div className="border-b border-black h-4 w-full text-center relative">
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xl">+</span>
                    </div>
                    <div className="border-b border-black h-4 w-full" />
                  </div>
                )}
              </div>
            </div>

            {/* FIG. 07 — README */}
            <div id="fig-07" className="col-span-3 sketch-border p-4 h-56 relative overflow-hidden">
              <span className="fig-label">FIG. 07</span>
              <div className="flex justify-between items-center border-b border-black mb-2 pb-1">
                <h3 className="font-bold uppercase text-xs">README Generator</h3>
                {report && (
                  <button
                    onClick={handleCopyReadme}
                    className="text-[9px] font-bold border border-black px-1.5 py-0.5 bg-neutral-100 hover:bg-neutral-200"
                  >
                    {copiedReadme ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>
              {report ? (
                <div className="border border-black h-28 p-2 overflow-y-auto text-[9px] font-mono bg-neutral-50 whitespace-pre-wrap">
                  {report.readmeContent}
                </div>
              ) : (
                <div className="border border-black h-24 mb-2 flex flex-col p-2 relative overflow-hidden bg-white">
                  <div className="ml-4 flex grow items-center justify-center text-center text-[10px]">
                    Generated README<br />will appear here
                  </div>
                </div>
              )}
              <p className="text-[9px] mt-1">Generated README content for your repository</p>
            </div>

            {/* FIG. 08 — Security */}
            <div id="fig-08" className="col-span-3 sketch-border p-4 h-56 relative overflow-hidden">
              <span className="fig-label">FIG. 08</span>
              <h3 className="font-bold border-b border-black mb-2 uppercase text-xs">Security Analysis</h3>
              {report ? (
                <div className="h-28 overflow-y-auto text-[10px] space-y-1 font-mono">
                  <div className="flex justify-between border-b border-black pb-1 font-bold">
                    <span>Security Audit Score:</span>
                    <span>{report.security.score}/100</span>
                  </div>
                  <div>.env Exposed: {report.security.hasDotEnvExposed ? "⚠️ YES (CRITICAL)" : "✅ Clean"}</div>
                  <div>Gitignore: {report.security.hasGitignore ? "✅ Found" : "⚠️ Missing"}</div>
                  {report.security.vulnerabilities.length > 0 ? (
                    <div className="mt-1 text-red-600 font-bold">
                      {report.security.vulnerabilities.map((v, i) => (
                        <div key={i}>• [{v.severity}] {v.type}</div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-emerald-700 font-bold mt-2">✅ Zero secrets or vulnerabilities flagged.</div>
                  )}
                </div>
              ) : (
                <div className="dashed-placeholder h-24 mb-2 flex items-center justify-center text-[10px] text-center">
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-xl">+</span>
                  Security analysis<br />will appear here
                </div>
              )}
              <p className="text-[9px] mt-1">Vulnerabilities, risks, and security recommendations</p>
            </div>

            {/* FIG. 09 — Code Smells */}
            <div id="fig-09" className="col-span-3 sketch-border p-4 h-56 relative overflow-hidden">
              <span className="fig-label">FIG. 09</span>
              <h3 className="font-bold border-b border-black mb-2 uppercase text-xs">Code Smells</h3>
              {report ? (
                <div className="h-28 overflow-y-auto text-[10px] space-y-1.5 font-mono">
                  <div className="font-bold">Issues Found: {report.codeQuality.issues.length}</div>
                  {report.codeQuality.issues.map((issue) => (
                    <div key={issue.id} className="border-l-2 border-black pl-1 text-[9px]">
                      <div className="font-bold uppercase text-amber-800">[{issue.severity}] {issue.title}</div>
                      <div className="text-gray-600 line-clamp-1">{issue.description}</div>
                    </div>
                  ))}
                  {report.codeQuality.issues.length === 0 && (
                    <div className="text-emerald-700 font-bold">✅ Clean codebase structural layout.</div>
                  )}
                </div>
              ) : (
                <div className="dashed-placeholder h-24 mb-2 flex items-center justify-center text-[10px] text-center">
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-xl">+</span>
                  Code smells<br />will appear here
                </div>
              )}
              <p className="text-[9px] mt-1">Issues, anti-patterns, and refactoring suggestions</p>
            </div>

            {/* FIG. 10 — Maintainability */}
            <div id="fig-10" className="col-span-3 sketch-border p-4 h-56 relative overflow-hidden">
              <span className="fig-label">FIG. 10</span>
              <h3 className="font-bold border-b border-black mb-2 uppercase text-xs">Maintainability</h3>
              {report ? (
                <div className="h-28 overflow-y-auto text-[10px] space-y-2 font-mono">
                  <div className="flex justify-between border-b border-black pb-1 font-bold">
                    <span>Maintainability Index:</span>
                    <span>{report.codeQuality.maintainabilityIndex}/100</span>
                  </div>
                  <div>Cyclomatic Complexity: <span className="font-bold">{report.codeQuality.cyclomaticComplexity}</span></div>
                  <div>Nesting Depth: <span className="font-bold">{report.codeMetrics.maxNestingDepth} levels</span></div>
                  <div>Average File Size: <span className="font-bold">{report.codeMetrics.averageFileSizeKb} KB</span></div>
                </div>
              ) : (
                <div className="dashed-placeholder h-24 mb-2 flex items-center justify-center text-[10px] text-center">
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-xl">+</span>
                  Maintainability metrics<br />will appear here
                </div>
              )}
              <p className="text-[9px] mt-1">Maintainability index, complexity and improvement levels</p>
            </div>

            {/* FIG. 11 — Performance */}
            <div id="fig-11" className="col-span-4 sketch-border p-4 h-48 relative overflow-hidden">
              <span className="fig-label">FIG. 11</span>
              <h3 className="font-bold border-b border-black mb-2 uppercase text-xs">Performance</h3>
              <div className="flex gap-4">
                <div className="grow h-24 overflow-y-auto text-[10px] font-mono border border-black p-2 bg-white">
                  {report ? (
                    <div>
                      <div className="font-bold mb-1">Score: {report.performance.score}/100 (Risk: {report.performance.bundleRiskLevel})</div>
                      <div>Large Assets (&gt;1MB): {report.performance.largeAssetsCount}</div>
                      {report.performance.heavyDependencies.length > 0 && (
                        <div className="text-amber-700 mt-1">Heavy Deps: {report.performance.heavyDependencies.join(", ")}</div>
                      )}
                      {report.performance.recommendations.map((rec, i) => (
                        <div key={i} className="text-[9px] text-gray-700 mt-1">• {rec}</div>
                      ))}
                    </div>
                  ) : (
                    <div className="dashed-placeholder h-20 flex items-center justify-center text-[10px] text-center">
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-xl">+</span>
                      Performance insights<br />will appear here
                    </div>
                  )}
                </div>
                <div className="w-16 h-16 border-2 border-black rounded-full relative mt-2 shrink-0 bg-white flex items-center justify-center">
                  <span className="font-bold text-sm font-mono">{report ? `${report.performance.score}` : "..."}</span>
                </div>
              </div>
              <p className="text-[9px] mt-2">Performance bottlenecks and optimization suggestions</p>
            </div>

            {/* FIG. 12 — Documentation */}
            <div id="fig-12" className="col-span-4 sketch-border p-4 h-48 relative overflow-hidden">
              <span className="fig-label">FIG. 12</span>
              <h3 className="font-bold border-b border-black mb-2 uppercase text-xs">Documentation Score</h3>
              <div className="flex gap-4">
                <div className="grow h-24 overflow-y-auto text-[10px] font-mono border border-black p-2 bg-white">
                  {report ? (
                    <div>
                      <div className="font-bold mb-1">Doc Coverage Score: {report.documentation.score}/100</div>
                      <div>README: {report.documentation.hasReadme ? "✅ Present" : "❌ Missing"}</div>
                      <div>LICENSE: {report.documentation.hasLicense ? "✅ Present" : "❌ Missing"}</div>
                      <div>CONTRIBUTING: {report.documentation.hasContributing ? "✅ Present" : "❌ Missing"}</div>
                    </div>
                  ) : (
                    <div className="dashed-placeholder h-20 flex items-center justify-center text-[10px] text-center">
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-xl">+</span>
                      Documentation score<br />will appear here
                    </div>
                  )}
                </div>
                <div className="w-20 space-y-2 mt-2 shrink-0">
                  {[1, 0.5, 0.3, 0.1].map((opacity, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-3 h-3 border border-black shrink-0" />
                      <div className="w-full h-0.5 bg-black" style={{ opacity }} />
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[9px] mt-2">Documentation coverage and quality analysis</p>
            </div>

            {/* FIG. 13 — Contributor Guide */}
            <div id="fig-13" className="col-span-4 sketch-border p-4 h-48 relative overflow-hidden">
              <span className="fig-label">FIG. 13</span>
              <h3 className="font-bold border-b border-black mb-2 uppercase text-xs">Contributor Guide</h3>
              <div className="flex gap-4">
                <div className="flex-1 border border-black p-2 relative overflow-y-auto h-24 bg-white text-[9px] font-mono">
                  {report ? (
                    <div>
                      <div className="font-bold mb-1">Setup Steps:</div>
                      {report.contributorGuide.setupInstructions.map((s, i) => (
                        <div key={i}>{i + 1}. {s}</div>
                      ))}
                    </div>
                  ) : (
                    <div className="ml-3 text-[9px] text-center flex flex-col justify-center h-full">
                      Contributor guide<br />will appear here
                      <span className="text-xl">+</span>
                    </div>
                  )}
                </div>
                <div className="w-16 flex flex-col items-center justify-center gap-1 pt-2 shrink-0">
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-6 h-6 border-2 border-black rounded-full bg-white flex items-center justify-center text-[8px] font-bold">
                        {report ? report.metadata.owner[i]?.toUpperCase() || "U" : "U"}
                      </div>
                    ))}
                  </div>
                  <div className="text-[8px]">Contributors</div>
                </div>
              </div>
              <p className="text-[9px] mt-2">AI-generated contributor guide for your project</p>
            </div>
          </main>

          {/* ── Right Sidebar ── */}
          <aside className="w-20 shrink-0 flex flex-col items-center border-l-2 border-black pt-4">
            <div className="mb-8 relative w-12 h-24">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 border border-black" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-black" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-16 border-l border-r border-black rounded-full" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rounded-full" />
            </div>

            <div className="writing-vertical text-[10px] font-bold tracking-widest mb-12">
              ENGINEERING BLUEPRINT
            </div>

            <div className="sketch-border p-2 w-16 mb-8 bg-white">
              <p className="text-[8px] leading-tight text-center">
                Every line of code tells a story. We help you understand it.
              </p>
            </div>

            <div className="mt-auto space-y-8 pb-8">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 border border-black" />
                <div className="absolute top-1/2 w-full border-t border-black" />
                <div className="absolute left-1/2 h-full border-l border-black" />
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px]">Y</div>
                <div className="absolute top-1/2 -right-3 -translate-y-1/2 text-[8px]">X</div>
              </div>
              <div className="writing-vertical text-[8px] space-y-4">
                <span>NOTES:</span>
                <div className="h-24 w-0.5 border-r border-dashed border-black" />
              </div>
            </div>
          </aside>
        </div>

        {/* Paper corner fold */}
        <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-white border-2 border-black origin-bottom-right rotate-45 translate-x-1/2 translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-mono text-sm">Loading GitDoc blueprint...</div>}>
      <AnalyzeContent />
    </Suspense>
  );
}

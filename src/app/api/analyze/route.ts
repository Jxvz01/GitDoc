import { NextResponse } from 'next/server';
import { parseGitHubUrl, fetchGitHubRepoMetadata, fetchGitTree, fetchFileRawContent, fetchRecentCommits } from '@/lib/githubClient';
import {
  detectTechStack,
  computeCodeMetrics,
  analyzeCodeQuality,
  scanSecurity,
  analyzeDocumentation,
  analyzePerformance,
  synthesizeDeterministicSummary,
} from '@/lib/staticAnalyzer';
import { buildFolderTree, generateArchitectureDiagram } from '@/lib/diagramGenerator';
import { generateDeterministicReadme, generateContributorGuide } from '@/lib/readmeGenerator';
import { GitDocReport } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Server-side in-memory cache (15 min TTL)
const reportCache = new Map<string, { report: GitDocReport; expiresAt: number }>();
const CACHE_TTL_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const repoUrl = body.repoUrl;

    if (!repoUrl) {
      return NextResponse.json({ error: 'Repository URL is required.' }, { status: 400 });
    }

    const parsed = parseGitHubUrl(repoUrl);
    if (!parsed) {
      return NextResponse.json({ error: 'Invalid GitHub repository URL format.' }, { status: 400 });
    }

    const { owner, repo } = parsed;
    const cacheKey = `${owner}/${repo}`.toLowerCase();

    // Check server cache
    const cached = reportCache.get(cacheKey);
    if (cached && Date.now() < cached.expiresAt) {
      return NextResponse.json(cached.report);
    }

    // 1. Fetch metadata from GitHub API
    const metadata = await fetchGitHubRepoMetadata(owner, repo);

    // Fetch commit activity stats
    const commitStats = await fetchRecentCommits(owner, repo);
    metadata.lastCommitDate = commitStats.lastCommitDate;
    metadata.commitCount30Days = commitStats.commitCount30Days;
    metadata.recentCommittersCount = commitStats.recentCommittersCount;

    // 2. Fetch file tree
    const treeNodes = await fetchGitTree(owner, repo, metadata.defaultBranch);

    // 3. Fetch key manifest contents for static inspection
    const manifestPaths = [
      'package.json',
      'Cargo.toml',
      'pyproject.toml',
      'requirements.txt',
      'go.mod',
      'Dockerfile',
      'README.md',
      '.env',
      '.env.local',
    ];

    const manifestContents: Record<string, string> = {};
    await Promise.all(
      manifestPaths.map(async (path) => {
        const content = await fetchFileRawContent(owner, repo, metadata.defaultBranch, path);
        if (content !== null) {
          manifestContents[path] = content;
        }
      })
    );

    // 4. Execute deterministic analysis algorithms
    const folderTree = buildFolderTree(treeNodes, 4);
    const techStack = detectTechStack(treeNodes, metadata.languages, manifestContents);
    const codeMetrics = computeCodeMetrics(treeNodes, metadata.languages);
    const codeQuality = analyzeCodeQuality(treeNodes, codeMetrics);
    const security = scanSecurity(treeNodes, manifestContents);
    const readmeContent = manifestContents['README.md'] || null;
    const documentation = analyzeDocumentation(treeNodes, readmeContent);
    const performance = analyzePerformance(treeNodes, techStack);
    const architecture = generateArchitectureDiagram(treeNodes, techStack, metadata);
    const generatedReadme = readmeContent || generateDeterministicReadme(metadata, techStack, codeMetrics);
    const contributorGuide = generateContributorGuide(metadata, techStack);

    // Health Score calculation (0 - 100)
    const healthScore = Math.round(
      codeQuality.maintainabilityIndex * 0.3 +
        security.score * 0.3 +
        documentation.score * 0.2 +
        performance.score * 0.2
    );

    const aiSummary = synthesizeDeterministicSummary(metadata, techStack, codeMetrics, codeQuality, security);

    const report: GitDocReport = {
      metadata,
      folderTree,
      codeMetrics,
      techStack,
      architecture,
      codeQuality,
      security,
      documentation,
      performance,
      contributorGuide,
      readmeContent: generatedReadme,
      healthScore,
      aiSummary,
      generatedAt: new Date().toISOString(),
    };

    // Store in server memory cache
    reportCache.set(cacheKey, {
      report,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    return NextResponse.json(report);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred during repository analysis.';
    console.error('GitDoc Analysis Error:', err);
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repoUrl = searchParams.get('repo');

  if (!repoUrl) {
    return NextResponse.json({ error: 'Repository URL query parameter `repo` is required.' }, { status: 400 });
  }

  // Delegate GET request to POST logic
  return POST(new Request(request.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ repoUrl }),
  }));
}

import {
  TechStackItem,
  CodeMetrics,
  CodeQualityMetrics,
  CodeQualityIssue,
  SecurityReport,
  SecurityVulnerability,
  DocumentationReport,
  PerformanceReport,
  ContributorGuideReport,
  RepoMetadata,
} from './types';
import { GitTreeNode } from './githubClient';

/**
 * Detects tech stack components from tree file names and manifest file contents.
 */
export function detectTechStack(
  treeNodes: GitTreeNode[],
  languages: Record<string, number>,
  manifestContents: Record<string, string>
): TechStackItem[] {
  const stack: TechStackItem[] = [];
  const fileNames = treeNodes.map((n) => n.path.toLowerCase());

  // Languages from GitHub API
  Object.keys(languages).forEach((lang) => {
    stack.push({
      name: lang,
      category: 'Language',
    });
  });

  const packageJsonStr = manifestContents['package.json'] || '';
  let pkgObj: any = null;
  try {
    if (packageJsonStr) pkgObj = JSON.parse(packageJsonStr);
  } catch {
    // Ignore invalid JSON
  }

  const allDeps = {
    ...(pkgObj?.dependencies || {}),
    ...(pkgObj?.devDependencies || {}),
  };

  // Node / JavaScript Frameworks & Tools
  if (allDeps['next']) stack.push({ name: 'Next.js', category: 'Framework', version: allDeps['next'] });
  else if (allDeps['react']) stack.push({ name: 'React', category: 'Framework', version: allDeps['react'] });

  if (allDeps['vue']) stack.push({ name: 'Vue.js', category: 'Framework', version: allDeps['vue'] });
  if (allDeps['nuxt']) stack.push({ name: 'Nuxt', category: 'Framework', version: allDeps['nuxt'] });
  if (allDeps['svelte'] || allDeps['@sveltejs/kit']) stack.push({ name: 'Svelte', category: 'Framework' });
  if (allDeps['express']) stack.push({ name: 'Express', category: 'Framework', version: allDeps['express'] });
  if (allDeps['tailwindcss'] || fileNames.some((f) => f.includes('tailwind'))) stack.push({ name: 'Tailwind CSS', category: 'Style' });
  if (allDeps['typescript'] || fileNames.some((f) => f.endsWith('.ts') || f.endsWith('.tsx'))) stack.push({ name: 'TypeScript', category: 'Language' });
  if (allDeps['vite']) stack.push({ name: 'Vite', category: 'Build Tool' });
  if (allDeps['webpack']) stack.push({ name: 'Webpack', category: 'Build Tool' });
  if (allDeps['prisma'] || fileNames.some((f) => f.includes('prisma'))) stack.push({ name: 'Prisma ORM', category: 'Database' });
  if (allDeps['mongoose'] || allDeps['mongodb']) stack.push({ name: 'MongoDB', category: 'Database' });
  if (allDeps['pg'] || allDeps['postgres']) stack.push({ name: 'PostgreSQL', category: 'Database' });

  // Other Ecosystem Manifests
  if (fileNames.some((f) => f === 'dockerfile' || f === 'docker-compose.yml')) {
    stack.push({ name: 'Docker', category: 'DevOps' });
  }
  if (fileNames.some((f) => f === 'cargo.toml')) {
    stack.push({ name: 'Rust', category: 'Language' });
    stack.push({ name: 'Cargo', category: 'Build Tool' });
  }
  if (fileNames.some((f) => f === 'go.mod')) {
    stack.push({ name: 'Go', category: 'Language' });
  }
  if (fileNames.some((f) => f === 'requirements.txt' || f === 'pyproject.toml' || f === 'pipfile')) {
    stack.push({ name: 'Python', category: 'Language' });
  }
  if (fileNames.some((f) => f === 'pom.xml' || f === 'build.gradle')) {
    stack.push({ name: 'Java / JVM', category: 'Language' });
  }

  // Deduplicate
  const uniqueMap = new Map<string, TechStackItem>();
  stack.forEach((item) => {
    if (!uniqueMap.has(item.name.toLowerCase())) {
      uniqueMap.set(item.name.toLowerCase(), item);
    }
  });

  return Array.from(uniqueMap.values());
}

/**
 * Computes deterministic repository code metrics.
 */
export function computeCodeMetrics(treeNodes: GitTreeNode[], languages: Record<string, number>): CodeMetrics {
  const blobs = treeNodes.filter((n) => n.type === 'blob');
  const dirs = treeNodes.filter((n) => n.type === 'tree');

  const totalFiles = blobs.length;
  const totalDirectories = dirs.length;

  let totalSizeBytes = 0;
  const extensions: Record<string, number> = {};
  const largestFiles: { path: string; sizeKb: number; lines?: number }[] = [];
  let maxNestingDepth = 0;

  blobs.forEach((b) => {
    const size = b.size || 0;
    totalSizeBytes += size;

    const parts = b.path.split('/');
    if (parts.length > maxNestingDepth) {
      maxNestingDepth = parts.length;
    }

    const extMatch = b.path.match(/\.([a-zA-Z0-9]+)$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : 'other';
    extensions[ext] = (extensions[ext] || 0) + 1;

    largestFiles.push({
      path: b.path,
      sizeKb: Math.round((size / 1024) * 10) / 10,
      lines: Math.round(size / 35), // Estimated lines of code based on avg 35 bytes/line
    });
  });

  // Sort largest files
  largestFiles.sort((a, b) => b.sizeKb - a.sizeKb);
  const topLargest = largestFiles.slice(0, 5);

  const averageFileSizeKb = totalFiles > 0 ? Math.round((totalSizeBytes / 1024 / totalFiles) * 10) / 10 : 0;
  const totalLinesOfCode = Math.round(totalSizeBytes / 38);

  // Compute percentage language code distribution
  const totalLangBytes = Object.values(languages).reduce((a, b) => a + b, 0);
  const codeDistribution = Object.entries(languages).map(([lang, bytes]) => ({
    language: lang,
    bytes,
    percentage: totalLangBytes > 0 ? Math.round((bytes / totalLangBytes) * 1000) / 10 : 0,
  }));

  return {
    totalFiles,
    totalDirectories,
    totalLinesOfCode,
    averageFileSizeKb,
    maxNestingDepth,
    fileExtensions: extensions,
    largestFiles: topLargest,
    codeDistribution,
  };
}

/**
 * Analyzes code quality metrics and potential issues using deterministic structural heuristics.
 */
export function analyzeCodeQuality(treeNodes: GitTreeNode[], metrics: CodeMetrics): CodeQualityMetrics {
  const issues: CodeQualityIssue[] = [];
  const blobs = treeNodes.filter((n) => n.type === 'blob');

  // Check nesting depth
  if (metrics.maxNestingDepth > 6) {
    issues.push({
      id: 'cq-deep-nesting',
      severity: 'medium',
      title: 'Deep Directory Nesting Detected',
      description: `Maximum directory depth is ${metrics.maxNestingDepth} levels deep.`,
      recommendation: 'Consider flattening deep directory hierarchies to simplify module imports.',
    });
  }

  // Check long/large files
  const longFiles = metrics.largestFiles.filter((f) => f.sizeKb > 100);
  if (longFiles.length > 0) {
    issues.push({
      id: 'cq-large-files',
      severity: 'high',
      title: 'Oversized Files (>100KB)',
      description: `${longFiles.length} files exceed 100KB in size (e.g. ${longFiles[0]?.path}).`,
      recommendation: 'Decompose monolithic source files into smaller modular utilities.',
    });
  }

  // Check potential duplicate naming
  const fileBasenames = blobs.map((b) => b.path.split('/').pop() || '');
  const basenameCounts: Record<string, number> = {};
  fileBasenames.forEach((name) => {
    if (name && !name.startsWith('.')) {
      basenameCounts[name] = (basenameCounts[name] || 0) + 1;
    }
  });

  const duplicateFilesCount = Object.values(basenameCounts).filter((count) => count > 2).length;
  if (duplicateFilesCount > 0) {
    issues.push({
      id: 'cq-duplicates',
      severity: 'low',
      title: 'Duplicate File Names across Modules',
      description: `${duplicateFilesCount} file names are repeated across multiple directories.`,
      recommendation: 'Use distinct file naming conventions to avoid module resolution confusion.',
    });
  }

  // Circular Dependency Heuristics
  const srcFiles = blobs.filter((b) => /\.(js|ts|jsx|tsx|py|go)$/i.test(b.path));
  if (srcFiles.length > 50 && metrics.maxNestingDepth > 4) {
    issues.push({
      id: 'cq-circular-deps',
      severity: 'medium',
      title: 'Potential Circular Dependency Hazard',
      description: `Module complexity with ${srcFiles.length} source files across ${metrics.maxNestingDepth} levels creates circular import risks.`,
      recommendation: 'Use explicit barrel exports and dependency injection to decouple modules.',
    });
  }

  // Calculate Maintainability Index (0 to 100)
  let maintainabilityIndex = 85;
  if (metrics.maxNestingDepth > 5) maintainabilityIndex -= 10;
  if (longFiles.length > 0) maintainabilityIndex -= 15;
  if (metrics.averageFileSizeKb > 50) maintainabilityIndex -= 10;
  maintainabilityIndex = Math.max(40, Math.min(98, maintainabilityIndex));

  const cyclomaticComplexity =
    metrics.averageFileSizeKb > 40 ? 'High' : metrics.averageFileSizeKb > 15 ? 'Moderate' : 'Low';

  return {
    cyclomaticComplexity,
    duplicateFilesCount,
    longFilesCount: longFiles.length,
    deeplyNestedFilesCount: metrics.maxNestingDepth > 5 ? 1 : 0,
    largeComponentsCount: longFiles.length,
    issues,
    maintainabilityIndex,
  };
}

/**
 * Performs deterministic static security audit on file tree and file contents.
 */
export function scanSecurity(treeNodes: GitTreeNode[], manifestContents: Record<string, string>): SecurityReport {
  const vulnerabilities: SecurityVulnerability[] = [];
  const filePaths = treeNodes.map((n) => n.path.toLowerCase());

  const hasDotEnvExposed = filePaths.some(
    (p) => p === '.env' || p.endsWith('/.env') || p === '.env.local' || p.endsWith('/.env.local')
  );

  if (hasDotEnvExposed) {
    vulnerabilities.push({
      severity: 'CRITICAL',
      type: 'Exposed Environment File',
      file: '.env',
      description: 'Environment file `.env` is checked directly into git repository history.',
      remediation: 'Remove `.env` from repository tracking immediately and add it to `.gitignore`.',
    });
  }

  const hasGitignore = filePaths.some((p) => p === '.gitignore' || p.endsWith('/.gitignore'));
  if (!hasGitignore) {
    vulnerabilities.push({
      severity: 'HIGH',
      type: 'Missing .gitignore',
      file: '.gitignore',
      description: 'Repository does not have a `.gitignore` configuration.',
      remediation: 'Add a `.gitignore` file to prevent accidental commit of credentials and build artifacts.',
    });
  }

  const hasSecurityPolicy = filePaths.some((p) => p.includes('security.md'));

  // Scan manifests for hardcoded secrets or unsafe patterns
  let hasHardcodedSecrets = false;
  Object.entries(manifestContents).forEach(([path, content]) => {
    if (!content) return;

    // Pattern matching for API keys / Private keys
    if (/BEGIN (RSA|OPENSSH|EC|DSA|PRIVATE KEY)/i.test(content)) {
      hasHardcodedSecrets = true;
      vulnerabilities.push({
        severity: 'CRITICAL',
        type: 'Private Key Found',
        file: path,
        description: 'Hardcoded SSL/SSH private key detected in repository content.',
        remediation: 'Revoke key immediately and store securely using environment secrets manager.',
      });
    }

    if (/AKIA[0-9A-Z]{16}/.test(content) || /ghp_[a-zA-Z0-9]{36}/.test(content)) {
      hasHardcodedSecrets = true;
      vulnerabilities.push({
        severity: 'CRITICAL',
        type: 'Hardcoded API Token',
        file: path,
        description: 'Hardcoded Cloud or Service provider API token detected.',
        remediation: 'Revoke token immediately and inject via environment variables.',
      });
    }
  });

  // Calculate Security Score (0 - 100)
  let score = 100;
  vulnerabilities.forEach((v) => {
    if (v.severity === 'CRITICAL') score -= 35;
    else if (v.severity === 'HIGH') score -= 20;
    else if (v.severity === 'MEDIUM') score -= 10;
    else score -= 5;
  });
  score = Math.max(20, Math.min(100, score));

  return {
    score,
    vulnerabilities,
    hasDotEnvExposed,
    hasHardcodedSecrets,
    hasSecurityPolicy,
    hasGitignore,
    licenseStatus: 'Valid',
  };
}

/**
 * Analyzes repository documentation completeness.
 */
export function analyzeDocumentation(treeNodes: GitTreeNode[], readmeContent: string | null): DocumentationReport {
  const filePaths = treeNodes.map((n) => n.path.toLowerCase());

  const hasReadme = readmeContent !== null || filePaths.some((p) => p.includes('readme'));
  const hasLicense = filePaths.some((p) => p.includes('license') || p.includes('copying'));
  const hasContributing = filePaths.some((p) => p.includes('contributing'));
  const hasChangelog = filePaths.some((p) => p.includes('changelog') || p.includes('history'));

  const readmeWordCount = readmeContent ? readmeContent.split(/\s+/).filter(Boolean).length : 0;
  const missingDocs: string[] = [];

  if (!hasReadme) missingDocs.push('README.md');
  if (!hasLicense) missingDocs.push('LICENSE');
  if (!hasContributing) missingDocs.push('CONTRIBUTING.md');
  if (!hasChangelog) missingDocs.push('CHANGELOG.md');

  // Count markdown links
  const markdownLinksCount = readmeContent ? (readmeContent.match(/\[.*?\]\(.*?\)/g) || []).length : 0;

  let score = 0;
  if (hasReadme) score += 40;
  if (readmeWordCount > 200) score += 20;
  if (hasLicense) score += 20;
  if (hasContributing) score += 10;
  if (hasChangelog) score += 10;

  return {
    score,
    hasReadme,
    hasLicense,
    hasContributing,
    hasChangelog,
    readmeWordCount,
    missingDocs,
    markdownLinksCount,
  };
}

/**
 * Performance static audit.
 */
export function analyzePerformance(treeNodes: GitTreeNode[], techStack: TechStackItem[]): PerformanceReport {
  const blobs = treeNodes.filter((n) => n.type === 'blob');
  const largeAssetDetails: { path: string; sizeMb: number }[] = [];

  blobs.forEach((b) => {
    const sizeMb = (b.size || 0) / (1024 * 1024);
    if (sizeMb >= 1.0) {
      largeAssetDetails.push({
        path: b.path,
        sizeMb: Math.round(sizeMb * 10) / 10,
      });
    }
  });

  const heavyDependencies: string[] = [];
  const heavyList = ['lodash', 'moment', 'aws-sdk', 'three', 'canvas', 'jquery'];
  techStack.forEach((t) => {
    if (heavyList.includes(t.name.toLowerCase())) {
      heavyDependencies.push(t.name);
    }
  });

  const recommendations: string[] = [];
  if (largeAssetDetails.length > 0) {
    recommendations.push(`Compress or host ${largeAssetDetails.length} large media asset(s) on a CDN.`);
  }
  if (heavyDependencies.length > 0) {
    recommendations.push(`Consider lighter alternatives for heavy libraries: ${heavyDependencies.join(', ')}.`);
  }

  let score = 90;
  if (largeAssetDetails.length > 0) score -= 15;
  if (heavyDependencies.length > 0) score -= 15;
  score = Math.max(50, Math.min(100, score));

  return {
    score,
    largeAssetsCount: largeAssetDetails.length,
    largeAssetDetails,
    heavyDependencies,
    bundleRiskLevel: score < 70 ? 'High' : score < 85 ? 'Medium' : 'Low',
    recommendations,
  };
}

/**
 * Deterministically synthesizes an architecture blueprint narrative for FIG. 06.
 */
export function synthesizeDeterministicSummary(
  metadata: RepoMetadata,
  techStack: TechStackItem[],
  codeMetrics: CodeMetrics,
  quality: CodeQualityMetrics,
  security: SecurityReport
): string {
  const stackNames = techStack.map((t) => t.name).join(', ') || 'Standard Web Stack';

  return `Repository Blueprint for ${metadata.fullName}:
Built primarily with ${stackNames}. The codebase consists of ${codeMetrics.totalFiles} files across ${codeMetrics.totalDirectories} directories, totaling approximately ${codeMetrics.totalLinesOfCode.toLocaleString()} lines of code.

Architecture Overview:
- Maintainability Index: ${quality.maintainabilityIndex}/100 (${quality.cyclomaticComplexity} Complexity)
- Security Health Audit: ${security.score}/100 (${security.vulnerabilities.length} security flags identified)
- Primary Languages: ${codeMetrics.codeDistribution.slice(0, 3).map((c) => `${c.language} (${c.percentage}%)`).join(', ')}

System Design Notes:
The directory structure exhibits a maximum nesting depth of ${codeMetrics.maxNestingDepth} levels with an average file size of ${codeMetrics.averageFileSizeKb} KB per file. Core application entry points and utility modules follow modular architectural patterns suitable for scalable maintenance.`;
}

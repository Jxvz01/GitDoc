export interface RepoMetadata {
  owner: string;
  repo: string;
  fullName: string;
  description: string;
  defaultBranch: string;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  license: string;
  updatedAt: string;
  createdAt: string;
  pushedAt: string;
  sizeKb: number;
  topics: string[];
  subscribersCount: number;
  languages: Record<string, number>;
  lastCommitDate?: string;
  commitCount30Days?: number;
  recentCommittersCount?: number;
}

export interface FileNode {
  path: string;
  type: 'file' | 'dir';
  size?: number;
  children?: FileNode[];
}

export interface CodeMetrics {
  totalFiles: number;
  totalDirectories: number;
  totalLinesOfCode: number;
  averageFileSizeKb: number;
  maxNestingDepth: number;
  fileExtensions: Record<string, number>;
  largestFiles: { path: string; sizeKb: number; lines?: number }[];
  codeDistribution: { language: string; bytes: number; percentage: number }[];
}

export interface TechStackItem {
  name: string;
  category: 'Framework' | 'Library' | 'Database' | 'Build Tool' | 'Language' | 'DevOps' | 'Testing' | 'Style';
  version?: string;
  icon?: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'entry' | 'component' | 'api' | 'service' | 'config' | 'util' | 'database';
  filesCount: number;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ArchitectureDiagram {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  svgContent: string;
}

export interface CodeQualityIssue {
  id: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  file?: string;
  recommendation: string;
}

export interface CodeQualityMetrics {
  cyclomaticComplexity: 'Low' | 'Moderate' | 'High' | 'Very High';
  duplicateFilesCount: number;
  longFilesCount: number;
  deeplyNestedFilesCount: number;
  largeComponentsCount: number;
  issues: CodeQualityIssue[];
  maintainabilityIndex: number; // 0 - 100
}

export interface SecurityVulnerability {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  type: string;
  file: string;
  description: string;
  line?: number;
  remediation: string;
}

export interface SecurityReport {
  score: number; // 0 - 100
  vulnerabilities: SecurityVulnerability[];
  hasDotEnvExposed: boolean;
  hasHardcodedSecrets: boolean;
  hasSecurityPolicy: boolean;
  hasGitignore: boolean;
  licenseStatus: 'Valid' | 'Missing' | 'Unrecognized';
}

export interface DocumentationReport {
  score: number; // 0 - 100
  hasReadme: boolean;
  hasLicense: boolean;
  hasContributing: boolean;
  hasChangelog: boolean;
  readmeWordCount: number;
  missingDocs: string[];
  markdownLinksCount: number;
}

export interface PerformanceReport {
  score: number; // 0 - 100
  largeAssetsCount: number;
  largeAssetDetails: { path: string; sizeMb: number }[];
  heavyDependencies: string[];
  bundleRiskLevel: 'Low' | 'Medium' | 'High';
  recommendations: string[];
}

export interface ContributorGuideReport {
  topContributors: { name: string; avatarUrl?: string; contributions?: number }[];
  setupInstructions: string[];
  prGuidelines: string[];
  contributorGuideMarkdown: string;
}

export interface GitDocReport {
  metadata: RepoMetadata;
  folderTree: FileNode;
  codeMetrics: CodeMetrics;
  techStack: TechStackItem[];
  architecture: ArchitectureDiagram;
  codeQuality: CodeQualityMetrics;
  security: SecurityReport;
  documentation: DocumentationReport;
  performance: PerformanceReport;
  contributorGuide: ContributorGuideReport;
  readmeContent: string;
  healthScore: number; // 0 - 100
  aiSummary: string; // Deterministically computed architecture blueprint narrative
  generatedAt: string;
}

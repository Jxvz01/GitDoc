import { RepoMetadata, TechStackItem, CodeMetrics, ContributorGuideReport } from './types';

/**
 * Deterministically generates a clean markdown README for the repository.
 */
export function generateDeterministicReadme(
  metadata: RepoMetadata,
  techStack: TechStackItem[],
  metrics: CodeMetrics
): string {
  const stackList = techStack.map((t) => `- **${t.name}** (${t.category})`).join('\n');

  return `# ${metadata.repo}

> ${metadata.description}

## 🚀 Overview

- **Repository**: [${metadata.fullName}](https://github.com/${metadata.fullName})
- **Stars**: ${metadata.stars.toLocaleString()} ⭐ | **Forks**: ${metadata.forks.toLocaleString()} 🍴
- **License**: ${metadata.license}
- **Primary Language**: ${metrics.codeDistribution[0]?.language || 'TypeScript'}
- **Total Codebase**: ${metrics.totalFiles} files across ${metrics.totalDirectories} directories (~${metrics.totalLinesOfCode.toLocaleString()} LOC)

## 🛠️ Tech Stack & Technologies

${stackList || '- Standard Modern Tooling'}

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js / your stack runtime environment installed.

### Installation

\`\`\`bash
# 1. Clone the repository
git clone https://github.com/${metadata.fullName}.git

# 2. Navigate to directory
cd ${metadata.repo}

# 3. Install dependencies
npm install  # or yarn / pnpm / cargo / pip dependending on stack
\`\`\`

### Running Locally

\`\`\`bash
# Start development server
npm run dev
\`\`\`

## 📄 License

Distributed under the ${metadata.license} license.
`;
}

/**
 * Deterministically generates a Contributor Guide for FIG. 13.
 */
export function generateContributorGuide(
  metadata: RepoMetadata,
  techStack: TechStackItem[]
): ContributorGuideReport {
  const setupInstructions = [
    `Fork and clone https://github.com/${metadata.fullName}`,
    'Install required runtime and dependencies.',
    'Create a new feature branch: `git checkout -b feature/my-feature`',
    'Ensure linting and tests pass before committing.',
    'Open a Pull Request with a clear title and summary.',
  ];

  const prGuidelines = [
    'Follow existing architectural & formatting rules.',
    'Ensure no secrets or credentials are included in commits.',
    'Keep pull requests concise and focused on a single change.',
  ];

  const stackNames = techStack.map((t) => t.name).join(', ') || 'Standard stack';

  const guideMarkdown = `# Contributing to ${metadata.repo}

Thank you for considering contributing! This project uses: ${stackNames}.

## Code of Conduct
Please be respectful and helpful to maintainers and fellow contributors.

## Workflow & Guidelines
${setupInstructions.map((s, i) => `${i + 1}. ${s}`).join('\n')}

### PR Principles
${prGuidelines.map((g) => `- ${g}`).join('\n')}
`;

  return {
    topContributors: [
      { name: metadata.owner, avatarUrl: `https://github.com/${metadata.owner}.png`, contributions: 100 },
    ],
    setupInstructions,
    prGuidelines,
    contributorGuideMarkdown: guideMarkdown,
  };
}

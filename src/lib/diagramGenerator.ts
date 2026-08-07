import { FileNode, ArchitectureDiagram, ArchitectureNode, ArchitectureEdge, TechStackItem, RepoMetadata } from './types';
import { GitTreeNode } from './githubClient';

/**
 * Builds a hierarchical directory tree structure from a flat array of GitTreeNodes.
 */
export function buildFolderTree(treeNodes: GitTreeNode[], maxDepth: number = 4): FileNode {
  const root: FileNode = {
    path: '/',
    type: 'dir',
    children: [],
  };

  const map: Record<string, FileNode> = { '': root };

  for (const node of treeNodes) {
    const parts = node.path.split('/');
    if (parts.length > maxDepth + 1) continue; // Cap tree depth to prevent UI overflow

    let currentPath = '';
    let parent = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      if (isLast && node.type === 'blob') {
        const fileNode: FileNode = {
          path: part,
          type: 'file',
          size: node.size || 0,
        };
        if (!parent.children) parent.children = [];
        parent.children.push(fileNode);
      } else {
        if (!map[currentPath]) {
          const dirNode: FileNode = {
            path: part,
            type: 'dir',
            children: [],
          };
          map[currentPath] = dirNode;
          if (!parent.children) parent.children = [];
          parent.children.push(dirNode);
        }
        parent = map[currentPath];
      }
    }
  }

  // Sort directories first, then files alphabetically
  const sortNodes = (node: FileNode) => {
    if (node.children) {
      node.children.sort((a, b) => {
        if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
        return a.path.localeCompare(b.path);
      });
      node.children.forEach(sortNodes);
    }
  };

  sortNodes(root);
  return root;
}

/**
 * Deterministically constructs architectural nodes and SVG diagram string matching the sketch aesthetic.
 */
export function generateArchitectureDiagram(
  treeNodes: GitTreeNode[],
  techStack: TechStackItem[],
  metadata: RepoMetadata
): ArchitectureDiagram {
  const nodes: ArchitectureNode[] = [];
  const edges: ArchitectureEdge[] = [];

  const filePaths = treeNodes.map((n) => n.path.toLowerCase());

  // 1. Entry Point Detection
  const hasIndex = filePaths.some((p) => p.includes('index.html') || p.includes('main.ts') || p.includes('index.js'));
  const hasNextApp = filePaths.some((p) => p.includes('app/page.') || p.includes('app/layout.'));
  const hasAppEntry = hasNextApp || hasIndex || filePaths.some((p) => p.includes('src/main') || p.includes('src/index'));

  nodes.push({
    id: 'entry',
    label: hasNextApp ? 'App Router Entry' : hasAppEntry ? 'Application Entry' : 'Main Entrypoint',
    type: 'entry',
    filesCount: filePaths.filter((p) => p.includes('index') || p.includes('main') || p.includes('page.')).length || 1,
  });

  // 2. UI / Component Layer
  const componentFiles = filePaths.filter((p) => p.includes('component') || p.includes('views') || p.includes('pages') || p.includes('ui'));
  if (componentFiles.length > 0 || techStack.some((t) => t.category === 'Framework')) {
    nodes.push({
      id: 'ui',
      label: 'UI Components Layer',
      type: 'component',
      filesCount: componentFiles.length || 5,
    });
    edges.push({ from: 'entry', to: 'ui', label: 'renders' });
  }

  // 3. API / Routing Layer
  const apiFiles = filePaths.filter((p) => p.includes('/api/') || p.includes('routes') || p.includes('controller') || p.includes('endpoint'));
  if (apiFiles.length > 0) {
    nodes.push({
      id: 'api',
      label: 'API & Routing Layer',
      type: 'api',
      filesCount: apiFiles.length,
    });
    edges.push({ from: 'ui', to: 'api', label: 'requests' });
  }

  // 4. Services / Business Logic
  const serviceFiles = filePaths.filter((p) => p.includes('service') || p.includes('lib') || p.includes('core') || p.includes('utils') || p.includes('helpers'));
  nodes.push({
    id: 'services',
    label: 'Core Services & Utils',
    type: 'service',
    filesCount: serviceFiles.length || 3,
  });
  edges.push({ from: apiFiles.length > 0 ? 'api' : 'ui', to: 'services', label: 'invokes' });

  // 5. Config / Build Layer
  const configFiles = filePaths.filter((p) => p.includes('config') || p.includes('.json') || p.includes('.env') || p.includes('.toml') || p.includes('docker'));
  nodes.push({
    id: 'config',
    label: 'Config & Manifests',
    type: 'config',
    filesCount: configFiles.length,
  });
  edges.push({ from: 'services', to: 'config', label: 'loads' });

  // 6. Database / External Storage
  const dbTech = techStack.find((t) => t.category === 'Database');
  const hasDB = dbTech || filePaths.some((p) => p.includes('db') || p.includes('prisma') || p.includes('sql') || p.includes('schema') || p.includes('store'));
  if (hasDB) {
    nodes.push({
      id: 'database',
      label: dbTech ? `${dbTech.name} Database` : 'Data Store / DB',
      type: 'database',
      filesCount: filePaths.filter((p) => p.includes('schema') || p.includes('migration') || p.includes('db')).length || 1,
    });
    edges.push({ from: 'services', to: 'database', label: 'queries' });
  }

  // Generate Sketch SVG markup matching GitDoc blueprint design
  const svgMarkup = generateSketchSvg(nodes, edges, metadata);

  return {
    nodes,
    edges,
    svgContent: svgMarkup,
  };
}

function generateSketchSvg(nodes: ArchitectureNode[], edges: ArchitectureEdge[], metadata: RepoMetadata): string {
  const width = 360;
  const height = 120;

  // Render SVG nodes in horizontal pipeline layout
  const nodePositions: Record<string, { x: number; y: number }> = {
    entry: { x: 25, y: 40 },
    ui: { x: 95, y: 40 },
    api: { x: 165, y: 20 },
    services: { x: 165, y: 65 },
    database: { x: 255, y: 65 },
    config: { x: 255, y: 20 },
  };

  let svgElements = '';

  // Render Connections (Lines)
  edges.forEach((edge) => {
    const fromPos = nodePositions[edge.from] || { x: 50, y: 50 };
    const toPos = nodePositions[edge.to] || { x: 150, y: 50 };
    svgElements += `<line x1="${fromPos.x + 45}" y1="${fromPos.y + 15}" x2="${toPos.x}" y2="${toPos.y + 15}" stroke="#000" stroke-width="1.5" stroke-dasharray="3,3" />`;
  });

  // Render Nodes (Sketch Boxes)
  nodes.forEach((node) => {
    const pos = nodePositions[node.id] || { x: 100, y: 50 };
    const bg = node.type === 'entry' ? '#f3f4f6' : '#ffffff';
    svgElements += `
      <g transform="translate(${pos.x}, ${pos.y})">
        <rect x="0" y="0" width="55" height="30" fill="${bg}" stroke="#000" stroke-width="1.5" />
        <text x="27" y="14" font-size="6.5" font-weight="bold" font-family="monospace" text-anchor="middle" fill="#000">${escapeXml(node.label.slice(0, 10))}</text>
        <text x="27" y="24" font-size="5" font-family="sans-serif" text-anchor="middle" fill="#555">${node.filesCount} files</text>
      </g>
    `;
  });

  return `
    <svg viewBox="0 0 ${width} ${height}" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fafafa" rx="4"/>
      <!-- Grid Lines -->
      <line x1="0" y1="60" x2="360" y2="60" stroke="#e5e7eb" stroke-width="1"/>
      <line x1="180" y1="0" x2="180" y2="120" stroke="#e5e7eb" stroke-width="1"/>
      ${svgElements}
    </svg>
  `;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

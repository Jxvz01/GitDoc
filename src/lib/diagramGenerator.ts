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
  const width = 600;
  const height = 370;

  // Node Positions Map - Clean vertical-horizontal hierarchy layout
  const nodePositions: Record<string, { x: number; y: number }> = {
    entry: { x: 235, y: 20 },
    ui: { x: 50, y: 110 },
    api: { x: 420, y: 110 },
    services: { x: 235, y: 200 },
    database: { x: 50, y: 290 },
    config: { x: 420, y: 290 },
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'entry': return '⚡';
      case 'component': return '💻';
      case 'api': return '🔌';
      case 'service':
      case 'util': return '📦';
      case 'database': return '💾';
      case 'config': return '⚙️';
      default: return '⚙️';
    }
  };

  let svgElements = '';

  // Render Connections with directional arrowheads
  edges.forEach((edge) => {
    const fromPos = nodePositions[edge.from];
    const toPos = nodePositions[edge.to];
    if (!fromPos || !toPos) return;

    // Centers of the two boxes
    const fromCenter = { x: fromPos.x + 65, y: fromPos.y + 27.5 };
    const toCenter = { x: toPos.x + 65, y: toPos.y + 27.5 };

    let startX = fromCenter.x;
    let startY = fromCenter.y;
    let endX = toCenter.x;
    let endY = toCenter.y;

    if (toPos.y > fromPos.y + 60) {
      // Below relationship
      startY = fromPos.y + 55;
      endY = toPos.y;
      if (toPos.x > fromPos.x + 100) {
        // diagonal right-down
        startX = fromPos.x + 100;
        endX = toPos.x + 30;
      } else if (toPos.x < fromPos.x - 100) {
        // diagonal left-down
        startX = fromPos.x + 30;
        endX = toPos.x + 100;
      } else {
        // straight down
        startX = fromPos.x + 65;
        endX = toPos.x + 65;
      }
    } else if (toPos.y < fromPos.y - 60) {
      // Above relationship
      startY = fromPos.y;
      endY = toPos.y + 55;
      startX = fromPos.x + 65;
      endX = toPos.x + 65;
    } else {
      // Horizontal relationship
      if (toPos.x > fromPos.x) {
        // Right
        startX = fromPos.x + 130;
        endX = toPos.x;
        startY = fromPos.y + 27.5;
        endY = toPos.y + 27.5;
      } else {
        // Left
        startX = fromPos.x;
        endX = toPos.x + 130;
        startY = fromPos.y + 27.5;
        endY = toPos.y + 27.5;
      }
    }

    svgElements += `<line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="#1f2937" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrow)" />`;
  });

  // Render Nodes (Spacious Sketch Boxes)
  nodes.forEach((node) => {
    const pos = nodePositions[node.id];
    if (!pos) return;
    const bg = node.type === 'entry' ? '#eff6ff' : '#ffffff'; // light blue tint for entrypoint node
    const border = node.type === 'entry' ? '#3b82f6' : '#111827';
    const icon = getIcon(node.type);

    svgElements += `
      <g transform="translate(${pos.x}, ${pos.y})">
        <!-- Outer blueprint sketch shadow -->
        <rect x="2" y="2" width="130" height="55" fill="none" stroke="rgba(0,102,204,0.1)" stroke-width="1" rx="4" />
        <!-- Main box -->
        <rect x="0" y="0" width="130" height="55" fill="${bg}" stroke="${border}" stroke-width="1.5" rx="4" />
        <!-- Node Label -->
        <text x="8" y="22" font-size="8.5" font-weight="bold" font-family="monospace" fill="#111827">${icon} ${escapeXml(node.label)}</text>
        <!-- Node files sub-label -->
        <text x="8" y="38" font-size="7" font-family="monospace" fill="#4b5563">${node.filesCount} source files</text>
      </g>
    `;
  });

  return `
    <svg viewBox="0 0 ${width} ${height}" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1f2937" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#fafafa" rx="4"/>
      <!-- Grid Lines -->
      <line x1="0" y1="185" x2="600" y2="185" stroke="#e5e7eb" stroke-width="1"/>
      <line x1="300" y1="0" x2="300" y2="370" stroke="#e5e7eb" stroke-width="1"/>
      <!-- Repository Title Label -->
      <text x="12" y="20" font-size="6.5" font-family="monospace" fill="#9ca3af" font-weight="bold">${escapeXml(metadata.fullName.toUpperCase())}</text>
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

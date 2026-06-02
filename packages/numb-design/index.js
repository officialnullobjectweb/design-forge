const fs = require('fs');
const path = require('path');
const catalog = require('./resources/catalog.json');

const RESOURCE_MAP = {
  'Tailwind CSS':       { name: 'Tailwind CSS',       description: 'Utility-first CSS framework', install: '', category: 'core' },
  'shadcn/ui':          { name: 'shadcn/ui',          description: 'Copy-paste React components', install: 'npx shadcn@latest init -d --force', category: 'ui' },
  'Lucide Icons':       { name: 'Lucide Icons',       description: 'Beautiful icon library', install: 'npm install lucide-react', category: 'icons' },
  'Framer Motion':      { name: 'Framer Motion',      description: 'Production-ready motion library', install: 'npm install motion', category: 'animation' },
  'Aceternity UI':      { name: 'Aceternity UI',      description: 'Trending animated React components', install: 'npx create-aceternity-ui', category: 'ui' },
  'Recharts':           { name: 'Recharts',           description: 'React charting library', install: 'npm install recharts', category: 'charts' },
  'React Hook Form':    { name: 'React Hook Form',    description: 'Performant form library', install: 'npm install react-hook-form @hookform/resolvers', category: 'forms' },
  'Zod':                { name: 'Zod',                description: 'TypeScript schema validation', install: 'npm install zod', category: 'forms' },
  'NextAuth':           { name: 'NextAuth',           description: 'Authentication for Next.js', install: 'npm install next-auth@beta', category: 'auth' },
  'Stripe':             { name: 'Stripe',             description: 'Payment processing', install: 'npm install stripe @stripe/stripe-js', category: 'payment' },
  'React Email':        { name: 'React Email',        description: 'Email components for React', install: 'npm install @react-email/components react-email', category: 'email' },
  'Three.js':           { name: 'Three.js',           description: '3D graphics library', install: 'npm install three', category: '3d' },
  'React Three Fiber':  { name: 'React Three Fiber',  description: 'React renderer for Three.js', install: 'npm install @react-three/fiber @react-three/drei', category: '3d' },
  'AutoAnimate':        { name: 'AutoAnimate',        description: 'Zero-config layout animations', install: 'npm install @formkit/auto-animate', category: 'animation' },
  'Tabler Icons':       { name: 'Tabler Icons',       description: '4980+ free SVG icons', install: 'npm install @tabler/icons-react', category: 'icons' },
  'tsParticles':        { name: 'tsParticles',        description: 'Particle effects for React', install: 'npm install @tsparticles/react', category: 'particles' },
  'MagicUI':            { name: 'MagicUI',            description: '50+ animated React components', install: 'npm install magicui', category: 'ui' },
  'Radix Colors':       { name: 'Radix Colors',       description: 'Accessible color system with dark mode', install: 'npm install @radix-ui/colors', category: 'colors' },
  'clsx+tailwind-merge': { name: 'clsx+tailwind-merge', description: 'Utility helpers for class names', install: 'npm install clsx tailwind-merge class-variance-authority', category: 'utils' },
  'unDraw':             { name: 'unDraw',             description: 'Open-source illustrations', install: '', category: 'images' },
  'Fontsource':         { name: 'Fontsource',         description: 'Self-hosted open-source fonts', install: 'npm install @fontsource/inter', category: 'fonts' },
  'Glassmorphism CSS':  { name: 'Glassmorphism CSS',  description: 'Glassmorphism backdrop utilities', install: '', category: 'css' },
};

function generatePlan(type, styles, features) {
  const plan = [];
  const added = new Set();

  function add(key) {
    const resource = RESOURCE_MAP[key];
    if (resource && !added.has(key)) {
      added.add(key);
      plan.push({ ...resource, type: 'install' });
    }
  }

  add('Tailwind CSS');
  add('shadcn/ui');
  add('Lucide Icons');
  add('clsx+tailwind-merge');

  styles.forEach(style => {
    switch (style) {
      case 'glassmorphic': add('Glassmorphism CSS'); break;
      case 'dark': add('Radix Colors'); break;
      case 'playful': add('MagicUI'); add('tsParticles'); break;
    }
  });

  features.forEach(feature => {
    switch (feature) {
      case 'animations': add('Framer Motion'); add('AutoAnimate'); break;
      case '3d': add('Three.js'); add('React Three Fiber'); break;
      case 'charts': add('Recharts'); break;
      case 'forms': add('React Hook Form'); add('Zod'); break;
      case 'auth': add('NextAuth'); break;
      case 'icons': add('Lucide Icons'); add('Tabler Icons'); break;
      case 'illustrations': add('unDraw'); break;
      case 'fonts': add('Fontsource'); break;
      case 'particles': add('tsParticles'); break;
      case 'email': add('React Email'); break;
      case 'payment': add('Stripe'); break;
    }
  });

  switch (type) {
    case 'landing-page':
    case 'portfolio':
      add('Framer Motion');
      add('Aceternity UI');
      break;
    case 'dashboard':
    case 'saas':
    case 'web-app':
      add('Recharts');
      break;
    case 'ecommerce':
      add('React Hook Form');
      add('Zod');
      add('Stripe');
      break;
    case 'mobile-app':
      add('Radix Colors');
      break;
  }

  return plan;
}

function analyzeProject(dir) {
  const recommendations = [];
  const files = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(e => {
      if (e.isFile()) files.push(e.name);
      else if (e.isDirectory() && e.name !== 'node_modules' && e.name !== '.git') {
        try {
          const sub = fs.readdirSync(path.join(dir, e.name));
          sub.forEach(f => files.push(`${e.name}/${f}`));
        } catch (_) {}
      }
    });
  } catch (_) {
    return [];
  }

  const allFiles = files.join(' ');

  if (!/tailwind|\.css/.test(allFiles)) {
    recommendations.push({ name: 'Tailwind CSS', reason: 'No CSS framework detected', install: 'npm install -D tailwindcss @tailwindcss/postcss' });
  }
  if (!/react|next|vue/.test(allFiles)) {
    recommendations.push({ name: 'React', reason: 'No UI framework detected', install: 'npm install react react-dom' });
  }
  if (/\b(package\.json|tsconfig\.json)\b/.test(allFiles) && !/lucide|phosphor|heroicons/.test(allFiles)) {
    recommendations.push({ name: 'Lucide Icons', reason: 'No icon library detected', install: 'npm install lucide-react' });
  }
  if (!/\.test\.|\.spec\.|vitest|jest/.test(allFiles)) {
    recommendations.push({ name: 'Testing (Vitest)', reason: 'No test framework detected', install: 'npm install -D vitest @testing-library/react' });
  }

  return recommendations;
}

function applyConsistency(dir) {
  const src = path.join(__dirname, 'consistency', 'design-tokens.css');
  const consistencyDir = path.join(dir, 'consistency');
  const dest = path.join(consistencyDir, 'design-tokens.css');

  try {
    if (!fs.existsSync(src)) return { success: false, error: 'design-tokens.css not found in package' };
    if (!fs.existsSync(consistencyDir)) fs.mkdirSync(consistencyDir, { recursive: true });
    fs.copyFileSync(src, dest);
    return { success: true, path: dest };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

const { PreviewGenerator } = require('./src/preview/generator');
const { runWizard } = require('./src/wizard/index');
const { BlueprintGenerator } = require('./src/blueprint/generator');
const { ProjectGenerator } = require('./src/generator/project');
const { DESIGN_STYLES } = require('./src/data/design-styles');
const { MOTION_STYLES } = require('./src/data/motion');
const { SHAPE_STYLES } = require('./src/data/shapes');
const { TONE_STYLES } = require('./src/data/tone');
const { TYPOGRAPHY_PAIRINGS } = require('./src/data/typography-pairings');
const { DEPTH_STYLES } = require('./src/data/depth');
const { COLOR_PRESETS } = require('./src/data/colors');
const { PROJECT_TYPES } = require('./src/data/project-types');
const { FEATURES, FEATURE_GROUPS } = require('./src/data/features');
const { SECTIONS, SECTION_CATEGORIES } = require('./src/data/sections');
const constitution = require('./src/constitution');
const ucu = require('./src/ucu');

module.exports = {
  generatePlan,
  analyzeProject,
  applyConsistency,
  PreviewGenerator,
  runWizard,
  BlueprintGenerator,
  ProjectGenerator,
  constitution,
  ucu,
  resources: catalog,
  data: {
    DESIGN_STYLES,
    MOTION_STYLES,
    SHAPE_STYLES,
    TONE_STYLES,
    TYPOGRAPHY_PAIRINGS,
    DEPTH_STYLES,
    COLOR_PRESETS,
    PROJECT_TYPES,
    FEATURES,
    FEATURE_GROUPS,
    SECTIONS,
    SECTION_CATEGORIES,
  },
};

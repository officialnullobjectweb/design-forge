#!/usr/bin/env node
const pc = require('picocolors');
const fs = require('fs');
const path = require('path');
const catalog = require('../resources/catalog.json');

const RESOURCE_MAP = {
  'tailwind-css':       { name: 'Tailwind CSS',       install: 'npm install -D tailwindcss @tailwindcss/postcss', category: 'core' },
  'shadcn-ui':          { name: 'shadcn/ui',          install: 'npx shadcn@latest init -d --force', category: 'ui' },
  'lucide':             { name: 'Lucide Icons',       install: 'npm install lucide-react', category: 'icons' },
  'framer-motion':      { name: 'Framer Motion',      install: 'npm install motion', category: 'animation' },
  'recharts':           { name: 'Recharts',           install: 'npm install recharts', category: 'charts' },
  'react-hook-form':    { name: 'React Hook Form',    install: 'npm install react-hook-form @hookform/resolvers', category: 'forms' },
  'zod':                { name: 'Zod',                install: 'npm install zod', category: 'forms' },
  'next-auth':          { name: 'NextAuth',           install: 'npm install next-auth@beta', category: 'auth' },
  'stripe':             { name: 'Stripe',             install: 'npm install stripe @stripe/stripe-js', category: 'payment' },
  'react-email':        { name: 'React Email',        install: 'npm install @react-email/components react-email', category: 'email' },
  'three':              { name: 'Three.js',           install: 'npm install three', category: '3d' },
  'r3f':                { name: 'React Three Fiber',  install: 'npm install @react-three/fiber @react-three/drei', category: '3d' },
  'tabler-icons':       { name: 'Tabler Icons',       install: 'npm install @tabler/icons-react', category: 'icons' },
  'magicui':            { name: 'MagicUI',            install: 'npm install magicui', category: 'ui' },
  'clsx':               { name: 'clsx+tailwind-merge', install: 'npm install clsx tailwind-merge class-variance-authority', category: 'utils' },
};

const args = process.argv.slice(2);
const command = args[0];

function showHelp() {
  console.log();
  console.log(`  ${pc.inverse(' Numb.Design ')} ${pc.dim('— AI-powered frontend toolkit')}`);
  console.log();
  console.log(`  ${pc.bold('Usage:')}`);
  console.log(`    ${pc.cyan('npx numb-design init')}              ${pc.dim('Interactive project wizard')}`);
  console.log(`    ${pc.cyan('npx numb-design add <pkg...>')}      ${pc.dim('Quick-install resources')}`);
  console.log(`    ${pc.cyan('npx numb-design search <query>')}    ${pc.dim('Search resource catalog')}`);
  console.log(`    ${pc.cyan('npx numb-design list')}              ${pc.dim('Show all resources')}`);
  console.log(`    ${pc.cyan('npx numb-design skills')}            ${pc.dim('Install AI agent skills')}`);
  console.log(`    ${pc.cyan('npx numb-design template <name>')}   ${pc.dim('Scaffold a template')}`);
  console.log(`    ${pc.cyan('npx numb-design --version')}         ${pc.dim('Show version')}`);
  console.log(`    ${pc.cyan('npx numb-design --help')}            ${pc.dim('Show this help')}`);
  console.log();
  console.log(`  ${pc.bold('Examples:')}`);
  console.log(`    ${pc.dim('$')} ${pc.green('npx numb-design init')}`);
  console.log(`    ${pc.dim('$')} ${pc.green('npx numb-design add shadcn-ui framer-motion')}`);
  console.log(`    ${pc.dim('$')} ${pc.green('npx numb-design search icons')}`);
  console.log(`    ${pc.dim('$')} ${pc.green('npx numb-design skills')}`);
  console.log();
}

async function main() {
  if (!command || command === '--help' || command === '-h') {
    showHelp();
    process.exit(0);
  }

  if (command === '--version' || command === '-v') {
    const pkg = require(path.join(__dirname, '..', 'package.json'));
    console.log(pkg.version);
    process.exit(0);
  }

  if (command === 'init') {
    const { intro, text, select, multiselect, confirm, outro, cancel } = await import('@clack/prompts');

    intro(pc.inverse(' Numb.Design Wizard '));

    const projectType = await select({
      message: 'What type of project?',
      options: [
        { value: 'landing-page', label: 'Landing Page' },
        { value: 'dashboard', label: 'Dashboard / Admin' },
        { value: 'ecommerce', label: 'E-Commerce' },
        { value: 'portfolio', label: 'Portfolio' },
        { value: 'blog', label: 'Blog' },
        { value: 'saas', label: 'SaaS App' },
        { value: 'web-app', label: 'Web App' },
      ],
    }) || 'landing-page';

    const styles = await multiselect({
      message: 'Preferred design style?',
      options: [
        { value: 'modern', label: 'Modern' },
        { value: 'minimal', label: 'Minimal' },
        { value: 'dark', label: 'Dark Mode' },
        { value: 'glassmorphic', label: 'Glassmorphic' },
        { value: 'playful', label: 'Playful' },
      ],
    }) || ['modern'];

    const features = await multiselect({
      message: 'What features do you need?',
      options: [
        { value: 'animations', label: 'Animations' },
        { value: 'forms', label: 'Forms' },
        { value: 'auth', label: 'Authentication' },
        { value: 'icons', label: 'Icons' },
        { value: 'charts', label: 'Charts' },
        { value: '3d', label: '3D Graphics' },
        { value: 'email', label: 'Email' },
        { value: 'payment', label: 'Payments' },
      ],
    }) || [];

    const showPlan = await confirm({ message: 'Show install plan?', initialValue: true });
    if (!showPlan) {
      cancel('Run again when ready.');
      process.exit(0);
    }

    const installs = [];
    installs.push('npm install -D tailwindcss @tailwindcss/postcss');
    installs.push('npx shadcn@latest init -d --force');
    installs.push('npm install lucide-react');
    installs.push('npm install clsx tailwind-merge class-variance-authority');

    if (styles.includes('dark') && features.includes('icons')) {
      installs.push('npm install @radix-ui/colors');
    }
    if (features.includes('animations')) {
      installs.push('npm install motion');
    }
    if (features.includes('forms')) {
      installs.push('npm install react-hook-form @hookform/resolvers zod');
    }
    if (features.includes('auth')) {
      installs.push('npm install next-auth@beta');
    }
    if (features.includes('charts')) {
      installs.push('npm install recharts');
    }
    if (features.includes('3d')) {
      installs.push('npm install three @react-three/fiber @react-three/drei');
    }
    if (features.includes('email')) {
      installs.push('npm install @react-email/components react-email');
    }
    if (features.includes('payment')) {
      installs.push('npm install stripe @stripe/stripe-js');
    }

    console.log();
    console.log(`  ${pc.bold('Install Plan')} ${pc.dim(`(${installs.length} packages)`)}`);
    console.log();
    installs.forEach((cmd) => console.log(`    ${pc.cyan(cmd)}`));
    console.log();
    console.log(`  ${pc.dim('Project:')}  ${projectType}`);
    console.log(`  ${pc.dim('Style:')}    ${styles.join(', ')}`);
    console.log(`  ${pc.dim('Features:')} ${features.join(', ') || 'none'}`);
    console.log();

    outro(pc.green('Run each command above to set up your project.'));
    process.exit(0);
  }

  if (command === 'add') {
    const toInstall = args.slice(1);
    if (toInstall.length === 0) {
      console.log(`  ${pc.red('✗')} Usage: npx numb-design add <resource...>`);
      console.log(`  ${pc.dim('Example:')} ${pc.cyan('npx numb-design add shadcn-ui framer-motion')}`);
      process.exit(1);
    }

    console.log();
    toInstall.forEach((pkg) => {
      const resource = RESOURCE_MAP[pkg];
      if (resource) {
        console.log(`  ${pc.green('→')} ${pc.bold(resource.name)}`);
        console.log(`    ${pc.cyan(resource.install)}`);
      } else {
        console.log(`  ${pc.yellow('?')} ${pc.dim(pkg)} — not in catalog. Try ${pc.cyan('npx numb-design search ' + pkg)}`);
      }
    });
    console.log();
    process.exit(0);
  }

  if (command === 'search') {
    const query = (args.slice(1).join(' ') || '').toLowerCase();
    if (!query) {
      console.log(`  ${pc.red('✗')} Usage: npx numb-design search <query>`);
      process.exit(1);
    }

    const results = [];
    for (const [cat, items] of Object.entries(catalog)) {
      for (const item of items) {
        if (item.name?.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query)) {
          results.push({ ...item, category: cat });
        }
      }
    }

    console.log();
    console.log(`  ${pc.inverse(' Search Results ')} ${pc.dim(`"${query}" — ${results.length} matches`)}`);
    console.log();
    if (results.length === 0) {
      console.log(`  ${pc.dim('No results found.')}`);
    } else {
      results.slice(0, 20).forEach((r) => {
        console.log(`  ${pc.green('•')} ${pc.bold(r.name)} ${pc.dim('— ' + (r.description || '').slice(0, 60))}`);
      });
      if (results.length > 20) {
        console.log(`  ${pc.dim(`...and ${results.length - 20} more`)}`);
      }
    }
    console.log();
    process.exit(0);
  }

  if (command === 'list' || command === 'packages') {
    const total = Object.values(catalog).flat().length;
    console.log(`\n  ${pc.inverse(' Numb.Design Catalog ')} ${pc.dim(`— ${total} resources`)}\n`);
    for (const [cat, items] of Object.entries(catalog)) {
      console.log(`  ${pc.cyan(pc.bold(cat))} (${items.length})`);
      items.forEach(item => {
        console.log(`    ${pc.dim('•')} ${pc.white(item.name)} ${pc.dim('— ' + (item.description || '').slice(0, 60))}`);
      });
      console.log();
    }
    process.exit(0);
  }

  if (command === 'skills') {
    const targetDir = args[1] ? path.resolve(args[1]) : process.cwd();
    const skillsDir = path.join(__dirname, '..', 'agent-skills');
    if (!fs.existsSync(skillsDir)) {
      console.log(`  ${pc.red('✗')} agent-skills directory not found`);
      process.exit(1);
    }
    const categories = fs.readdirSync(skillsDir);
    let count = 0;
    categories.forEach(cat => {
      const src = path.join(skillsDir, cat, 'SKILL.md');
      if (!fs.existsSync(src)) return;
      const dest = path.join(targetDir, '.claude', 'skills', cat, 'SKILL.md');
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
      count++;
    });
    console.log(`  ${pc.green('✓')} Installed ${count} AI agent skills to ${targetDir}/.claude/skills/`);
    process.exit(0);
  }

  if (command === 'template') {
    const templateName = args[1];
    if (!templateName) {
      console.log(`  ${pc.red('✗')} Usage: npx numb-design template <name>`);
      console.log(`  ${pc.dim('Available:')} landing-page, dashboard, blog, portfolio`);
      process.exit(1);
    }
    console.log(`  ${pc.yellow('!')} Templates coming soon.`);
    console.log(`  ${pc.dim('For now, visit https://numb.design/templates to browse.')}`);
    process.exit(0);
  }

  console.log(`  ${pc.red('✗')} Unknown command: ${command}`);
  showHelp();
  process.exit(1);
}

main().catch(err => {
  console.error(`\n  ${pc.red('✗')} ${err.message}\n`);
  process.exit(1);
});

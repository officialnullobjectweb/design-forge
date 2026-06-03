#!/usr/bin/env node
const pc = require('picocolors');
const fs = require('fs');
const path = require('path');
const catalog = require('../resources/catalog.json');
const skillManager = require('../skills/skill-manager');

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
    console.log(`    ${pc.cyan('npx numb-design skills list')}       ${pc.dim('List curated AI agent skills')}`);
    console.log(`    ${pc.cyan('npx numb-design skills init')}       ${pc.dim('Install default skills for project')}`);
    console.log(`    ${pc.cyan('npx numb-design skills verify')}     ${pc.dim('Check skill installation status')}`);
    console.log(`    ${pc.cyan('npx numb-design template <name>')}   ${pc.dim('Scaffold a template')}`);
    console.log(`    ${pc.cyan('npx numb-design --version')}         ${pc.dim('Show version')}`);
    console.log(`    ${pc.cyan('npx numb-design --help')}            ${pc.dim('Show this help')}`);
    console.log();
    console.log(`  ${pc.bold('Examples:')}`);
    console.log(`    ${pc.dim('$')} ${pc.green('npx numb-design init')}`);
    console.log(`    ${pc.dim('$')} ${pc.green('npx numb-design add shadcn-ui framer-motion')}`);
    console.log(`    ${pc.dim('$')} ${pc.green('npx numb-design search icons')}`);
    console.log(`    ${pc.dim('$')} ${pc.green('npx numb-design skills init')}`);
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
    const sub = args[1];
    if (!sub || sub === '--help' || sub === '-h') {
      console.log();
      console.log(`  ${pc.inverse(' Numb.Design Skills ')} ${pc.dim('— Curated AI agent skills')}`);
      console.log();
      console.log(`  ${pc.bold('Usage:')}`);
      console.log(`    ${pc.cyan('numb skills list')}              ${pc.dim('List all curated skills')}`);
      console.log(`    ${pc.cyan('numb skills search <query>')}    ${pc.dim('Search curated skill registry')}`);
      console.log(`    ${pc.cyan('numb skills install <ids...>')}  ${pc.dim('Install skill(s) by ID')}`);
      console.log(`    ${pc.cyan('numb skills init')}              ${pc.dim('Install default skills for project type')}`);
      console.log(`    ${pc.cyan('numb skills verify')}            ${pc.dim('Check skill installation status')}`);
      console.log();
      console.log(`  ${pc.bold('Examples:')}`);
      console.log(`    ${pc.dim('$')} ${pc.green('numb skills list')}`);
      console.log(`    ${pc.dim('$')} ${pc.green('numb skills search animation')}`);
      console.log(`    ${pc.dim('$')} ${pc.green('numb skills install ui-ux-pro-max epic-design')}`);
      console.log(`    ${pc.dim('$')} ${pc.green('numb skills init')}`);
      console.log(`    ${pc.dim('$')} ${pc.green('numb skills verify')}`);
      console.log();
      process.exit(0);
    }

    if (sub === 'list') {
      const skills = skillManager.getRegistry().skills;
      console.log();
      console.log(`  ${pc.inverse(' Curated Skills ')} ${pc.dim(`— ${skills.length} total`)}`);
      console.log();
      for (const skill of skills) {
        const badge = skill.bundled ? pc.dim('(bundled)') : pc.cyan('(curated)');
        const starStr = skill.quality.stars ? `${pc.yellow('★')} ${skill.quality.stars}` : '';
        console.log(`  ${pc.bold(skill.id)} ${badge} ${starStr}`);
        console.log(`  ${pc.dim(skill.description.slice(0, 100))}`);
        console.log(`  ${pc.dim('→')} types: ${skill.projectTypes.join(', ')}`);
        console.log();
      }
      process.exit(0);
    }

    if (sub === 'search') {
      const query = (args.slice(2).join(' ') || '').toLowerCase();
      if (!query) {
        console.log(`  ${pc.red('✗')} Usage: numb skills search <query>`);
        process.exit(1);
      }
      const results = skillManager.searchSkills(query);
      console.log();
      console.log(`  ${pc.inverse(' Skill Search ')} ${pc.dim(`"${query}" — ${results.length} matches`)}`);
      console.log();
      if (results.length === 0) {
        console.log(`  ${pc.dim('No skills match your query.')}`);
      } else {
        for (const skill of results) {
          const badge = skill.bundled ? pc.dim('(bundled)') : pc.cyan('(curated)');
          const starStr = skill.quality.stars ? `${pc.yellow('★')} ${skill.quality.stars}` : '';
          console.log(`  ${pc.green('•')} ${pc.bold(skill.id)} ${badge} ${starStr}`);
          console.log(`    ${pc.dim(skill.description.slice(0, 100))}`);
          console.log(`    ${pc.dim('→')} ${skill.type} · ${skill.projectTypes.join(', ')}`);
        }
      }
      console.log();
      process.exit(0);
    }

    if (sub === 'install') {
      const skillIds = args.slice(2);
      if (skillIds.length === 0) {
        console.log(`  ${pc.red('✗')} Usage: numb skills install <id...>`);
        console.log(`  ${pc.dim('Example:')} ${pc.cyan('numb skills install ui-ux-pro-max epic-design')}`);
        console.log(`  ${pc.dim('Run')} ${pc.cyan('numb skills list')} ${pc.dim('to see all available skills.')}`);
        process.exit(1);
      }

      const targetDir = process.cwd();

      const unknown = skillIds.filter(id => !skillManager.getSkillById(id));
      if (unknown.length > 0) {
        console.log(`  ${pc.red('✗')} Unknown skill(s): ${unknown.join(', ')}`);
        console.log(`  ${pc.dim('Run')} ${pc.cyan('numb skills list')} ${pc.dim('to see all available skills.')}`);
        process.exit(1);
      }

      console.log();
      console.log(`  ${pc.inverse(' Installing Skills ')}`);
      console.log();

      const results = await skillManager.installSkills(skillIds, 'custom', targetDir);

      for (const s of results.installed) {
        console.log(`  ${pc.green('✓')} ${pc.bold(skillManager.getSkillById(s.id).name)} ${pc.dim(s.path)}`);
      }
      for (const s of results.skipped) {
        console.log(`  ${pc.yellow('○')} ${pc.bold(skillManager.getSkillById(s.id).name)} ${pc.dim('— already installed')}`);
      }
      for (const s of results.failed) {
        console.log(`  ${pc.red('✗')} ${s.id} ${pc.dim('— ' + s.error)}`);
      }

      if (results.config) {
        console.log();
        console.log(`  ${pc.green('✓')} Generated enforcement config: ${pc.dim(results.config.path)}`);
      }

      console.log();
      const total = results.installed.length + results.skipped.length;
      console.log(`  ${pc.green(`Skills ready: ${results.installed.length} installed, ${results.skipped.length} already present`)}`);
      console.log();
      process.exit(0);
    }

    if (sub === 'init') {
      const { intro, select, multiselect, confirm, outro, cancel, spinner, text } = await import('@clack/prompts');

      intro(pc.inverse(' Numb.Design Skills Init '));

      const projectType = await select({
        message: 'What type of project are you building?',
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

      const defaultSkills = skillManager.getDefaultSkills(projectType);

      console.log();
      console.log(`  ${pc.bold('Recommended skills for ' + projectType + ':')}`);
      console.log();
      for (const s of defaultSkills) {
        const badge = s.bundled ? pc.dim('(bundled)') : pc.cyan('(curated)');
        console.log(`  ${pc.green('•')} ${pc.bold(s.id)} ${badge}`);
        console.log(`    ${pc.dim(s.description.slice(0, 90))}`);
      }
      console.log();

      const proceed = await confirm({ message: 'Install these skills?', initialValue: true });
      if (!proceed) {
        const customIds = await text({
          message: 'Enter skill IDs to install (comma-separated):',
          placeholder: 'ui-ux-pro-max, epic-design, a11y-audit',
          validate: (val) => val ? undefined : 'Enter at least one skill ID',
        });
        if (!customIds) {
          cancel('No skills installed.');
          process.exit(0);
        }
        const ids = customIds.split(',').map(s => s.trim()).filter(Boolean);
        const s = spinner();
        s.start('Installing skills...');
        const results = await skillManager.installSkills(ids, projectType, process.cwd());
        s.stop('Done');

        for (const r of results.installed) console.log(`  ${pc.green('✓')} ${r.id}`);
        for (const r of results.failed) console.log(`  ${pc.red('✗')} ${r.id}: ${r.error}`);
        if (results.config) console.log(`  ${pc.green('✓')} Enforcement config generated`);
        outro(pc.green(`Skills installed: ${results.installed.length}`));
        process.exit(0);
      }

      const s = spinner();
      s.start('Installing default skills...');
      const skillIds = defaultSkills.map(s => s.id);
      const results = await skillManager.installSkills(skillIds, projectType, process.cwd());
      s.stop('Done');

      console.log();
      for (const r of results.installed) {
        console.log(`  ${pc.green('✓')} ${pc.bold(r.id)} ${pc.dim('installed')}`);
      }
      for (const r of results.skipped) {
        console.log(`  ${pc.yellow('○')} ${pc.bold(r.id)} ${pc.dim('already present')}`);
      }
      if (results.config) {
        console.log(`  ${pc.green('✓')} Enforcement config written to ${pc.dim(results.config.path)}`);
      }
      console.log();

      outro(pc.green(`Skills ready: ${results.installed.length} installed, ${results.skipped.length} already present`));
      process.exit(0);
    }

    if (sub === 'verify') {
      const targetDir = process.cwd();
      const checks = skillManager.verifyInstallation(targetDir);

      console.log();
      console.log(`  ${pc.inverse(' Skill Verification ')} ${pc.dim(`— ${targetDir}`)}`);
      console.log();

      const presentCount = checks.present.length;
      const missingCount = checks.missing.length;

      console.log(`  ${pc.bold('Installed:')} ${presentCount} skills`);
      if (checks.present.length > 0) {
        console.log(`  ${checks.present.map(id => `  ${pc.green('✓')} ${id}`).join('\n')}`);
      }
      console.log();

      if (checks.missing.length > 0) {
        console.log(`  ${pc.bold('Missing:')} ${missingCount} skills`);
        console.log(`  ${checks.missing.map(id => `  ${pc.yellow('○')} ${id}`).join('\n')}`);
        console.log();
      }

      if (checks.rules) {
        console.log(`  ${pc.green('✓')} Enforcement rules ${pc.dim('.claude/rules/numb-design-enforcement.mdc')}`);
      } else {
        console.log(`  ${pc.yellow('○')} Enforcement rules not found. Run ${pc.cyan('numb skills install <ids>')} first.`);
      }
      console.log();
      process.exit(0);
    }

    console.log(`  ${pc.red('✗')} Unknown skills subcommand: ${sub}`);
    process.exit(1);
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

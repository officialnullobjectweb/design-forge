#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const catalog = require('../resources/catalog.json');
const { generatePlan, applyConsistency, analyzeProject } = require('../index');

const R = '\x1b[0m';
const B = '\x1b[1m';
const D = '\x1b[2m';
const I = '\x1b[3m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const MAGENTA = '\x1b[35m';
const CYAN = '\x1b[36m';
const WHITE = '\x1b[37m';
const BG_BLUE = '\x1b[44m';
const BG_GREEN = '\x1b[42m';
const BG_MAGENTA = '\x1b[45m';
const BG_CYAN = '\x1b[46m';

function c(text, color) { return `${color}${text}${R}`; }
function bold(text) { return `${B}${text}${R}`; }
function dim(text) { return `${D}${text}${R}`; }

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function askMultiSelect(question, options) {
  console.log(`\n  ${bold(question)}`);
  console.log(`  ${dim('(type numbers separated by commas, or "all")')}\n`);

  options.forEach((opt, i) => {
    const num = String(i + 1).padStart(2);
    console.log(`    ${c(num, CYAN)}  ${opt}`);
  });

  while (true) {
    const answer = await ask(`\n  ${bold('→')} `);
    if (answer.trim().toLowerCase() === 'all') return [...options];
    const nums = answer.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    if (nums.length === 0) {
      console.log(`  ${c('✗ Please enter valid numbers', RED)}`);
      continue;
    }
    const invalid = nums.filter(n => n < 1 || n > options.length);
    if (invalid.length > 0) {
      console.log(`  ${c(`✗ Invalid choices: ${invalid.join(', ')}. Use 1-${options.length}`, RED)}`);
      continue;
    }
    const selected = nums.map(n => options[n - 1]);
    const unique = [...new Set(selected)];
    return unique;
  }
}

async function askSingleSelect(question, options) {
  console.log(`\n  ${bold(question)}\n`);

  options.forEach((opt, i) => {
    const num = String(i + 1).padStart(2);
    console.log(`    ${c(num, CYAN)}  ${opt}`);
  });

  while (true) {
    const answer = await ask(`\n  ${bold('→')} `);
    const num = parseInt(answer.trim());
    if (isNaN(num) || num < 1 || num > options.length) {
      console.log(`  ${c(`✗ Please enter a number 1-${options.length}`, RED)}`);
      continue;
    }
    return options[num - 1];
  }
}

function printBanner() {
  console.clear();
  const line = '═══════════════════════════════════════════════════════════════';
  const pad = '                                             ';
  console.log(`  ${c(`╔${line}╗`, MAGENTA)}`);
  console.log(`  ${c('║', MAGENTA)}  ${c(bold('DESIGN FORGE'), BG_MAGENTA)}${c(' — One-command setup for your design project', WHITE)}${' '.repeat(18)}${c('║', MAGENTA)}`);
  console.log(`  ${c('║', MAGENTA)}  ${dim('Install only what you need from 100+ free design resources.')}${pad.slice(0, 15)}${c('║', MAGENTA)}`);
  console.log(`  ${c(`╚${line}╝`, MAGENTA)}`);
  console.log();
}

function printSection(title) {
  const line = '─'.repeat(title.length + 4);
  console.log(`  ${c(`┌${line}┐`, BLUE)}`);
  console.log(`  ${c('│', BLUE)}  ${bold(title)}  ${c('│', BLUE)}`);
  console.log(`  ${c(`└${line}┘`, BLUE)}`);
}

function printStep(num, total, text, status) {
  const step = `${num}/${total}`;
  let icon, color;
  switch (status) {
    case 'complete': icon = c('●', GREEN); color = dim; break;
    case 'active': icon = c('◉', CYAN); color = bold; break;
    case 'pending': icon = c('○', YELLOW); color = dim; break;
    default: icon = '○'; color = dim;
  }
  const bar = `${c(`[${step}]`, CYAN)} ${icon} ${color(text)}`;
  console.log(`    ${bar}`);
}

async function showSpinner(text, duration = 800) {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const start = Date.now();
  let i = 0;
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      if (elapsed >= duration) {
        clearInterval(interval);
        process.stdout.write(`\r    ${c('●', GREEN)} ${text} ${c('✓', GREEN)}\n`);
        resolve();
        return;
      }
      process.stdout.write(`\r    ${c(frames[i % frames.length], CYAN)} ${dim(text)}`);
      i++;
    }, 60);
  });
}

function buildPlanDisplay(plan) {
  const installs = plan.filter(p => p.type === 'install');
  if (installs.length === 0) return '';

  let output = `\n  ${c('┌─────────────────────────────────────────────────────────────┐', GREEN)}\n`;
  output += `  ${c('│', GREEN)}  ${bold('Your Resource Plan')}${' '.repeat(38)}${c('│', GREEN)}\n`;
  output += `  ${c('├─────────────────────────────────────────────────────────────┤', GREEN)}\n`;

  installs.forEach((item, i) => {
    const num = `${i + 1}.`.padEnd(3);
    const name = bold(item.name);
    const size = item.size ? ` ${c(`[${item.size}]`, dim(item.size) ? D : '')}` : '';
    output += `  ${c('│', GREEN)}  ${c(num, YELLOW)} ${name}${size}\n`;
    output += `  ${c('│', GREEN)}     ${dim(`→ ${item.description || ''}`)}\n`;
  });

  output += `  ${c('└─────────────────────────────────────────────────────────────┘', GREEN)}\n`;
  return output;
}

function splitCommands(commands) {
  const npmInstalls = commands.filter(c => c.startsWith('npm ') || c.startsWith('npx '));
  const other = commands.filter(c => !c.startsWith('npm ') && !c.startsWith('npx '));
  return { npmInstalls, other };
}

async function executeCommands(plan, targetDir) {
  console.log();
  printSection('Installing Resources');
  console.log();

  const commands = plan
    .filter(p => p.install && p.install.length > 0)
    .map(p => ({ name: p.name, command: p.install }));
  const unique = [...new Map(commands.map(c => [c.name, c])).values()];

  if (unique.length === 0) {
    console.log(`  ${c('◆ No installable resources selected.', YELLOW)}\n`);
    return;
  }

  for (let i = 0; i < unique.length; i++) {
    const item = unique[i];
    printStep(i + 1, unique.length, `Installing ${bold(item.name)}`, 'active');

    try {
      execSync(item.command, {
        cwd: targetDir,
        stdio: 'pipe',
        timeout: 120000
      });
      printStep(i + 1, unique.length, `${c('✓', GREEN)} ${item.name} installed`, 'complete');
    } catch (err) {
      printStep(i + 1, unique.length, `${c('✗', RED)} ${item.name} — ${err.message.slice(0, 60)}`, 'complete');
    }

    if (i < unique.length - 1) {
      await new Promise(r => setTimeout(r, 300));
    }
  }
}

async function applyConsistencyLayer(targetDir) {
  console.log();
  printSection('Applying Design Consistency Layer');
  console.log();

  await showSpinner('Generating design tokens...', 500);

  const result = applyConsistency(targetDir);
  if (result.success) {
    console.log(`  ${c('●', GREEN)} Design tokens written to ${bold(result.path)}\n`);
    console.log(`  ${dim('  Include this in your CSS:')}`);
    console.log(`    ${c('@import "consistency/design-tokens.css";', CYAN)}`);
    console.log(`    ${c('<!-- <link rel="stylesheet" href="consistency/design-tokens.css"> -->', CYAN)}`);
    console.log(`  ${dim('  Add to root:')} ${c('data-df-normalize', YELLOW)}\n`);
  } else {
    console.log(`  ${c(`✗ ${result.error || 'Could not apply consistency layer'}`, RED)}\n`);
  }
}

function printSummary(type, styles, features) {
  console.log();
  printSection('Summary');
  console.log();
  console.log(`  ${bold('Project:')}  ${c(type, CYAN)}`);
  console.log(`  ${bold('Styles:')}   ${styles.map(s => c(s, MAGENTA)).join(', ')}`);
  console.log(`  ${bold('Features:')} ${features.map(f => c(f, GREEN)).join(', ')}`);
  console.log();
}

function printOutro() {
  console.log(`  ${c('╔═══════════════════════════════════════════════════════════════╗', MAGENTA)}`);
  console.log(`  ${c('║', MAGENTA)}  ${c(bold('Ready to build?'), BG_MAGENTA)}${c(' Your design forge is set up!          ', WHITE)}${c('║', MAGENTA)}`);
  console.log(`  ${c('║', MAGENTA)}  ${dim('Run'), bold('df'), dim('anytime to reconfigure. Happy building!    ')}${c('║', MAGENTA)}`);
  console.log(`  ${c('╚═══════════════════════════════════════════════════════════════╝', MAGENTA)}`);
  console.log();
}

async function main() {
  printBanner();

  const type = await askSingleSelect('What are you building?', [
    'landing-page', 'dashboard', 'ecommerce', 'portfolio', 'blog', 'saas', 'mobile-app', 'web-app'
  ]);

  const styles = await askMultiSelect('What style?', [
    'modern', 'minimal', 'playful', 'dark', 'glassmorphic', 'brutalist'
  ]);

  const features = await askMultiSelect('What features?', [
    'animations', '3d', 'charts', 'forms', 'auth', 'icons', 'illustrations', 'fonts',
    'dark-mode', 'particles', 'email', 'payment'
  ]);

  const plan = generatePlan(type, styles, features);

  printSummary(type, styles, features);

  const planDisplay = buildPlanDisplay(plan);
  if (planDisplay) console.log(planDisplay);

  const targetDir = process.cwd();
  console.log(`  ${dim(`Target directory: ${targetDir}`)}`);
  console.log();

  const doApply = await ask(`  ${bold('Apply consistency layer?')} ${dim('(Y/n)')} `);
  if (doApply.trim().toLowerCase() !== 'n') {
    await applyConsistencyLayer(targetDir);
  }

  const installCmds = plan.filter(p => p.install && p.install.length > 0);
  if (installCmds.length > 0) {
    console.log(`  ${bold('Install resources now?')}`);
    console.log(`  ${dim('This will run')} ${installCmds.length} ${dim('package manager command(s) in the current directory')}`);
    const doInstall = await ask(`  ${bold('Run installation?')} ${dim('(Y/n)')} `);
    console.log();
    if (doInstall.trim().toLowerCase() !== 'n') {
      await executeCommands(plan, targetDir);
    } else {
      console.log(`  ${c('◆ Skipped installation. Run commands manually.', YELLOW)}`);
      installCmds.forEach(cmd => {
        console.log(`    ${c('$', GREEN)} ${cmd.install}`);
      });
      console.log();
    }
  }

  printOutro();
  rl.close();
}

main().catch(err => {
  console.error(`\n  ${c(`✗ Error: ${err.message}`, RED)}\n`);
  rl.close();
  process.exit(1);
});

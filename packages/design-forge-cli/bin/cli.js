#!/usr/bin/env node
const pc = require('picocolors')
const { runWizard } = require('../src/wizard')
const { ProjectGenerator } = require('../src/generator/project')
const { PreviewGenerator } = require('../src/preview/generator')
const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const command = args[0]

function showHelp() {
  console.log()
  console.log(`  ${pc.inverse(' DesignForge ')} ${pc.dim('— Build complete frontends from 100+ free resources')}`)
  console.log()
  console.log(`  ${pc.bold('Usage:')}`)
  console.log(`    ${pc.cyan('npx design-forge create')}       ${pc.dim('Interactive project wizard')}`)
  console.log(`    ${pc.cyan('npx design-forge init')}         ${pc.dim('Quick setup with defaults')}`)
  console.log(`    ${pc.cyan('npx design-forge list')}         ${pc.dim('Show all available resources')}`)
  console.log(`    ${pc.cyan('npx design-forge preview')}      ${pc.dim('Open iPhone preview of generated project')}`)
  console.log(`    ${pc.cyan('npx design-forge skills')}       ${pc.dim('Copy AI agent skills to project')}`)
  console.log(`    ${pc.cyan('npx design-forge --version')}    ${pc.dim('Show version')}`)
  console.log(`    ${pc.cyan('npx design-forge --help')}       ${pc.dim('Show this help')}`)
  console.log()
  console.log(`  ${pc.bold('Examples:')}`)
  console.log(`    ${pc.dim('$')} ${pc.green('npx design-forge create')}`)
  console.log(`    ${pc.dim('$')} ${pc.green('cd my-project && npx design-forge init')}`)
  console.log()
}

async function main() {
  if (command === '--help' || command === '-h' || args.includes('--help')) {
    showHelp()
    process.exit(0)
  }

  if (command === '--version' || command === '-v') {
    const pkg = require(path.join(__dirname, '..', 'package.json'))
    console.log(pkg.version)
    process.exit(0)
  }

  if (command === 'create' || command === 'init' || !command) {
    const blueprint = await runWizard()

    // Ask to generate
    const { confirm } = require('@clack/prompts')
    const shouldGenerate = await confirm({
      message: pc.bold('Generate project now?'),
      initialValue: true,
    })
    if (isCancel(shouldGenerate) || !shouldGenerate) {
      const { cancel } = require('@clack/prompts')
      cancel('Blueprint saved. Run `design-forge generate` when ready.')
      process.exit(0)
    }

    const targetDir = process.cwd()
    const generator = new ProjectGenerator(blueprint, targetDir)
    await generator.generate()

    console.log()
    console.log(`  ${pc.green('✓')} ${pc.bold('Project generated successfully!')}`)
    console.log()

    // Generate iPhone preview
    console.log(`  ${pc.dim('→ Generating iPhone preview...')}`)
    const previewPath = PreviewGenerator.generate(blueprint, targetDir)
    PreviewGenerator.openPreview(previewPath)
    console.log(`  ${pc.green('✓')} ${pc.dim('iPhone preview opened in your browser')}`)
    console.log()

    console.log(`  ${pc.dim('Next steps:')}`)
    console.log(`    ${pc.cyan('cd')} ${pc.white(targetDir)}`)
    console.log(`    ${pc.cyan('npm run dev')}      ${pc.dim('Start development server')}`)
    console.log(`    ${pc.cyan('npm run build')}    ${pc.dim('Production build')}`)
    console.log(`    ${pc.cyan('df preview')}       ${pc.dim('Re-open iPhone preview anytime')}`)
    console.log()
    console.log(`  ${pc.dim('Customize:')}`)
    console.log(`    ${pc.dim('Edit')} ${pc.white('site.config.ts')} ${pc.dim('to change content, colors, settings')}`)
    console.log()
    process.exit(0)
  }

  if (command === 'list' || command === 'packages') {
    const catalog = require('../resources/catalog.json')
    console.log(`\n  ${pc.inverse(' DesignForge Catalog ')} ${pc.dim(`— ${Object.values(catalog).flat().length} resources`)}\n`)
    for (const [cat, items] of Object.entries(catalog)) {
      console.log(`  ${pc.cyan(pc.bold(cat))} (${items.length})`)
      items.forEach(item => {
        console.log(`    ${pc.dim('•')} ${pc.white(item.name)} ${pc.dim(`— ${item.description.slice(0, 60)}`)}`)
      })
      console.log()
    }
    process.exit(0)
  }

  if (command === 'preview') {
    const previewDir = path.join(process.cwd(), '.design-forge')
    const previewPath = path.join(previewDir, 'preview.html')
    if (!fs.existsSync(previewPath)) {
      console.log(`  ${pc.red('✗')} No preview found. Run ${pc.cyan('design-forge create')} first.`)
      process.exit(1)
    }
    PreviewGenerator.openPreview(previewPath)
    console.log(`  ${pc.green('✓')} iPhone preview opened`)
    process.exit(0)
  }

  if (command === 'skills') {
    const targetDir = args[1] ? path.resolve(args[1]) : process.cwd()
    const skillsDir = path.join(__dirname, '..', 'agent-skills')
    if (!fs.existsSync(skillsDir)) {
      console.log(`  ${pc.red('✗')} agent-skills directory not found`)
      process.exit(1)
    }
    const categories = fs.readdirSync(skillsDir)
    let count = 0
    categories.forEach(cat => {
      const src = path.join(skillsDir, cat, 'SKILL.md')
      if (!fs.existsSync(src)) return
      const dest = path.join(targetDir, '.claude', 'skills', cat, 'SKILL.md')
      fs.mkdirSync(path.dirname(dest), { recursive: true })
      fs.copyFileSync(src, dest)
      count++
    })
    console.log(`  ${pc.green('✓')} Installed ${count} AI agent skills to ${targetDir}/.claude/skills/`)
    process.exit(0)
  }

  // Unknown command
  console.log(`  ${pc.red('✗')} Unknown command: ${command}`)
  showHelp()
  process.exit(1)
}

function isCancel(val) {
  return typeof val === 'symbol' || val === false
}

main().catch(err => {
  console.error(`\n  ${pc.red('✗ Error:')} ${err.message}\n`)
  console.error(err.stack)
  process.exit(1)
})

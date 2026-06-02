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
  console.log(`  ${pc.inverse(' Numb.Design ')} ${pc.dim('— Token-locked design system + 50+ UCU library')}`)
  console.log()
  console.log(`  ${pc.bold('Usage:')}`)
  console.log(`    ${pc.cyan('npx numb create')}              ${pc.dim('Interactive project wizard')}`)
  console.log(`    ${pc.cyan('npx numb init')}                ${pc.dim('Quick setup with defaults')}`)
  console.log(`    ${pc.cyan('npx numb list')}                ${pc.dim('Show all available resources')}`)
  console.log(`    ${pc.cyan('npx numb preview')}             ${pc.dim('Open iPhone preview of generated project')}`)
  console.log(`    ${pc.cyan('npx numb skills')}              ${pc.dim('Copy AI agent skills to project')}`)
  console.log(`    ${pc.cyan('npx numb constitution')}        ${pc.dim('Print the design token constitution')}`)
  console.log(`    ${pc.cyan('npx numb ucus')}                ${pc.dim('Browse the UCU component library')}`)
  console.log(`    ${pc.cyan('npx numb ucu <id>')}            ${pc.dim("Show one UCU's spec and template")}`)
  console.log(`    ${pc.cyan('npx numb validate <file>')}     ${pc.dim('Validate a UCU spec JSON file')}`)
  console.log(`    ${pc.cyan('npx numb check-classes <str>')} ${pc.dim('Validate a className string against constitution')}`)
  console.log(`    ${pc.cyan('npx numb [list|show|add|validate]')}     ${pc.dim('Token-locked subcommand CLI for projects')}`)
  console.log(`    ${pc.cyan('npx numb --version')}           ${pc.dim('Show version')}`)
  console.log(`    ${pc.cyan('npx numb --help')}              ${pc.dim('Show this help')}`)
  console.log()
  console.log(`  ${pc.bold('Examples:')}`)
  console.log(`    ${pc.dim('$')} ${pc.green('npx create-numb-app my-app && cd my-app && npm install && npm run dev')}`)
  console.log(`    ${pc.dim('$')} ${pc.green('npx numb create')}`)
  console.log(`    ${pc.dim('$')} ${pc.green('cd my-project && npx numb add button')}`)
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
      cancel('Blueprint saved. Run `npx numb create` when ready.')
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
    console.log(`\n  ${pc.inverse(' Numb.Design Catalog ')} ${pc.dim(`— ${Object.values(catalog).flat().length} resources`)}\n`)
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
    const previewDir = path.join(process.cwd(), '.numb-design')
    const previewPath = path.join(previewDir, 'preview.html')
    if (!fs.existsSync(previewPath)) {
      console.log(`  ${pc.red('✗')} No preview found. Run ${pc.cyan('numb create')} first.`)
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

  if (command === 'constitution') {
    const { SUMMARY, CONSTITUTION_VERSION, COLOR_ROLES, SPRING_CONFIGS, SHADOW_TOKENS, RADIUS_TOKENS, SPACING_SCALE_PX, SIZE_TOKENS } = require('../src/constitution')
    console.log()
    console.log(`  ${pc.inverse(' Numb.Design Constitution ')} ${pc.dim(`v${CONSTITUTION_VERSION}`)}`)
    console.log()
    console.log(`  ${pc.bold('Colors (12 roles):')}`)
    Object.entries(COLOR_ROLES).forEach(([role, hex]) => {
      console.log(`    ${pc.cyan(role.padEnd(12))} ${pc.dim(hex)}`)
    })
    console.log()
    console.log(`  ${pc.bold('Typography (3 fluid sizes):')}`)
    Object.values(SIZE_TOKENS).forEach(t => {
      console.log(`    ${pc.cyan(t.name.padEnd(6))} ${pc.dim(t.fontSize)}`)
    })
    console.log()
    console.log(`  ${pc.bold('Spacing (4px scale — 9 values):')}`)
    console.log(`    ${pc.dim(SPACING_SCALE_PX.join('px, ') + 'px')}`)
    console.log()
    console.log(`  ${pc.bold('Radius (5 values):')}`)
    Object.entries(RADIUS_TOKENS).forEach(([name, def]) => {
      console.log(`    ${pc.cyan(name.padEnd(6))} ${pc.dim(def.value + 'px — ' + def.useCase)}`)
    })
    console.log()
    console.log(`  ${pc.bold('Shadow (3 levels):')}`)
    Object.keys(SHADOW_TOKENS).forEach(name => {
      console.log(`    ${pc.cyan('shadow-df-' + name)}`)
    })
    console.log()
    console.log(`  ${pc.bold('Motion (2 spring configs):')}`)
    Object.values(SPRING_CONFIGS).forEach(c => {
      console.log(`    ${pc.cyan(c.name.padEnd(10))} stiffness=${c.stiffness} damping=${c.damping} ${pc.dim('— ' + c.useCase)}`)
    })
    console.log()
    console.log(`  ${pc.bold('Summary:')}`)
    console.log(`    ${SUMMARY.approvedClasses} approved utility classes`)
    console.log(`    min quality score: ${SUMMARY.minQualityScore}`)
    console.log(`    ${SUMMARY.ucuCategories} UCU categories`)
    console.log()
    process.exit(0)
  }

  if (command === 'validate') {
    const filePath = args[1]
    if (!filePath) {
      console.log(`  ${pc.red('✗')} Usage: npx numb validate <ucu-spec.json>`)
      process.exit(1)
    }
    const abs = path.resolve(filePath)
    if (!fs.existsSync(abs)) {
      console.log(`  ${pc.red('✗')} File not found: ${abs}`)
      process.exit(1)
    }
    let spec
    try {
      spec = JSON.parse(fs.readFileSync(abs, 'utf8'))
    } catch (err) {
      console.log(`  ${pc.red('✗')} Invalid JSON: ${err.message}`)
      process.exit(1)
    }
    const { validateSpec, validateUcuOutput, summarize } = require('../src/constitution')
    const specResult = validateSpec(spec)
    let outputResult = { valid: true, violations: [] }
    if (spec.classes || spec.hardcodedValues) {
      outputResult = validateUcuOutput({
        spec,
        classStrings: Array.isArray(spec.classes) ? spec.classes : (spec.classes ? [spec.classes] : []),
        hardcodedValues: spec.hardcodedValues || [],
      })
    }
    const combined = {
      valid: specResult.valid && outputResult.valid,
      violations: [
        ...(specResult.errors || []).map(e => ({ category: 'spec', className: e.field, reason: e.message })),
        ...outputResult.violations,
      ],
    }
    console.log()
    console.log(`  ${pc.inverse(' UCU Validation ')} ${pc.dim(abs)}`)
    console.log()
    console.log(`  ${summarize(combined).split('\n').join('\n  ')}`)
    console.log()
    process.exit(combined.valid ? 0 : 1)
  }

  if (command === 'check-classes') {
    const classString = args.slice(1).join(' ')
    if (!classString) {
      console.log(`  ${pc.red('✗')} Usage: npx numb check-classes "<class1 class2 ...>"`)
      process.exit(1)
    }
    const { validateClassString, summarize } = require('../src/constitution')
    const result = validateClassString(classString)
    console.log()
    console.log(`  ${pc.inverse(' Class Validation ')} ${pc.dim(`(${classString.split(/\s+/).length} classes)`)}`)
    console.log()
    console.log(`  ${summarize(result).split('\n').join('\n  ')}`)
    console.log()
    process.exit(result.valid ? 0 : 1)
  }

  if (command === 'ucus' || command === 'ucu' || command === 'components') {
    const { listByCategory, loadUcu, getTemplate } = require('../src/ucu')

    if (command === 'ucu' || (command === 'ucus' && args[1] && args[1] !== 'list')) {
      const id = args[1]
      try {
        const { spec, templatePath } = loadUcu(id)
        console.log()
        console.log(`  ${pc.inverse(' ' + spec.name + ' ')} ${pc.dim(`${spec.id} — ${spec.category} (quality ${spec.qualityScore})`)}`)
        console.log()
        console.log(`  ${pc.bold('Description:')}`)
        console.log(`    ${spec.description || '—'}`)
        console.log()
        if (spec.tags && spec.tags.length) {
          console.log(`  ${pc.bold('Tags:')} ${spec.tags.map(t => pc.cyan(t)).join(', ')}`)
          console.log()
        }
        if (spec.props && spec.props.length) {
          console.log(`  ${pc.bold('Props:')}`)
          spec.props.forEach(p => {
            const opt = p.required ? pc.red('*') : pc.dim('?')
            console.log(`    ${opt} ${pc.cyan(p.name)}: ${pc.dim(p.type)}${p.default ? '  = ' + pc.yellow(JSON.stringify(p.default)) : ''}`)
          })
          console.log()
        }
        if (spec.classes && spec.classes.length) {
          console.log(`  ${pc.bold('Classes:')}`)
          spec.classes.forEach(c => console.log(`    ${pc.dim('•')} ${c}`))
          console.log()
        }
        console.log(`  ${pc.dim('Template:')} ${templatePath}`)
        console.log(`  ${pc.dim('Source:')}    ${getTemplate(id).length} chars`)
        console.log()
        process.exit(0)
      } catch (err) {
        console.log(`  ${pc.red('✗')} ${err.message}`)
        process.exit(1)
      }
    }

    const grouped = listByCategory()
    const total = Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0)
    console.log()
    console.log(`  ${pc.inverse(' Numb.Design UCU Library ')} ${pc.dim(`— ${total} components`)}`)
    console.log()
    Object.entries(grouped).forEach(([cat, items]) => {
      console.log(`  ${pc.cyan(pc.bold(cat))} ${pc.dim(`(${items.length})`)}`)
      items.forEach(({ id, name, qualityScore }) => {
        const q = qualityScore >= 95 ? pc.green('★') : pc.dim('·')
        console.log(`    ${q} ${pc.white(id.padEnd(16))} ${pc.dim(name)} ${pc.dim(`(${qualityScore})`)}`)
      })
      console.log()
    })
    console.log(`  ${pc.dim('★ quality ≥ 95   · quality 90–94')}`)
    console.log(`  ${pc.dim('Inspect one:')}  ${pc.cyan('npx numb ucu <id>')}`)
    console.log()
    process.exit(0)
  }

  if (command === 'clt') {
    const sub = args[1]
    if (sub === 'list') {
      const { listByCategory } = require('../src/ucu')
      const grouped = listByCategory()
      console.log()
      console.log(`  ${pc.inverse(' CLT UCU Library ')} ${pc.dim('— token-locked components')}`)
      console.log()
      Object.entries(grouped).forEach(([cat, items]) => {
        console.log(`  ${pc.cyan(pc.bold(cat))} ${pc.dim(`(${items.length})`)}`)
        items.forEach(({ id, name }) => console.log(`    ${pc.dim('•')} ${pc.white(id.padEnd(18))} ${pc.dim(name)}`))
        console.log()
      })
      process.exit(0)
    }
    if (sub === 'show' && args[2]) {
      const { loadUcu, getTemplate } = require('../src/ucu')
      try {
        const { spec } = loadUcu(args[2])
        console.log()
        console.log(`  ${pc.inverse(' ' + spec.name + ' ')} ${pc.dim(`${spec.id} — ${spec.category}`)}`)
        console.log(`  ${spec.description || ''}`)
        console.log()
        console.log(`  ${pc.bold('Props:')}`)
        Object.entries(spec.props || {}).forEach(([k, v]) => {
          const opt = v.required ? pc.red('*') : pc.dim('?')
          console.log(`    ${opt} ${pc.cyan(k)}: ${pc.dim(v.type || typeof v)}${v.default !== undefined ? '  = ' + pc.yellow(JSON.stringify(v.default)) : ''}`)
        })
        console.log()
        console.log(`  ${pc.bold('Deps:')} ${(spec.dependencies || []).map(d => pc.cyan(d)).join(', ')}`)
        console.log()
        process.exit(0)
      } catch (err) {
        console.log(`  ${pc.red('✗')} ${err.message}`)
        process.exit(1)
      }
    }
    if (sub === 'add' && args[2]) {
      const { loadUcu, getTemplate } = require('../src/ucu')
      try {
        const { spec } = loadUcu(args[2])
        const out = path.join(process.cwd(), 'src', 'components', 'ui', path.basename(spec.template))
        fs.mkdirSync(path.dirname(out), { recursive: true })
        fs.writeFileSync(out, getTemplate(args[2]), 'utf8')
        console.log()
        console.log(`  ${pc.green('✓')} Added ${pc.bold(args[2])} → ${pc.dim(out)}`)
        console.log()
        console.log(`  ${pc.dim('Imports needed:')} ${(spec.dependencies || []).join(', ')}`)
        console.log()
        process.exit(0)
      } catch (err) {
        console.log(`  ${pc.red('✗')} ${err.message}`)
        process.exit(1)
      }
    }
    if (sub === 'validate') {
      const { validateUcuOutput, summarize } = require('../src/constitution')
      const { loadAll } = require('../src/ucu')
      const all = loadAll()
      let pass = 0, fail = 0
      all.forEach(({ id, spec }) => {
        const result = validateUcuOutput({
          classStrings: spec.classes || [],
          hardcodedValues: spec.hardcodedValues || [],
        })
        if (result.valid) pass++; else fail++
      })
      console.log()
      console.log(`  ${pc.inverse(' CLT Constitution Validation ')} ${pc.dim(`— ${all.length} UCUs`)}`)
      console.log()
      console.log(`  ${pc.green(pass + ' passed')}  ${fail > 0 ? pc.red(fail + ' failed') : pc.dim('0 failed')}`)
      console.log()
      if (fail > 0) process.exit(1)
      process.exit(0)
    }
    if (sub === 'help' || sub === '--help' || sub === '-h') {
      // fall through to help
    } else if (sub) {
      console.log(`  ${pc.red('✗ Unknown subcommand:')} ${sub}`)
    }
    console.log()
    console.log(`  ${pc.inverse(' CLT Commands ')} ${pc.dim('— Token-locked design system')}`)
    console.log()
    console.log(`    ${pc.cyan('npx clt list')}              ${pc.dim('Browse all UCUs')}`)
    console.log(`    ${pc.cyan('npx clt show <id>')}         ${pc.dim("Show a UCU's spec")}`)
    console.log(`    ${pc.cyan('npx clt add <id>')}          ${pc.dim('Add a UCU to ./src/components/ui/')}`)
    console.log(`    ${pc.cyan('npx clt validate')}          ${pc.dim('Validate all UCUs against constitution')}`)
    console.log()
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

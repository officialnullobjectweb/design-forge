const { intro, outro, text, select, multiselect, confirm, spinner, isCancel, cancel } = require('@clack/prompts')
const pc = require('picocolors')
const { PROJECT_TYPES } = require('../data/project-types')
const { DESIGN_STYLES } = require('../data/design-styles')
const { getFeaturesByGroup, getFeatureById, getFeaturePackages } = require('../data/features')
const { getSectionsGroupedByCategory, getSectionById, getSectionPackages } = require('../data/sections')
const { COLOR_PRESETS } = require('../data/colors')
const { BlueprintGenerator } = require('../blueprint/generator')

function cancelHandler() {
  cancel('Setup cancelled. Run `design-forge create` anytime.')
  process.exit(0)
}

function showRelevanceWarning(selectedTypes) {
  const categories = selectedTypes.map(t => t.category)
  const uniqueCats = [...new Set(categories)]
  if (uniqueCats.length > 2) {
    console.log(pc.yellow(`\n  ⚠ You selected types across ${uniqueCats.length} different categories (${uniqueCats.join(', ')}).`))
    console.log(pc.dim(`  For best results, consider narrowing to 1-2 related categories.`))
    console.log(pc.dim(`  You can always add more sections later via site.config.ts.\n`))
  }
}

function getTypeByLabel(label) {
  return PROJECT_TYPES.find(t => t.label === label)
}

async function runWizard() {
  intro(pc.inverse(' DesignForge ') + pc.dim(' — Build your frontend in minutes'))

  // ── Step 1: Project Type ──
  const typeLabels = PROJECT_TYPES.map(t => ({
    value: t.label,
    label: `${t.icon}  ${t.label}`,
    hint: pc.dim(t.description.slice(0, 60)),
  }))
  const selectedLabels = await multiselect({
    message: pc.bold('What are you building?') + pc.dim(' (select 1-2, or more with caution)'),
    options: typeLabels,
    required: true,
  })
  if (isCancel(selectedLabels)) cancelHandler()

  const selectedTypes = selectedLabels.map(l => getTypeByLabel(l))
  showRelevanceWarning(selectedTypes)

  // Merge shared deps from all selected types
  const allTypeDeps = [...new Set(selectedTypes.flatMap(t => t.sharedDeps || []))]

  // Merge all default pages (deduplicated)
  const allDefaultPages = [...new Set(selectedTypes.flatMap(t => t.defaultPages || []))]

  // ── Step 2: Design Style ──
  const styleOptions = DESIGN_STYLES.map(s => ({
    value: s.id,
    label: s.label,
    hint: pc.dim(s.description.slice(0, 65)),
  }))
  const selectedStyle = await select({
    message: pc.bold('Choose your design style'),
    options: styleOptions,
  })
  if (isCancel(selectedStyle)) cancelHandler()

  const style = DESIGN_STYLES.find(s => s.id === selectedStyle)

  // ── Step 3: Features ──
  const featureGroups = getFeaturesByGroup()
  const featureOptions = featureGroups.flatMap(g => [
    { value: `__group_${g.id}`, label: pc.cyan(`${g.icon}  ${g.label}`), hint: pc.dim('─────') },
    ...g.features.map(f => ({
      value: f.id,
      label: `    ${f.icon}  ${f.label}`,
      hint: pc.dim(f.description.slice(0, 55)),
    })),
  ])
  const selectedFeatures = await multiselect({
    message: pc.bold('What features do you need?'),
    options: featureOptions,
    required: false,
  })
  if (isCancel(selectedFeatures)) cancelHandler()
  const cleanFeatures = (selectedFeatures || []).filter(f => !f.startsWith('__group_'))

  // Check for feature dependencies
  cleanFeatures.forEach(fid => {
    const feat = getFeatureById(fid)
    if (feat && feat.dependsOn) {
      feat.dependsOn.forEach(dep => {
        if (!cleanFeatures.includes(dep)) {
          console.log(pc.yellow(`  ⚠ "${feat.label}" requires "${dep}" — adding it automatically`))
          cleanFeatures.push(dep)
        }
      })
    }
  })

  // ── Step 4: Sections ──
  // Determine which project type to use for section filtering
  // Use the first type or a merged set
  const primaryType = selectedTypes[0].id
  const sectionGroups = getSectionsGroupedByCategory(primaryType)

  // Also add sections from secondary types
  const secondaryTypeIds = selectedTypes.slice(1).map(t => t.id)
  const extraTypeIds = [primaryType, ...secondaryTypeIds]

  const mergedSectionGroups = []
  const seenSectionIds = new Set()
  extraTypeIds.forEach(tid => {
    const groups = getSectionsGroupedByCategory(tid)
    groups.forEach(g => {
      let existing = mergedSectionGroups.find(mg => mg.id === g.id)
      if (!existing) {
        existing = { ...g, sections: [...g.sections] }
        mergedSectionGroups.push(existing)
      }
      g.sections.forEach(s => {
        if (!seenSectionIds.has(s.id)) {
          seenSectionIds.add(s.id)
          existing.sections.push(s)
        }
      })
    })
  })

  const sectionOptions = mergedSectionGroups.flatMap(g => [
    { value: `__group_${g.id}`, label: pc.cyan(`${g.icon}  ${g.label}`), hint: pc.dim('─────') },
    ...g.sections.map(s => ({
      value: s.id,
      label: `    ${s.icon}  ${s.label}`,
      hint: pc.dim(`${s.description.slice(0, 50)}  ` + pc.dim(`(${s.variants.length} variants)`)),
    })),
  ])

  // Preselect suggested sections
  const suggestedIds = selectedTypes.flatMap(t => t.suggestedSections || [])
  const preselected = suggestedIds.filter(id => seenSectionIds.has(id))

  const selectedSections = await multiselect({
    message: pc.bold('Which sections do you want on your site?'),
    options: sectionOptions,
    required: true,
    initialValues: preselected,
  })
  if (isCancel(selectedSections)) cancelHandler()
  const cleanSections = (selectedSections || []).filter(s => !s.startsWith('__group_'))

  // ── Step 5: Colors ──
  console.log(pc.dim(`\n  ${pc.bold('Color System')} — following the 60-30-10 rule`))
  console.log(pc.dim(`  60% Primary (dominant)  •  30% Secondary  •  10% Accent\n`))

  const colorOptions = COLOR_PRESETS.map(c => ({
    value: c.name,
    label: `${c.name}${c.name === 'Custom' ? '' : ''}`,
    hint: pc.dim(`${c.primary} / ${c.secondary} / ${c.accent}  ${c.description.slice(0, 40)}`),
  }))
  const selectedColorName = await select({
    message: pc.bold('Choose a color palette'),
    options: colorOptions,
  })
  if (isCancel(selectedColorName)) cancelHandler()

  let colorPalette = COLOR_PRESETS.find(c => c.name === selectedColorName)

  if (selectedColorName === 'Custom') {
    console.log(pc.dim(`\n  Enter your custom colors (hex codes like #4F46E5):\n`))
    const primaryHex = await text({ message: 'Primary color (60%)', defaultValue: '#6366F1', validate: v => /^#[0-9A-Fa-f]{6}$/.test(v) ? undefined : 'Enter a valid hex code' })
    if (isCancel(primaryHex)) cancelHandler()
    const secondaryHex = await text({ message: 'Secondary color (30%)', defaultValue: '#8B5CF6', validate: v => /^#[0-9A-Fa-f]{6}$/.test(v) ? undefined : 'Enter a valid hex code' })
    if (isCancel(secondaryHex)) cancelHandler()
    const accentHex = await text({ message: 'Accent color (10%)', defaultValue: '#F59E0B', validate: v => /^#[0-9A-Fa-f]{6}$/.test(v) ? undefined : 'Enter a valid hex code' })
    if (isCancel(accentHex)) cancelHandler()
    const bgHex = await text({ message: 'Background color', defaultValue: '#FFFFFF' })
    if (isCancel(bgHex)) cancelHandler()
    const textHex = await text({ message: 'Text color', defaultValue: '#111827' })
    if (isCancel(textHex)) cancelHandler()
    colorPalette = { name: 'Custom', primary: primaryHex, secondary: secondaryHex, accent: accentHex, bg: bgHex, text: textHex, description: 'Custom color palette' }
  }

  // ── Step 6: Free Text ──
  console.log(pc.dim(`\n  Tell us about your project in your own words.\n`))
  const projectDescription = await text({
    message: pc.bold('Describe your project, business, or any specific needs'),
    placeholder: 'e.g., A SaaS platform for project management targeting small teams. I love Notion\'s clean design...',
    defaultValue: '',
  })
  if (isCancel(projectDescription)) cancelHandler()

  const brandName = await text({
    message: pc.bold('What is your brand/project name?'),
    placeholder: 'e.g., MyApp, Acme Corp',
    defaultValue: '',
  })
  if (isCancel(brandName)) cancelHandler()

  // Extra context
  const extraContext = await text({
    message: pc.bold('Any specific design preferences, inspiration URLs, or technical constraints?'),
    placeholder: 'e.g., Must be WCAG accessible, inspired by linear.app, needs to load under 2s...',
    defaultValue: '',
  })
  if (isCancel(extraContext)) cancelHandler()

  // ── Generate Blueprint ──
  const spin = spinner()
  spin.start('Generating your project blueprint...')

  const blueprint = BlueprintGenerator.generate({
    types: selectedTypes,
    style,
    features: cleanFeatures.map(id => getFeatureById(id)).filter(Boolean),
    sections: cleanSections.map(id => getSectionById(id)).filter(Boolean),
    colors: colorPalette,
    projectDescription,
    brandName: brandName || undefined,
    extraContext: extraContext || undefined,
    allTypeDeps,
    allDefaultPages,
  })

  spin.stop(pc.green('Blueprint generated successfully'))

  // ── Summary ──
  console.log()
  console.log(pc.cyan(`  ┌─────────────────────────────────────────────────────────────┐`))
  console.log(pc.cyan(`  │`) + pc.bold(pc.white(`                    PROJECT BLUEPRINT                     `)) + pc.cyan(`│`))
  console.log(pc.cyan(`  ├─────────────────────────────────────────────────────────────┤`))
  console.log(pc.cyan(`  │`) + `  ${pc.bold('Name:')}       ${pc.white(blueprint.projectName)}`)
  console.log(pc.cyan(`  │`) + `  ${pc.bold('Type:')}       ${pc.white(selectedTypes.map(t => t.label).join(' + '))}`)
  console.log(pc.cyan(`  │`) + `  ${pc.bold('Style:')}      ${pc.white(style.label)}`)
  console.log(pc.cyan(`  │`) + `  ${pc.bold('Pages:')}      ${pc.white(blueprint.routes.length)} routes (${blueprint.routes.map(r => r.path).join(', ')})`)
  console.log(pc.cyan(`  │`) + `  ${pc.bold('Sections:')}   ${pc.white(cleanSections.length)} components`)
  console.log(pc.cyan(`  │`) + `  ${pc.bold('Features:')}   ${pc.white(cleanFeatures.length)} features`)
  console.log(pc.cyan(`  │`) + `  ${pc.bold('Packages:')}   ${pc.white(blueprint.packages.length)} dependencies`)
  console.log(pc.cyan(`  ├─────────────────────────────────────────────────────────────┤`))
  console.log(pc.cyan(`  │`) + pc.dim(`  PRD • TRD • Sitemap • User Flow • Auth • DB Schema`) + pc.dim(`  │`))
  console.log(pc.cyan(`  └─────────────────────────────────────────────────────────────┘`))
  console.log()

  return blueprint
}

module.exports = { runWizard }

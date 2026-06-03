const fs = require('fs');
const path = require('path');
const https = require('https');

const registry = require('./registry.json');
const BUNDLED_DIR = path.join(__dirname, '..', 'agent-skills');

function getRegistry() {
  return registry;
}

function searchSkills(query, options = {}) {
  const q = query ? query.toLowerCase() : '';
  const results = [];

  for (const skill of registry.skills) {
    let match = true;

    if (q) {
      const inName = skill.name.toLowerCase().includes(q);
      const inDesc = skill.description.toLowerCase().includes(q);
      const inId = skill.id.toLowerCase().includes(q);
      const inType = skill.type.toLowerCase().includes(q);
      match = inName || inDesc || inId || inType;
    }

    if (options.projectType && !skill.projectTypes.includes(options.projectType)) {
      match = false;
    }

    if (options.type && skill.type !== options.type) {
      match = false;
    }

    if (options.bundled !== undefined && skill.bundled !== options.bundled) {
      match = false;
    }

    if (match) results.push(skill);
  }

  return results;
}

function getDefaultSkills(projectType) {
  const skillIds = registry.projectDefaultSkills[projectType] || registry.projectDefaultSkills['landing-page'];
  return skillIds
    .map(id => registry.skills.find(s => s.id === id))
    .filter(Boolean);
}

function getSkillById(id) {
  return registry.skills.find(s => s.id === id) || null;
}

function isBundled(skill) {
  return skill.bundled === true;
}

function installBundledSkill(skill, targetDir) {
  const skillFolder = skill.id === 'design-principles' ? 'design'
    : skill.id === 'animation-motion' ? 'animation'
    : skill.id === 'typography' ? 'typography'
    : skill.id === 'transitions-effects' ? 'transitions'
    : skill.id;

  const srcPath = path.join(BUNDLED_DIR, skillFolder, 'SKILL.md');
  if (!fs.existsSync(srcPath)) {
    return { success: false, error: `Bundled skill source not found: ${srcPath}` };
  }

  const destDir = path.join(targetDir, '.claude', 'skills', skill.id);
  const destPath = path.join(destDir, 'SKILL.md');
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(srcPath, destPath);

  return { success: true, path: destPath };
}

function installExternalSkill(skill, targetDir) {
  return new Promise((resolve) => {
    const destDir = path.join(targetDir, '.claude', 'skills', skill.id);
    const destPath = path.join(destDir, 'SKILL.md');
    fs.mkdirSync(destDir, { recursive: true });

    const url = skill.source;
    if (!url || (!url.startsWith('https://') && !url.startsWith('http://'))) {
      return resolve({ success: false, error: `Invalid or missing source URL for skill: ${skill.id}` });
    }

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return resolve({ success: false, error: `Failed to fetch ${url}: HTTP ${res.statusCode}` });
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync(destPath, data);
        resolve({ success: true, path: destPath, bytes: data.length });
      });
    }).on('error', (err) => {
      resolve({ success: false, error: err.message });
    });
  });
}

function generateAgentConfig(skills, projectType, targetDir) {
  const rulesDir = path.join(targetDir, '.claude', 'rules');
  fs.mkdirSync(rulesDir, { recursive: true });

  const skillList = skills.map(s => {
    const typeLabel = s.type === 'design-system' ? 'design system' :
      s.type === 'animation' ? 'motion/animation' :
      s.type === 'typography' ? 'typography' :
      s.type === 'qa' ? 'accessibility/qa' :
      s.type === 'ui-library' ? 'UI library' :
      s.type === 'templates' ? 'templates/patterns' :
      s.type === 'architecture' ? 'architecture' :
      s.type;
    return `- **${s.name}** (\`${s.id}\`) — ${typeLabel}: ${s.description.split(':')[0] || s.description}`;
  }).join('\n');

  const ruleContent = `description: Numb.Design skill enforcement — ${projectType}
glob: "**/*.{js,jsx,ts,tsx,css,json,mdx}">
---

# You MUST read and follow these AI agent skills

This project uses **Numb.Design** curated skills. You are **required** to read every skill listed below before writing any code. These skills govern all design, animation, typography, and interaction decisions.

## Installed Skills

${skillList}

## Compliance Directive

1. **Before writing any component, page, or style**, load the relevant SKILL.md from \`.claude/skills/<id>/SKILL.md\`.
2. **Color decisions** MUST follow design-principles (60-30-10, WCAG contrast, semantic tokens).
3. **Animation decisions** MUST follow animation-motion (timing, easing, stagger, reduced-motion).
4. **Typography decisions** MUST follow typography (type scale, pairing, fluid type, readability).
5. **Effect decisions** (hover, glassmorphism, shadows, loading) MUST follow transitions-effects.
6. **Accessibility** MUST meet WCAG 2.2 AA minimum (a11y-audit if installed).

## Reduced Motion

Always include \`prefers-reduced-motion: reduce\` media query support. All animations must have a non-moving fallback.

## Icon Rule

Use **Lucide** icons (\`lucide-react\`) exclusively. Never use emoji or unicode characters as UI icons.

## Project Type: ${projectType}

This project was scaffolded as a **${projectType}**. Keep the architecture, component structure, and dependencies appropriate for this type.
`;

  const rulesPath = path.join(rulesDir, 'numb-design-enforcement.mdc');
  fs.writeFileSync(rulesPath, ruleContent);
  return { path: rulesPath, bytes: ruleContent.length };
}

async function installSkills(skillIds, projectType, targetDir) {
  const results = { installed: [], skipped: [], failed: [], config: null };

  for (const id of skillIds) {
    const skill = getSkillById(id);
    if (!skill) {
      results.failed.push({ id, error: 'Unknown skill ID' });
      continue;
    }

    const existingPath = path.join(targetDir, '.claude', 'skills', skill.id, 'SKILL.md');
    if (fs.existsSync(existingPath)) {
      results.skipped.push({ id, reason: 'Already installed' });
      continue;
    }

    let result;
    if (isBundled(skill)) {
      result = installBundledSkill(skill, targetDir);
    } else {
      result = await installExternalSkill(skill, targetDir);
    }

    if (result.success) {
      results.installed.push({ id, path: result.path });
    } else {
      results.failed.push({ id, error: result.error });
    }
  }

  const installedSkills = skillIds
    .map(id => getSkillById(id))
    .filter(Boolean);

  results.config = generateAgentConfig(installedSkills, projectType, targetDir);

  return results;
}

function verifyInstallation(targetDir) {
  const checks = { present: [], missing: [], rules: false };

  const skillsDir = path.join(targetDir, '.claude', 'skills');
  if (!fs.existsSync(skillsDir)) {
    return { present: [], missing: registry.skills.map(s => s.id), rules: false };
  }

  const installed = fs.readdirSync(skillsDir);

  for (const skill of registry.skills) {
    if (installed.includes(skill.id) && fs.existsSync(path.join(skillsDir, skill.id, 'SKILL.md'))) {
      checks.present.push(skill.id);
    } else {
      checks.missing.push(skill.id);
    }
  }

  const rulesPath = path.join(targetDir, '.claude', 'rules', 'numb-design-enforcement.mdc');
  checks.rules = fs.existsSync(rulesPath);

  return checks;
}

module.exports = {
  getRegistry,
  searchSkills,
  getDefaultSkills,
  getSkillById,
  installSkills,
  verifyInstallation,
  generateAgentConfig,
};

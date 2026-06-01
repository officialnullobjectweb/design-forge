export interface Skill {
  id: string;
  name: string;
  description: string;
  category: 'design-principles' | 'ux-patterns' | 'color-theory' | 'typography' | 'layout-composition' | 'accessibility' | 'design-tools' | 'design-systems' | 'animation-motion';
  url: string;
  source: string;
  type: 'guide' | 'cheatsheet' | 'interactive' | 'video' | 'article' | 'reference' | 'checklist';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  isFree: true;
}

export const skills: Skill[] = [
  // =====================================================================
  // DESIGN PRINCIPLES
  // Sources: Laws of UX (Jon Yablonski), Refactoring UI (Adam Wathan & Steve Schoger),
  //          Nielsen Norman Group, Smashing Magazine
  // =====================================================================
  {
    id: 'laws-of-ux',
    name: 'Laws of UX',
    description: 'Mental models and design principles for creating intuitive user interfaces. Covers Hick\'s Law, Fitts\'s Law, Jakob\'s Law, and more.',
    url: 'https://lawsofux.com',
    category: 'design-principles',
    source: 'Jon Yablonski',
    type: 'reference',
    difficulty: 'beginner',
    tags: ['UX laws', 'heuristics', 'cognitive bias', 'usability'],
    isFree: true,
  },
  {
    id: 'refactoring-ui',
    name: 'Refactoring UI',
    description: 'The ultimate guide to making your UI look better. Covers spacing, color, typography, and visual design tactics.',
    url: 'https://www.refactoringui.com',
    category: 'design-principles',
    source: 'Adam Wathan & Steve Schoger',
    type: 'guide',
    difficulty: 'beginner',
    tags: ['UI design', 'visual design', 'spacing', 'color', 'typography'],
    isFree: true,
  },
  {
    id: 'usability-heuristics',
    name: '10 Usability Heuristics',
    description: 'Jakob Nielsen\'s 10 general principles for interaction design. Evidence-based heuristics for UI evaluation.',
    url: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
    category: 'design-principles',
    source: 'Nielsen Norman Group',
    type: 'article',
    difficulty: 'beginner',
    tags: ['usability', 'heuristics', 'UI design', 'UX'],
    isFree: true,
  },
  {
    id: 'design-thinking-101',
    name: 'Design Thinking 101',
    description: 'Introduction to the design thinking process: empathize, define, ideate, prototype, test.',
    url: 'https://www.nngroup.com/articles/design-thinking/',
    category: 'design-principles',
    source: 'Nielsen Norman Group',
    type: 'article',
    difficulty: 'beginner',
    tags: ['design thinking', 'innovation', 'process'],
    isFree: true,
  },
  {
    id: 'smashing-design',
    name: 'Smashing Magazine Design Articles',
    description: 'In-depth articles on web design, UX, UI patterns, and frontend development.',
    url: 'https://www.smashingmagazine.com/articles/',
    category: 'design-principles',
    source: 'Smashing Magazine',
    type: 'article',
    difficulty: 'intermediate',
    tags: ['web design', 'UX', 'UI', 'design patterns', 'CSS'],
    isFree: true,
  },
  {
    id: 'refactoring-ui-blog',
    name: 'Refactoring UI Blog Articles',
    description: 'Design tactics and visual design principles from the creators of Tailwind CSS.',
    url: 'https://medium.com/@refactoringui',
    category: 'design-principles',
    source: 'Adam Wathan & Steve Schoger',
    type: 'article',
    difficulty: 'beginner',
    tags: ['UI design', 'design tactics', 'visual design'],
    isFree: true,
  },

  // =====================================================================
  // UX PATTERNS
  // Sources: Nielsen Norman Group, Google, Heydon Pickering
  // =====================================================================
  {
    id: 'nng-ux-articles',
    name: 'NN/g UX Articles & Videos',
    description: 'Evidence-based UX research articles, videos, and reports from world leaders in usability.',
    url: 'https://www.nngroup.com/articles/',
    category: 'ux-patterns',
    source: 'Nielsen Norman Group',
    type: 'article',
    difficulty: 'intermediate',
    tags: ['UX research', 'usability', 'user testing', 'HCI'],
    isFree: true,
  },
  {
    id: 'journey-mapping-101',
    name: 'Journey Mapping 101',
    description: 'How to create and use customer journey maps to improve user experiences.',
    url: 'https://www.nngroup.com/articles/journey-mapping-101/',
    category: 'ux-patterns',
    source: 'Nielsen Norman Group',
    type: 'article',
    difficulty: 'beginner',
    tags: ['journey mapping', 'UX', 'user research'],
    isFree: true,
  },
  {
    id: 'empathy-mapping',
    name: 'Empathy Mapping',
    description: 'How to use empathy maps to build deeper understanding of your users.',
    url: 'https://www.nngroup.com/articles/empathy-mapping/',
    category: 'ux-patterns',
    source: 'Nielsen Norman Group',
    type: 'article',
    difficulty: 'beginner',
    tags: ['empathy map', 'design thinking', 'user research'],
    isFree: true,
  },
  {
    id: 'usability-testing-101',
    name: 'Usability Testing 101',
    description: 'Everything you need to know about usability testing methodology and best practices.',
    url: 'https://www.nngroup.com/articles/usability-testing-101/',
    category: 'ux-patterns',
    source: 'Nielsen Norman Group',
    type: 'article',
    difficulty: 'beginner',
    tags: ['usability testing', 'user research', 'methodology'],
    isFree: true,
  },
  {
    id: 'service-blueprints',
    name: 'Service Blueprints',
    description: 'Definition and guide to creating service blueprints for mapping complex service experiences.',
    url: 'https://www.nngroup.com/articles/service-blueprints-definition/',
    category: 'ux-patterns',
    source: 'Nielsen Norman Group',
    type: 'article',
    difficulty: 'intermediate',
    tags: ['service blueprint', 'UX', 'process'],
    isFree: true,
  },
  {
    id: 'ux-cheat-sheet',
    name: 'UX Research Cheat Sheet',
    description: 'Quick reference guide to UX research methods: qualitative, quantitative, attitudinal, behavioral.',
    url: 'https://www.nngroup.com/articles/ux-research-cheat-sheet/',
    category: 'ux-patterns',
    source: 'Nielsen Norman Group',
    type: 'cheatsheet',
    difficulty: 'intermediate',
    tags: ['UX research', 'methods', 'qualitative', 'quantitative'],
    isFree: true,
  },
  {
    id: 'inclusive-components',
    name: 'Inclusive Components',
    description: 'Accessible component design patterns for toggles, menus, tables, accordions, and more.',
    url: 'https://inclusive-components.design',
    category: 'ux-patterns',
    source: 'Heydon Pickering',
    type: 'reference',
    difficulty: 'intermediate',
    tags: ['inclusive design', 'accessibility', 'components', 'patterns'],
    isFree: true,
  },
  {
    id: 'material-design-guide',
    name: 'Material Design Guidelines',
    description: 'Google\'s comprehensive design system guidelines for interaction, layout, and components.',
    url: 'https://material.io/design',
    category: 'ux-patterns',
    source: 'Google',
    type: 'reference',
    difficulty: 'intermediate',
    tags: ['material design', 'components', 'interaction', 'layout'],
    isFree: true,
  },

  // =====================================================================
  // COLOR THEORY
  // Sources: Coolors (Fabrizio Bianchi), CSS-Tricks, Smashing Magazine
  // =====================================================================
  {
    id: 'coolors',
    name: 'Coolors',
    description: 'Fast color palette generator with contrast checking, exploration, and export features.',
    url: 'https://coolors.co',
    category: 'color-theory',
    source: 'Fabrizio Bianchi',
    type: 'interactive',
    difficulty: 'beginner',
    tags: ['color palette', 'color generator', 'contrast', 'HSL'],
    isFree: true,
  },
  {
    id: 'coolors-contrast',
    name: 'Coolors Contrast Checker',
    description: 'Interactive contrast checker that validates color pairs against WCAG standards.',
    url: 'https://coolors.co/contrast-checker',
    category: 'color-theory',
    source: 'Fabrizio Bianchi',
    type: 'interactive',
    difficulty: 'beginner',
    tags: ['contrast ratio', 'WCAG', 'accessibility', 'color'],
    isFree: true,
  },
  {
    id: 'css-tricks-color-guide',
    name: 'CSS-Tricks Color Guide',
    description: 'Comprehensive guide to color on the web covering color spaces, HSL, OKLCH, and color functions.',
    url: 'https://css-tricks.com/nerds-guide-color-web/',
    category: 'color-theory',
    source: 'CSS-Tricks',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['color', 'CSS', 'color spaces', 'HSL', 'OKLCH'],
    isFree: true,
  },
  {
    id: 'css-color-functions',
    name: 'CSS-Tricks Color Functions Guide',
    description: 'Modern CSS color functions including oklch, color-mix, and relative color syntax.',
    url: 'https://css-tricks.com/css-color-functions/',
    category: 'color-theory',
    source: 'CSS-Tricks',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['CSS color functions', 'oklch', 'color-mix'],
    isFree: true,
  },
  {
    id: 'self-correcting-color',
    name: 'Self-Correcting Color Systems',
    description: 'Building color systems that automatically maintain contrast using contrast-color in CSS.',
    url: 'https://www.smashingmagazine.com/2026/05/building-self-correcting-color-systems-contrast-color/',
    category: 'color-theory',
    source: 'Smashing Magazine',
    type: 'article',
    difficulty: 'advanced',
    tags: ['color systems', 'contrast-color', 'theming'],
    isFree: true,
  },

  // =====================================================================
  // TYPOGRAPHY
  // Sources: Matthew Butterick, Google, Figma, web.dev
  // =====================================================================
  {
    id: 'practical-typography',
    name: 'Butterick\'s Practical Typography',
    description: 'The definitive guide to good typography for anyone who works with text.',
    url: 'https://practicaltypography.com',
    category: 'typography',
    source: 'Matthew Butterick',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['typography', 'fonts', 'layout', 'type composition'],
    isFree: true,
  },
  {
    id: 'fonts-knowledge',
    name: 'Fonts Knowledge by Google',
    description: 'Google\'s comprehensive library of typography knowledge covering typeface selection, pairing, and usage.',
    url: 'https://fonts.google.com/knowledge',
    category: 'typography',
    source: 'Google',
    type: 'reference',
    difficulty: 'beginner',
    tags: ['typography', 'fonts', 'typeface', 'web fonts'],
    isFree: true,
  },
  {
    id: 'type-scale',
    name: 'Type Scale',
    description: 'Interactive tool for previewing and generating modular type scales for web design.',
    url: 'https://type-scale.com',
    category: 'typography',
    source: 'Jeremy Church',
    type: 'interactive',
    difficulty: 'beginner',
    tags: ['type scale', 'typography', 'font size', 'modular scale'],
    isFree: true,
  },
  {
    id: 'designsystems-typography',
    name: 'DesignSystems.com Typography Guide',
    description: 'How to define and document typography in your design system, from type scales to font stacks.',
    url: 'https://www.designsystems.com/typography-guides/',
    category: 'typography',
    source: 'Figma',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['design systems', 'typography', 'type scale'],
    isFree: true,
  },
  {
    id: 'webdev-typography',
    name: 'web.dev Typography',
    description: 'Responsive typography fundamentals including font sizing, line height, and readability on the web.',
    url: 'https://web.dev/learn/design/typography',
    category: 'typography',
    source: 'Google',
    type: 'article',
    difficulty: 'beginner',
    tags: ['responsive typography', 'web design', 'readability'],
    isFree: true,
  },
  {
    id: 'webdev-a11y-typography',
    name: 'web.dev Accessibility Typography',
    description: 'Accessible typography practices including font sizing, line length, and spacing for readability.',
    url: 'https://web.dev/learn/accessibility/typography',
    category: 'typography',
    source: 'Google',
    type: 'article',
    difficulty: 'beginner',
    tags: ['accessible typography', 'font sizing'],
    isFree: true,
  },

  // =====================================================================
  // LAYOUT & COMPOSITION
  // Sources: Rachel Andrew, Heydon Pickering & Andy Bell, CSS-Tricks,
  //          Google, Smashing Magazine, Figma (DesignSystems.com)
  // =====================================================================
  {
    id: 'grid-by-example',
    name: 'Grid by Example',
    description: 'Comprehensive reference for CSS Grid Layout with usage examples and video tutorials.',
    url: 'https://gridbyexample.com',
    category: 'layout-composition',
    source: 'Rachel Andrew',
    type: 'reference',
    difficulty: 'intermediate',
    tags: ['CSS Grid', 'layout', 'subgrid'],
    isFree: true,
  },
  {
    id: 'every-layout',
    name: 'Every Layout',
    description: 'Reusable, responsive layout components built on CSS intrinsic design principles.',
    url: 'https://every-layout.dev',
    category: 'layout-composition',
    source: 'Heydon Pickering & Andy Bell',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['CSS layout', 'flexbox', 'grid', 'intrinsic design'],
    isFree: true,
  },
  {
    id: 'css-tricks-flexbox',
    name: 'CSS-Tricks Complete Guide to Flexbox',
    description: 'Complete reference guide for CSS Flexbox with diagrammed examples and browser support.',
    url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
    category: 'layout-composition',
    source: 'CSS-Tricks',
    type: 'guide',
    difficulty: 'beginner',
    tags: ['flexbox', 'CSS', 'layout'],
    isFree: true,
  },
  {
    id: 'css-tricks-grid',
    name: 'CSS-Tricks Complete Guide to CSS Grid',
    description: 'Complete reference guide for CSS Grid Layout with diagrammed examples and browser support.',
    url: 'https://css-tricks.com/complete-guide-css-grid-layout/',
    category: 'layout-composition',
    source: 'CSS-Tricks',
    type: 'guide',
    difficulty: 'beginner',
    tags: ['CSS Grid', 'layout', 'grid template'],
    isFree: true,
  },
  {
    id: 'css-container-queries',
    name: 'CSS-Tricks Container Queries Guide',
    description: 'Complete guide to CSS container queries for component-based responsive design.',
    url: 'https://css-tricks.com/css-container-queries/',
    category: 'layout-composition',
    source: 'CSS-Tricks',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['container queries', 'responsive', 'components'],
    isFree: true,
  },
  {
    id: 'webdev-responsive',
    name: 'web.dev Learn Responsive Design',
    description: 'Google\'s comprehensive guide to responsive web design including media queries, layout, and theming.',
    url: 'https://web.dev/learn/design/',
    category: 'layout-composition',
    source: 'Google',
    type: 'guide',
    difficulty: 'beginner',
    tags: ['responsive design', 'media queries', 'layout', 'theming'],
    isFree: true,
  },
  {
    id: 'smashing-css-layout',
    name: 'Smashing Magazine CSS Layout Guide',
    description: 'Collection of articles covering CSS Grid, Flexbox, responsive layout, and modern CSS layout techniques.',
    url: 'https://www.smashingmagazine.com/guides/css-layout/',
    category: 'layout-composition',
    source: 'Smashing Magazine',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['CSS layout', 'grid', 'flexbox', 'responsive'],
    isFree: true,
  },
  {
    id: 'space-grids-layouts',
    name: 'Space, Grids, and Layouts',
    description: 'How to use space, grids, and layout systems effectively in your design system.',
    url: 'https://www.designsystems.com/space-grids-and-layouts/',
    category: 'layout-composition',
    source: 'Figma',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['design systems', 'grid', 'spacing', 'layout'],
    isFree: true,
  },
  {
    id: 'css-tricks-centering',
    name: 'CSS-Tricks Centering in CSS Guide',
    description: 'Complete guide to centering elements in CSS with Flexbox, Grid, transforms, and positioning.',
    url: 'https://css-tricks.com/centering-css-complete-guide/',
    category: 'layout-composition',
    source: 'CSS-Tricks',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['centering', 'CSS', 'layout', 'alignment'],
    isFree: true,
  },

  // =====================================================================
  // ACCESSIBILITY
  // Sources: A11Y Project, W3C, Google, Heydon Pickering, CSS-Tricks,
  //          Smashing Magazine
  // =====================================================================
  {
    id: 'a11y-checklist',
    name: 'The A11Y Project Checklist',
    description: 'Community-driven accessibility checklist covering WCAG compliance for web developers.',
    url: 'https://www.a11yproject.com/checklist/',
    category: 'accessibility',
    source: 'A11Y Project',
    type: 'checklist',
    difficulty: 'beginner',
    tags: ['WCAG', 'accessibility', 'a11y', 'checklist', 'compliance'],
    isFree: true,
  },
  {
    id: 'w3c-wai',
    name: 'W3C Web Accessibility Initiative',
    description: 'Official W3C resource for web accessibility standards, strategies, and guidelines.',
    url: 'https://www.w3.org/WAI/',
    category: 'accessibility',
    source: 'W3C',
    type: 'reference',
    difficulty: 'intermediate',
    tags: ['WCAG', 'WAI', 'accessibility', 'standards'],
    isFree: true,
  },
  {
    id: 'wcag-22',
    name: 'WCAG 2.2 Standards',
    description: 'Official Web Content Accessibility Guidelines 2.2 specification from the W3C.',
    url: 'https://www.w3.org/TR/WCAG22/',
    category: 'accessibility',
    source: 'W3C',
    type: 'reference',
    difficulty: 'intermediate',
    tags: ['WCAG 2.2', 'accessibility standards', 'compliance'],
    isFree: true,
  },
  {
    id: 'webdev-a11y',
    name: 'web.dev Learn Accessibility',
    description: 'Google\'s comprehensive guide to web accessibility covering ARIA, keyboard support, contrast, and testing.',
    url: 'https://web.dev/learn/accessibility/',
    category: 'accessibility',
    source: 'Google',
    type: 'guide',
    difficulty: 'beginner',
    tags: ['accessibility', 'ARIA', 'keyboard', 'contrast', 'testing'],
    isFree: true,
  },
  {
    id: 'inclusive-components-a11y',
    name: 'Inclusive Components',
    description: 'Accessible, inclusive component design patterns with ARIA best practices.',
    url: 'https://inclusive-components.design',
    category: 'accessibility',
    source: 'Heydon Pickering',
    type: 'reference',
    difficulty: 'intermediate',
    tags: ['inclusive design', 'accessibility', 'components', 'ARIA'],
    isFree: true,
  },
  {
    id: 'wai-designers',
    name: 'WAI Designers Resources',
    description: 'W3C WAI resources specifically curated for designers covering inclusive design practices.',
    url: 'https://www.w3.org/WAI/roles/designers/',
    category: 'accessibility',
    source: 'W3C',
    type: 'reference',
    difficulty: 'beginner',
    tags: ['accessibility', 'design', 'WAI', 'inclusive'],
    isFree: true,
  },
  {
    id: 'wai-fundamentals',
    name: 'WAI Accessibility Fundamentals',
    description: 'Foundational knowledge about accessibility, disabilities, and assistive technologies.',
    url: 'https://www.w3.org/WAI/fundamentals/',
    category: 'accessibility',
    source: 'W3C',
    type: 'guide',
    difficulty: 'beginner',
    tags: ['accessibility fundamentals', 'disabilities', 'assistive technology'],
    isFree: true,
  },
  {
    id: 'css-tricks-dark-mode',
    name: 'CSS-Tricks Dark Mode Guide',
    description: 'Complete guide to implementing dark mode on the web with prefers-color-scheme and theming.',
    url: 'https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/',
    category: 'accessibility',
    source: 'CSS-Tricks',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['dark mode', 'prefers-color-scheme', 'theming'],
    isFree: true,
  },
  {
    id: 'smashing-a11y',
    name: 'Smashing Magazine Accessibility Guide',
    description: 'Collection of articles on web accessibility, inclusive design, screen readers, and WCAG compliance.',
    url: 'https://www.smashingmagazine.com/guides/accessibility/',
    category: 'accessibility',
    source: 'Smashing Magazine',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['accessibility', 'inclusive design', 'screen readers', 'WCAG'],
    isFree: true,
  },

  // =====================================================================
  // DESIGN TOOLS
  // Sources: Coolors (Fabrizio Bianchi), Jeremy Church, Refactoring UI,
  //          Figma, Google
  // =====================================================================
  {
    id: 'coolors-palette',
    name: 'Coolors Color Palette Generator',
    description: 'Generate, explore, and save color palettes with an interactive color wheel and harmony rules.',
    url: 'https://coolors.co',
    category: 'design-tools',
    source: 'Fabrizio Bianchi',
    type: 'interactive',
    difficulty: 'beginner',
    tags: ['color palette', 'color scheme', 'generator'],
    isFree: true,
  },
  {
    id: 'coolors-image-picker',
    name: 'Coolors Image Picker',
    description: 'Extract color palettes from any image automatically.',
    url: 'https://coolors.co/image-picker',
    category: 'design-tools',
    source: 'Fabrizio Bianchi',
    type: 'interactive',
    difficulty: 'beginner',
    tags: ['color extraction', 'image', 'palette'],
    isFree: true,
  },
  {
    id: 'type-scale-calculator',
    name: 'Type Scale Calculator',
    description: 'Interactive preview tool for generating modular type scale values for your designs.',
    url: 'https://type-scale.com',
    category: 'design-tools',
    source: 'Jeremy Church',
    type: 'interactive',
    difficulty: 'beginner',
    tags: ['typography', 'font scale', 'CSS'],
    isFree: true,
  },
  {
    id: 'refactoring-ui-gallery',
    name: 'Refactoring UI Component Gallery',
    description: 'Gallery of UI component examples and layout inspiration from the Refactoring UI book.',
    url: 'https://www.refactoringui.com',
    category: 'design-tools',
    source: 'Adam Wathan & Steve Schoger',
    type: 'reference',
    difficulty: 'intermediate',
    tags: ['UI components', 'patterns', 'inspiration', 'layouts'],
    isFree: true,
  },
  {
    id: 'figma-design-systems',
    name: 'Figma Design Systems Community',
    description: 'Collection of open design systems from top companies available for Figma.',
    url: 'https://www.designsystems.com/open-design-systems/',
    category: 'design-tools',
    source: 'Figma',
    type: 'reference',
    difficulty: 'intermediate',
    tags: ['design systems', 'Figma', 'components', 'tokens'],
    isFree: true,
  },
  {
    id: 'material-3-kit',
    name: 'Material 3 Design Kit',
    description: 'Official Material 3 design kit for Figma including components, tokens, and templates.',
    url: 'https://www.figma.com/community/file/1035203688168086460',
    category: 'design-tools',
    source: 'Google',
    type: 'reference',
    difficulty: 'intermediate',
    tags: ['Material Design', 'Figma', 'design kit'],
    isFree: true,
  },

  // =====================================================================
  // DESIGN SYSTEMS
  // Sources: Figma (DesignSystems.com), Google, Apple, Nielsen Norman Group
  // =====================================================================
  {
    id: 'designsystems',
    name: 'DesignSystems.com',
    description: 'Everything you need to know about design systems: guides, stories, templates, and tools.',
    url: 'https://www.designsystems.com',
    category: 'design-systems',
    source: 'Figma',
    type: 'reference',
    difficulty: 'intermediate',
    tags: ['design systems', 'components', 'design ops', 'tokens'],
    isFree: true,
  },
  {
    id: 'future-semantic',
    name: 'The Future of Design Systems Is Semantic',
    description: 'How semantic tokens and Figma variables are transforming design system architecture.',
    url: 'https://www.designsystems.com/the-future-of-design-systems-is-semantic/',
    category: 'design-systems',
    source: 'Figma',
    type: 'article',
    difficulty: 'intermediate',
    tags: ['design systems', 'semantic tokens', 'Figma variables'],
    isFree: true,
  },
  {
    id: 'future-accessible',
    name: 'The Future of Design Systems Is Accessible',
    description: 'Building accessibility into the foundation of your design system for inclusive products.',
    url: 'https://www.designsystems.com/the-future-of-design-systems-is-accessible/',
    category: 'design-systems',
    source: 'Figma',
    type: 'article',
    difficulty: 'intermediate',
    tags: ['accessibility', 'design systems', 'inclusive'],
    isFree: true,
  },
  {
    id: 'iconography-guide',
    name: 'Complete Guide to Iconography',
    description: 'How to design, organize, and implement icon sets within a design system.',
    url: 'https://www.designsystems.com/iconography-guide/',
    category: 'design-systems',
    source: 'Figma',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['iconography', 'design systems', 'SVG', 'icon sets'],
    isFree: true,
  },
  {
    id: 'content-strategy-ds',
    name: 'Content Strategy in Design Systems',
    description: 'Guide to content strategy, microcopy, UX writing, and content governance in design systems.',
    url: 'https://www.designsystems.com/guide-to-content-strategy-in-design-systems/',
    category: 'design-systems',
    source: 'Figma',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['content strategy', 'microcopy', 'design systems', 'UX writing'],
    isFree: true,
  },
  {
    id: 'material-design-3',
    name: 'Material Design 3',
    description: 'Google\'s latest design system featuring dynamic color, adaptive layouts, and personalization.',
    url: 'https://m3.material.io',
    category: 'design-systems',
    source: 'Google',
    type: 'reference',
    difficulty: 'intermediate',
    tags: ['Material Design 3', 'dynamic color', 'M3', 'design system'],
    isFree: true,
  },
  {
    id: 'apple-hig',
    name: 'Apple Human Interface Guidelines',
    description: 'Apple\'s official design guidelines for iOS, macOS, watchOS, and tvOS platforms.',
    url: 'https://developer.apple.com/design/human-interface-guidelines/',
    category: 'design-systems',
    source: 'Apple',
    type: 'reference',
    difficulty: 'intermediate',
    tags: ['Apple HIG', 'iOS', 'macOS', 'human interface'],
    isFree: true,
  },
  {
    id: 'lean-ds-teams',
    name: 'Small by Design: Lean Design-System Teams',
    description: 'How small teams can build and maintain effective design systems with limited resources.',
    url: 'https://www.nngroup.com/articles/lean-design-system-teams/',
    category: 'design-systems',
    source: 'Nielsen Norman Group',
    type: 'article',
    difficulty: 'intermediate',
    tags: ['design systems', 'lean teams', 'scalability'],
    isFree: true,
  },

  // =====================================================================
  // ANIMATION & MOTION
  // Sources: CSS-Tricks, Google, A11Y Project
  // =====================================================================
  {
    id: 'css-gradients-guide',
    name: 'CSS-Tricks CSS Gradients Guide',
    description: 'Complete guide to CSS gradients including linear, radial, conic gradients, and patterns.',
    url: 'https://css-tricks.com/a-complete-guide-to-css-gradients/',
    category: 'animation-motion',
    source: 'CSS-Tricks',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['gradients', 'CSS', 'background', 'visual effects'],
    isFree: true,
  },
  {
    id: 'webdev-motion',
    name: 'web.dev Animation and Motion',
    description: 'Guidelines for accessible motion and animation on the web, including prefers-reduced-motion.',
    url: 'https://web.dev/learn/accessibility/motion',
    category: 'animation-motion',
    source: 'Google',
    type: 'article',
    difficulty: 'beginner',
    tags: ['prefers-reduced-motion', 'animation', 'accessibility'],
    isFree: true,
  },
  {
    id: 'a11y-animation',
    name: 'A11Y Project Animation Checklist',
    description: 'Accessibility checklist for animations covering motion sensitivity, flashing content, and reduced motion.',
    url: 'https://www.a11yproject.com/checklist/#animation',
    category: 'animation-motion',
    source: 'A11Y Project',
    type: 'checklist',
    difficulty: 'beginner',
    tags: ['animation', 'prefers-reduced-motion', 'WCAG'],
    isFree: true,
  },
];

// ==============================================================================
// HELPER FUNCTIONS
// ==============================================================================

export function getSkillById(id: string): Skill | undefined {
  return skills.find((skill) => skill.id === id);
}

export function getSkillsByCategory(category: Skill['category']): Skill[] {
  return skills.filter((skill) => skill.category === category);
}

export function getSkillsByDifficulty(difficulty: Skill['difficulty']): Skill[] {
  return skills.filter((skill) => skill.difficulty === difficulty);
}

export function getSkillsByType(type: Skill['type']): Skill[] {
  return skills.filter((skill) => skill.type === type);
}

export function getSkillsBySource(source: string): Skill[] {
  return skills.filter((skill) => skill.source === source);
}

export function getSkillsByTag(tag: string): Skill[] {
  return skills.filter((skill) => skill.tags.includes(tag));
}

export function getAllCategories(): Skill['category'][] {
  return ['design-principles', 'ux-patterns', 'color-theory', 'typography', 'layout-composition', 'accessibility', 'design-tools', 'design-systems', 'animation-motion'];
}

export function getAllDifficulties(): Skill['difficulty'][] {
  return ['beginner', 'intermediate', 'advanced'];
}

export function getAllTypes(): Skill['type'][] {
  return ['guide', 'cheatsheet', 'interactive', 'video', 'article', 'reference', 'checklist'];
}

export function searchSkills(query: string): Skill[] {
  const q = query.toLowerCase().trim();
  return skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(q) ||
      skill.description.toLowerCase().includes(q) ||
      skill.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      skill.source.toLowerCase().includes(q)
  );
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  for (const skill of skills) {
    for (const tag of skill.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

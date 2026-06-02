export const agentSkillCategories = [
  {
    id: 'design',
    name: 'Design Principles & UI',
    description: 'Layout, composition, visual hierarchy, color theory, states & interaction patterns',
    skills: ['Color systems', 'Spacing scales', 'Grid alignment', 'Visual hierarchy', 'State design', '60-30-10 rule'],
  },
  {
    id: 'typography',
    name: 'Typography',
    description: 'Font selection, type scales, readability, vertical rhythm, web typography best practices',
    skills: ['Type scale (1.25)', 'Line height', 'Font pairing', 'Responsive type', 'Variable fonts', 'Web font optimization'],
  },
  {
    id: 'animation',
    name: 'Animation & Motion',
    description: 'Timing, easing, stagger, scroll-triggered animation, accessibility & reduced motion',
    skills: ['Easing curves', 'Stagger timing', 'Micro-interactions', 'AnimatePresence', 'Scroll animations', 'prefers-reduced-motion'],
  },
  {
    id: 'transitions',
    name: 'Transitions & Effects',
    description: 'Page transitions, hover effects, glassmorphism, shadows, loading states, visual effects',
    skills: ['CSS transitions', 'View Transitions API', 'Glassmorphism', 'Skeleton screens', 'Gradient effects', 'Shadow layering'],
  },
];

export const agentSkillInstallCommand = 'npx numb-design skills';

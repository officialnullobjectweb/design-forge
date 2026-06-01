const DESIGN_STYLES = [
  {
    id: 'minimal',
    label: 'Minimal & Clean',
    description: 'Plenty of whitespace, simple typography, subtle colors — content-first design',
    tokens: {
      borderRadius: 'sm',
      spacing: 'compact',
      shadows: 'subtle',
      animations: 'subtle',
    },
    colors: ['neutral', 'slate', 'zinc'],
  },
  {
    id: 'premium',
    label: 'Premium / Luxury',
    description: 'Rich dark tones, gold/amber accents, refined typography, elevated shadows',
    tokens: {
      borderRadius: 'md',
      spacing: 'generous',
      shadows: 'elevated',
      animations: 'smooth',
    },
    colors: ['warm', 'amber', 'dark'],
  },
  {
    id: 'modern',
    label: 'Modern / Contemporary',
    description: 'Clean lines, gradient accents, rounded corners, bold typography hierarchy',
    tokens: {
      borderRadius: 'md',
      spacing: 'comfortable',
      shadows: 'medium',
      animations: 'smooth',
    },
    colors: ['indigo', 'violet', 'blue'],
  },
  {
    id: 'traditional',
    label: 'Traditional / Classic',
    description: 'Serif typography, muted earth tones, structured layouts, conservative spacing',
    tokens: {
      borderRadius: 'sm',
      spacing: 'comfortable',
      shadows: 'subtle',
      animations: 'minimal',
    },
    colors: ['warm', 'brown', 'neutral'],
  },
  {
    id: 'brutalist',
    label: 'Brutalist',
    description: 'Bold raw aesthetics, harsh borders, monospace fonts, high contrast, unconventional layouts',
    tokens: {
      borderRadius: 'none',
      spacing: 'compact',
      shadows: 'none',
      animations: 'minimal',
    },
    colors: ['high-contrast', 'neon'],
  },
  {
    id: 'playful',
    label: 'Playful / Creative',
    description: 'Vibrant colors, rounded everything, micro-animations, fun illustrations, experimental layouts',
    tokens: {
      borderRadius: 'full',
      spacing: 'generous',
      shadows: 'playful',
      animations: 'bouncy',
    },
    colors: ['vibrant', 'rainbow'],
  },
  {
    id: 'dark',
    label: 'Dark / Cyber',
    description: 'Dark backgrounds, neon accents, glow effects, futuristic typography, particle effects',
    tokens: {
      borderRadius: 'md',
      spacing: 'comfortable',
      shadows: 'glow',
      animations: 'smooth',
    },
    colors: ['dark', 'neon', 'cyber'],
  },
  {
    id: 'glassmorphic',
    label: 'Glassmorphic',
    description: 'Frosted glass panels, backdrop blur, light borders, subtle shadows, layered depth',
    tokens: {
      borderRadius: 'lg',
      spacing: 'generous',
      shadows: 'glass',
      animations: 'smooth',
    },
    colors: ['pastel', 'light'],
  },
  {
    id: 'neo-brutalist',
    label: 'Neo-Brutalist',
    description: 'Colorful borders, bold shadows, asymmetric layouts, 3D-ish elements, playful seriousness',
    tokens: {
      borderRadius: 'sm',
      spacing: 'compact',
      shadows: 'bold',
      animations: 'bouncy',
    },
    colors: ['vibrant', 'bold'],
  },
]

function getStyleById(id) {
  return DESIGN_STYLES.find(s => s.id === id)
}

module.exports = { DESIGN_STYLES, getStyleById }

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: ResourceCategory;
  tags: string[];
  installHint?: string;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  isFree: true;
  cdnAvailable?: boolean;
  type: 'library' | 'tool' | 'inspiration' | 'generator' | 'reference';
}

export type ResourceCategory =
  | 'ui-components'
  | 'icons-illustrations'
  | 'animation-motion'
  | '3d-canvas-fx'
  | 'fonts-typography'
  | 'colors-palettes'
  | 'transitions-effects'
  | 'charts-data-viz'
  | 'images-media'
  | 'gradients-patterns'
  | 'design-inspiration'
  | 'forms-validation'
  | 'layout-grid'
  | 'prototyping';

export type CategoryInfo = {
  id: ResourceCategory;
  label: string;
  description: string;
  gradient: string;
  icon: string;
};

export const categories: CategoryInfo[] = [
  {
    id: 'ui-components',
    label: 'UI Components',
    description: 'Copy-paste & component libraries for React, Vue, Tailwind, and more',
    gradient: 'from-violet-600 to-indigo-600',
    icon: 'layout-dashboard',
  },
  {
    id: 'icons-illustrations',
    label: 'Icons & Illustrations',
    description: 'Beautiful free icons, illustrations, and SVG resources',
    gradient: 'from-emerald-500 to-teal-600',
    icon: 'palette',
  },
  {
    id: 'fonts-typography',
    label: 'Fonts & Typography',
    description: 'Free fonts, typefaces, and typography tools for any project',
    gradient: 'from-pink-500 to-rose-600',
    icon: 'text',
  },
  {
    id: 'colors-palettes',
    label: 'Colors & Palettes',
    description: 'Color systems, palette generators, and contrast tools',
    gradient: 'from-yellow-500 to-orange-600',
    icon: 'paintbrush',
  },
  {
    id: 'animation-motion',
    label: 'Animation & Motion',
    description: 'Animation libraries for smooth, engaging user experiences',
    gradient: 'from-orange-500 to-rose-600',
    icon: 'sparkles',
  },
  {
    id: 'transitions-effects',
    label: 'Transitions & Effects',
    description: 'CSS transitions, hover effects, and micro-interactions',
    gradient: 'from-cyan-500 to-blue-600',
    icon: 'zap',
  },
  {
    id: '3d-canvas-fx',
    label: '3D, Canvas & Special FX',
    description: '3D rendering, particle effects, and interactive graphics',
    gradient: 'from-blue-600 to-cyan-500',
    icon: 'cube-3d',
  },
  {
    id: 'charts-data-viz',
    label: 'Charts & Data Viz',
    description: 'Chart libraries and data visualization tools',
    gradient: 'from-purple-500 to-fuchsia-600',
    icon: 'bar-chart-3',
  },
  {
    id: 'images-media',
    label: 'Images & Media',
    description: 'Free stock photos, SVGs, and media resources',
    gradient: 'from-green-500 to-emerald-600',
    icon: 'image',
  },
  {
    id: 'gradients-patterns',
    label: 'Gradients & Patterns',
    description: 'Gradient generators, pattern libraries, and textures',
    gradient: 'from-indigo-500 to-purple-600',
    icon: 'droplets',
  },
  {
    id: 'forms-validation',
    label: 'Forms & Validation',
    description: 'Form libraries, validation, and input masking tools',
    gradient: 'from-red-500 to-pink-600',
    icon: 'file-text',
  },
  {
    id: 'layout-grid',
    label: 'Layout & Grid',
    description: 'CSS frameworks, grid systems, and layout generators',
    gradient: 'from-sky-500 to-indigo-600',
    icon: 'columns-3',
  },
  {
    id: 'design-inspiration',
    label: 'Design Inspiration',
    description: 'Curated galleries, references, and design showcases',
    gradient: 'from-amber-500 to-yellow-600',
    icon: 'lightbulb',
  },
  {
    id: 'prototyping',
    label: 'Prototyping & Preview',
    description: 'Tools for prototyping, previewing, and testing designs',
    gradient: 'from-teal-500 to-cyan-600',
    icon: 'monitor',
  },
];

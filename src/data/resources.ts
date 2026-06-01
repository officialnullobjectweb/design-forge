export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: 'ui-components' | 'icons-illustrations' | 'animation-motion' | '3d-canvas-fx';
  tags: string[];
  installHint?: string;
  isFree: true;
}

export type CategoryInfo = {
  id: Resource['category'];
  label: string;
  description: string;
  gradient: string;
  icon: string;
};

export const categories: CategoryInfo[] = [
  {
    id: 'ui-components',
    label: 'UI Components',
    description: 'Copy-paste & component libraries for React, Tailwind, and more',
    gradient: 'from-violet-600 to-indigo-600',
    icon: 'layout-dashboard',
  },
  {
    id: 'icons-illustrations',
    label: 'Icons & Illustrations',
    description: 'Beautiful free icons and SVG illustrations for any project',
    gradient: 'from-emerald-500 to-teal-600',
    icon: 'palette',
  },
  {
    id: 'animation-motion',
    label: 'Animation & Motion',
    description: 'Animation libraries for smooth, engaging user experiences',
    gradient: 'from-orange-500 to-rose-600',
    icon: 'sparkles',
  },
  {
    id: '3d-canvas-fx',
    label: '3D, Canvas & Special FX',
    description: '3D rendering, particle effects, charts, and interactive graphics',
    gradient: 'from-blue-600 to-cyan-500',
    icon: 'cube-3d',
  },
];

export const resources: Resource[] = [
  // ===== UI Components =====
  {
    id: 'shadcn-ui',
    name: 'shadcn/ui',
    description:
      'Copy-paste React components built with Radix UI and Tailwind CSS. The gold standard for modern UI.',
    url: 'https://ui.shadcn.com',
    icon: 'https://ui.shadcn.com/favicon.ico',
    category: 'ui-components',
    tags: ['react', 'tailwind', 'radix', 'components'],
    installHint: 'npx shadcn@latest init',
    isFree: true,
  },
  {
    id: 'aceternity-ui',
    name: 'Aceternity UI',
    description:
      'Stunning animated React components with Framer Motion. Perfect for premium landing pages.',
    url: 'https://ui.aceternity.com',
    icon: 'https://ui.aceternity.com/favicon.ico',
    category: 'ui-components',
    tags: ['react', 'framer-motion', 'animations', 'landing-pages'],
    installHint: 'npm i @aceternity/ui',
    isFree: true,
  },
  {
    id: 'magicui',
    name: 'MagicUI',
    description:
      'Magical animations — sparkles, meteors, glows, beams. Drop-in React components.',
    url: 'https://magicui.design',
    icon: 'https://magicui.design/favicon.ico',
    category: 'ui-components',
    tags: ['react', 'animations', 'sparkles', 'magic-effects'],
    installHint: 'npm i magicui',
    isFree: true,
  },
  {
    id: 'daisyui',
    name: 'DaisyUI',
    description:
      'Tailwind CSS component classes. 50+ components, 35+ themes. Zero JS for basic use.',
    url: 'https://daisyui.com',
    icon: 'https://daisyui.com/favicon.ico',
    category: 'ui-components',
    tags: ['tailwind', 'css', 'themes', 'no-js'],
    installHint: 'npm i daisyui',
    isFree: true,
  },
  {
    id: 'flowbite',
    name: 'Flowbite',
    description:
      '1000+ Tailwind CSS components with HTML, React, Vue, and Figma versions.',
    url: 'https://flowbite.com',
    icon: 'https://flowbite.com/favicon.ico',
    category: 'ui-components',
    tags: ['tailwind', 'react', 'vue', 'figma', 'components'],
    installHint: 'npm i flowbite',
    isFree: true,
  },
  // ===== Icons & Illustrations =====
  {
    id: 'lucide-icons',
    name: 'Lucide Icons',
    description:
      '5000+ beautiful, consistent icons. Tree-shakeable React, Vue, Svelte, and SVG.',
    url: 'https://lucide.dev',
    icon: 'https://lucide.dev/favicon.ico',
    category: 'icons-illustrations',
    tags: ['icons', 'react', 'vue', 'svg', 'tree-shakeable'],
    installHint: 'npm i lucide-react',
    isFree: true,
  },
  {
    id: 'tabler-icons',
    name: 'Tabler Icons',
    description:
      '5800+ MIT-licensed icons in outline and filled styles. React, Vue, and SVG.',
    url: 'https://tabler.io/icons',
    icon: 'https://tabler.io/favicon.ico',
    category: 'icons-illustrations',
    tags: ['icons', 'react', 'vue', 'svg', 'outline'],
    installHint: 'npm i @tabler/icons-react',
    isFree: true,
  },
  {
    id: 'heroicons',
    name: 'Heroicons',
    description:
      "Tailwind CSS's official icon set. 292 icons in outline and solid variants.",
    url: 'https://heroicons.com',
    icon: 'https://heroicons.com/favicon.ico',
    category: 'icons-illustrations',
    tags: ['icons', 'tailwind', 'svg', 'outline', 'solid'],
    installHint: 'npm i @heroicons/react',
    isFree: true,
  },
  {
    id: 'storyset',
    name: 'Storyset',
    description:
      'Free animated SVG illustrations with customizable colors. Perfect for empty states and hero sections.',
    url: 'https://storyset.com',
    icon: 'https://storyset.com/favicon.ico',
    category: 'icons-illustrations',
    tags: ['illustrations', 'svg', 'animations', 'customizable'],
    isFree: true,
  },
  {
    id: 'undraw',
    name: 'unDraw',
    description:
      'Open-source SVG illustrations with any color. Free forever, no attribution required.',
    url: 'https://undraw.co',
    icon: 'https://undraw.co/favicon.ico',
    category: 'icons-illustrations',
    tags: ['illustrations', 'svg', 'open-source', 'color-customization'],
    isFree: true,
  },
  // ===== Animation & Motion =====
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    description:
      'Production-grade React animation library with gestures, spring physics, and layout animations.',
    url: 'https://motion.dev',
    icon: 'https://motion.dev/favicon.ico',
    category: 'animation-motion',
    tags: ['react', 'animations', 'gestures', 'spring-physics'],
    installHint: 'npm i framer-motion',
    isFree: true,
  },
  {
    id: 'gsap',
    name: 'GSAP',
    description:
      'Professional-grade animation library. ScrollTrigger, timeline, and more. Free for localhost.',
    url: 'https://gsap.com',
    icon: 'https://gsap.com/favicon.ico',
    category: 'animation-motion',
    tags: ['animations', 'scroll-trigger', 'timeline', 'professional'],
    installHint: 'npm i gsap',
    isFree: true,
  },
  {
    id: 'auto-animate',
    name: 'AutoAnimate',
    description:
      'One line of code — automatic smooth animations for any UI. Zero configuration needed.',
    url: 'https://auto-animate.formkit.com',
    icon: 'https://auto-animate.formkit.com/favicon.ico',
    category: 'animation-motion',
    tags: ['animations', 'zero-config', 'auto', 'transitions'],
    installHint: 'npm i @formkit/auto-animate',
    isFree: true,
  },
  {
    id: 'lottie',
    name: 'LottieFiles',
    description:
      'JSON animations exported from After Effects. Massive free library of high-quality animations.',
    url: 'https://lottiefiles.com',
    icon: 'https://lottiefiles.com/favicon.ico',
    category: 'animation-motion',
    tags: ['animations', 'after-effects', 'json', 'motion-graphics'],
    installHint: 'npm i lottie-react',
    isFree: true,
  },
  // ===== 3D, Canvas & Special FX =====
  {
    id: 'threejs',
    name: 'Three.js',
    description:
      'The most popular 3D JavaScript library. Create 3D scenes, models, and immersive experiences.',
    url: 'https://threejs.org',
    icon: 'https://threejs.org/favicon.ico',
    category: '3d-canvas-fx',
    tags: ['3d', 'webgl', 'canvas', 'rendering', 'scenes'],
    installHint: 'npm i three',
    isFree: true,
  },
  {
    id: 'react-three-fiber',
    name: 'React Three Fiber',
    description:
      'Three.js as declarative React components. Build 3D scenes with React patterns.',
    url: 'https://r3f.docs.pmnd.rs',
    icon: 'https://r3f.docs.pmnd.rs/favicon.ico',
    category: '3d-canvas-fx',
    tags: ['3d', 'react', 'threejs', 'declarative', 'components'],
    installHint: 'npm i @react-three/fiber three',
    isFree: true,
  },
  {
    id: 'tsparticles',
    name: 'tsParticles',
    description:
      'Particle effects — confetti, snow, stars, connections. Lightweight and highly customizable.',
    url: 'https://particles.js.org',
    icon: 'https://particles.js.org/favicon.ico',
    category: '3d-canvas-fx',
    tags: ['particles', 'effects', 'canvas', 'confetti', 'backgrounds'],
    installHint: 'npm i @tsparticles/react',
    isFree: true,
  },
  {
    id: 'recharts',
    name: 'Recharts',
    description:
      'Composable React chart library. All chart types. Declarative, customizable, fully free.',
    url: 'https://recharts.org',
    icon: 'https://recharts.org/favicon.ico',
    category: '3d-canvas-fx',
    tags: ['charts', 'react', 'data-viz', 'declarative', 'svg'],
    installHint: 'npm i recharts',
    isFree: true,
  },
];

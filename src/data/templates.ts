export interface Template {
  id: string;
  name: string;
  description: string;
  url: string;
  preview?: string;
  category: 'landing-page' | 'dashboard' | 'ecommerce' | 'portfolio' | 'blog' | 'saas' | 'admin' | 'mobile' | 'email';
  tech: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  includesDesignFile: boolean;
  designFileType?: 'figma' | 'sketch' | 'xd' | 'html';
  source: 'html5up' | 'cruip' | 'start-bootstrap' | 'tailwind-toolbox' | 'free-css' | 'colorlib' | 'templated' | 'astro' | 'other';
  tags: string[];
  isFree: true;
}

export const templates: Template[] = [
  // ===== Landing Pages =====
  {
    id: 'html5up-dimension',
    name: 'Dimension',
    description: 'A stylish, one-page landing template with a minimalist design. Perfect for personal branding.',
    url: 'https://html5up.net/dimension',
    category: 'landing-page',
    tech: ['html', 'css', 'js'],
    difficulty: 'beginner',
    includesDesignFile: false,
    source: 'html5up',
    tags: ['minimalist', 'one-page', 'personal', 'creative'],
    isFree: true,
  },
  {
    id: 'html5up-massively',
    name: 'Massively',
    description: 'A bold, magazine-style landing page for portfolios, blogs, or creative agencies.',
    url: 'https://html5up.net/massively',
    category: 'landing-page',
    tech: ['html', 'css', 'js'],
    difficulty: 'beginner',
    includesDesignFile: false,
    source: 'html5up',
    tags: ['bold', 'magazine', 'portfolio', 'creative'],
    isFree: true,
  },
  {
    id: 'html5up-forty',
    name: 'Forty',
    description: 'A vibrant, multi-color landing page with a grid-based layout for agencies.',
    url: 'https://html5up.net/forty',
    category: 'landing-page',
    tech: ['html', 'css', 'js'],
    difficulty: 'beginner',
    includesDesignFile: false,
    source: 'html5up',
    tags: ['vibrant', 'grid', 'agency', 'colorful'],
    isFree: true,
  },
  {
    id: 'cruip-free',
    name: 'Cruip Open-Source Templates',
    description: 'Collection of 10+ free React and Tailwind landing page templates.',
    url: 'https://cruip.com/free-templates',
    category: 'landing-page',
    tech: ['react', 'tailwind', 'nextjs'],
    difficulty: 'intermediate',
    includesDesignFile: true,
    designFileType: 'figma',
    source: 'cruip',
    tags: ['react', 'tailwind', 'modern', 'figma'],
    isFree: true,
  },
  {
    id: 'start-bootstrap-landing',
    name: 'Start Bootstrap Landing Page',
    description: 'Clean, responsive landing page built with Bootstrap 5.',
    url: 'https://startbootstrap.com/theme/landing-page',
    category: 'landing-page',
    tech: ['bootstrap', 'html', 'css'],
    difficulty: 'beginner',
    includesDesignFile: false,
    source: 'start-bootstrap',
    tags: ['bootstrap', 'clean', 'responsive', 'landing'],
    isFree: true,
  },
  // ===== SaaS Pages =====
  {
    id: 'cruip-saas',
    name: 'Cruip SaaS Templates',
    description: 'Multiple free SaaS landing pages with React, Tailwind, and Figma files.',
    url: 'https://cruip.com/free-templates',
    category: 'saas',
    tech: ['react', 'tailwind', 'nextjs', 'figma'],
    difficulty: 'intermediate',
    includesDesignFile: true,
    designFileType: 'figma',
    source: 'cruip',
    tags: ['saas', 'react', 'figma', 'modern'],
    isFree: true,
  },
  {
    id: 'tailwind-saas',
    name: 'Tailwind Toolbox SaaS',
    description: 'SaaS landing page template built with Tailwind CSS.',
    url: 'https://www.tailwindtoolbox.com/templates/saas-landing-page',
    category: 'saas',
    tech: ['tailwind', 'html', 'css'],
    difficulty: 'beginner',
    includesDesignFile: false,
    source: 'tailwind-toolbox',
    tags: ['saas', 'tailwind', 'landing', 'responsive'],
    isFree: true,
  },
  // ===== Dashboards =====
  {
    id: 'start-bootstrap-sb-admin',
    name: 'SB Admin',
    description: 'Free admin dashboard template. Charts, tables, and UI components built in.',
    url: 'https://startbootstrap.com/theme/sb-admin-2',
    category: 'admin',
    tech: ['bootstrap', 'html', 'css', 'chartjs'],
    difficulty: 'intermediate',
    includesDesignFile: false,
    source: 'start-bootstrap',
    tags: ['admin', 'dashboard', 'bootstrap', 'charts'],
    isFree: true,
  },
  {
    id: 'colorlib-admin',
    name: 'Colorlib Admin Templates',
    description: 'Collection of free admin dashboard templates for various use cases.',
    url: 'https://colorlib.com/wp/free-admin-templates',
    category: 'admin',
    tech: ['html', 'css', 'bootstrap'],
    difficulty: 'intermediate',
    includesDesignFile: false,
    source: 'colorlib',
    tags: ['admin', 'dashboard', 'bootstrap', 'responsive'],
    isFree: true,
  },
  {
    id: 'free-css-dashboard',
    name: 'Free-CSS Dashboard Templates',
    description: 'Dashboard and admin templates collected from across the web.',
    url: 'https://www.free-css.com/free-css-templates?category=dashboard',
    category: 'admin',
    tech: ['html', 'css', 'js'],
    difficulty: 'beginner',
    includesDesignFile: false,
    source: 'free-css',
    tags: ['dashboard', 'admin', 'html', 'responsive'],
    isFree: true,
  },
  // ===== Portfolios =====
  {
    id: 'html5up-read-only',
    name: 'Read Only',
    description: 'A clean, minimal portfolio template ideal for developers and designers.',
    url: 'https://html5up.net/read-only',
    category: 'portfolio',
    tech: ['html', 'css', 'js'],
    difficulty: 'beginner',
    includesDesignFile: false,
    source: 'html5up',
    tags: ['portfolio', 'minimal', 'developer', 'personal'],
    isFree: true,
  },
  {
    id: 'templated-portfolio',
    name: 'Templated Portfolio',
    description: 'Portfolio templates with masonry grids, hover effects, and galleries.',
    url: 'https://templated.co/category/portfolio',
    category: 'portfolio',
    tech: ['html', 'css'],
    difficulty: 'beginner',
    includesDesignFile: false,
    source: 'templated',
    tags: ['portfolio', 'masonry', 'gallery', 'minimal'],
    isFree: true,
  },
  // ===== E-commerce =====
  {
    id: 'start-bootstrap-shop',
    name: 'Start Bootstrap Shop',
    description: 'E-commerce homepage and product listing templates built with Bootstrap.',
    url: 'https://startbootstrap.com/theme/shop-homepage',
    category: 'ecommerce',
    tech: ['bootstrap', 'html', 'css'],
    difficulty: 'beginner',
    includesDesignFile: false,
    source: 'start-bootstrap',
    tags: ['ecommerce', 'shop', 'bootstrap', 'product'],
    isFree: true,
  },
  // ===== Blog =====
  {
    id: 'html5up-astral',
    name: 'Astral',
    description: 'A clean blog template with a focus on readability and typography.',
    url: 'https://html5up.net/astral',
    category: 'blog',
    tech: ['html', 'css', 'js'],
    difficulty: 'beginner',
    includesDesignFile: false,
    source: 'html5up',
    tags: ['blog', 'readable', 'typography', 'clean'],
    isFree: true,
  },
  {
    id: 'astro-blog-template',
    name: 'Astro Blog Templates',
    description: 'Free blog templates built with Astro. Fast, modern, Markdown-powered.',
    url: 'https://astro.build/themes?search=&categories%5B%5D=blog',
    category: 'blog',
    tech: ['astro', 'tailwind', 'mdx'],
    difficulty: 'intermediate',
    includesDesignFile: false,
    source: 'astro',
    tags: ['blog', 'astro', 'markdown', 'fast'],
    isFree: true,
  },
  // ===== Mobile =====
  {
    id: 'dribbble-mobile-ui',
    name: 'Dribbble Mobile UI Kits',
    description: 'Free mobile app UI kits and screen designs for iOS and Android.',
    url: 'https://dribbble.com/search/free-mobile-ui-kit',
    category: 'mobile',
    tech: ['figma', 'sketch'],
    difficulty: 'beginner',
    includesDesignFile: true,
    designFileType: 'figma',
    source: 'other',
    tags: ['mobile', 'ui-kit', 'figma', 'ios', 'android'],
    isFree: true,
  },
  // ===== Email =====
  {
    id: 'cerberus-email',
    name: 'Cerberus Email Templates',
    description: 'Free responsive email templates that work across all major email clients.',
    url: 'https://www.cerberusemail.com',
    category: 'email',
    tech: ['html', 'css', 'mjml'],
    difficulty: 'beginner',
    includesDesignFile: false,
    source: 'other',
    tags: ['email', 'responsive', 'newsletter', 'transactional'],
    isFree: true,
  },
];

export function getTemplatesByCategory(cat: Template['category']) {
  return templates.filter((t) => t.category === cat);
}

export function getTemplatesByTech(tech: string) {
  return templates.filter((t) => t.tech.includes(tech));
}

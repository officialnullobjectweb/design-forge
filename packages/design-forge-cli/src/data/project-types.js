const PROJECT_TYPES = [
  {
    id: 'landing-page',
    label: 'Landing Page',
    description: 'Single-page marketing site with hero, features, CTA — perfect for a product or startup',
    icon: '📄',
    category: 'marketing',
    complexity: 'simple',
    defaultPages: ['/'],
    suggestedSections: ['hero', 'features', 'pricing', 'testimonials', 'faq', 'cta', 'footer', 'stats', 'logo-cloud', 'waitlist'],
    sharedDeps: ['tailwindcss', 'framer-motion', 'lucide-react', 'clsx-tailwind-merge'],
  },
  {
    id: 'multi-page-site',
    label: 'Multi-Page Business Site',
    description: 'Full business website with Home, About, Services, Contact, Blog pages',
    icon: '🏢',
    category: 'marketing',
    complexity: 'medium',
    defaultPages: ['/', '/about', '/services', '/contact', '/blog'],
    suggestedSections: ['hero', 'features', 'testimonials', 'team', 'contact', 'footer', 'logo-cloud', 'blog-preview'],
    sharedDeps: ['tailwindcss', 'framer-motion', 'lucide-react', 'clsx-tailwind-merge'],
  },
  {
    id: 'saas-dashboard',
    label: 'SaaS Dashboard',
    description: 'Web application with authentication, sidebar navigation, analytics charts, user management',
    icon: '📊',
    category: 'webapp',
    complexity: 'complex',
    defaultPages: ['/', '/dashboard', '/dashboard/analytics', '/dashboard/settings', '/dashboard/users', '/login', '/signup'],
    suggestedSections: ['sidebar', 'stats-cards', 'charts', 'data-table', 'user-menu', 'notifications'],
    sharedDeps: ['tailwindcss', 'framer-motion', 'lucide-react', 'recharts', 'react-hook-form', 'zod', 'next-auth'],
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce Store',
    description: 'Online store with product listings, cart, checkout flow, and payment integration',
    icon: '🛒',
    category: 'webapp',
    complexity: 'complex',
    defaultPages: ['/', '/products', '/products/[slug]', '/cart', '/checkout', '/account/orders'],
    suggestedSections: ['hero', 'product-grid', 'product-card', 'cart', 'checkout', 'footer', 'testimonials', 'newsletter'],
    sharedDeps: ['tailwindcss', 'framer-motion', 'lucide-react', 'react-hook-form', 'zod', 'stripe'],
  },
  {
    id: 'admin-panel',
    label: 'Admin Panel',
    description: 'Internal admin dashboard with CRUD tables, user management, analytics, and role-based access',
    icon: '⚙️',
    category: 'webapp',
    complexity: 'complex',
    defaultPages: ['/', '/users', '/products', '/analytics', '/settings', '/login'],
    suggestedSections: ['sidebar', 'data-table', 'stats-cards', 'charts', 'user-menu', 'forms'],
    sharedDeps: ['tailwindcss', 'lucide-react', 'recharts', 'react-hook-form', 'zod'],
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    description: 'Personal or agency portfolio showcasing work, with gallery and contact form',
    icon: '🎨',
    category: 'personal',
    complexity: 'simple',
    defaultPages: ['/', '/work', '/work/[slug]', '/contact'],
    suggestedSections: ['hero', 'projects-gallery', 'testimonials', 'contact', 'footer', 'stats'],
    sharedDeps: ['tailwindcss', 'framer-motion', 'lucide-react', 'clsx-tailwind-merge'],
  },
  {
    id: 'blog',
    label: 'Blog / Content Site',
    description: 'Content-driven site with article listings, markdown or CMS-powered posts',
    icon: '✍️',
    category: 'content',
    complexity: 'medium',
    defaultPages: ['/', '/blog', '/blog/[slug]', '/about', '/contact'],
    suggestedSections: ['hero', 'blog-list', 'blog-post', 'newsletter', 'footer', 'sidebar-widget'],
    sharedDeps: ['tailwindcss', 'lucide-react', 'clsx-tailwind-merge'],
  },
  {
    id: 'web-app',
    label: 'Custom Web Application',
    description: 'Any custom web app — CRUD, SaaS tool, marketplace, social platform, etc.',
    icon: '🌐',
    category: 'webapp',
    complexity: 'complex',
    defaultPages: ['/', '/login', '/signup', '/dashboard'],
    suggestedSections: ['hero', 'sidebar', 'forms', 'data-table', 'auth-pages'],
    sharedDeps: ['tailwindcss', 'framer-motion', 'lucide-react', 'react-hook-form', 'zod', 'next-auth'],
  },
]

function getTypeById(id) {
  return PROJECT_TYPES.find(t => t.id === id)
}

function getTypesByCategory(category) {
  return PROJECT_TYPES.filter(t => t.category === category)
}

module.exports = { PROJECT_TYPES, getTypeById, getTypesByCategory }

const FEATURES = {
  authentication: {
    label: 'Authentication',
    description: 'Login, signup, password reset, session management',
    icon: '🔐',
    group: 'auth',
    packages: ['next-auth', 'bcryptjs'],
    sections: ['login-page', 'signup-page', 'forgot-password'],
    routes: ['/login', '/signup', '/forgot-password', '/reset-password'],
  },
  oauth: {
    label: 'Social Login (OAuth)',
    description: 'Login with Google, GitHub, Twitter, etc.',
    icon: '🔑',
    group: 'auth',
    dependsOn: ['authentication'],
    packages: ['next-auth'],
    sections: ['social-login-buttons'],
  },
  payment: {
    label: 'Payments',
    description: 'Stripe/PayPal integration for one-time and subscription payments',
    icon: '💳',
    group: 'commerce',
    packages: ['stripe', '@stripe/stripe-js'],
    sections: ['payment-form', 'pricing-cards'],
    routes: ['/checkout', '/payment/success', '/payment/cancel'],
  },
  cart: {
    label: 'Shopping Cart',
    description: 'Add to cart, remove, quantity updates, cart persistence',
    icon: '🛒',
    group: 'commerce',
    packages: ['zustand'],
    sections: ['cart-drawer', 'cart-page', 'product-card'],
    routes: ['/cart'],
  },
  productCatalog: {
    label: 'Product Catalog',
    description: 'Product listings, categories, search, filters, product detail pages',
    icon: '📦',
    group: 'commerce',
    packages: [],
    sections: ['product-grid', 'product-card', 'product-detail', 'product-filters'],
    routes: ['/products', '/products/[slug]', '/products/category/[category]'],
  },
  blog: {
    label: 'Blog / CMS',
    description: 'Blog posts, categories, tags, search, RSS feed',
    icon: '📝',
    group: 'content',
    packages: ['next-mdx-remote', 'rehype-highlight'],
    sections: ['blog-list', 'blog-post', 'blog-sidebar', 'blog-search'],
    routes: ['/blog', '/blog/[slug]', '/blog/category/[category]'],
  },
  newsletter: {
    label: 'Newsletter / Email',
    description: 'Email signup, subscription management, email templates',
    icon: '📧',
    group: 'communication',
    packages: ['@react-email/components'],
    sections: ['newsletter-form', 'email-template'],
  },
  contactForm: {
    label: 'Contact Form',
    description: 'Contact form with validation, spam protection, email notification',
    icon: '📬',
    group: 'communication',
    packages: ['react-hook-form', 'zod', 'resend'],
    sections: ['contact-form', 'contact-info'],
    routes: ['/contact'],
  },
  darkMode: {
    label: 'Dark Mode',
    description: 'Light/dark theme toggle, system preference detection, persistent preference',
    icon: '🌓',
    group: 'ui-ux',
    packages: ['next-themes'],
    sections: ['theme-toggle'],
  },
  animations: {
    label: 'Animations & Transitions',
    description: 'Scroll animations, page transitions, micro-interactions, hover effects',
    icon: '✨',
    group: 'ui-ux',
    packages: ['framer-motion', '@formkit/auto-animate'],
    sections: ['animated-sections'],
  },
  parallax: {
    label: 'Parallax Effects',
    description: 'Scroll-driven parallax, depth layering, mouse parallax',
    icon: '🏔️',
    group: 'ui-ux',
    packages: ['framer-motion', 'gsap'],
    sections: ['parallax-hero'],
  },
  threeD: {
    label: '3D / WebGL',
    description: '3D models, interactive WebGL scenes, particles, canvas effects',
    icon: '🧊',
    group: 'media',
    packages: ['three', '@react-three/fiber', '@react-three/drei'],
    sections: ['three-scene', 'particles-bg'],
  },
  analytics: {
    label: 'Analytics',
    description: 'Page view tracking, custom events, dashboard with charts',
    icon: '📈',
    group: 'analytics',
    packages: ['recharts', 'lucide-react'],
    sections: ['analytics-dashboard', 'charts'],
    routes: ['/analytics'],
  },
  seo: {
    label: 'SEO Optimization',
    description: 'Meta tags, Open Graph, JSON-LD structured data, sitemap, robots.txt',
    icon: '🔍',
    group: 'analytics',
    packages: ['next-seo'],
    sections: [],
  },
  search: {
    label: 'Site Search',
    description: 'Full-text search across pages and content with keyboard shortcut',
    icon: '🔎',
    group: 'content',
    packages: ['@orama/orama', 'lucide-react'],
    sections: ['search-modal'],
  },
  fileUpload: {
    label: 'File Upload',
    description: 'Image/file upload with drag-and-drop, preview, progress bar',
    icon: '📎',
    group: 'media',
    packages: ['react-dropzone', 'uploadthing'],
    sections: ['file-upload', 'image-gallery'],
  },
  reviews: {
    label: 'Reviews & Ratings',
    description: 'User reviews, star ratings, review forms, average rating display',
    icon: '⭐',
    group: 'social',
    packages: ['react-hook-form', 'zod'],
    sections: ['reviews-section', 'rating-display'],
  },
  i18n: {
    label: 'Internationalization (i18n)',
    description: 'Multi-language support, locale detection, translation management',
    icon: '🌍',
    group: 'advanced',
    packages: ['next-intl'],
    sections: [],
  },
  pwa: {
    label: 'PWA Support',
    description: 'Progressive Web App — offline support, install prompt, service worker',
    icon: '📱',
    group: 'advanced',
    packages: ['next-pwa'],
    sections: [],
  },
}

const FEATURE_GROUPS = [
  { id: 'auth', label: 'Authentication & Users', icon: '🔐' },
  { id: 'commerce', label: 'Commerce & Payments', icon: '💳' },
  { id: 'content', label: 'Content & Blog', icon: '📝' },
  { id: 'ui-ux', label: 'UI/UX & Animations', icon: '✨' },
  { id: 'communication', label: 'Communication', icon: '📬' },
  { id: 'analytics', label: 'Analytics & SEO', icon: '📈' },
  { id: 'media', label: 'Media & 3D', icon: '🧊' },
  { id: 'social', label: 'Social & Community', icon: '💬' },
  { id: 'advanced', label: 'Advanced', icon: '⚡' },
]

function getFeaturesByGroup() {
  const grouped = {}
  FEATURE_GROUPS.forEach(g => { grouped[g.id] = { ...g, features: [] } })
  Object.entries(FEATURES).forEach(([key, val]) => {
    if (grouped[val.group]) grouped[val.group].features.push({ id: key, ...val })
  })
  return Object.values(grouped)
}

function getFeatureById(id) {
  const entry = Object.entries(FEATURES).find(([key]) => key === id)
  return entry ? { id: entry[0], ...entry[1] } : null
}

function getFeaturePackages(selectedIds) {
  const packages = new Set()
  selectedIds.forEach(id => {
    const feat = getFeatureById(id)
    if (feat && feat.packages) feat.packages.forEach(p => packages.add(p))
  })
  return [...packages]
}

module.exports = { FEATURES, FEATURE_GROUPS, getFeaturesByGroup, getFeatureById, getFeaturePackages }

const SECTIONS = {
  // --- Marketing / Landing ---
  hero: {
    id: 'hero',
    label: 'Hero Section',
    description: 'Main headline, subtitle, CTA buttons, optional background image or animation',
    icon: '🎯',
    category: 'marketing',
    packages: [],
    variants: ['centered', 'split', 'fullscreen', 'with-image', 'with-animation'],
    suitableFor: ['landing-page', 'multi-page-site', 'saas-dashboard', 'portfolio', 'web-app'],
  },
  features: {
    id: 'features',
    label: 'Features Grid',
    description: 'Grid of features/benefits with icons, titles, and descriptions',
    icon: '⭐',
    category: 'marketing',
    packages: [],
    variants: ['grid-3', 'grid-4', 'grid-with-icons', 'grid-with-images', 'alternating-rows'],
    suitableFor: ['landing-page', 'multi-page-site', 'saas-dashboard', 'web-app'],
  },
  pricing: {
    id: 'pricing',
    label: 'Pricing Section',
    description: 'Pricing tiers comparison with feature lists and CTA buttons',
    icon: '💰',
    category: 'marketing',
    packages: [],
    variants: ['three-tier', 'two-tier', 'four-tier', 'with-toggle'],
    suitableFor: ['landing-page', 'multi-page-site', 'saas-dashboard'],
  },
  testimonials: {
    id: 'testimonials',
    label: 'Testimonials',
    description: 'Customer quotes, reviews, case study snippets with avatars',
    icon: '💬',
    category: 'marketing',
    packages: [],
    variants: ['carousel', 'grid', 'single-featured', 'marquee'],
    suitableFor: ['landing-page', 'multi-page-site', 'saas-dashboard', 'ecommerce', 'portfolio'],
  },
  faq: {
    id: 'faq',
    label: 'FAQ Section',
    description: 'Expandable accordion of frequently asked questions',
    icon: '❓',
    category: 'marketing',
    packages: [],
    variants: ['simple-accordion', 'categorized', 'two-column'],
    suitableFor: ['landing-page', 'multi-page-site', 'saas-dashboard', 'ecommerce'],
  },
  cta: {
    id: 'cta',
    label: 'Call-to-Action',
    description: 'Banner prompting user action with headline and button',
    icon: '🚀',
    category: 'marketing',
    packages: [],
    variants: ['simple', 'with-image', 'split'],
    suitableFor: ['landing-page', 'multi-page-site', 'saas-dashboard', 'portfolio', 'ecommerce'],
  },
  stats: {
    id: 'stats',
    label: 'Statistics / Metrics',
    description: 'Number counters showing key metrics, achievements, or milestones',
    icon: '📊',
    category: 'marketing',
    packages: [],
    variants: ['row', 'grid', 'with-icons'],
    suitableFor: ['landing-page', 'multi-page-site', 'saas-dashboard', 'portfolio'],
  },
  logoCloud: {
    id: 'logo-cloud',
    label: 'Logo Cloud',
    description: 'Row of company logos, partner logos, or brand mentions',
    icon: '🏢',
    category: 'marketing',
    packages: [],
    variants: ['simple-row', 'marquee', 'grid'],
    suitableFor: ['landing-page', 'multi-page-site', 'saas-dashboard'],
  },
  waitlist: {
    id: 'waitlist',
    label: 'Waitlist / Early Access',
    description: 'Email capture for product launch waitlist with count and social proof',
    icon: '📋',
    category: 'marketing',
    packages: [],
    variants: ['simple', 'with-count', 'with-benefits'],
    suitableFor: ['landing-page', 'saas-dashboard'],
  },
  team: {
    id: 'team',
    label: 'Team Section',
    description: 'Team member cards with photos, roles, and social links',
    icon: '👥',
    category: 'marketing',
    packages: [],
    variants: ['grid', 'carousel', 'list'],
    suitableFor: ['multi-page-site', 'portfolio', 'landing-page'],
  },
  contact: {
    id: 'contact',
    label: 'Contact Section',
    description: 'Contact form, address, phone, email, map embed',
    icon: '📬',
    category: 'marketing',
    packages: ['react-hook-form', 'zod'],
    variants: ['simple-form', 'split-with-info', 'with-map'],
    suitableFor: ['multi-page-site', 'portfolio', 'landing-page', 'blog'],
  },
  newsletter: {
    id: 'newsletter',
    label: 'Newsletter Signup',
    description: 'Email capture form with incentive, social proof, and privacy note',
    icon: '📧',
    category: 'marketing',
    packages: [],
    variants: ['inline', 'modal', 'section-banner'],
    suitableFor: ['landing-page', 'blog', 'multi-page-site'],
  },

  // --- Dashboard / Admin ---
  sidebar: {
    id: 'sidebar',
    label: 'Sidebar Navigation',
    description: 'Collapsible sidebar with navigation links, icons, user avatar',
    icon: '📑',
    category: 'navigation',
    packages: [],
    variants: ['default', 'collapsed', 'with-groups', 'with-icons-only'],
    suitableFor: ['saas-dashboard', 'admin-panel', 'web-app'],
  },
  statsCards: {
    id: 'stats-cards',
    label: 'Stats Cards',
    description: 'Dashboard metric cards with numbers, trends, sparklines',
    icon: '📈',
    category: 'data',
    packages: ['recharts', 'lucide-react'],
    variants: ['simple', 'with-chart', 'with-trend', 'with-icon'],
    suitableFor: ['saas-dashboard', 'admin-panel'],
  },
  charts: {
    id: 'charts',
    label: 'Charts & Graphs',
    description: 'Line, bar, pie, area charts for data visualization',
    icon: '📉',
    category: 'data',
    packages: ['recharts'],
    variants: ['line', 'bar', 'pie', 'area', 'mixed'],
    suitableFor: ['saas-dashboard', 'admin-panel'],
  },
  dataTable: {
    id: 'data-table',
    label: 'Data Table',
    description: 'Sortable, filterable table with pagination, search, and row actions',
    icon: '📋',
    category: 'data',
    packages: [],
    variants: ['simple', 'with-search', 'with-pagination', 'with-actions'],
    suitableFor: ['saas-dashboard', 'admin-panel', 'ecommerce', 'web-app'],
  },
  userMenu: {
    id: 'user-menu',
    label: 'User Menu',
    description: 'Avatar dropdown with profile, settings, logout',
    icon: '👤',
    category: 'navigation',
    packages: [],
    variants: ['dropdown', 'sidebar-integrated'],
    suitableFor: ['saas-dashboard', 'admin-panel', 'web-app', 'ecommerce'],
  },
  notifications: {
    id: 'notifications',
    label: 'Notifications Panel',
    description: 'Notification bell with dropdown, read/unread states, real-time updates',
    icon: '🔔',
    category: 'navigation',
    packages: [],
    variants: ['bell-dropdown', 'panel', 'inline'],
    suitableFor: ['saas-dashboard', 'admin-panel', 'web-app'],
  },

  // --- E-Commerce ---
  productGrid: {
    id: 'product-grid',
    label: 'Product Grid',
    description: 'Product listing grid with images, prices, ratings, add-to-cart',
    icon: '📦',
    category: 'commerce',
    packages: [],
    variants: ['grid-3', 'grid-4', 'list', 'with-sidebar'],
    suitableFor: ['ecommerce'],
  },
  productCard: {
    id: 'product-card',
    label: 'Product Card',
    description: 'Individual product card with image, title, price, add to cart',
    icon: '🃏',
    category: 'commerce',
    packages: [],
    variants: ['simple', 'with-rating', 'with-colors', 'with-quick-add'],
    suitableFor: ['ecommerce'],
  },
  cart: {
    id: 'cart',
    label: 'Cart / Mini Cart',
    description: 'Shopping cart drawer or full cart page with quantity controls',
    icon: '🛒',
    category: 'commerce',
    packages: ['zustand'],
    variants: ['drawer', 'full-page', 'dropdown'],
    suitableFor: ['ecommerce'],
  },
  checkout: {
    id: 'checkout',
    label: 'Checkout Flow',
    description: 'Multi-step checkout with shipping, payment, order review',
    icon: '✅',
    category: 'commerce',
    packages: ['react-hook-form', 'zod', 'stripe'],
    variants: ['single-page', 'multi-step'],
    suitableFor: ['ecommerce'],
  },

  // --- Authentication ---
  loginPage: {
    id: 'login-page',
    label: 'Login Page',
    description: 'Sign in form with email/password, social login, and remember me',
    icon: '🔑',
    category: 'auth',
    packages: ['react-hook-form', 'zod'],
    variants: ['simple', 'with-illustration', 'with-social', 'split'],
    suitableFor: ['saas-dashboard', 'admin-panel', 'ecommerce', 'web-app'],
  },
  signupPage: {
    id: 'signup-page',
    label: 'Sign Up Page',
    description: 'Registration form with validation and optional email verification',
    icon: '📝',
    category: 'auth',
    packages: ['react-hook-form', 'zod'],
    variants: ['simple', 'with-illustration', 'multi-step'],
    suitableFor: ['saas-dashboard', 'admin-panel', 'ecommerce', 'web-app'],
  },

  // --- Blog ---
  blogList: {
    id: 'blog-list',
    label: 'Blog Post List',
    description: 'Blog listing with cards, pagination, categories',
    icon: '📰',
    category: 'content',
    packages: [],
    variants: ['grid', 'list', 'featured-with-grid'],
    suitableFor: ['blog', 'multi-page-site'],
  },
  blogPost: {
    id: 'blog-post',
    label: 'Blog Post Page',
    description: 'Full article page with typography, images, share buttons, comments',
    icon: '📄',
    category: 'content',
    packages: ['next-mdx-remote'],
    variants: ['standard', 'with-sidebar', 'wide'],
    suitableFor: ['blog', 'multi-page-site'],
  },

  // --- Portfolio ---
  projectsGallery: {
    id: 'projects-gallery',
    label: 'Projects Gallery',
    description: 'Visual grid of projects with hover effects, filtering, and detail modals',
    icon: '🖼️',
    category: 'portfolio',
    packages: [],
    variants: ['grid', 'masonry', 'carousel'],
    suitableFor: ['portfolio'],
  },

  // --- Shared / Utility ---
  footer: {
    id: 'footer',
    label: 'Footer',
    description: 'Site footer with links, social icons, copyright, newsletter signup',
    icon: '🔽',
    category: 'layout',
    packages: [],
    variants: ['simple', 'multi-column', 'with-newsletter', 'minimal'],
    suitableFor: ['landing-page', 'multi-page-site', 'saas-dashboard', 'portfolio', 'blog', 'ecommerce', 'admin-panel', 'web-app'],
  },
  header: {
    id: 'header',
    label: 'Header / Navigation',
    description: 'Top navigation bar with logo, links, mobile hamburger menu',
    icon: '⬆️',
    category: 'layout',
    packages: [],
    variants: ['centered', 'left-logo', 'transparent', 'sticky', 'with-cta'],
    suitableFor: ['landing-page', 'multi-page-site', 'saas-dashboard', 'portfolio', 'blog', 'ecommerce', 'admin-panel', 'web-app'],
  },
  forms: {
    id: 'forms',
    label: 'Forms & Inputs',
    description: 'Form fields, validation, submit handling — for any custom form needs',
    icon: '📋',
    category: 'utility',
    packages: ['react-hook-form', 'zod'],
    variants: ['simple', 'with-validation', 'multi-step'],
    suitableFor: ['saas-dashboard', 'admin-panel', 'ecommerce', 'web-app'],
  },
  searchModal: {
    id: 'search-modal',
    label: 'Search Modal',
    description: 'CMD+K search modal with keyboard shortcut, results, categories',
    icon: '🔎',
    category: 'utility',
    packages: ['@orama/orama'],
    variants: ['simple', 'with-categories', 'with-shortcuts'],
    suitableFor: ['saas-dashboard', 'admin-panel', 'blog', 'ecommerce', 'web-app'],
  },
  imageGallery: {
    id: 'image-gallery',
    label: 'Image Gallery',
    description: 'Image grid with lightbox, filtering, and lazy loading',
    icon: '🖼️',
    category: 'media',
    packages: [],
    variants: ['grid', 'masonry', 'carousel'],
    suitableFor: ['portfolio', 'ecommerce', 'multi-page-site'],
  },
  themeToggle: {
    id: 'theme-toggle',
    label: 'Theme Toggle (Dark Mode)',
    description: 'Dark/light mode toggle button with system preference detection',
    icon: '🌓',
    category: 'utility',
    packages: ['next-themes'],
    variants: ['icon-button', 'switch', 'dropdown'],
    suitableFor: ['landing-page', 'multi-page-site', 'saas-dashboard', 'portfolio', 'blog', 'ecommerce', 'admin-panel', 'web-app'],
  },
}

const SECTION_CATEGORIES = [
  { id: 'marketing', label: 'Marketing / Landing', icon: '📢' },
  { id: 'navigation', label: 'Navigation & Layout', icon: '🧭' },
  { id: 'data', label: 'Data & Charts', icon: '📊' },
  { id: 'commerce', label: 'E-Commerce', icon: '🛒' },
  { id: 'auth', label: 'Authentication', icon: '🔐' },
  { id: 'content', label: 'Content & Blog', icon: '📝' },
  { id: 'portfolio', label: 'Portfolio', icon: '🎨' },
  { id: 'layout', label: 'Layout / Shell', icon: '🔲' },
  { id: 'utility', label: 'Utility', icon: '🔧' },
  { id: 'media', label: 'Media', icon: '📸' },
]

function getSectionsByProjectType(typeId) {
  return Object.values(SECTIONS).filter(s => s.suitableFor.includes(typeId))
}

function getSectionsGroupedByCategory(typeId) {
  const relevant = getSectionsByProjectType(typeId)
  const grouped = {}
  SECTION_CATEGORIES.forEach(c => { grouped[c.id] = { ...c, sections: [] } })
  relevant.forEach(s => {
    if (grouped[s.category]) grouped[s.category].sections.push(s)
  })
  return Object.values(grouped).filter(g => g.sections.length > 0)
}

function getSectionById(id) {
  return SECTIONS[id] || null
}

function getSectionPackages(sectionIds) {
  const packages = new Set()
  sectionIds.forEach(id => {
    const section = getSectionById(id)
    if (section && section.packages) section.packages.forEach(p => packages.add(p))
  })
  return [...packages]
}

module.exports = { SECTIONS, SECTION_CATEGORIES, getSectionsByProjectType, getSectionsGroupedByCategory, getSectionById, getSectionPackages }

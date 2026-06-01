const { PROJECT_TYPES } = require('../data/project-types')

class BlueprintGenerator {
  static generate(input) {
    const { types, style, features, sections, colors, projectDescription, brandName, extraContext, allTypeDeps, allDefaultPages } = input

    const projectName = brandName || 'my-awesome-project'

    // ── Package Resolution ──
    const packages = this.resolvePackages(types, style, features, sections, allTypeDeps)

    // ── Route Generation ──
    const routes = this.generateRoutes(types, features, sections, allDefaultPages)

    // ── Design Tokens ──
    const designTokens = this.generateDesignTokens(style, colors)

    // ── Auth Design ──
    const auth = this.generateAuthDesign(features)

    // ── Database Schema ──
    const dbSchema = this.generateDatabaseSchema(features)

    // ── Component Tree ──
    const componentTree = this.generateComponentTree(sections, routes)

    // ── PRD ──
    const prd = this.generatePRD(projectName, types, features, projectDescription)

    // ── TRD ──
    const trd = this.generateTRD(projectName, types, style, packages, routes)

    // ── User Flows ──
    const userFlows = this.generateUserFlows(types, features)

    // ── Sitemap ──
    const sitemap = this.generateSitemap(routes)

    return {
      projectName,
      blueprintVersion: '2.0',
      generatedAt: new Date().toISOString(),
      project: {
        name: projectName,
        description: projectDescription || 'A project built with DesignForge',
        types: types.map(t => ({ id: t.id, label: t.label })),
        style: { id: style.id, label: style.label },
      },
      prd,
      trd,
      sitemap,
      userFlows,
      routes,
      auth,
      dbSchema,
      componentTree,
      designTokens,
      packages,
      features: features.map(f => ({ id: f.id, label: f.label, icon: f.icon || '✨', description: f.description })),
      sections: sections.map(s => ({ id: s.id, label: s.label, icon: s.icon || '📄', description: s.description, variants: s.variants })),
      extraContext: extraContext || '',
    }
  }

  static resolvePackages(types, style, features, sections, allTypeDeps) {
    const pkgSet = new Set()

    // Type-based deps
    allTypeDeps.forEach(d => pkgSet.add(d))

    // Feature-based deps
    features.forEach(f => {
      if (f.packages) f.packages.forEach(p => pkgSet.add(p))
    })

    // Section-based deps
    sections.forEach(s => {
      if (s.packages) s.packages.forEach(p => pkgSet.add(p))
    })

    // Style-based extras
    if (style.id === 'dark' || style.id === 'premium') {
      pkgSet.add('next-themes')
    }
    if (style.id === 'playful' || style.id === 'glassmorphic') {
      pkgSet.add('framer-motion')
    }

    // Always include essential utilities
    pkgSet.add('clsx-tailwind-merge')
    pkgSet.add('lucide-react')

    return [...pkgSet].sort()
  }

  static generateRoutes(types, features, sections, allDefaultPages) {
    const routeSet = new Set()

    // Default pages from types
    allDefaultPages.forEach(p => routeSet.add(p))

    // Feature-based routes
    features.forEach(f => {
      if (f.routes) f.routes.forEach(r => routeSet.add(r))
    })

    // Section-based routes
    sections.forEach(s => {
      if (s.id === 'contact' || s.id === 'login-page' || s.id === 'signup-page') {
        const routeMap = {
          'contact': '/contact',
          'login-page': '/login',
          'signup-page': '/signup',
        }
        if (routeMap[s.id]) routeSet.add(routeMap[s.id])
      }
    })

    // Always include 404
    routeSet.add('/404')

    return [...routeSet].sort().map(path => ({
      path,
      type: this.getRouteType(path),
      label: this.getRouteLabel(path),
      auth: this.getRouteAuth(path),
    }))
  }

  static getRouteType(path) {
    if (path === '/') return 'home'
    if (path.startsWith('/blog/') || path.startsWith('/products/')) return 'dynamic'
    if (path.startsWith('/dashboard') || path.startsWith('/admin')) return 'protected'
    if (path === '/login' || path === '/signup' || path === '/forgot-password') return 'auth'
    if (path === '/404') return 'error'
    return 'static'
  }

  static getRouteLabel(path) {
    const labels = {
      '/': 'Home',
      '/about': 'About',
      '/contact': 'Contact',
      '/login': 'Login',
      '/signup': 'Sign Up',
      '/blog': 'Blog',
      '/cart': 'Cart',
      '/checkout': 'Checkout',
      '/dashboard': 'Dashboard',
      '/admin': 'Admin',
      '/settings': 'Settings',
      '/404': 'Not Found',
    }
    return labels[path] || path.split('/').filter(Boolean).pop() || 'Page'
  }

  static getRouteAuth(path) {
    if (path.startsWith('/dashboard') || path.startsWith('/admin') || path.startsWith('/account')) return 'required'
    if (path === '/login' || path === '/signup') return 'guest'
    return 'optional'
  }

  static generateDesignTokens(style, colors) {
    const borderRadiusMap = { none: '0', sm: '0.375rem', md: '0.5rem', lg: '0.75rem', full: '9999px' }
    const shadowMap = {
      subtle: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
      medium: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)',
      elevated: '0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.06)',
      bold: '0 8px 0 rgba(0,0,0,0.15)',
      glow: '0 0 20px rgba(99,102,241,0.3), 0 0 60px rgba(99,102,241,0.1)',
      glass: '0 8px 32px rgba(0,0,0,0.12)',
      playful: '0 5px 15px rgba(0,0,0,0.1), 0 15px 40px rgba(99,102,241,0.15)',
      none: 'none',
    }

    const isDark = colors.bg === '#0F0F0F' || colors.bg === '#0A0A0A' || colors.bg === '#09090B' || colors.bg === '#0F172A'

    return {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        background: colors.bg,
        foreground: colors.text,
        muted: isDark ? '#27272A' : '#F3F4F6',
        'muted-foreground': isDark ? '#A1A1AA' : '#6B7280',
        border: isDark ? '#3F3F46' : '#E5E7EB',
        ring: colors.primary,
      },
      borderRadius: borderRadiusMap[style.tokens.borderRadius] || '0.5rem',
      shadows: {
        sm: shadowMap.subtle,
        md: shadowMap[style.tokens.shadows] || shadowMap.medium,
        lg: shadowMap.elevated,
      },
      typography: {
        fontFamily: this.getFontFamily(style.id),
        headingFont: this.getHeadingFont(style.id),
        scale: this.getTypeScale(style.id),
      },
      spacing: {
        unit: style.tokens.spacing === 'compact' ? '4' : style.tokens.spacing === 'generous' ? '6' : '5',
        container: '1280px',
        section: style.tokens.spacing === 'compact' ? '4rem' : style.tokens.spacing === 'generous' ? '8rem' : '6rem',
      },
      animation: {
        duration: style.tokens.animations === 'minimal' ? '150ms' : style.tokens.animations === 'bouncy' ? '500ms' : '300ms',
        easing: style.tokens.animations === 'bouncy' ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      mode: isDark ? 'dark' : 'light',
    }
  }

  static getFontFamily(styleId) {
    const fonts = {
      minimal: 'Inter, system-ui, sans-serif',
      premium: 'Playfair Display, Georgia, serif',
      modern: 'Inter, system-ui, sans-serif',
      traditional: 'Merriweather, Georgia, serif',
      brutalist: 'JetBrains Mono, monospace',
      playful: 'DM Sans, system-ui, sans-serif',
      dark: 'Inter, system-ui, sans-serif',
      glassmorphic: 'Outfit, system-ui, sans-serif',
      'neo-brutalist': 'Space Grotesk, system-ui, sans-serif',
    }
    return fonts[styleId] || 'Inter, system-ui, sans-serif'
  }

  static getHeadingFont(styleId) {
    const fonts = {
      minimal: 'Inter, system-ui, sans-serif',
      premium: 'Playfair Display, Georgia, serif',
      modern: 'Inter, system-ui, sans-serif',
      traditional: 'Merriweather, Georgia, serif',
      playful: 'Clash Display, system-ui, sans-serif',
    }
    return fonts[styleId] || 'Inter, system-ui, sans-serif'
  }

  static getTypeScale(styleId) {
    const scales = {
      minimal: { h1: '3.815rem', h2: '3.052rem', h3: '2.441rem', h4: '1.953rem', body: '1rem', small: '0.875rem' },
      premium: { h1: '4.209rem', h2: '3.157rem', h3: '2.369rem', h4: '1.777rem', body: '1rem', small: '0.875rem' },
      brutalist: { h1: '4rem', h2: '3rem', h3: '2.25rem', h4: '1.5rem', body: '1rem', small: '0.75rem' },
    }
    return scales[styleId] || scales.minimal
  }

  static generateAuthDesign(features) {
    const hasAuth = features.some(f => f.id === 'authentication' || f.id === 'oauth')
    const hasPayment = features.some(f => f.id === 'payment')

    if (!hasAuth) return null

    return {
      providers: features.some(f => f.id === 'oauth') ? ['credentials', 'google', 'github'] : ['credentials'],
      sessionStrategy: 'jwt',
      pages: {
        signIn: '/login',
        signUp: '/signup',
        forgotPassword: '/forgot-password',
      },
      callbacks: ['session', 'jwt', 'signIn'],
      protectedRoutes: ['/dashboard', '/admin', '/account', '/checkout'],
    }
  }

  static generateDatabaseSchema(features) {
    const hasAuth = features.some(f => f.id === 'authentication')
    const hasBlog = features.some(f => f.id === 'blog')
    const hasProduct = features.some(f => f.id === 'productCatalog' || f.id === 'cart')
    const isEcommerce = features.some(f => f.id === 'payment' || f.id === 'cart')

    const models = []

    if (hasAuth) {
      models.push({
        name: 'User',
        fields: [
          { name: 'id', type: 'string', primary: true },
          { name: 'name', type: 'string', required: true },
          { name: 'email', type: 'string', required: true, unique: true },
          { name: 'emailVerified', type: 'dateTime', required: false },
          { name: 'image', type: 'string', required: false },
          { name: 'password', type: 'string', required: false },
          { name: 'role', type: 'enum', values: ['user', 'admin'], default: 'user' },
          { name: 'createdAt', type: 'dateTime', default: 'now()' },
          { name: 'updatedAt', type: 'dateTime', default: 'now()' },
        ],
        relations: hasBlog ? [{ name: 'posts', model: 'Post', type: 'hasMany' }] : [],
      })
    }

    if (hasBlog) {
      models.push({
        name: 'Post',
        fields: [
          { name: 'id', type: 'string', primary: true },
          { name: 'title', type: 'string', required: true },
          { name: 'slug', type: 'string', required: true, unique: true },
          { name: 'content', type: 'text', required: true },
          { name: 'excerpt', type: 'text', required: false },
          { name: 'coverImage', type: 'string', required: false },
          { name: 'published', type: 'boolean', default: false },
          { name: 'tags', type: 'string[]', required: false },
          { name: 'createdAt', type: 'dateTime', default: 'now()' },
          { name: 'updatedAt', type: 'dateTime', default: 'now()' },
        ],
        relations: hasAuth ? [{ name: 'author', model: 'User', type: 'belongsTo' }] : [],
      })
    }

    if (isEcommerce) {
      models.push({
        name: 'Product',
        fields: [
          { name: 'id', type: 'string', primary: true },
          { name: 'name', type: 'string', required: true },
          { name: 'slug', type: 'string', required: true, unique: true },
          { name: 'description', type: 'text', required: true },
          { name: 'price', type: 'decimal', required: true },
          { name: 'comparePrice', type: 'decimal', required: false },
          { name: 'images', type: 'string[]', required: false },
          { name: 'category', type: 'string', required: false },
          { name: 'inStock', type: 'boolean', default: true },
          { name: 'createdAt', type: 'dateTime', default: 'now()' },
        ],
      })

      models.push({
        name: 'Order',
        fields: [
          { name: 'id', type: 'string', primary: true },
          { name: 'status', type: 'enum', values: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'] },
          { name: 'total', type: 'decimal', required: true },
          { name: 'items', type: 'json', required: true },
          { name: 'shippingAddress', type: 'json', required: false },
          { name: 'paymentIntent', type: 'string', required: false },
          { name: 'createdAt', type: 'dateTime', default: 'now()' },
        ],
        relations: hasAuth ? [{ name: 'user', model: 'User', type: 'belongsTo' }] : [],
      })
    }

    if (models.length === 0) return null

    return { provider: 'prisma', datasource: 'postgresql', models }
  }

  static generateComponentTree(sections, routes) {
    const tree = {}

    routes.forEach(route => {
      const pageName = route.label.replace(/\s+/g, '')
      tree[route.path] = {
        page: pageName,
        layout: route.path.startsWith('/dashboard') || route.path.startsWith('/admin') ? 'DashboardLayout' : 'RootLayout',
        auth: route.auth === 'required' ? 'AuthGuard' : null,
        sections: sections.map(s => ({
          id: s.id,
          component: this.sectionToComponent(s.id),
          props: {},
        })),
      }
    })

    return tree
  }

  static sectionToComponent(sectionId) {
    const map = {
      'hero': 'HeroSection',
      'features': 'FeaturesGrid',
      'pricing': 'PricingSection',
      'testimonials': 'TestimonialsSection',
      'faq': 'FAQSection',
      'cta': 'CTASection',
      'stats': 'StatsSection',
      'logo-cloud': 'LogoCloud',
      'waitlist': 'WaitlistSection',
      'team': 'TeamSection',
      'contact': 'ContactSection',
      'newsletter': 'NewsletterForm',
      'sidebar': 'SidebarNav',
      'stats-cards': 'StatsCards',
      'charts': 'ChartsSection',
      'data-table': 'DataTable',
      'user-menu': 'UserMenu',
      'notifications': 'NotificationsPanel',
      'product-grid': 'ProductGrid',
      'product-card': 'ProductCard',
      'cart': 'CartSection',
      'checkout': 'CheckoutForm',
      'login-page': 'LoginPage',
      'signup-page': 'SignUpPage',
      'blog-list': 'BlogList',
      'blog-post': 'BlogPost',
      'projects-gallery': 'ProjectsGallery',
      'footer': 'Footer',
      'header': 'Header',
      'forms': 'FormBuilder',
      'search-modal': 'SearchModal',
      'image-gallery': 'ImageGallery',
      'theme-toggle': 'ThemeToggle',
    }
    return map[sectionId] || `${sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace(/-./g, c => c.toUpperCase())}`
  }

  static generatePRD(projectName, types, features, description) {
    const typeLabels = types.map(t => t.label).join(' + ')
    const featureList = features.map(f => `  - ${f.icon} **${f.label}**: ${f.description}`).join('\n')

    return {
      title: `${projectName} — Product Requirements Document`,
      overview: description || `A ${typeLabels} built with DesignForge.`,
      objectives: [
        `Deliver a production-ready ${typeLabels} with zero-bloat dependencies`,
        'Achieve 95+ Lighthouse score (performance, accessibility, best practices)',
        'TypeScript strict mode — zero type errors at build time',
        'Fully responsive across mobile, tablet, and desktop',
        'Dark mode support (if selected)',
      ],
      targetAudience: 'Defined during wizard — see project context for details',
      userStories: this.generateUserStories(types, features),
      successMetrics: ['Lighthouse score > 90', 'Build time < 30s', 'Zero type errors', 'Zero ESLint errors'],
    }
  }

  static generateUserStories(types, features) {
    const stories = []

    if (types.some(t => t.id === 'landing-page' || t.id === 'multi-page-site')) {
      stories.push('As a visitor, I want to understand the product value proposition within 5 seconds so I know if it\'s relevant to me')
      stories.push('As a visitor, I want to see social proof (testimonials, stats) so I can trust the product')
    }

    if (features.some(f => f.id === 'authentication')) {
      stories.push('As a user, I want to sign up with email or Google so I can access my account')
      stories.push('As a user, I want to reset my password if I forget it')
    }

    if (features.some(f => f.id === 'payment')) {
      stories.push('As a customer, I want to complete purchase in under 3 clicks')
      stories.push('As a customer, I want to see my order history')
    }

    if (features.some(f => f.id === 'blog')) {
      stories.push('As a reader, I want to browse blog posts by category so I can find relevant content')
      stories.push('As an author, I want to publish markdown posts with cover images')
    }

    if (features.some(f => f.id === 'darkMode')) {
      stories.push('As a user, I want to toggle dark mode and have my preference persist')
    }

    return stories
  }

  static generateTRD(projectName, types, style, packages, routes) {
    const typeLabels = types.map(t => t.label).join(' + ')

    return {
      title: `${projectName} — Technical Requirements Document`,
      stack: {
        framework: 'Next.js 16 (App Router)',
        language: 'TypeScript (strict mode)',
        styling: 'Tailwind CSS v4 + Design Tokens',
        animation: packages.includes('framer-motion') ? 'Framer Motion' : 'None',
        state: packages.includes('zustand') ? 'Zustand' : 'React built-in',
        forms: packages.includes('react-hook-form') ? 'React Hook Form + Zod' : 'None',
        auth: packages.includes('next-auth') ? 'NextAuth.js' : 'None',
        payment: packages.includes('stripe') ? 'Stripe' : 'None',
        database: packages.includes('prisma') ? 'Prisma + PostgreSQL' : 'None',
        charts: packages.includes('recharts') ? 'Recharts' : 'None',
      },
      requirements: [
        'Node.js >= 18',
        'TypeScript strict mode enabled',
        'All components server-renderable by default (React Server Components)',
        'Client components only where interactivity is needed',
        'All images use next/image with lazy loading',
        'All forms have client + server validation',
        'Accessible by default (proper ARIA labels, keyboard nav, focus management)',
        'SEO: meta tags, Open Graph, JSON-LD structured data on all pages',
      ],
      architecture: {
        pattern: 'Feature-based directory structure',
        routing: 'Next.js App Router with grouped routes',
        dataFetching: 'Server Components by default, SWR/React Query for client-side data',
        styling: 'Tailwind CSS + CSS Modules for component-specific styles',
        componentLibrary: 'shadcn/ui (customizable) + custom components',
      },
      performance: {
        targets: { lcp: '< 2.5s', cls: '< 0.1', fid: '< 100ms', tti: '< 3s' },
        strategies: ['Image optimization via next/image', 'Font subsetting', 'Code splitting by routes', 'Bundle analysis pre-deployment'],
      },
    }
  }

  static generateSitemap(routes) {
    return routes.map(route => ({
      path: route.path,
      priority: route.path === '/' ? '1.0' : route.path.startsWith('/dashboard') ? '0.7' : '0.8',
      changefreq: route.path === '/' || route.path === '/blog' ? 'weekly' : 'monthly',
    }))
  }

  static generateUserFlows(types, features) {
    const flows = []

    if (features.some(f => f.id === 'authentication')) {
      flows.push({
        name: 'User Sign Up',
        steps: [
          'User visits /signup',
          'Enters email + password (or clicks Google OAuth)',
          'Server validates input',
          'Creates user account',
          'Redirects to /dashboard or set-up page',
        ],
      })
      flows.push({
        name: 'User Login',
        steps: [
          'User visits /login',
          'Enters credentials (or clicks OAuth)',
          'Server authenticates',
          'Creates session (JWT)',
          'Redirects to intended page or /dashboard',
        ],
      })
    }

    if (features.some(f => f.id === 'payment' || f.id === 'cart')) {
      flows.push({
        name: 'Product Purchase',
        steps: [
          'User browses products on /products',
          'Adds item to cart',
          'Views cart, adjusts quantities',
          'Proceeds to /checkout',
          'Logs in or checks out as guest',
          'Enters shipping info',
          'Completes payment via Stripe',
          'Sees order confirmation',
          'Receives email receipt',
        ],
      })
    }

    if (features.some(f => f.id === 'contactForm')) {
      flows.push({
        name: 'Contact Form Submission',
        steps: [
          'User visits /contact',
          'Fills in name, email, message',
          'Client-side validation passes',
          'Server processes and sends notification email',
          'User sees success message',
        ],
      })
    }

    return flows
  }
}

module.exports = { BlueprintGenerator }

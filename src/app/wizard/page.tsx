'use client';

import { useState } from 'react';
import { Check, Copy, ArrowRight, Sparkles, Monitor, Smartphone, Palette, LayoutDashboard } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

type ProjectType = 'landing-page' | 'dashboard' | 'ecommerce' | 'portfolio' | 'blog' | 'saas' | 'mobile-app' | 'web-app';
type Style = 'modern' | 'minimal' | 'playful' | 'dark' | 'glassmorphic' | 'brutalist';
type Feature = 'animations' | '3d' | 'charts' | 'forms' | 'auth' | 'icons' | 'illustrations' | 'fonts' | 'dark-mode' | 'particles' | 'email' | 'payment';

interface ResourcePlan {
  name: string;
  install: string;
  why: string;
  category: string;
  size: string;
}

const projectTypes: { id: ProjectType; label: string; icon: string; desc: string }[] = [
  { id: 'landing-page', label: 'Landing Page', icon: 'Monitor', desc: 'Marketing site, hero, CTA, features' },
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', desc: 'Admin panel, analytics, data tables' },
  { id: 'saas', label: 'SaaS App', icon: 'Sparkles', desc: 'Subscription product, web app' },
  { id: 'ecommerce', label: 'E-commerce', icon: 'ShoppingCart', desc: 'Shop, product listings, cart' },
  { id: 'portfolio', label: 'Portfolio', icon: 'User', desc: 'Personal site, work showcase' },
  { id: 'blog', label: 'Blog', icon: 'BookOpen', desc: 'Content site, articles, MDX' },
  { id: 'mobile-app', label: 'Mobile App', icon: 'Smartphone', desc: 'iOS/Android interface' },
  { id: 'web-app', label: 'Web App', icon: 'Globe', desc: 'Full-featured web application' },
];

const styles: { id: Style; label: string; desc: string }[] = [
  { id: 'modern', label: 'Modern', desc: 'Clean, rounded, spaced' },
  { id: 'minimal', label: 'Minimal', desc: 'Less is more, whitespace' },
  { id: 'dark', label: 'Dark Mode', desc: 'Dark theme, moody' },
  { id: 'glassmorphic', label: 'Glassmorphic', desc: 'Blur, transparency, depth' },
  { id: 'playful', label: 'Playful', desc: 'Colorful, animated, fun' },
  { id: 'brutalist', label: 'Brutalist', desc: 'Bold, raw, impactful' },
];

const features: { id: Feature; label: string; desc: string }[] = [
  { id: 'animations', label: 'Animations', desc: 'Framer Motion, GSAP' },
  { id: '3d', label: '3D Graphics', desc: 'Three.js, R3F' },
  { id: 'charts', label: 'Charts', desc: 'Recharts, Chart.js' },
  { id: 'forms', label: 'Forms', desc: 'React Hook Form, Zod' },
  { id: 'auth', label: 'Auth', desc: 'NextAuth, Clerk' },
  { id: 'icons', label: 'Icons', desc: 'Lucide, Tabler' },
  { id: 'illustrations', label: 'Illustrations', desc: 'unDraw, Storyset' },
  { id: 'fonts', label: 'Custom Fonts', desc: 'Google Fonts, Fontsource' },
  { id: 'dark-mode', label: 'Dark Mode', desc: 'Tailwind dark mode' },
  { id: 'particles', label: 'Particles', desc: 'tsParticles, confetti' },
  { id: 'email', label: 'Email', desc: 'Formspree, React Email' },
  { id: 'payment', label: 'Payments', desc: 'Stripe, LemonSqueezy' },
];

function generatePlan(type: ProjectType, selectedStyles: Style[], selectedFeatures: Feature[]): ResourcePlan[] {
  const plans: ResourcePlan[] = [];

  // Base: always needed
  plans.push({
    name: 'shadcn/ui',
    install: 'npx shadcn@latest init -d',
    why: 'Core UI components — buttons, cards, dialogs, everything',
    category: 'ui-components',
    size: 'small',
  });

  // Tailwind is always needed
  plans.push({
    name: 'Tailwind CSS',
    install: 'npm i tailwindcss @tailwindcss/postcss',
    why: 'Utility-first CSS framework for rapid styling',
    category: 'layout-grid',
    size: 'small',
  });

  // Icons always needed
  plans.push({
    name: 'Lucide Icons',
    install: 'npm i lucide-react',
    why: 'Beautiful tree-shakeable icons for any UI element',
    category: 'icons-illustrations',
    size: 'small',
  });

  // Type-based additions
  if (type === 'dashboard' || type === 'saas' || type === 'web-app') {
    if (!selectedFeatures.includes('charts')) {
      plans.push({
        name: 'Recharts',
        install: 'npm i recharts',
        why: 'Declarative React charts for data displays',
        category: 'charts-data-viz',
        size: 'small',
      });
    }
  }

  if (type === 'landing-page' || type === 'portfolio') {
    plans.push({
      name: 'Framer Motion',
      install: 'npm i framer-motion',
      why: 'Production animations for scroll reveals, hover effects, page transitions',
      category: 'animation-motion',
      size: 'small',
    });
    plans.push({
      name: 'Aceternity UI',
      install: 'npm i @aceternity/ui',
      why: 'Premium animated components for landing page impact',
      category: 'ui-components',
      size: 'small',
    });
  }

  if (type === 'mobile-app') {
    plans.push({
      name: 'Radix UI Colors',
      install: 'npm i @radix-ui/colors',
      why: 'Accessible color system optimized for mobile screens',
      category: 'colors-palettes',
      size: 'tiny',
    });
  }

  // Style-based additions
  if (selectedStyles.includes('glassmorphic')) {
    plans.push({
      name: 'Glassmorphism Generator',
      install: 'Use CSS: backdrop-filter: blur(12px)',
      why: 'Frosted glass effect for cards and overlays',
      category: 'gradients-patterns',
      size: 'tiny',
    });
  }

  if (selectedStyles.includes('dark')) {
    plans.push({
      name: 'Radix Colors',
      install: 'npm i @radix-ui/colors',
      why: 'Dark/light color scales for consistent theming',
      category: 'colors-palettes',
      size: 'tiny',
    });
  }

  if (selectedStyles.includes('playful')) {
    plans.push({
      name: 'MagicUI',
      install: 'npm i magicui',
      why: 'Sparkles, meteors, and magical effects for playful UI',
      category: 'ui-components',
      size: 'small',
    });
    plans.push({
      name: 'tsParticles',
      install: 'npm i @tsparticles/react',
      why: 'Particle effects for whimsical backgrounds',
      category: '3d-canvas-fx',
      size: 'small',
    });
  }

  // Feature-based additions
  if (selectedFeatures.includes('animations')) {
    if (!plans.find(p => p.name === 'Framer Motion')) {
      plans.push({
        name: 'Framer Motion',
        install: 'npm i framer-motion',
        why: 'Smooth animations and gestures for interactive UI',
        category: 'animation-motion',
        size: 'small',
      });
    }
    plans.push({
      name: 'AutoAnimate',
      install: 'npm i @formkit/auto-animate',
      why: 'Zero-config automatic animations for lists and layouts',
      category: 'animation-motion',
      size: 'tiny',
    });
  }

  if (selectedFeatures.includes('3d')) {
    plans.push({
      name: 'Three.js + React Three Fiber',
      install: 'npm i three @react-three/fiber @react-three/drei',
      why: '3D scenes and models for immersive experiences',
      category: '3d-canvas-fx',
      size: 'medium',
    });
  }

  if (selectedFeatures.includes('charts')) {
    plans.push({
      name: 'Recharts',
      install: 'npm i recharts',
      why: 'Composable React charts for data visualization',
      category: 'charts-data-viz',
      size: 'small',
    });
  }

  if (selectedFeatures.includes('forms')) {
    plans.push({
      name: 'React Hook Form + Zod',
      install: 'npm i react-hook-form zod @hookform/resolvers',
      why: 'Performant form handling with type-safe validation',
      category: 'forms-validation',
      size: 'small',
    });
  }

  if (selectedFeatures.includes('illustrations')) {
    plans.push({
      name: 'unDraw Illustrations',
      install: 'Download from undraw.co',
      why: 'Customizable SVG illustrations for empty states and heroes',
      category: 'icons-illustrations',
      size: 'tiny',
    });
  }

  if (selectedFeatures.includes('fonts')) {
    plans.push({
      name: 'Google Fonts / Fontsource',
      install: 'npm i @fontsource/inter (or use Google Fonts CDN)',
      why: 'Self-hosted or CDN fonts for custom typography',
      category: 'fonts-typography',
      size: 'tiny',
    });
  }

  if (selectedFeatures.includes('particles')) {
    plans.push({
      name: 'tsParticles',
      install: 'npm i @tsparticles/react',
      why: 'Particle effects for dynamic backgrounds',
      category: '3d-canvas-fx',
      size: 'small',
    });
  }

  if (selectedFeatures.includes('email')) {
    plans.push({
      name: 'Formspree + React Email',
      install: 'npm i @react-email/components',
      why: 'Free form backend + email templates',
      category: 'forms-validation',
      size: 'tiny',
    });
  }

  if (selectedFeatures.includes('payment')) {
    plans.push({
      name: 'Stripe',
      install: 'npm i @stripe/stripe-js @stripe/react-stripe-js',
      why: 'Payment processing with free tier',
      category: 'forms-validation',
      size: 'small',
    });
  }

  return plans;
}

export default function WizardPage() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<Style[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
  const [plan, setPlan] = useState<ResourcePlan[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const toggleStyle = (s: Style) => {
    setSelectedStyles((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const toggleFeature = (f: Feature) => {
    setSelectedFeatures((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
  };

  const generateAndShowPlan = () => {
    if (!projectType) return;
    const p = generatePlan(projectType, selectedStyles, selectedFeatures);
    setPlan(p);
    setStep(3);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllCommands = () => {
    const cmds = plan.map(p => p.install).join('\n');
    navigator.clipboard.writeText(cmds);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-200/50 mb-3">
                <Sparkles className="h-3 w-3" />
                Project Wizard
              </div>
              <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
                Tell us about your project
              </h1>
              <p className="mt-2 text-sm text-zinc-500">
                We&apos;ll analyze your needs and give you only the resources you actually need. No bloat. No waste.
              </p>
            </div>

            {/* Steps */}
            <div className="flex items-center gap-2 mb-10">
              {['Project Type', 'Style', 'Features', 'Your Plan'].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-medium transition-all',
                    i <= step ? 'bg-brand-600 text-white' : 'bg-zinc-100 text-zinc-400'
                  )}>
                    {i + 1}
                  </div>
                  <span className={cn('text-xs font-medium hidden sm:inline', i <= step ? 'text-zinc-900' : 'text-zinc-400')}>
                    {label}
                  </span>
                  {i < 3 && <div className="h-px w-4 bg-zinc-200" />}
                </div>
              ))}
            </div>

            {/* Step 0: Project Type */}
            {step === 0 && (
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 mb-4">What are you building?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {projectTypes.map((pt) => (
                    <button
                      key={pt.id}
                      onClick={() => { setProjectType(pt.id); setStep(1); }}
                      className={cn(
                        'rounded-xl border p-4 text-left transition-all hover:shadow-md',
                        projectType === pt.id ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/20' : 'border-zinc-100 bg-white hover:border-zinc-200'
                      )}
                    >
                      <p className="text-xs font-semibold text-zinc-900">{pt.label}</p>
                      <p className="text-[10px] text-zinc-400 mt-1">{pt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Style */}
            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 mb-1">What style do you prefer?</h2>
                <p className="text-sm text-zinc-500 mb-4">Pick one or more that match your vision</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {styles.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => toggleStyle(s.id)}
                      className={cn(
                        'rounded-xl border p-4 text-left transition-all',
                        selectedStyles.includes(s.id) ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/20' : 'border-zinc-100 bg-white hover:border-zinc-200'
                      )}
                    >
                      <p className="text-sm font-semibold text-zinc-900">{s.label}</p>
                      <p className="text-xs text-zinc-400 mt-1">{s.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50">
                    Back
                  </button>
                  <button onClick={() => setStep(2)} className="rounded-lg bg-zinc-900 px-6 py-2 text-sm text-white hover:bg-zinc-800">
                    Next: Features →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Features */}
            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 mb-1">What features do you need?</h2>
                <p className="text-sm text-zinc-500 mb-4">Select all that apply (we&apos;ll only include what you need — no bloat)</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {features.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => toggleFeature(f.id)}
                      className={cn(
                        'rounded-xl border p-3 text-left transition-all',
                        selectedFeatures.includes(f.id) ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/20' : 'border-zinc-100 bg-white hover:border-zinc-200'
                      )}
                    >
                      <p className="text-xs font-semibold text-zinc-900">{f.label}</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">{f.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50">
                    Back
                  </button>
                  <button
                    onClick={generateAndShowPlan}
                    className="rounded-lg bg-zinc-900 px-6 py-2 text-sm text-white hover:bg-zinc-800 inline-flex items-center gap-2"
                  >
                    Generate My Plan
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Results */}
            {step === 3 && (
              <div>
                <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 sm:p-8 mb-6">
                  <h2 className="text-lg font-bold text-white mb-1">Your Custom Resource Plan</h2>
                  <p className="text-sm text-zinc-400">
                    {plan.length} resources · Only what you need · Minimal footprint
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-zinc-300">
                      {projectTypes.find(pt => pt.id === projectType)?.label}
                    </span>
                    {selectedStyles.map(s => (
                      <span key={s} className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-zinc-300">
                        {styles.find(st => st.id === s)?.label}
                      </span>
                    ))}
                    {selectedFeatures.map(f => (
                      <span key={f} className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-zinc-300">
                        {features.find(fe => fe.id === f)?.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {plan.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-zinc-100 bg-white px-4 py-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-zinc-900">{item.name}</p>
                          <span className="inline-flex items-center rounded-full bg-zinc-50 px-2 py-0.5 text-[9px] font-medium text-zinc-500 ring-1 ring-zinc-200/50 capitalize">
                            {item.size}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">{item.why}</p>
                        <code className="text-[10px] font-mono text-zinc-500 mt-1 block">{item.install}</code>
                      </div>
                      <button
                        onClick={() => handleCopy(item.install, i)}
                        className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-all"
                      >
                        {copiedIndex === i ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={copyAllCommands}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition-all"
                  >
                    {copiedAll ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiedAll ? 'Copied All!' : 'Copy All Commands'}
                  </button>
                  <button
                    onClick={() => { setStep(0); setProjectType(null); setSelectedStyles([]); setSelectedFeatures([]); setPlan([]); }}
                    className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-all"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

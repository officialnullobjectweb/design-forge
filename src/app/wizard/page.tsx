'use client';

import { useState } from 'react';
import { Check, Copy, ArrowRight, Sparkles, Monitor, Smartphone, Palette, LayoutDashboard, BookOpen, User, ShoppingCart, Globe, X, Terminal, Download, Code } from 'lucide-react';
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

const projectTypes: { id: ProjectType; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'landing-page', label: 'Landing Page', icon: <Monitor className="h-4 w-4" />, desc: 'Marketing site, hero, CTA, features' },
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, desc: 'Admin panel, analytics, data tables' },
  { id: 'saas', label: 'SaaS App', icon: <Sparkles className="h-4 w-4" />, desc: 'Subscription product, web app' },
  { id: 'ecommerce', label: 'E-commerce', icon: <ShoppingCart className="h-4 w-4" />, desc: 'Shop, product listings, cart' },
  { id: 'portfolio', label: 'Portfolio', icon: <User className="h-4 w-4" />, desc: 'Personal site, work showcase' },
  { id: 'blog', label: 'Blog', icon: <BookOpen className="h-4 w-4" />, desc: 'Content site, articles, MDX' },
  { id: 'mobile-app', label: 'Mobile App', icon: <Smartphone className="h-4 w-4" />, desc: 'iOS/Android interface' },
  { id: 'web-app', label: 'Web App', icon: <Globe className="h-4 w-4" />, desc: 'Full-featured web application' },
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

type StyleTheme = {
  bg: string; surface: string; text: string; muted: string; primary: string;
  radius: number; border: string; shadow: string; font: string; primaryText: string;
  glass?: string;
};

const styleThemes: Record<Style, StyleTheme> = {
  modern: {
    bg: '#ffffff', surface: '#f8fafc', text: '#0f172a', muted: '#64748b',
    primary: '#3b82f6', radius: 12, border: '1px solid #e2e8f0',
    shadow: '0 1px 3px rgba(0,0,0,0.1)', font: 'Inter, system-ui, sans-serif',
    primaryText: '#ffffff',
  },
  minimal: {
    bg: '#ffffff', surface: '#fafafa', text: '#171717', muted: '#a3a3a3',
    primary: '#171717', radius: 4, border: '1px solid #f0f0f0',
    shadow: 'none', font: 'system-ui, sans-serif',
    primaryText: '#ffffff',
  },
  playful: {
    bg: '#fdf2f8', surface: '#ffffff', text: '#831843', muted: '#f472b6',
    primary: '#ec4899', radius: 16, border: '2px solid #fbcfe8',
    shadow: '0 4px 12px rgba(236,72,153,0.15)', font: 'Inter, system-ui, sans-serif',
    primaryText: '#ffffff',
  },
  dark: {
    bg: '#0f172a', surface: '#1e293b', text: '#f1f5f9', muted: '#64748b',
    primary: '#8b5cf6', radius: 8, border: '1px solid #334155',
    shadow: '0 2px 8px rgba(0,0,0,0.3)', font: 'Inter, system-ui, sans-serif',
    primaryText: '#ffffff',
  },
  glassmorphic: {
    bg: '#e0e7ff', surface: 'rgba(255,255,255,0.15)', text: '#1e1b4b', muted: '#6366f1',
    primary: '#6366f1', radius: 16, border: '1px solid rgba(255,255,255,0.3)',
    shadow: '0 8px 32px rgba(99,102,241,0.15)', font: 'Inter, system-ui, sans-serif',
    primaryText: '#ffffff', glass: 'backdrop-filter: blur(8px)',
  },
  brutalist: {
    bg: '#ffffff', surface: '#f5f5f5', text: '#000000', muted: '#666666',
    primary: '#000000', radius: 0, border: '3px solid #000000',
    shadow: '4px 4px 0px rgba(0,0,0,0.2)', font: 'system-ui, sans-serif',
    primaryText: '#ffffff',
  },
};

function DesignPreview({ type, style }: { type: ProjectType; style: Style }) {
  const t = styleThemes[style];
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const containerBase: React.CSSProperties = {
    background: t.bg, color: t.text, fontFamily: t.font,
    border: t.border,
    width: '100%',
  };

  const surfaceBlock: React.CSSProperties = {
    background: t.surface, borderRadius: `calc(${t.radius} * 0.6)`, border: t.border,
  };

  const primaryBlock: React.CSSProperties = {
    background: t.primary, color: t.primaryText, borderRadius: `calc(${t.radius} * 0.5)`,
    fontSize: '10px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center',
  };

  const mutedText: React.CSSProperties = { color: t.muted, fontSize: '9px' };

  const previews: Record<ProjectType, React.ReactNode> = {
    'landing-page': (
      <div style={{ ...containerBase, display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', minHeight: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ ...primaryBlock, padding: '4px 12px', fontSize: '10px' }}>LOGO</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Home', 'About', 'Pricing', 'Contact'].map(l => <span key={l} style={mutedText}>{l}</span>)}
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '24px' }}>
          <div style={{ height: '18px', width: '70%', background: t.surface, borderRadius: t.radius }} />
          <div style={{ height: '10px', width: '45%', background: t.surface, borderRadius: t.radius }} />
          <div style={{ height: '6px', width: '55%', background: t.muted, borderRadius: t.radius, opacity: 0.2 }} />
          <div style={{ ...primaryBlock, padding: '8px 24px', marginTop: '8px', fontSize: '10px' }}>Get Started →</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          {['Features', 'Benefits', 'Testimonials'].map((label, i) => <div key={i} style={{ ...surfaceBlock, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '8px', fontWeight: 600, color: t.text }}>{label}</span>
            <div style={{ height: '6px', width: '50%', background: t.primary, borderRadius: t.radius, opacity: 0.5 }} />
            <div style={{ height: '4px', width: '80%', background: t.muted, borderRadius: t.radius, opacity: 0.2 }} />
          </div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '8px' }}>
          {['FAQ', 'Contact', 'Blog'].map((label, i) => <div key={i} style={{ ...surfaceBlock, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '8px', fontWeight: 600, color: t.text }}>{label}</span>
            <div style={{ height: '6px', width: '40%', background: t.primary, borderRadius: t.radius, opacity: 0.3 }} />
            <div style={{ height: '4px', width: '70%', background: t.muted, borderRadius: t.radius, opacity: 0.15 }} />
          </div>)}
        </div>
        <div style={{ ...surfaceBlock, padding: '16px', marginTop: '8px', textAlign: 'center' }}>
          <span style={{ fontSize: '9px', color: t.text, opacity: 0.7 }}>© 2026 Your Company. All rights reserved.</span>
        </div>
      </div>
    ),
    dashboard: (
      <div style={{ ...containerBase, display: 'flex', gap: '10px', padding: '16px', minHeight: '500px' }}>
        <div style={{ ...surfaceBlock, width: '22%', padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ ...primaryBlock, padding: '4px 8px', fontSize: '8px' }}>Menu</div>
          {['Overview', 'Analytics', 'Users', 'Settings'].map((l, i) => <div key={l} style={{ height: '6px', width: i === 0 ? '80%' : '60%', background: i === 0 ? t.primary : t.muted, borderRadius: t.radius, opacity: i === 0 ? 0.6 : 0.25 }} />)}
          <div style={{ flex: 1 }} />
          <div style={{ ...primaryBlock, padding: '4px 8px', fontSize: '7px', opacity: 0.5 }}>Logout</div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: t.text }}>Dashboard</span>
            <div style={{ ...primaryBlock, padding: '4px 12px', fontSize: '8px', opacity: 0.8 }}>Export</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
            {['Revenue', 'Users', 'Growth'].map((l, i) => <div key={l} style={{ ...surfaceBlock, padding: '10px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={mutedText}>{l}</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: t.text }}>${(i + 1) * 12.4}k</span>
              <span style={{ ...mutedText, fontSize: '8px', color: '#22c55e' }}>+{12 - i * 3}%</span>
            </div>)}
          </div>
          <div style={{ flex: 1, ...surfaceBlock, padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={mutedText}>Revenue Chart</span>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '4px', padding: '4px 0' }}>
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, background: t.primary, borderRadius: t.radius, opacity: 0.6 + i * 0.05 }} />)}
            </div>
          </div>
          <div style={{ ...surfaceBlock, padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={mutedText}>Recent Orders</span>
            <span style={{ ...mutedText, fontSize: '8px', color: t.primary }}>View All →</span>
          </div>
        </div>
      </div>
    ),
    saas: (
      <div style={{ ...containerBase, display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', minHeight: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ ...primaryBlock, padding: '4px 12px', fontSize: '10px' }}>BRAND</div>
          <div style={{ ...primaryBlock, padding: '4px 12px', fontSize: '8px', opacity: 0.7 }}>Dashboard</div>
        </div>
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <div style={{ height: '12px', width: '45%', background: t.surface, borderRadius: t.radius, margin: '0 auto 6px' }} />
          <div style={{ height: '7px', width: '30%', background: t.surface, borderRadius: t.radius, margin: '0 auto' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          {['Starter', 'Pro', 'Enterprise'].map((plan, i) => (
            <div key={plan} style={{ ...surfaceBlock, padding: '14px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', border: i === 1 ? `2px solid ${t.primary}` : t.border }}>
              <span style={{ fontSize: '9px', fontWeight: 600, color: t.text }}>{plan}</span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: t.primary }}>${(i + 1) * 29}<span style={{ fontSize: '7px', opacity: 0.5 }}>/mo</span></span>
              <div style={{ ...primaryBlock, padding: '5px 16px', fontSize: '8px', width: '80%', opacity: i === 1 ? 1 : 0.5 }}>Subscribe</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {['Unlimited projects', 'Priority support', 'Custom domain', 'Team access', 'Analytics'].map(f => (
            <span key={f} style={{ ...mutedText, fontSize: '7px', background: t.surface, padding: '3px 8px', borderRadius: t.radius, border: t.border }}>{f}</span>
          ))}
        </div>
        <div style={{ ...surfaceBlock, padding: '14px', marginTop: '8px' }}>
          <span style={{ fontSize: '8px', fontWeight: 600, color: t.text }}>What Our Customers Say</span>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ flex: 1, background: t.bg, padding: '8px', borderRadius: t.radius }}>
                <div style={{ height: '4px', width: '80%', background: t.muted, borderRadius: t.radius, opacity: 0.2 }} />
                <div style={{ height: '4px', width: '60%', background: t.muted, borderRadius: t.radius, opacity: 0.15, marginTop: '3px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    ecommerce: (
      <div style={{ ...containerBase, display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', minHeight: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ ...primaryBlock, padding: '4px 12px', fontSize: '10px' }}>SHOP</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={mutedText}>Search</span>
            <span style={mutedText}>Cart (3)</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ ...surfaceBlock, padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
              <div style={{ width: '100%', aspectRatio: '1', background: t.muted, borderRadius: t.radius, opacity: 0.12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ ...mutedText, fontSize: '16px', opacity: 0.5 }}>📷</span>
              </div>
              <span style={{ fontSize: '9px', fontWeight: 600, color: t.text }}>Product {i}</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: t.primary }}>${(i * 19).toFixed(0)}</span>
              <div style={{ ...primaryBlock, padding: '4px 10px', fontSize: '8px', width: '100%' }}>Add to Cart</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          {[4,5,6].map(i => (
            <div key={i} style={{ ...surfaceBlock, padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
              <div style={{ width: '100%', aspectRatio: '1', background: t.muted, borderRadius: t.radius, opacity: 0.1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ ...mutedText, fontSize: '16px', opacity: 0.4 }}>📷</span>
              </div>
              <span style={{ fontSize: '9px', fontWeight: 600, color: t.text }}>Product {i + 3}</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: t.primary }}>${((i + 3) * 17).toFixed(0)}</span>
              <div style={{ ...primaryBlock, padding: '4px 10px', fontSize: '8px', width: '100%' }}>Add to Cart</div>
            </div>
          ))}
        </div>
      </div>
    ),
    portfolio: (
      <div style={{ ...containerBase, display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', minHeight: '500px' }}>
        <div style={{ textAlign: 'center', padding: '12px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: t.primary, margin: '0 auto 8px', opacity: 0.6 }} />
          <div style={{ height: '10px', width: '45%', background: t.surface, borderRadius: t.radius, margin: '0 auto 4px' }} />
          <div style={{ height: '6px', width: '30%', background: t.surface, borderRadius: t.radius, margin: '0 auto' }} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
            {['All', 'Design', 'Dev', 'Photo'].map(l => <span key={l} style={{ ...mutedText, background: l === 'All' ? t.primary : t.surface, color: l === 'All' ? t.primaryText : undefined, padding: '2px 8px', borderRadius: t.radius, fontSize: '7px' }}>{l}</span>)}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ aspectRatio: '1', background: t.surface, borderRadius: t.radius, border: t.border, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2px' }}>
              <div style={{ width: '60%', height: '60%', background: t.muted, borderRadius: t.radius, opacity: 0.1 }} />
              <span style={{ ...mutedText, fontSize: '6px' }}>Project {i}</span>
            </div>
          ))}
        </div>
        <div style={{ ...surfaceBlock, padding: '14px', textAlign: 'center', marginTop: '4px' }}>
          <span style={{ fontSize: '8px', color: t.text, opacity: 0.6 }}>Let's work together →</span>
        </div>
      </div>
    ),
    blog: (
      <div style={{ ...containerBase, display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', minHeight: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ ...primaryBlock, padding: '4px 12px', fontSize: '10px' }}>BLOG</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['Search', 'Subscribe'].map(l => <span key={l} style={mutedText}>{l}</span>)}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ ...surfaceBlock, padding: '10px', display: 'flex', gap: '8px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: t.radius, background: t.muted, opacity: 0.12, flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ height: '7px', width: '80%', background: t.text, borderRadius: t.radius, opacity: 0.5 }} />
                <div style={{ height: '5px', width: '60%', background: t.muted, borderRadius: t.radius, opacity: 0.2 }} />
                <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                  <span style={{ ...mutedText, fontSize: '6px', background: t.surface, padding: '1px 4px', borderRadius: '2px' }}>Design</span>
                  <span style={{ ...mutedText, fontSize: '6px' }}>Jan {i}, 2026</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...surfaceBlock, padding: '14px', textAlign: 'center' }}>
          <span style={{ fontSize: '8px', color: t.text, opacity: 0.6 }}>Load more articles ↓</span>
        </div>
      </div>
    ),
    'mobile-app': (
      <div style={{ ...containerBase, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', minHeight: '500px' }}>
        <div style={{ width: '60%', borderRadius: '24px', border: `2px solid ${t.muted}`, overflow: 'hidden', padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px', background: t.surface }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 6px' }}>
            <span style={{ ...primaryBlock, width: '18px', height: '5px', borderRadius: '2px' }} />
            <span style={{ ...mutedText, fontSize: '8px' }}>9:41</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: t.text }}>Messages</span>
          </div>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 6px', background: t.bg, borderRadius: t.radius }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: i === 1 ? t.primary : t.muted, opacity: i === 1 ? 0.8 : 0.2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: '5px', width: i === 1 ? '70%' : '50%', background: t.text, borderRadius: t.radius, opacity: 0.4 }} />
                <div style={{ height: '3px', width: '80%', background: t.muted, borderRadius: t.radius, opacity: 0.15, marginTop: '2px' }} />
              </div>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '4px', padding: '4px' }}>
            {['Home', 'Chat', 'Profile', 'More'].map(l => <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ height: '14px', width: '14px', background: l === 'Chat' ? t.primary : t.muted, borderRadius: '4px', margin: '0 auto', opacity: l === 'Chat' ? 0.6 : 0.15 }} />
              <span style={{ ...mutedText, fontSize: '5px' }}>{l}</span>
            </div>)}
          </div>
        </div>
        <div style={{ width: '60%', borderRadius: '24px', border: `2px solid ${t.muted}`, overflow: 'hidden', padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px', background: t.surface, marginTop: '4px' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: t.text }}>Settings</span>
          </div>
          {['Notifications', 'Privacy', 'Appearance'].map(l => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 6px', background: t.bg, borderRadius: t.radius }}>
              <span style={{ fontSize: '7px', color: t.text, opacity: 0.6 }}>{l}</span>
              <div style={{ width: '14px', height: '8px', background: t.primary, borderRadius: '4px', opacity: 0.4 }} />
            </div>
          ))}
        </div>
      </div>
    ),
    'web-app': (
      <div style={{ ...containerBase, display: 'flex', gap: '8px', padding: '16px', minHeight: '500px' }}>
        <div style={{ ...surfaceBlock, width: '18%', padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ ...primaryBlock, padding: '3px 8px', fontSize: '8px' }}>App</div>
          {['Inbox', 'Files', 'Settings', 'Help'].map((l, i) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '2px', background: i === 0 ? t.primary : t.muted, opacity: i === 0 ? 0.6 : 0.2 }} />
              <div style={{ height: '5px', width: l === 'Inbox' ? '70%' : '50%', background: i === 0 ? t.primary : t.muted, borderRadius: t.radius, opacity: i === 0 ? 0.5 : 0.2 }} />
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <div style={{ flex: 1, height: '7px', background: t.muted, borderRadius: t.radius, opacity: 0.12 }} />
            <div style={{ ...primaryBlock, padding: '4px 12px', fontSize: '8px' }}>Search</div>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ ...primaryBlock, padding: '3px 8px', fontSize: '7px', opacity: 0.8 }}>All</div>
            <div style={{ padding: '3px 8px', fontSize: '7px', color: t.muted, border: t.border, borderRadius: t.radius }}>Unread</div>
            <div style={{ padding: '3px 8px', fontSize: '7px', color: t.muted, border: t.border, borderRadius: t.radius }}>Archived</div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ ...surfaceBlock, padding: '8px', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === 1 ? t.primary : 'transparent', border: i === 1 ? 'none' : `1px solid ${t.muted}`, marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: '5px', width: i === 1 ? '60%' : '40%', background: t.text, borderRadius: t.radius, opacity: i === 1 ? 0.5 : 0.2 }} />
                  <div style={{ height: '3px', width: '90%', background: t.muted, borderRadius: t.radius, opacity: 0.12, marginTop: '2px' }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ ...surfaceBlock, padding: '10px', textAlign: 'center' }}>
            <span style={{ fontSize: '8px', color: t.primary, opacity: 0.7 }}>Compose new message →</span>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-all ${viewMode === 'desktop' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            <Monitor className="h-3 w-3" />
            Desktop
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-all ${viewMode === 'mobile' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            <Smartphone className="h-3 w-3" />
            Mobile
          </button>
        </div>
      </div>
      {viewMode === 'desktop' ? (
        <div className="overflow-y-auto max-h-[420px] rounded-xl border" style={{ border: t.border, boxShadow: t.shadow }}>
          <div style={{ minWidth: '580px' }}>
            {previews[type]}
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-4">
          <div className="relative" style={{
            width: '280px',
            borderRadius: '36px',
            border: '3px solid #1a1a1a',
            background: '#000',
            padding: '8px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)',
          }}>
            <div style={{
              width: '80px', height: '20px', background: '#000',
              borderRadius: '16px', margin: '0 auto 6px',
            }} />
            <div className="overflow-y-auto" style={{
              borderRadius: '28px',
              maxHeight: '480px',
            }}>
              {previews[type]}
            </div>
            <div style={{
              width: '90px', height: '3px', background: '#222',
              borderRadius: '2px', margin: '6px auto 0',
            }} />
          </div>
        </div>
      )}
    </div>
  );
}

function generatePlan(type: ProjectType, selectedStyles: Style[], selectedFeatures: Feature[]): ResourcePlan[] {
  const plans: ResourcePlan[] = [];

  plans.push({ name: 'shadcn/ui', install: 'npm install shadcn-ui', why: 'Core UI components — buttons, cards, dialogs', category: 'ui-components', size: 'small' });
  plans.push({ name: 'Tailwind CSS', install: 'npm install tailwindcss', why: 'Utility-first CSS for rapid styling', category: 'layout-grid', size: 'small' });
  plans.push({ name: 'Lucide Icons', install: 'npm install lucide-react', why: 'Beautiful tree-shakeable icons', category: 'icons-illustrations', size: 'small' });

  if (type === 'dashboard' || type === 'saas' || type === 'web-app') {
    if (!selectedFeatures.includes('charts')) {
      plans.push({ name: 'Recharts', install: 'npm install recharts', why: 'Declarative React charts', category: 'charts-data-viz', size: 'small' });
    }
  }

  if (type === 'landing-page' || type === 'portfolio') {
    plans.push({ name: 'Framer Motion', install: 'npm install framer-motion', why: 'Animations for scroll reveals, hover effects', category: 'animation-motion', size: 'small' });
    plans.push({ name: 'Aceternity UI', install: 'npm install @aceternity/ui', why: 'Premium animated components', category: 'ui-components', size: 'small' });
  }

  if (selectedStyles.includes('glassmorphic')) {
    plans.push({ name: 'Glassmorphism Generator', install: 'backdrop-filter: blur(12px)', why: 'Frosted glass effect', category: 'gradients-patterns', size: 'tiny' });
  }

  if (selectedStyles.includes('dark')) {
    plans.push({ name: 'Radix Colors', install: 'npm install @radix-ui/colors', why: 'Dark/light color scales', category: 'colors-palettes', size: 'tiny' });
  }

  if (selectedStyles.includes('playful')) {
    plans.push({ name: 'MagicUI', install: 'npm install magicui', why: 'Sparkles, meteors, magical effects', category: 'ui-components', size: 'small' });
    plans.push({ name: 'tsParticles', install: 'npm install @tsparticles/react', why: 'Particle effects', category: '3d-canvas-fx', size: 'small' });
  }

  if (selectedFeatures.includes('animations')) {
    if (!plans.find(p => p.name === 'Framer Motion')) plans.push({ name: 'Framer Motion', install: 'npm install framer-motion', why: 'Smooth animations and gestures', category: 'animation-motion', size: 'small' });
    plans.push({ name: 'AutoAnimate', install: 'npm install @formkit/auto-animate', why: 'Zero-config list animations', category: 'animation-motion', size: 'tiny' });
  }

  if (selectedFeatures.includes('3d')) {
    plans.push({ name: 'Three.js + R3F', install: 'npm install three @react-three/fiber @react-three/drei', why: '3D scenes for immersive experiences', category: '3d-canvas-fx', size: 'medium' });
  }

  if (selectedFeatures.includes('charts')) {
    plans.push({ name: 'Recharts', install: 'npm install recharts', why: 'Composable React charts', category: 'charts-data-viz', size: 'small' });
  }

  if (selectedFeatures.includes('forms')) {
    plans.push({ name: 'React Hook Form + Zod', install: 'npm install react-hook-form zod @hookform/resolvers', why: 'Performant forms with validation', category: 'forms-validation', size: 'small' });
  }

  if (selectedFeatures.includes('icons')) {
    if (!plans.find(p => p.name === 'Lucide Icons')) plans.push({ name: 'Lucide Icons', install: 'npm install lucide-react', why: 'Tree-shakeable icons', category: 'icons-illustrations', size: 'small' });
  }

  if (selectedFeatures.includes('illustrations')) {
    plans.push({ name: 'unDraw Illustrations', install: 'Download from undraw.co', why: 'Customizable SVG illustrations', category: 'icons-illustrations', size: 'tiny' });
  }

  if (selectedFeatures.includes('fonts')) {
    plans.push({ name: 'Google Fonts / Fontsource', install: 'npm install @fontsource/inter', why: 'Self-hosted or CDN fonts', category: 'fonts-typography', size: 'tiny' });
  }

  if (selectedFeatures.includes('particles')) {
    plans.push({ name: 'tsParticles', install: 'npm install @tsparticles/react', why: 'Particle effects for backgrounds', category: '3d-canvas-fx', size: 'small' });
  }

  if (selectedFeatures.includes('email')) {
    plans.push({ name: 'Formspree + React Email', install: 'npm install @react-email/components', why: 'Free form backend + email templates', category: 'forms-validation', size: 'tiny' });
  }

  if (selectedFeatures.includes('payment')) {
    plans.push({ name: 'Stripe', install: 'npm install @stripe/stripe-js @stripe/react-stripe-js', why: 'Payment processing with free tier', category: 'forms-validation', size: 'small' });
  }

  const seen = new Set<string>();
  return plans.filter(p => { const key = p.name; if (seen.has(key)) return false; seen.add(key); return true; });
}

function CopyPopup({ plan, onClose }: { plan: ResourcePlan[]; onClose: () => void }) {
  const [tab, setTab] = useState<'react' | 'python' | 'html'>('react');
  const [copied, setCopied] = useState(false);

  const getCommands = () => {
    const names = [...new Set(plan.map(p => p.name))];
    switch (tab) {
      case 'react': {
        const installs = plan
          .filter(p => p.install.startsWith('npm'))
          .map(p => p.install);
        const unique = [...new Set(installs)];
        return unique.join('\n');
      }
      case 'python': {
        const pyMapping: Record<string, string> = {
          'shadcn/ui': 'pip install django-crispy-forms',
          'Tailwind CSS': 'pip install django-tailwind',
          'Lucide Icons': 'pip install django-fontawesome',
          'Framer Motion': '# Use CSS animations in Python',
          'Aceternity UI': '# Use Jinja2 template components',
          'Recharts': 'pip install plotly',
          'React Hook Form + Zod': 'pip install django-crispy-forms',
          'MagicUI': '# CSS animations equivalent',
          'tsParticles': 'pip install particle-background',
          'Radix Colors': '# Use CSS variables',
          'Three.js + R3F': 'pip install py3d',
          'Google Fonts / Fontsource': '# Use CDN link in template',
          'AutoAnimate': '# Use CSS transitions',
          'unDraw Illustrations': '# Download SVG, use in templates',
          'Stripe': 'pip install stripe',
          'Formspree + React Email': '# Use Django forms',
          'Glassmorphism Generator': '# Use CSS backdrop-filter',
        };
        return names.map(n => pyMapping[n] || `# ${n} — manual setup`).join('\n');
      }
      case 'html': {
        const cdnMap: Record<string, string> = {
          'shadcn/ui': '<script src="https://cdn.jsdelivr.net/npm/shadcn-ui"></script>',
          'Tailwind CSS': '<script src="https://cdn.tailwindcss.com"></script>',
          'Lucide Icons': '<script src="https://unpkg.com/lucide@latest"></script>',
          'Framer Motion': '<script src="https://unpkg.com/framer-motion@latest"></script>',
          'Recharts': '<script src="https://unpkg.com/recharts@latest"></script>',
          'Three.js + R3F': '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>',
          'tsParticles': '<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine"></script>',
        };
        return names.map(n => cdnMap[n] || `<!-- ${n} — add CDN link manually -->`).join('\n');
      }
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(getCommands());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'react' as const, label: 'React', icon: <Terminal className="h-3.5 w-3.5" /> },
    { id: 'python' as const, label: 'Python', icon: <Download className="h-3.5 w-3.5" /> },
    { id: 'html' as const, label: 'HTML', icon: <Code className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl border border-zinc-200 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
          <h3 className="text-sm font-semibold text-zinc-900">Copy Install Commands</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600"><X className="h-4 w-4" /></button>
        </div>

        <div className="flex gap-1 px-4 pt-3">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setCopied(false); }}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                tab === t.id ? "bg-brand-500 text-white" : "text-zinc-500 hover:bg-zinc-100"
              )}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-4">
          <div className="rounded-xl bg-zinc-900 p-3 max-h-48 overflow-y-auto">
            <pre className="text-[11px] font-mono text-green-400 leading-relaxed whitespace-pre-wrap">{getCommands()}</pre>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 pb-4">
          <span className="text-[10px] text-zinc-400">{plan.filter(p => p.install.startsWith('npm')).length} packages</span>
          <button
            onClick={copyText}
            className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-800 transition-all"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WizardPage() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<Style[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
  const [plan, setPlan] = useState<ResourcePlan[]>([]);
  const [showCopy, setShowCopy] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleStyle = (s: Style) => {
    setSelectedStyles(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const toggleFeature = (f: Feature) => {
    setSelectedFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
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

  const stepLabels = ['Project Type', 'Style', 'Features', 'Preview & Plan'];

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <section className="px-4 sm:px-6 lg:px-6 py-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-200/50 mb-3">
                <Sparkles className="h-3 w-3" />
                Project Wizard
              </div>
              <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
                Tell us about your project
              </h1>
              <p className="mt-2 text-sm text-zinc-500">
                We&apos;ll generate a visual preview and give you only the packages you actually need.
              </p>
            </div>

            <div className="flex items-center gap-2 mb-8">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-medium transition-all',
                    i <= step ? 'bg-brand-600 text-white' : 'bg-zinc-100 text-zinc-400'
                  )}>
                    {i + 1}
                  </div>
                  <span className={cn('text-xs font-medium hidden sm:inline', i <= step ? 'text-zinc-900' : 'text-zinc-400')}>{label}</span>
                  {i < 3 && <div className="h-px w-4 bg-zinc-200 hidden sm:block" />}
                </div>
              ))}
            </div>

            {step === 0 && (
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 mb-4">What are you building?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {projectTypes.map(pt => (
                    <button
                      key={pt.id}
                      onClick={() => { setProjectType(pt.id); setStep(1); }}
                      className={cn(
                        'rounded-xl border p-4 text-left transition-all hover:shadow-md',
                        projectType === pt.id ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/20' : 'border-zinc-100 bg-white hover:border-zinc-200'
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-brand-600">{pt.icon}</span>
                        <p className="text-sm font-semibold text-zinc-900">{pt.label}</p>
                      </div>
                      <p className="text-xs text-zinc-400">{pt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 mb-1">What style do you prefer?</h2>
                <p className="text-sm text-zinc-500 mb-4">Pick one or more that match your vision</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {styles.map(s => (
                    <button
                      key={s.id}
                      onClick={() => toggleStyle(s.id)}
                      className={cn(
                        'rounded-xl border p-4 text-left transition-all',
                        selectedStyles.includes(s.id) ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/20' : 'border-zinc-100 bg-white hover:border-zinc-200'
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={cn(
                          'h-3 w-3 rounded-full',
                          s.id === 'modern' && 'bg-blue-500',
                          s.id === 'minimal' && 'bg-zinc-800',
                          s.id === 'dark' && 'bg-violet-500',
                          s.id === 'glassmorphic' && 'bg-indigo-400',
                          s.id === 'playful' && 'bg-pink-400',
                          s.id === 'brutalist' && 'bg-black',
                        )} />
                        <p className="text-sm font-semibold text-zinc-900">{s.label}</p>
                      </div>
                      <p className="text-xs text-zinc-400">{s.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50">Back</button>
                  <button onClick={() => setStep(2)} className="rounded-lg bg-zinc-900 px-6 py-2 text-sm text-white hover:bg-zinc-800">Next: Features →</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 mb-1">What features do you need?</h2>
                <p className="text-sm text-zinc-500 mb-4">Select all that apply — only what you need, no bloat</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {features.map(f => (
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
                  <button onClick={() => setStep(1)} className="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50">Back</button>
                  <button onClick={generateAndShowPlan} className="rounded-lg bg-zinc-900 px-6 py-2 text-sm text-white hover:bg-zinc-800 inline-flex items-center gap-2">
                    Generate My Plan <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-3">
                    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
                      <div className="flex items-center gap-2 bg-zinc-900/95 px-4 py-2 border-b border-white/10">
                        <div className="flex gap-1.5">
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
                          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/90" />
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500/90" />
                        </div>
                        <div className="flex-1 text-center">
                          <span className="text-[11px] font-medium text-zinc-400/90">Design Preview</span>
                        </div>
                      </div>
                      <div className="p-4">
                        {projectType && <DesignPreview type={projectType} style={selectedStyles[0] || 'modern'} />}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-4 h-full">
                      <h3 className="text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-3">Your Selection</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] text-zinc-400 uppercase mb-1">Project</p>
                          <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-700">
                            {projectTypes.find(pt => pt.id === projectType)?.label}
                          </span>
                        </div>
                        {selectedStyles.length > 0 && (
                          <div>
                            <p className="text-[10px] text-zinc-400 uppercase mb-1">Style</p>
                            <div className="flex flex-wrap gap-1">
                              {selectedStyles.map(s => (
                                <span key={s} className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600">
                                  {styles.find(st => st.id === s)?.label}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {selectedFeatures.length > 0 && (
                          <div>
                            <p className="text-[10px] text-zinc-400 uppercase mb-1">Features</p>
                            <div className="flex flex-wrap gap-1">
                              {selectedFeatures.map(f => (
                                <span key={f} className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600">
                                  {features.find(fe => fe.id === f)?.label}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
                  <div className="bg-zinc-900/95 px-4 py-2.5 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-300">Your Packages</span>
                      <button
                        onClick={() => setShowCopy(true)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-brand-600 transition-all shadow-sm"
                      >
                        <Copy className="h-3 w-3" />
                        Copy Commands
                      </button>
                    </div>
                  </div>
                  <div className="divide-y divide-zinc-50">
                    {plan.map((item, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-50 transition-colors">
                        <div className="min-w-0 flex-1 flex items-center gap-2">
                          <p className="text-sm font-medium text-zinc-900">{item.name}</p>
                          <span className={cn(
                            "inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium capitalize",
                            item.size === 'tiny' && 'bg-zinc-50 text-zinc-400',
                            item.size === 'small' && 'bg-blue-50 text-blue-600',
                            item.size === 'medium' && 'bg-amber-50 text-amber-600',
                          )}>
                            {item.size}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(item.install, i)}
                          className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-all"
                        >
                          {copiedIndex === i ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    ))}
                    <div className="px-4 py-3 bg-zinc-50/50 flex gap-3 items-center justify-between">
                      <span className="text-xs text-zinc-400">{plan.length} packages · Select another format in the copy popup</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setStep(0); setProjectType(null); setSelectedStyles([]); setSelectedFeatures([]); setPlan([]); }}
                          className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50"
                        >
                          Start Over
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      {showCopy && plan.length > 0 && <CopyPopup plan={plan} onClose={() => setShowCopy(false)} />}
      <Footer />
    </>
  );
}

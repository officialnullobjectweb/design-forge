'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const navLinks = [
  { label: 'Resources', href: '/resources' },
  { label: 'Templates', href: '/templates' },
  { label: 'Skills', href: '/skills' },
  { label: 'Wizard', href: '/wizard' },
  { label: 'CLI', href: '/#cli' },
  { label: 'Credits', href: '/credits' },
];

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, 800], [0, 1]);

  const shadowOpacity = useTransform(progress, [0, 1], [0, 0.15]);
  const bottomLineScaleX = useSpring(useTransform(progress, [0, 1], [0, 1]), { stiffness: 100, damping: 30 });

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50">
      <motion.div className="px-3 sm:px-4 lg:px-6" style={{ width: useTransform(progress, [0, 1], ['85%', '75%']), maxWidth: 1280, marginLeft: 'auto', marginRight: 'auto' }}>
        <motion.div
          className="border border-white/20 overflow-hidden"
          style={{
            borderRadius: useTransform(progress, [0, 1], [16, 10]),
            marginTop: useTransform(progress, [0, 1], [16, 6]),
            background: useTransform(progress, [0, 1], ['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.92)']),
            backdropFilter: useTransform(progress, [0, 1], ['blur(12px)', 'blur(20px)']),
            boxShadow: useTransform(shadowOpacity, (o) => `0 4px 24px rgba(0,0,0,${o})`),
          }}
        >
          <div className="relative flex h-14 items-center justify-between px-4 sm:px-5">
            <motion.div
              className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left bg-gradient-to-r from-transparent via-brand-500 to-transparent"
              style={{ scaleX: bottomLineScaleX, opacity: progress }}
            />
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                <svg className="relative text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ height: '62%', width: '62%' }}>
                  <path d="M10 2L7.6 5.2c-.4.5-.4 1.2 0 1.7l.8 1.1c.4.5.4 1.2 0 1.7L5 14" />
                  <path d="M14 2l2.4 3.2c.4.5.4 1.2 0 1.7l-.8 1.1c-.4.5-.4 1.2 0 1.7L19 14" />
                  <path d="M5 14h14" />
                  <path d="M4 16h16" />
                  <path d="M3 18h18" />
                  <path d="M3 20h18" />
                  <path d="M3 22h18" />
                </svg>
              </div>
              <span className="hidden text-base font-bold tracking-tight text-zinc-900 sm:inline">
                Numb.<span className="text-brand-600">Design</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && !link.href.startsWith('/#') && pathname?.startsWith(link.href));
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="https://github.com/officialnullobjectweb/design-forge"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800"
              >
                <GithubIcon />
                github
              </a>
            </nav>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex md:hidden h-8 w-8 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {mobileOpen && (
        <div className="mx-auto mt-1 max-w-6xl px-3 sm:px-4 lg:px-6 md:hidden">
          <nav className="glass rounded-2xl border border-white/20 p-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3.5 py-2.5 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/officialnullobjectweb/design-forge"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              <GithubIcon />
              github
            </a>
          </nav>
        </div>
      )}
    </motion.header>
  );
}

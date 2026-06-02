'use client';

import { Menu, X, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Resources', href: '/resources' },
  { label: 'Templates', href: '/templates' },
  { label: 'Skills', href: '/skills' },
  { label: 'Wizard', href: '/wizard' },
  { label: 'CLI', href: '/#cli' },
  { label: 'Credits', href: '/credits' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [stars, setStars] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/repos/officialnullobjectweb/design-forge')
      .then((r) => r.json())
      .then((d) => setStars(d.stargazers_count))
      .catch(() => {});
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className={`mx-auto transition-all duration-300 ${scrolled ? 'max-w-4xl px-3 sm:px-4' : 'max-w-6xl px-3 sm:px-4 lg:px-6'}`}>
        <div className={`transition-all duration-300 ${scrolled ? 'glass-dense mt-2 rounded-xl shadow-sm shadow-brand-500/5' : 'glass mt-4 rounded-2xl border border-white/20 shadow-sm shadow-brand-500/5'}`}>
          <div className="flex h-12 items-center justify-between px-4">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                <svg className="relative h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2L7.6 5.2c-.4.5-.4 1.2 0 1.7l.8 1.1c.4.5.4 1.2 0 1.7L5 14" />
                  <path d="M14 2l2.4 3.2c.4.5.4 1.2 0 1.7l-.8 1.1c-.4.5-.4 1.2 0 1.7L19 14" />
                  <path d="M5 14h14" />
                  <path d="M4 16h16" />
                  <path d="M3 18h18" />
                  <path d="M3 20h18" />
                  <path d="M3 22h18" />
                </svg>
              </div>
              <span className="text-xs font-bold tracking-tight text-zinc-900 hidden sm:inline">
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
                    className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all ${
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
                className="ml-2 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-1.5 text-[11px] font-medium text-white transition-all hover:bg-zinc-800"
              >
                <Star className="h-3 w-3" />
                {stars !== null ? stars.toLocaleString() : 'Star'}
              </a>
            </nav>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex md:hidden h-7 w-7 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100"
            >
              {mobileOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

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
              <Star className="h-3.5 w-3.5" />
              {stars !== null ? `${stars.toLocaleString()} Stars` : 'Star on GitHub'}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

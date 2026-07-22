'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const navItems = [
  { label: 'Tarina', href: '/tarina' },
  { label: 'Puutalot', href: '/puutalot' },
  { label: 'Puuelementit', href: '/puuelementit' },
  { label: 'Kattoristikot', href: '/kattoristikot' },
  { label: 'Kohteet', href: '/kohteet' },
  { label: 'Tietopankki', href: '/tietopankki' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm" style={{ height: '72px', backgroundColor: 'var(--dark)' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center h-full relative">
          {/* Logo - centered on mobile, left on desktop */}
          <Link href="/" aria-label="Hietakulma" className="absolute lg:relative left-1/2 lg:left-auto transform lg:transform-none -translate-x-1/2 lg:translate-x-0 flex items-center hover:opacity-90 transition-opacity">
            <Image
              src="/logos/Hietakulma_logo_cmyk_valk.png"
              alt="Hietakulma"
              width={235}
              height={36}
              priority
              className="h-5 sm:h-6 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation - center */}
          <div className="hidden lg:flex items-center space-x-5 xl:space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hover:text-[var(--blue)] transition-colors font-normal text-xs xl:text-sm ${
                    isActive ? 'text-[var(--blue)] font-medium' : 'text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Button - right */}
          <div className="hidden lg:block ml-auto">
            <Button
              href="/ota-yhteytta"
              variant="dark"
              className="text-sm uppercase tracking-wide px-6 py-2 transition-all font-normal"
            >
              OTA YHTEYTTÄ
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="ml-auto flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Sulje valikko' : 'Avaa valikko'}
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-white/10 bg-dark lg:hidden"
          >
            <div className="mx-auto flex min-h-full max-w-7xl flex-col px-5 py-5 sm:px-6">
              <div>
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex min-h-14 items-center border-b border-white/10 text-lg font-medium transition-colors hover:text-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue ${
                        isActive ? 'text-blue' : 'text-white'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-7 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <Button
                href="/ota-yhteytta"
                variant="imagePrimary"
                className="block w-full px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.12em]"
                onClick={() => setMobileMenuOpen(false)}
              >
                OTA YHTEYTTÄ
              </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

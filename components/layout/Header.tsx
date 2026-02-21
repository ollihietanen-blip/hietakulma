'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 shadow-sm" style={{ height: '72px', backgroundColor: 'var(--dark)' }}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center h-full relative">
            {/* Logo - centered on mobile, left on desktop */}
            <Link
              href="/"
              className="md:mr-0 text-2xl md:text-3xl font-light text-white hover:text-gray-300 transition-colors uppercase tracking-tight font-sans absolute md:relative left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:translate-x-0 z-50"
            >
              HIETA<span style={{ color: 'var(--blue)' }}>K</span>ULMA
            </Link>

            {/* Desktop Navigation - center */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-gray-300 transition-colors font-normal text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Button - right */}
            <div className="hidden md:block ml-auto">
              <Link
                href="/ota-yhteytta"
                className="border text-sm uppercase tracking-wide px-6 py-2 transition-all font-normal"
                style={{
                  borderColor: 'var(--blue)',
                  color: 'var(--blue)',
                  borderRadius: '0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--blue)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--blue)';
                }}
              >
                OTA YHTEYTTÄ
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden relative z-50 p-2 text-white ml-auto"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Sulje valikko' : 'Avaa valikko'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-6 h-6 relative">
                <span
                  className="absolute left-0 block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out"
                  style={{
                    top: mobileMenuOpen ? '11px' : '4px',
                    transform: mobileMenuOpen ? 'rotate(45deg)' : 'none',
                  }}
                />
                <span
                  className="absolute left-0 top-[11px] block w-6 h-0.5 bg-current transition-opacity duration-300 ease-in-out"
                  style={{ opacity: mobileMenuOpen ? 0 : 1 }}
                />
                <span
                  className="absolute left-0 block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out"
                  style={{
                    top: mobileMenuOpen ? '11px' : '18px',
                    transform: mobileMenuOpen ? 'rotate(-45deg)' : 'none',
                  }}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={closeMenu}
        aria-hidden={!mobileMenuOpen}
      />

      {/* Mobile Navigation Panel */}
      <div
        className={`fixed top-[72px] left-0 right-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ backgroundColor: 'var(--dark)' }}
      >
        <nav className="px-6 py-6">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3.5 text-white text-lg font-light border-b border-gray-700/50 transition-colors active:text-gray-400"
              style={{
                transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
              }}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/ota-yhteytta"
            className="block mt-6 border px-6 py-3.5 text-center text-sm uppercase tracking-wide transition-all active:opacity-80"
            style={{
              borderColor: 'var(--blue)',
              color: 'var(--blue)',
              borderRadius: '0'
            }}
            onClick={closeMenu}
          >
            OTA YHTEYTTÄ
          </Link>
        </nav>
      </div>
    </>
  );
}


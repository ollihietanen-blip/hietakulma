'use client';

import { useState } from 'react';
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
            className="lg:hidden p-2 text-white ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
          <div className="lg:hidden py-4 border-t border-gray-700" style={{ backgroundColor: 'var(--dark)' }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-2 hover:text-[var(--blue)] ${
                    isActive ? 'text-[var(--blue)] font-medium' : 'text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="px-4 mt-6">
              <Button
                href="/ota-yhteytta"
                variant="dark"
                className="w-full text-center text-sm uppercase tracking-wide px-6 py-3 transition-all block"
                onClick={() => setMobileMenuOpen(false)}
              >
                OTA YHTEYTTÄ
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

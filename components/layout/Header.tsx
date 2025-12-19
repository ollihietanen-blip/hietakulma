'use client';

import { useState } from 'react';
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm" style={{ height: '72px', backgroundColor: 'var(--dark)' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center h-full relative">
          {/* Logo - centered on mobile, left on desktop */}
          <Link href="/" className="md:mr-0 text-xl sm:text-2xl font-light text-white hover:text-gray-300 transition-colors uppercase tracking-tight font-sans absolute md:relative left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:translate-x-0">
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
            className="md:hidden p-2 text-white ml-auto"
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
          <div className="md:hidden py-4 border-t border-gray-700" style={{ backgroundColor: 'var(--dark)' }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-white hover:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/ota-yhteytta"
              className="block mt-4 border px-6 py-2 text-center text-sm uppercase tracking-wide transition-all"
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
              onClick={() => setMobileMenuOpen(false)}
            >
              OTA YHTEYTTÄ
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}


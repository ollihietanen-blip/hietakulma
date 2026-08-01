'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { label: 'Tarina', href: '/tarina', delay: '[animation-delay:40ms]' },
  { label: 'Puutalot', href: '/puutalot', delay: '[animation-delay:80ms]' },
  { label: 'Puuelementit', href: '/puuelementit', delay: '[animation-delay:120ms]' },
  { label: 'Kattoristikot', href: '/kattoristikot', delay: '[animation-delay:160ms]' },
  { label: 'Kohteet', href: '/kohteet', delay: '[animation-delay:200ms]' },
  { label: 'Tietopankki', href: '/tietopankki', delay: '[animation-delay:240ms]' },
] as const;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const hasSolidSurface = isScrolled || pathname !== '/' || mobileMenuOpen;

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24);

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
      menuButton?.focus();
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[72px] border-b text-white transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
        hasSolidSurface
          ? 'border-[rgba(255,255,255,0.10)] bg-[rgba(24,22,22,0.82)] shadow-[0_10px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl'
          : 'border-transparent bg-transparent shadow-none backdrop-blur-none'
      }`}
    >
      <nav
        className="mx-auto h-full max-w-[1440px] px-4 sm:px-6 lg:px-8"
        aria-label="Päänavigaatio"
      >
        <div className="flex h-full items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Hietakulman etusivu"
            className="flex shrink-0 items-center transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
          >
            <Image
              src="/logos/Hietakulma_logo_cmyk_valk.png"
              alt="Hietakulma"
              width={235}
              height={36}
              priority
              className="h-[21px] w-auto object-contain xl:h-[22px]"
            />
          </Link>

          <div className="hidden items-center gap-2 lg:flex xl:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`group relative flex h-10 items-center px-2 text-[13px] font-medium tracking-[0.01em] transition-colors hover:text-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue ${
                  isActive(item.href)
                    ? 'text-white'
                    : 'text-white/70'
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-2 bottom-0 h-px origin-left bg-blue transition-[opacity,transform] ${
                    isActive(item.href)
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70'
                  }`}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>

          <Link
            href="/ota-yhteytta"
            className="hidden h-11 min-w-[180px] shrink-0 items-center justify-center bg-blue px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:inline-flex xl:px-6"
          >
            <span>Pyydä tarjous</span>
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className="group ml-auto flex h-11 items-center gap-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Avaa valikko"
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 transition-colors group-hover:text-white">Valikko</span>
            <span className="flex w-7 flex-col gap-1.5" aria-hidden="true">
              <span className="h-px w-full bg-current" />
              <span className="ml-auto h-px w-4/5 bg-current transition-[width] group-hover:w-full" />
            </span>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="pointer-events-auto fixed inset-0 z-[60] min-h-[100svh] overflow-y-auto bg-[rgba(13,12,12,0.82)] text-white backdrop-blur-2xl animate-fadeIn lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Päävalikko"
        >
          <div className="mx-auto flex min-h-[100svh] max-w-xl flex-col px-5 sm:px-7">
            <div className="flex h-[72px] shrink-0 items-center justify-between">
              <Link
                href="/"
                aria-label="Hietakulman etusivu"
                onClick={() => setMobileMenuOpen(false)}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                <Image
                  src="/logos/Hietakulma_logo_cmyk_valk.png"
                  alt="Hietakulma"
                  width={235}
                  height={36}
                  className="h-[22px] w-auto object-contain"
                />
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="group flex h-11 items-center gap-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                aria-label="Sulje valikko"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55 transition-colors group-hover:text-white">Sulje</span>
                <span className="relative h-6 w-6" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <div className="flex flex-1 flex-col pb-5 pt-5 sm:pt-7">
              <div className="space-y-0.5">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex min-h-[58px] items-center opacity-0 [animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100 ${item.delay} animate-slideUp ${
                      isActive(item.href) ? 'text-blue' : 'text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-[clamp(1.85rem,8vw,2.45rem)] font-semibold leading-[1.05] tracking-[-0.035em] transition-colors group-hover:text-blue">{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-8 border-t border-white/15 pt-6">
                <Link
                  href="/ota-yhteytta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-14 items-center justify-center bg-blue px-5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Pyydä tarjous</span>
                </Link>
              </div>

              <div className="mt-auto flex items-end justify-between gap-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-8 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">
                <span>Kankaanpää</span>
                <span className="text-right">Toimitukset koko Suomeen</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

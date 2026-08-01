'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { label: 'Tarina', href: '/tarina', index: '01', delay: '[animation-delay:40ms]' },
  { label: 'Puutalot', href: '/puutalot', index: '02', delay: '[animation-delay:80ms]' },
  { label: 'Puuelementit', href: '/puuelementit', index: '03', delay: '[animation-delay:120ms]' },
  { label: 'Kattoristikot', href: '/kattoristikot', index: '04', delay: '[animation-delay:160ms]' },
  { label: 'Kohteet', href: '/kohteet', index: '05', delay: '[animation-delay:200ms]' },
  { label: 'Tietopankki', href: '/tietopankki', index: '06', delay: '[animation-delay:240ms]' },
] as const;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
      className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-white/10 text-white backdrop-blur-xl"
      style={{ backgroundColor: 'rgba(31, 28, 28, 0.94)' }}
    >
      <nav
        className="mx-auto h-full max-w-[1440px] px-4 sm:px-6 lg:px-8"
        aria-label="Päänavigaatio"
      >
        <div className="flex h-full items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Hietakulman etusivu"
            className="flex shrink-0 items-center gap-3.5 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
          >
            <Image
              src="/logos/Hietakulma_logo_cmyk_valk.png"
              alt="Hietakulma"
              width={235}
              height={36}
              priority
              className="h-[21px] w-auto object-contain xl:h-[22px]"
            />
            <span className="hidden border-l border-white/15 pl-3.5 text-[8px] font-semibold uppercase tracking-[0.19em] text-white/45 2xl:block">
              Puurakentamisen erikoisosaaja
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex xl:gap-1.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`group relative flex h-9 items-center gap-2 px-2.5 text-[13px] font-medium tracking-[0.01em] transition-[color,background-color] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue xl:px-3 ${
                  isActive(item.href)
                    ? 'bg-white/[0.07] text-white'
                    : 'text-white/68 hover:bg-white/[0.045] hover:text-white'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full bg-blue transition-[opacity,transform] ${
                    isActive(item.href)
                      ? 'scale-100 opacity-100'
                      : 'scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-55'
                  }`}
                  aria-hidden="true"
                />
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/ota-yhteytta"
            className="group hidden h-10 shrink-0 items-center gap-3 bg-blue px-4 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition-colors hover:bg-white hover:text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:inline-flex xl:px-5"
          >
            <span>Aloita projekti</span>
            <span className="text-base font-normal leading-none transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
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
          className="pointer-events-auto fixed inset-0 z-[60] min-h-[100svh] overflow-y-auto bg-dark text-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Päävalikko"
        >
          <div className="mx-auto flex min-h-[100svh] max-w-xl flex-col px-5 sm:px-7">
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/10">
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

            <div className="flex flex-1 flex-col py-6 sm:py-8">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-blue">Tutustu Hietakulmaan</p>
              <div className="border-t border-white/10">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group grid min-h-[58px] grid-cols-[2.25rem_1fr_auto] items-center border-b border-white/10 opacity-0 [animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100 ${item.delay} animate-slideUp ${
                      isActive(item.href) ? 'text-blue' : 'text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-[9px] font-bold tracking-[0.18em] text-white/35">{item.index}</span>
                    <span className="text-[1.35rem] font-semibold leading-none tracking-[-0.02em]">{item.label}</span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-white/35 transition-all group-hover:translate-x-1 group-hover:text-blue"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M5 12h13M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/ota-yhteytta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex min-h-14 items-center justify-between bg-blue px-5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Aloita projekti</span>
                  <span className="text-lg transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
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

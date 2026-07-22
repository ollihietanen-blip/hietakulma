'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Kohde } from '@/types/content';

const filters = [
  { value: 'all', label: 'Kaikki' },
  { value: 'pientalot', label: 'Pientalot' },
  { value: 'paritalot', label: 'Paritalot' },
  { value: 'rivitalot', label: 'Rivitalot' },
  { value: 'loma-asunnot', label: 'Loma-asunnot' },
  { value: 'toimitilat', label: 'Toimitilat' },
] as const;

interface ProjectPortfolioProps {
  projects: Kohde[];
}

export default function ProjectPortfolio({ projects }: ProjectPortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]['value']>('all');
  const visibleProjects = useMemo(
    () => projects.filter((project) => activeFilter === 'all' || project.category === activeFilter),
    [activeFilter, projects]
  );

  return (
    <div>
      <div className="mb-9 flex gap-x-7 gap-y-3 overflow-x-auto border-b border-black/15 pb-px md:mb-12 md:flex-wrap" aria-label="Suodata kohteita">
        {filters.map((filter) => {
          const count = filter.value === 'all'
            ? projects.length
            : projects.filter((project) => project.category === filter.value).length;

          if (count === 0) return null;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`relative shrink-0 pb-4 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue ${
                activeFilter === filter.value ? 'text-text' : 'text-gray-500 hover:text-text'
              }`}
              aria-pressed={activeFilter === filter.value}
            >
              {filter.label} <span className="ml-1 text-xs font-medium text-gray-400">{String(count).padStart(2, '0')}</span>
              <span
                className={`absolute inset-x-0 -bottom-px h-0.5 bg-blue transition-transform duration-300 ${
                  activeFilter === filter.value ? 'scale-x-100' : 'scale-x-0'
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:gap-x-7 lg:gap-y-14">
        {visibleProjects.map((project, index) => {
          const isLead = activeFilter === 'all' && index === 0;

          return (
            <Link
              key={project.slug}
              href={`/kohteet/${project.slug}`}
              className={`group block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-4 ${
                isLead ? 'md:col-span-2' : ''
              }`}
            >
              <article>
                <div className={`relative overflow-hidden bg-gray-100 ${isLead ? 'aspect-[16/9] md:aspect-[2.15/1]' : 'aspect-[4/3]'}`}>
                  <Image
                    src={project.thumbnailImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                    sizes={isLead ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                    priority={isLead}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  {isLead && (
                    <div className="absolute bottom-5 left-5 border-l-2 border-blue pl-4 text-white md:bottom-8 md:left-8 md:pl-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Uusin kohde</p>
                      <p className="mt-1 text-sm text-white/85">{project.deliveryScope}</p>
                    </div>
                  )}
                </div>

                <div className="grid gap-4 border-b border-black/15 py-5 transition-colors group-hover:border-blue md:grid-cols-[1fr_auto] md:items-start md:py-6">
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                      {project.type} · {project.location} · {project.year}
                    </p>
                    <h3 className={`font-extrabold leading-[1.05] text-text ${isLead ? 'text-3xl md:text-4xl' : 'text-2xl md:text-[1.75rem]'}`}>
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
                      {project.customerType} <span className="mx-2 text-blue">/</span> {project.deliveryScope}
                    </p>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center border border-black/25 transition-all duration-300 group-hover:border-blue group-hover:bg-blue group-hover:text-white" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M5 12h13M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

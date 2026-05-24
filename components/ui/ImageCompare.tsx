'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageCompareProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  className?: string;
  beforePosition?: string;
  afterPosition?: string;
}

export default function ImageCompare({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  className = '',
  beforePosition = 'center',
  afterPosition = 'center',
}: ImageCompareProps) {
  const [position, setPosition] = useState(52);
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div className={`group relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        className="object-cover"
        style={{ objectPosition: afterPosition }}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          className="object-cover"
          style={{ objectPosition: beforePosition }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div
        className={`pointer-events-none absolute inset-x-3 bottom-3 z-10 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-opacity duration-150 ${
          isInteracting ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="bg-black/45 px-2 py-1">{beforeLabel}</span>
        <span className="bg-black/45 px-2 py-1">{afterLabel}</span>
      </div>

      <div
        className="pointer-events-none absolute top-0 z-10 h-full w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-black/45 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-105">
          <span className="absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-l border-white" />
          <span className="absolute right-2 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-white" />
        </div>
      </div>

      <input
        type="range"
        min="8"
        max="92"
        value={position}
        aria-label={`${beforeLabel} / ${afterLabel}`}
        onChange={(event) => setPosition(Number(event.target.value))}
        onPointerDown={() => setIsInteracting(true)}
        onPointerUp={() => setIsInteracting(false)}
        onPointerCancel={() => setIsInteracting(false)}
        onBlur={() => setIsInteracting(false)}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

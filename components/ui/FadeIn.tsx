'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export default function FadeIn({
    children,
    delay = 0,
    className,
    direction = 'up',
}: FadeInProps) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentElement = domRef.current;
        if (!currentElement) return;

        let hasRevealed = false;
        let observer: IntersectionObserver | null = null;

        const reveal = () => {
            if (hasRevealed) return;
            hasRevealed = true;
            setIsVisible(true);
            observer?.unobserve(currentElement);
            window.removeEventListener('scroll', checkVisibility);
            window.removeEventListener('resize', checkVisibility);
        };

        const checkVisibility = () => {
            const rect = currentElement.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

            const isInViewport =
                rect.top <= viewportHeight * 0.9 &&
                rect.bottom >= 0 &&
                rect.left <= viewportWidth &&
                rect.right >= 0;

            if (isInViewport) reveal();
        };

        if ('IntersectionObserver' in window) {
            observer = new IntersectionObserver(
                (entries) => {
                    if (entries.some((entry) => entry.isIntersecting)) reveal();
                },
                { rootMargin: '0px 0px -10% 0px' }
            );
            observer.observe(currentElement);
        } else {
            reveal();
        }

        const frameId = window.requestAnimationFrame(checkVisibility);
        window.addEventListener('scroll', checkVisibility, { passive: true });
        window.addEventListener('resize', checkVisibility);

        return () => {
            window.cancelAnimationFrame(frameId);
            observer?.unobserve(currentElement);
            window.removeEventListener('scroll', checkVisibility);
            window.removeEventListener('resize', checkVisibility);
        };
    }, []);

    const directionClasses = {
        up: 'translate-y-8',
        down: '-translate-y-8',
        left: 'translate-x-8',
        right: '-translate-x-8',
        none: '',
    };

    return (
        <div
            ref={domRef}
            className={cn(
                'transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]',
                isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${directionClasses[direction]}`,
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

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
        const observer = new IntersectionObserver(
            (entries) => {
                // In your case there's only one element to observe:     
                if (entries[0].isIntersecting) {
                    // Not possible to set it back to false like this:
                    setIsVisible(true);
                    // No need to keep observing:
                    if (domRef.current) observer.unobserve(domRef.current);
                }
            },
            { rootMargin: '0px 0px -10% 0px' }
        );

        if (domRef.current) {
            observer.observe(domRef.current);
        }

        return () => {
            if (domRef.current) observer.unobserve(domRef.current);
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
                'transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)',
                isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${directionClasses[direction]}`,
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

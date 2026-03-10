import FadeIn from '@/components/ui/FadeIn';
import type { KeyMetric } from '@/lib/content/key-metrics';

interface KeyMetricsProps {
  metrics: KeyMetric[];
}

export default function KeyMetrics({ metrics }: KeyMetricsProps) {
  const gridCols = metrics.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-4';
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-6 md:gap-8 max-w-6xl mx-auto text-center`}>
      {metrics.map((metric, index) => (
        <FadeIn key={index} delay={index * 100}>
          <div className="p-4 md:p-6">
            <div
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2"
              style={{ color: 'var(--blue)', lineHeight: '1.1', fontWeight: 800 }}
            >
              {metric.value}
            </div>
            {metric.title && (
              <div className="text-sm md:text-base text-gray-700 font-bold mb-2">
                {metric.title}
              </div>
            )}
            {metric.description && (
              <div className="text-sm text-gray-600 leading-relaxed">
                {metric.description}
              </div>
            )}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

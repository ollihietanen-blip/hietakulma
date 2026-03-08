interface Metric {
  value: string;
  label: string;
}

const metrics: Metric[] = [
  { value: '30+', label: 'vuotta kokemusta' },
  { value: '3 750+', label: 'toimitettua kohdetta' },
  { value: '81 500+', label: 'm² elementtejä' },
  { value: '15–20', label: 'ammattilaista' },
];

export default function KeyMetrics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto text-center">
      {metrics.map((metric, index) => (
        <div key={index} className="p-4 md:p-6">
          <div
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-2"
            style={{ color: 'var(--blue)', lineHeight: '1.1' }}
          >
            {metric.value}
          </div>
          <div className="text-sm md:text-base text-gray-600 uppercase tracking-wide font-medium">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
}

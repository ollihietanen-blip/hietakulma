'use client';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  isActive?: boolean;
}

interface ProcessFlowProps {
  title?: string;
  subtitle?: string;
  steps: ProcessStep[];
  activeStep?: number;
}

export default function ProcessFlow({
  title = 'NÄIN RAKENNAT KANSSAMME',
  subtitle = 'Sujuva prosessi varmistaa aikataulun ja budjetin pitävyyden.',
  steps,
  activeStep,
}: ProcessFlowProps) {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-text" style={{ lineHeight: '1.1' }}>
          {title}
        </h2>
        {subtitle && <p className="text-base sm:text-lg text-gray-600">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center group relative">
            {/* Ympyrä - samalla rivillä kaikille */}
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer flex-shrink-0"
              style={{
                backgroundColor: '#F8E0C7',
                transition: 'background-color 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--blue)';
                const numberSpan = e.currentTarget.querySelector('span');
                if (numberSpan) numberSpan.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F8E0C7';
                const numberSpan = e.currentTarget.querySelector('span');
                if (numberSpan) numberSpan.style.color = 'var(--text)';
              }}
            >
              <span
                className="text-3xl sm:text-4xl md:text-5xl font-black"
                style={{ color: 'var(--text)', transition: 'color 0.3s ease' }}
              >
                {step.number}
              </span>
            </div>
            {/* Tekstit - voivat olla eri pituisia */}
            <div className="text-center w-full">
              <h3 className="font-bold text-text text-base md:text-lg mb-2">{step.title}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-[200px] mx-auto">{step.description}</p>
            </div>
            {/* Viiva ympyröiden väliin */}
            {index < steps.length - 1 && (
              <div 
                className="hidden md:block absolute top-14 right-0 h-0.5" 
                style={{ 
                  backgroundColor: '#F8E0C7',
                  width: 'calc(50% - 56px)',
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


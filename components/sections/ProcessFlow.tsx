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
    <div className="pt-0 pb-12 md:pb-16">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-text" style={{ lineHeight: '1.1' }}>
          {title}
        </h2>
        {subtitle && <p className="text-base sm:text-lg text-gray-600">{subtitle}</p>}
      </div>

      <div className="max-w-3xl mx-auto grid gap-y-6 sm:gap-y-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className="group grid min-h-24 sm:h-32 grid-cols-[4.5rem_1fr] gap-5 sm:grid-cols-[7rem_1fr] sm:gap-8 items-center"
          >
            <div className="flex justify-center">
              <div
                className={`relative z-10 flex h-16 w-16 sm:h-28 sm:w-28 items-center justify-center rounded-full flex-shrink-0 transition-colors duration-300 ${
                  activeStep === step.number || step.isActive ? 'bg-blue' : 'bg-[#F8E0C7] group-hover:bg-blue'
                }`}
              >
                <span
                  className={`text-3xl sm:text-5xl font-black transition-colors duration-300 ${
                    activeStep === step.number || step.isActive ? 'text-white' : 'text-text group-hover:text-white'
                  }`}
                >
                  {step.number}
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-text text-lg md:text-2xl mb-3">{step.title}</h3>
              <p className="max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

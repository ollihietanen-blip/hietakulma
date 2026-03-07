'use client';

import ContactForm from '@/components/forms/ContactForm';

export default function ContactSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32" style={{ backgroundColor: 'var(--dark)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-white" style={{ color: 'var(--sand)', lineHeight: '1.1' }}>
              Ota yhteyttä
            </h2>
          </div>
          <div className="max-w-lg mx-auto md:mx-0">
            <ContactForm idPrefix="contact" />
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--dark)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-extrabold mb-6 text-white" style={{ color: 'var(--sand)', lineHeight: '1.1' }}>
              Ota yhteyttä
            </h2>
          </div>
          <div className="max-w-lg">
            {submitted ? (
              <div className="bg-green-500/20 border border-green-500 text-green-200 p-4 rounded" style={{ borderRadius: '8px' }}>
                <p>Viesti lähetetty onnistuneesti! Otamme yhteyttä pian.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-white text-sm mb-2">
                      Nimi (etunimi) *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-text focus:outline-none focus:ring-2 focus:ring-blue"
                      style={{ borderRadius: '8px', height: '44px' }}
                      placeholder="Etunimi"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-white text-sm mb-2">
                      Sukunimi *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-text focus:outline-none focus:ring-2 focus:ring-blue"
                      style={{ borderRadius: '8px', height: '44px' }}
                      placeholder="Sukunimi"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-white text-sm mb-2">
                    Sähköpostiosoite *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-text focus:outline-none focus:ring-2 focus:ring-blue"
                    style={{ borderRadius: '8px', height: '44px' }}
                    placeholder="sähköposti@esimerkki.fi"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-white text-sm mb-2">
                    Puhelinnumero *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-text focus:outline-none focus:ring-2 focus:ring-blue"
                    style={{ borderRadius: '8px', height: '44px' }}
                    placeholder="040 123 4567"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-white text-sm mb-2">
                    Yritys (valinnainen)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-text focus:outline-none focus:ring-2 focus:ring-blue"
                    style={{ borderRadius: '8px', height: '44px' }}
                    placeholder="Yrityksen nimi"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-white text-sm mb-2">
                    Viesti *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-text focus:outline-none focus:ring-2 focus:ring-blue resize-none"
                    style={{ borderRadius: '8px' }}
                    placeholder="Kirjoita viestisi tähän..."
                  />
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 transition-all"
                    style={{ borderColor: 'white', borderRadius: '8px', height: '48px' }}
                  >
                    LÄHETÄ
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


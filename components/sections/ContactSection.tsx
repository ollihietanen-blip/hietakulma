'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { companyInfo } from '@/lib/content/contacts';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Viestin lähetys epäonnistui.');
      }

      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Viestin lähetys epäonnistui. Yritä uudelleen.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32" style={{ backgroundColor: 'var(--dark)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-white" style={{ color: 'var(--sand)', lineHeight: '1.1' }}>
              Ota yhteyttä
            </h2>
            <div className="space-y-3 text-white/90 text-sm sm:text-base">
              <p>{companyInfo.address}</p>
              <p>{companyInfo.postalCode} {companyInfo.city}</p>
              <p>
                <a href={`tel:${companyInfo.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                  Puh. {companyInfo.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors">
                  {companyInfo.email}
                </a>
              </p>
              <p>
                <a href={`mailto:${companyInfo.emailTruss}`} className="hover:text-white transition-colors">
                  {companyInfo.emailTruss}
                </a>
              </p>
            </div>
          </div>
          <div className="max-w-lg mx-auto md:mx-0">
            {submitted ? (
              <div className="bg-green-500/20 border border-green-500 text-green-200 p-4 rounded text-sm sm:text-base" style={{ borderRadius: '8px' }}>
                <p>Kiitos yhteydenotostasi! Palaamme asiaan 1–2 arkipäivän kuluessa.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded text-sm sm:text-base" style={{ borderRadius: '8px' }}>
                    <p>{error}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue"
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
                      className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue"
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
                    className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue"
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
                    className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue"
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
                    className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue"
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
                    className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue resize-none"
                      style={{ borderRadius: '8px' }}
                      placeholder="Kirjoita viestisi tähän..."
                    />
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={loading}
                    className="border-2 border-white text-white hover:bg-white/10 px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base transition-all w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ borderColor: 'white', borderRadius: '8px', height: '48px' }}
                    >
                      {loading ? 'LÄHETETÄÄN...' : 'LÄHETÄ'}
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


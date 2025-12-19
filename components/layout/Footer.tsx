'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { contactPersons, billingInfo } from '@/lib/content/contacts';

export default function Footer() {
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
    <>
      <div className="w-full h-px" style={{ backgroundColor: 'var(--blue)' }}></div>
      <footer className="py-16" style={{ backgroundColor: 'var(--dark)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ota yhteyttä -osio */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-8">Ota yhteyttä</h2>
                <div className="space-y-2 text-sm text-white">
                  <p>Puh. 02 573 0300</p>
                  <p>talotehdas@hietakulma.fi</p>
                  <p>ristikkotehdas@hietakulma.fi</p>
                  <p>Koskenojankatu 11</p>
                  <p>38700 Kankaanpää</p>
                </div>
              </div>
              <div className="max-w-lg mx-auto md:mx-0">
                {submitted ? (
                  <div className="bg-green-500/20 border border-green-500 text-green-200 p-4 rounded" style={{ borderRadius: '8px' }}>
                    <p>Viesti lähetetty onnistuneesti! Otamme yhteyttä pian.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="footerFirstName" className="block text-white text-sm mb-2">
                          Nimi (etunimi) *
                        </label>
                        <input
                          type="text"
                          id="footerFirstName"
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
                        <label htmlFor="footerLastName" className="block text-white text-sm mb-2">
                          Sukunimi *
                        </label>
                        <input
                          type="text"
                          id="footerLastName"
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
                      <label htmlFor="footerEmail" className="block text-white text-sm mb-2">
                        Sähköpostiosoite *
                      </label>
                      <input
                        type="email"
                        id="footerEmail"
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
                      <label htmlFor="footerPhone" className="block text-white text-sm mb-2">
                        Puhelinnumero *
                      </label>
                      <input
                        type="tel"
                        id="footerPhone"
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
                      <label htmlFor="footerCompany" className="block text-white text-sm mb-2">
                        Yritys (valinnainen)
                      </label>
                      <input
                        type="text"
                        id="footerCompany"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-text focus:outline-none focus:ring-2 focus:ring-blue"
                        style={{ borderRadius: '8px', height: '44px' }}
                        placeholder="Yrityksen nimi"
                      />
                    </div>
                    <div>
                      <label htmlFor="footerMessage" className="block text-white text-sm mb-2">
                        Viesti *
                      </label>
                      <textarea
                        id="footerMessage"
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

          <div className="w-full h-px mb-12" style={{ backgroundColor: 'var(--blue)' }}></div>

          <div className="text-center mb-12">
            <Link href="/" className="text-3xl font-light text-white hover:text-gray-300 transition-colors uppercase tracking-tight font-sans">
              HIETA<span style={{ color: 'var(--blue)' }}>K</span>ULMA
            </Link>
          </div>

          <div className="text-center mb-8 space-y-2 text-sm text-white">
            <p className="font-semibold">HIETAKULMA OY</p>
            <p>Puh. {contactPersons[0]?.phone || '050 4496 321'}</p>
            <p>{contactPersons[0]?.email || 'olli.hietanen@hietakulma.fi'}</p>
            <p>asiakaspalvelu@hietakulma.fi</p>
            <p>Kankaanpää, Suomi</p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            {/* Facebook icon */}
            <a
              href="#"
              className="w-10 h-10 border-2 border-white rounded flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* Instagram icon */}
            <a
              href="#"
              className="w-10 h-10 border-2 border-white rounded flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>

          <div className="flex justify-center items-center gap-6 mb-6 text-xs text-white">
            <span>CE</span>
            <span>Tilaajavastuu</span>
            <span>Luotettava Kumppani</span>
            <span>®</span>
          </div>

          <div className="text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Hietakulma</p>
          </div>
        </div>
      </footer>
    </>
  );
}


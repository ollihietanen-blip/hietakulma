'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface ContactFormProps {
  idPrefix?: string;
}

export default function ContactForm({ idPrefix = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    gdprConsent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({
          firstName: '', lastName: '', email: '', phone: '',
          company: '', subject: '', message: '', gdprConsent: false,
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Viestin lähetys epäonnistui. Yritä uudelleen.');
      }
    } catch {
      setError('Verkkovirhe. Tarkista yhteytesi ja yritä uudelleen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const prefix = idPrefix ? `${idPrefix}-` : '';

  if (submitted) {
    return (
      <div className="bg-green-500/20 border border-green-500 text-green-200 p-4 rounded text-sm sm:text-base" style={{ borderRadius: '8px' }}>
        <p>Viesti lähetetty onnistuneesti! Otamme yhteyttä pian.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded text-sm" style={{ borderRadius: '8px' }}>
          <p>{error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${prefix}firstName`} className="block text-white text-sm mb-2">
            Nimi (etunimi) *
          </label>
          <input
            type="text"
            id={`${prefix}firstName`}
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
          <label htmlFor={`${prefix}lastName`} className="block text-white text-sm mb-2">
            Sukunimi *
          </label>
          <input
            type="text"
            id={`${prefix}lastName`}
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
        <label htmlFor={`${prefix}email`} className="block text-white text-sm mb-2">
          Sähköpostiosoite *
        </label>
        <input
          type="email"
          id={`${prefix}email`}
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
        <label htmlFor={`${prefix}phone`} className="block text-white text-sm mb-2">
          Puhelinnumero *
        </label>
        <input
          type="tel"
          id={`${prefix}phone`}
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
        <label htmlFor={`${prefix}company`} className="block text-white text-sm mb-2">
          Yritys (valinnainen)
        </label>
        <input
          type="text"
          id={`${prefix}company`}
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue"
          style={{ borderRadius: '8px', height: '44px' }}
          placeholder="Yrityksen nimi"
        />
      </div>
      <div>
        <label htmlFor={`${prefix}subject`} className="block text-white text-sm mb-2">
          Aihe *
        </label>
        <select
          id={`${prefix}subject`}
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue"
          style={{ borderRadius: '8px', height: '44px' }}
        >
          <option value="">Valitse aihe...</option>
          <option value="puutalot">Puutalot</option>
          <option value="puuelementit">Puuelementit</option>
          <option value="kattoristikot">Kattoristikot</option>
          <option value="muu">Muu</option>
        </select>
      </div>
      <div>
        <label htmlFor={`${prefix}message`} className="block text-white text-sm mb-2">
          Viesti *
        </label>
        <textarea
          id={`${prefix}message`}
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
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={`${prefix}gdprConsent`}
          name="gdprConsent"
          required
          checked={formData.gdprConsent}
          onChange={handleCheckboxChange}
          className="mt-1 w-4 h-4 border-gray-300 rounded focus:ring-blue accent-blue"
        />
        <label htmlFor={`${prefix}gdprConsent`} className="text-white text-sm leading-relaxed">
          Hyväksyn, että tietojani käytetään yhteydenottopyyntöni käsittelyyn.
        </label>
      </div>
      <div className="text-center">
        <Button
          type="submit"
          variant="outline"
          className="border-2 border-white text-white hover:bg-white/10 px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base transition-all w-full sm:w-auto disabled:opacity-50"
          style={{ borderColor: 'white', borderRadius: '8px', height: '48px' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'LÄHETETÄÄN...' : 'LÄHETÄ'}
        </Button>
      </div>
    </form>
  );
}

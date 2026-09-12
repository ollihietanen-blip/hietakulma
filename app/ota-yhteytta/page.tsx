import { pageMetadata } from '@/lib/metadata';
import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import { contactPersons, billingInfo } from '@/lib/content/contacts';

export const metadata = pageMetadata('/ota-yhteytta', 'Ota yhteyttä', 'Yhteystiedot, henkilöstö ja yhteydenottolomake. Autamme rakennuskohteesi sopivan ratkaisun valinnassa.');

export default function OtaYhteyttaPage() {
  return (
    <>
      <Hero
        title="Ota yhteyttä"
        subtitle="Kerro kohteestasi — me kerromme, miten voimme auttaa. Vastataan nopeasti ja tarjotaan ratkaisu juuri sinun projektiisi."
        backgroundImage="/images/hero/tehdas-drone-restauroitu.webp"
      />

      <Section background="white">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {contactPersons.map((person, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className="text-center">
                {person.image && (
                  <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{person.name}</h3>
                <p className="text-gray-600 mb-4">{person.title}</p>
                <div className="space-y-2">
                  <a
                    href={`tel:${person.phone.replace(/\s/g, '')}`}
                    className="block text-gray-700 hover:text-gray-900"
                  >
                    {person.phone}
                  </a>
                  <a
                    href={`mailto:${person.email}`}
                    className="block text-gray-700 hover:text-gray-900"
                  >
                    {person.email}
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Laskutustiedot</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Verkkolaskut</h3>
              <div className="bg-gray-50 p-6 rounded-lg space-y-2">
                <p>
                  <span className="font-medium">Operaattori:</span> {billingInfo.electronicInvoices.operator}
                </p>
                <p>
                  <span className="font-medium">Välittäjätunnus:</span>{' '}
                  {billingInfo.electronicInvoices.intermediaryId}
                </p>
                <p>
                  <span className="font-medium">Verkkolaskuosoite:</span>{' '}
                  {billingInfo.electronicInvoices.address}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Sähköpostiskannauksen osoite</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p>{billingInfo.emailScanning}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Paperilaskut</h3>
              <div className="bg-gray-50 p-6 rounded-lg space-y-2">
                <p>
                  <span className="font-medium">{billingInfo.paperInvoices.company}</span>
                </p>
                <p>{billingInfo.paperInvoices.businessId}</p>
                <p>
                  {billingInfo.paperInvoices.address}
                  <br />
                  {billingInfo.paperInvoices.postalCode} {billingInfo.paperInvoices.city}
                </p>
              </div>
            </div>
          </div>
        </div>
        </FadeIn>
      </Section>

      <Section background="gray">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-8 text-center">Löydä perille</h2>
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://maps.google.com/maps?q=Koskenojankatu%2011%2C%2038700%20Kankaanp%C3%A4%C3%A4&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hietakulma Oy sijainti kartalla"
            />
          </div>
          <p className="text-center text-gray-600 mt-4">
            Koskenojankatu 11, 38700 Kankaanpää
          </p>
        </FadeIn>
      </Section>
    </>
  );
}

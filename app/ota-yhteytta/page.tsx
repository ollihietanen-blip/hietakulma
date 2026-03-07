import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Image from 'next/image';
import { contactPersons, billingInfo } from '@/lib/content/contacts';

export const metadata = {
  title: 'Ota yhteyttä - Hietakulma Oy',
  description: 'Yhteystiedot ja henkilöt - Hietakulma Oy',
};

export default function OtaYhteyttaPage() {
  return (
    <>
      <Hero
        title="Yhteystiedot ja henkilöt"
        subtitle="Ota yhteyttä, niin autamme rakennuskohteeseesi sopivan ratkaisun valinnassa."
        backgroundImage="https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg"
      />

      <Section background="white">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {contactPersons.map((person, index) => (
            <div key={index} className="text-center">
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
          ))}
        </div>

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
      </Section>
    </>
  );
}


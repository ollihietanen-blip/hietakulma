import Link from 'next/link';
import { contactPersons, billingInfo } from '@/lib/content/contacts';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Hietakulma Oy</h3>
            <p className="text-sm">
              Puutalot, puuelementit ja kattoristikot
              <br />
              Kankaanpää, Suomi
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Linkit</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/puutalot" className="hover:text-white">
                  Puutalot
                </Link>
              </li>
              <li>
                <Link href="/puuelementit" className="hover:text-white">
                  Puuelementit
                </Link>
              </li>
              <li>
                <Link href="/puuristikot" className="hover:text-white">
                  Puuristikot
                </Link>
              </li>
              <li>
                <Link href="/ota-yhteytta" className="hover:text-white">
                  Ota yhteyttä
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Yhteystiedot</h3>
            <p className="text-sm">
              {contactPersons[0]?.phone && (
                <>
                  Puh: {contactPersons[0].phone}
                  <br />
                </>
              )}
              {contactPersons[0]?.email && (
                <>
                  Sähköposti: {contactPersons[0].email}
                </>
              )}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Hietakulma Oy. Kaikki oikeudet pidätetään.</p>
        </div>
      </div>
    </footer>
  );
}


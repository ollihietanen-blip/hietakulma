import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "./providers";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Hietakulma Oy - Puutalot, puuelementit ja kattoristikot Kankaanpäästä",
    template: "%s | Hietakulma Oy",
  },
  description: "Hietakulman arjenkestävät puutalot, puuelementit ja kattoristikot suunnitellaan ja rakennetaan Kankaanpäässä yli 30 vuoden kokemuksella.",
  keywords: [
    "puutalot", "puuelementit", "kattoristikot", "puurakentaminen", "Kankaanpää",
    "puutalo elementeistä", "NR-ristikot", "puutalovalmistaja", "seinäelementit",
    "CE-merkityt kattoristikot", "puuelementtitalo", "talotehdas",
  ],
  authors: [{ name: "Hietakulma Oy" }],
  openGraph: {
    type: "website",
    locale: "fi_FI",
    url: "https://hietakulma.fi",
    siteName: "Hietakulma Oy",
    title: "Hietakulma Oy - Puutalot, puuelementit ja kattoristikot Kankaanpäästä",
    description: "Hietakulman arjenkestävät puutalot, puuelementit ja kattoristikot suunnitellaan ja rakennetaan Kankaanpäässä yli 30 vuoden kokemuksella.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hietakulma Oy - Puutalot, puuelementit ja kattoristikot Kankaanpäästä",
    description: "Hietakulman arjenkestävät puutalot, puuelementit ja kattoristikot suunnitellaan ja rakennetaan Kankaanpäässä yli 30 vuoden kokemuksella.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi" className={workSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Hietakulma Oy',
              description: 'Puutalot, puuelementit ja kattoristikot Kankaanpäässä yli 30 vuoden kokemuksella.',
              url: 'https://hietakulma.fi',
              telephone: '+35825730300',
              email: 'asiakaspalvelu@hietakulma.fi',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Koskenojankatu 11',
                addressLocality: 'Kankaanpää',
                postalCode: '38700',
                addressCountry: 'FI',
              },
              makesOffer: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Puutalot',
                    description: 'Puuelementtiset rivi-, pari- ja omakotitalot.',
                    url: 'https://hietakulma.fi/puutalot',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Puuelementit',
                    description: 'Seinä- ja runkoelementit tehokkaaseen puurakentamiseen.',
                    url: 'https://hietakulma.fi/puuelementit',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Kattoristikot',
                    description: 'CE-merkityt kattoristikot ja NR-ristikot.',
                    url: 'https://hietakulma.fi/kattoristikot',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={workSans.className}>
        <Providers>
          <Header />
          <main style={{ paddingTop: '72px' }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}


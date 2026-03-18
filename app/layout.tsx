import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/sections/ContactSection";
import { Providers } from "./providers";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Hietakulma Oy - Puutalot, puuelementit ja kattoristikot",
    template: "%s | Hietakulma Oy",
  },
  description: "Hietakulman arjenkestävät puutalot, -elementit ja -ristikot suunnitellaan ja rakennetaan Kankaanpäässä yli 30 vuoden kokemuksella.",
  keywords: ["puutalot", "puuelementit", "kattoristikot", "puurakentaminen", "Kankaanpää"],
  authors: [{ name: "Hietakulma Oy" }],
  openGraph: {
    type: "website",
    locale: "fi_FI",
    url: "https://hietakulma.fi",
    siteName: "Hietakulma Oy",
    title: "Hietakulma Oy - Puutalot, puuelementit ja kattoristikot",
    description: "Hietakulman arjenkestävät puutalot, -elementit ja -ristikot suunnitellaan ja rakennetaan Kankaanpäässä yli 30 vuoden kokemuksella.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hietakulma Oy - Puutalot, puuelementit ja kattoristikot",
    description: "Hietakulman arjenkestävät puutalot, -elementit ja -ristikot suunnitellaan ja rakennetaan Kankaanpäässä yli 30 vuoden kokemuksella.",
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
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Hietakulma Oy",
              "description": "Puutalot, puuelementit ja kattoristikot — suunnittelusta valmiiksi elementeiksi yli 30 vuoden kokemuksella.",
              "url": "https://hietakulma.fi",
              "telephone": "+358 20 741 8870",
              "email": "talotehdas@hietakulma.fi",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Koskenojankatu 11",
                "addressLocality": "Kankaanpää",
                "postalCode": "38700",
                "addressCountry": "FI"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 61.8044,
                "longitude": 24.0601
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "07:00",
                "closes": "16:00"
              },
              "foundingDate": "1993",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "minValue": 15,
                "maxValue": 20
              },
              "sameAs": []
            })
          }}
        />
      </head>
      <body className={workSans.className}>
        <Providers>
          <Header />
          <main style={{ paddingTop: '72px' }}>{children}</main>
          <ContactSection />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}


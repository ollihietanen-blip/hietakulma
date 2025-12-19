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


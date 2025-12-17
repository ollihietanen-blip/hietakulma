import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
    <html lang="fi">
      <body>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


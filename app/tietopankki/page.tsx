import PortalAccount from '@/components/sections/PortalAccount';
import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import KeyMetrics from '@/components/sections/KeyMetrics';
import { keyMetricsByPage } from '@/lib/content/key-metrics';
import TietopankkiContent from './TietopankkiContent';
import { documents } from '@/lib/content/documents';
import { requireAuth } from '@/lib/auth';

export const metadata = {
  robots: { index: false, follow: false },
  title: 'Tietopankki — Ohjeet, detaljit ja dokumentit',
  description: 'Hietakulman tietopankki: ohjeet, rakennedetaljit ja tuotedokumentit puurakentamiseen. Pyydä tarvitsemasi aineisto asiantuntijoiltamme.',
};

export default async function TietopankkiPage() {
  const session = await requireAuth();

  return (
    <>
      <Hero
        title="Tietopankki"
        subtitle={documents.length > 0
          ? 'Ohjeet, detaljit ja tuotedokumentit Hietakulman puuelementeille ja kattoristikoille. Lataa tarvitsemasi materiaalit käyttöösi.'
          : 'Ohjeet ja rakenneratkaisut rakentamisen tueksi. Autamme löytämään hankkeeseesi sopivat aineistot.'}
        backgroundImage="/images/hero/tehdas-drone-01.webp"
      />
      <Section background="sand">
        <KeyMetrics metrics={keyMetricsByPage.tietopankki} />
      </Section>
      <PortalAccount email={session.user.email} />
      <TietopankkiContent />
    </>
  );
}

import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import KeyMetrics from '@/components/sections/KeyMetrics';
import { keyMetricsByPage } from '@/lib/content/key-metrics';
import TietopankkiContent from './TietopankkiContent';
import { requireAuth } from '@/lib/auth';

export const metadata = {
  title: 'Tietopankki — Ohjeet, detaljit ja dokumentit',
  description: 'Lataa asennusohjeet, rakennedetaljit, suoritustasoilmoitukset ja tuotedokumentit Hietakulman puuelementeille ja kattoristikoille.',
};

export default async function TietopankkiPage() {
  await requireAuth();

  return (
    <>
      <Hero
        title="Tietopankki"
        subtitle="Täältä löydät rakentamisen tueksi ohjeet, detaljit ja rakenneratkaisut — Hietakulman puuelementeille ja kattoristikoille. Lataa tarvitsemasi materiaalit suoraan käyttöösi."
        backgroundImage="/images/hero/tehdas-drone-01.webp"
      />
      <Section background="sand">
        <KeyMetrics metrics={keyMetricsByPage.tietopankki} />
      </Section>
      <TietopankkiContent />
    </>
  );
}

import Hero from '@/components/sections/Hero';
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
        subtitle="Lataa ohjeet, detaljit ja rakenneratkaisut Hietakulman puuelementeillä ja kattoristikoilla toteutettuun rakentamiseen."
        backgroundImage="/images/hero/tehdas-drone-01.webp"
      />
      <TietopankkiContent />
    </>
  );
}

import Hero from '@/components/sections/Hero';
import TietopankkiContent from './TietopankkiContent';
import { requireAuth } from '@/lib/auth';

export const metadata = {
  title: 'Tietopankki - Hietakulma Oy',
  description:
    'Lataa ohjeet, detaljit ja rakenneratkaisut Hietakulman puuelementeillä ja kattoristikoilla toteutettuun rakentamiseen.',
};

export default async function TietopankkiPage() {
  await requireAuth();

  return (
    <>
      <Hero
        title="Tietopankki"
        subtitle="Lataa ohjeet, detaljit ja rakenneratkaisut Hietakulman puuelementeillä ja kattoristikoilla toteutettuun rakentamiseen."
        backgroundImage="https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg"
      />
      <TietopankkiContent />
    </>
  );
}

import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import ProjectPortfolio from '@/components/sections/ProjectPortfolio';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/ui/FadeIn';
import KeyMetrics from '@/components/sections/KeyMetrics';
import { keyMetricsByPage } from '@/lib/content/key-metrics';
import { kohteet } from '@/lib/content/kohteet';

export const metadata = {
  title: 'Referenssit ja toteutetut kohteet',
  description: 'Tutustu Hietakulman toteuttamiin pientaloihin, paritaloihin, rivitaloihin, loma-asuntoihin ja toimitiloihin eri puolilla Suomea.',
};

const customerSegments = [
  {
    number: '01',
    title: 'Yksityiselle rakentajalle',
    text: 'Yksilöllinen koti ilman valmiin talomallin rajoja. Suunnitelma muutetaan tehtaalla tarkaksi ja työmaalla nopeasti nousevaksi rungoksi.',
  },
  {
    number: '02',
    title: 'Rakennusliikkeelle',
    text: 'Ennakoitava toimitus, selkeä vastuu ja työmaan tahtiin sovitettu asennus pientaloista kokonaisiin asuinalueisiin.',
  },
  {
    number: '03',
    title: 'Kiinteistökehittäjälle',
    text: 'Toistettava elementtiratkaisu yhdistää arkkitehtonisen laadun, tehokkaan sarjatuotannon ja hallitun aikataulun.',
  },
  {
    number: '04',
    title: 'Toimitilarakentajalle',
    text: 'Suuret elementtipinnat ja kattoristikot samasta toimituksesta myös halleihin ja ammattikäytön rakennuksiin.',
  },
];

export default function KohteetPage() {
  return (
    <>
      <Hero
        title={'Rakennettu\nnäyttämään osaaminen.'}
        subtitle="Valikoituja kohteita yksilöllisistä kodeista kokonaisiin asuinalueisiin ja toimitiloihin. Jokaisessa sama ajatus: suunnittelu, tehdasvalmistus ja työmaa toimivat yhtenä kokonaisuutena."
        backgroundImage="/images/kohteet/kivikolunkatu-7/kivikolunkatu-01.webp"
        ctaText="SELAA KOHTEITA"
        ctaLink="#portfolio"
      />

      <Section background="sand" contentClassName="py-14 md:py-18">
        <KeyMetrics metrics={keyMetricsByPage.kohteet} />
      </Section>

      <Section background="dark" contentClassName="py-16 md:py-24">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.5fr] lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue">Kenelle rakennamme</p>
              <h2 className="max-w-md text-3xl font-extrabold leading-[1.06] text-white md:text-5xl">
                Sama tehdas.<br />Eri mittakaavat.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                Hyvä elementtitoimitus alkaa asiakkaan tavoitteesta. Siksi jokaisessa referenssissä kerromme myös, kenelle ratkaisu tehtiin ja mikä Hietakulman rooli oli.
              </p>
            </div>
            <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
              {customerSegments.map((segment) => (
                <div key={segment.number} className="border-t border-white/25 pt-5">
                  <span className="text-xs font-bold text-blue">{segment.number}</span>
                  <h3 className="mt-4 text-xl font-bold leading-tight text-white">{segment.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{segment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section id="portfolio" background="white" contentClassName="py-16 md:py-24">
        <FadeIn>
          <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[0.9fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue">Valitut referenssit</p>
              <h2 className="text-[2rem] font-extrabold leading-[1.08] text-text md:text-5xl md:leading-[1.05]">Tehtaalta valmiiksi rakennukseksi.</h2>
            </div>
            <p className="max-w-xl text-[15px] leading-6 text-gray-600 md:justify-self-end md:text-base md:leading-7">
              Tutustu kohteisiin tyypin mukaan. Jokaiselta sivulta löydät perustiedot, Hietakulman toimituksen sekä syyn, miksi juuri tämä toteutus kuuluu portfolioomme.
            </p>
          </div>
        </FadeIn>
        <ProjectPortfolio projects={kohteet} />
      </Section>

      <Section background="sand" contentClassName="py-16 md:py-24">
        <FadeIn>
          <div className="grid gap-8 md:grid-cols-[1.25fr_auto] md:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-600">Seuraava kohde</p>
              <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.06] text-text md:text-5xl">
                Millainen kokonaisuus teidän suunnitelmistanne syntyy?
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-gray-700 md:text-base">
                Kerro kohteen laajuus, vaihe ja tavoite. Autamme määrittämään sopivan puuelementti- ja ristikkotoimituksen.
              </p>
            </div>
            <Button href="/ota-yhteytta" variant="light" className="min-w-[220px]">KÄYDÄÄN KOHDE LÄPI</Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}

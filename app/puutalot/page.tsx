import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Button from '@/components/ui/Button';
import ProcessFlow from '@/components/sections/ProcessFlow';
import StoryBlock from '@/components/sections/StoryBlock';
import KeyMetrics from '@/components/sections/KeyMetrics';
import { keyMetricsByPage } from '@/lib/content/key-metrics';
import { homepageContent } from '@/lib/content/homepage';

export const metadata = {
  title: 'Puutalot elementeistä',
  description: 'Toteutamme omakoti-, pari- ja rivitaloja puuelementeistä. Kokonaistoimituspaketti suunnittelusta valmiiksi pintakäsiteltyihin elementteihin.',
};

export default function PuutalotPage() {
  return (
    <>
      <Hero
        title="Puutalot kokemuksella"
        subtitle="Toimitamme puuelementit rivi-, pari- ja omakotitaloista aina useamman kohteen alueiksi saakka. Monipuolisista runko- ja verhousvaihtoehdoista syntyy juuri toiveidesi mukainen toimiva ja tyylikäs kokonaisuus."
        backgroundImage="/images/kohteet/kirjavaisenkatu-40/huunala-06-pihakokonaisuus.webp"
        altText="Huunalan Herttuan ja Paronin valmis puutalokokonaisuus Tampereella"
        ctaText="LUE LISÄÄ"
        ctaLink="#content"
      />

      <Section background="sand">
        <KeyMetrics metrics={keyMetricsByPage.puutalot} />
      </Section>

      <Section background="white" id="content">
        <div className="max-w-2xl mx-auto py-8 md:py-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-[42px] font-bold mb-6 text-center" style={{ lineHeight: '1.2' }}>
            Suunnitelmasta valmiiksi kohteeksi
          </h2>
          <div className="space-y-5">
            <p className="text-lg leading-relaxed text-gray-700">
              Ymmärrämme alustavia suunnitelmia yhtä luontevasti kuin valmiita
              rakennuspiirustuksiakin. Suunnittelupöydällä ideasi jäsentyvät oivaltaviksi
              pohjaratkaisuiksi ja tyylikkäiksi kohteiksi nykyaikaista ja toimintavarmaa
              talotekniikkaa unohtamatta.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Tämän lisäksi tunnemme rakennustyömaat kuin oman tehtaamme ja kykenemme siksi
              ottamaan työmaatyöskentelyn realiteetit huomioon niin suunnittelu- kuin
              tuotantovaiheessakin. Ammattimainen yhteistyö rakentajien ja urakoitsijoiden
              kanssa takaa sen, että lopputuloksena syntyy puutalo, joka kestää niin aikaa kuin
              arkeakin.
            </p>
          </div>
        </div>
      </Section>

      <Section background="white" contentClassName="pt-0">
        <ProcessFlow
          steps={[
            {
              number: 1,
              title: 'TONTTI JA LUONNOS',
              description: 'Tontin valinta ja alustavat suunnitelmat \u2014 kartoitamme tontin mahdollisuudet, laadimme alustavan pohjapiirroksen ja 3D-mallin.',
            },
            {
              number: 2,
              title: 'SUUNNITTELU JA LUVAT',
              description: 'Arkkitehti- ja rakennesuunnittelu, energiatodistus sek\u00e4 rakennuslupaprosessin hoitaminen \u2014 kaikki samasta talosta.',
            },
            {
              number: 3,
              title: 'BUDJETOINTI',
              description: 'Tarkka kustannuslaskenta Talo-2000 -nimikkeist\u00f6ll\u00e4, rahoitusratkaisujen kartoitus ja lopullinen tarjous.',
            },
            {
              number: 4,
              title: 'VALMISTUS',
              description: 'Elementtien valmistus tehtaallamme kontrolloiduissa olosuhteissa \u2014 valmiiksi eristettyinä, ikkunoituna ja pintakäsiteltyinä.',
            },
            {
              number: 5,
              title: 'LUOVUTUS',
              description: 'Elementtien toimitus ja asennus työmaalle, asennusohjeet ja tekninen tuki koko rakennusprojektin ajan.',
            },
          ]}
        />
      </Section>

      <Section background="gray">
        <h2 className="text-2xl md:text-3xl lg:text-[42px] font-bold mb-10 text-center" style={{ lineHeight: '1.2' }}>
          Miksi puutalo elementeistä?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {[
            {
              title: 'Nopeampi rakentaminen',
              description: 'Tehdasvalmisteiset elementit nopeuttavat rakennusaikaa merkittävästi verrattuna perinteiseen paikalla rakentamiseen.',
            },
            {
              title: 'Tasalaatuinen lopputulos',
              description: 'Kontrolloidut tehdasolosuhteet takaavat tasaisen laadun — säältä suojassa, ammattitaidolla valmistettuna.',
            },
            {
              title: 'Energiatehokkuus',
              description: 'Tiiviit ja hyvin eristetyt elementtiseinät (U-arvo 0,17–0,21 W/m²K) tuovat energiasäästöjä vuodesta toiseen.',
            },
            {
              title: 'Kokonaistoimituksen helppous',
              description: 'Yksi toimittaja suunnittelusta valmiisiin elementteihin — vähemmän koordinointia, selkeämpi prosessi.',
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 md:p-8 shadow-sm text-center"
            >
              <h3 className="text-lg md:text-xl font-bold mb-3" style={{ color: 'var(--dark)' }}>
                {card.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <StoryBlock
        title={homepageContent.story.title}
        description={homepageContent.story.description}
        ctaText={homepageContent.story.ctaText}
        ctaLink={homepageContent.story.ctaLink}
      />
    </>
  );
}

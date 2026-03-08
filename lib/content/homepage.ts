import { Product } from '@/types/content';

export const homepageContent = {
  hero: {
    title: 'Seinät ja katot\narjen suojaksi',
    subtitle: 'Hietakulman arjenkestävät puutalot, -elementit ja -ristikot suunnitellaan ja rakennetaan Kankaanpäässä yli 30 vuoden kokemuksella — kaikki yhdeltä luukulta suunnittelusta valmiiksi pintakäsiteltyihin elementteihin.',
    backgroundImage: '/Puuelementit_hero.png',
    ctaText: 'LUE LISÄÄ',
    ctaLink: '/puutalot',
  },
  projects: {
    title: 'Talosta kodiksi',
    description:
      'Toteutamme rivi-, pari- ja omakotitalot yhteistyössä ammattirakentajien kanssa yksittäisistä kohteista aina useamman kohteen alueiksi saakka. Kaikkia kohteita yhdistää asiakaslähtöinen suunnittelu ja kustannustehokas tuotanto – me teemme taloja joihin on helppoa asettua kodiksi.',
    images: [
      {
        src: '/images/kohteet/leppatie-pori/leppatie-01.webp',
        alt: 'Villa Tähtiranta — moderni puutalo',
        title: 'VILLA TÄHTIRANTA',
      },
      {
        src: '/images/kohteet/leppatie-pori/leppatie-02.webp',
        alt: 'Leppätien rivitalot, Pori',
        title: 'LEPPÄTIEN RIVITALOT',
      },
      {
        src: '/images/kohteet/hankreetintie-pori/hankreetintie-01.webp',
        alt: 'Rantakatu 5 — omakotitalo',
        title: 'RANTAKATU 5',
      },
      {
        src: '/images/kohteet/vesikkotie-vantaa/vesikkotie-01.webp',
        alt: 'Vesikkotie 12, Vantaa — omakotitalo',
        title: 'VESIKKOTIE 12',
      },
      {
        src: '/images/kohteet/kirjavaisenkatu-40/b7-01_DJI_0965-HDR.webp',
        alt: 'Kirjavaisenkatu 40 — rivitalo, ammattikuvaus',
        title: 'KIRJAVAISENKATU 40',
      },
      {
        src: '/images/kohteet/maitiaisentie-tuusula/maitiaisentie-01.webp',
        alt: 'Karhulan Kuusikko — asuinalue',
        title: 'KARHULAN KUUSIKKO',
      },
      {
        src: '/images/kohteet/nokia-villa-sand/villa-sand-01.webp',
        alt: 'As Oy Nokian Villa Sand — rivitalo',
        title: 'AS OY NOKIAN VILLA SAND',
      },
      {
        src: '/images/kohteet/leppatie-pori/leppatie-03.webp',
        alt: 'Meritorinin rivitalot',
        title: 'MERITORININ RIVITALOT',
      },
      {
        src: '/images/kohteet/nokian-havumetsa/havumetsa-01.webp',
        alt: 'Nokian Havumetsä — asuinalue',
        title: 'NOKIAN HAVUMETSÄ',
      },
    ],
  },
  story: {
    title: 'Hietakulman tarina',
    description:
      'Hietakulma syntyi Kankaanpäässä halusta tehdä puurakentaminen paremmin. Kolmen vuosikymmenen aikana olemme kasvaneet hiljaisesta tekijästä yhdeksi Suomen luotetuimmista puuelementtivalmistajista — yli 3 750 toimitettua projektia puhuvat puolestaan.',
    ctaText: 'TUTUSTU TARINAAMME',
    ctaLink: '/tarina',
    image: '/images/hero/tehdas-drone-02.webp',
  },
  products: [
    {
      id: 'puutalot',
      title: 'Puutalot',
      description: 'Puutaloratkaisuja omakoti-, pari- ja rivitalokohteisiin sekä useamman rakennuksen kokonaisuuksiin.',
      image: '/images/kohteet/kirjavaisenkatu-40/b7-01_DJI_0965-HDR.webp',
      link: '/puutalot',
      keyFacts: ['Yli 3 750 toimitettua kohdetta', '30+ vuoden kokemus'],
    },
    {
      id: 'puuelementit',
      title: 'Puuelementit',
      description: 'Seinä- ja runkoelementtejä tehokkaaseen ja hallittuun puurakentamiseen — valmiiksi eristettyinä ja pintakäsiteltyinä tehtaaltamme.',
      image: '/images/tehdas/elementtituotanto/IMG_4222.webp',
      link: '/puuelementit',
      keyFacts: ['U-arvo 0,17–0,21 W/m²K', 'Tehdasmaalaus vakiona'],
    },
    {
      id: 'puuristikot',
      title: 'Kattoristikot',
      description:
        'CE-merkityt kattoristikot vakioratkaisuina tai kohdekohtaisesti mitoitettuna.',
      image: '/images/tehdas/ristikkotuotanto/IMG_4251.webp',
      link: '/kattoristikot',
      keyFacts: ['CE-merkityt', 'Vakio- ja mittatilausristikot'],
    },
  ] as Product[],
};


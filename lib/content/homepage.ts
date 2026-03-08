import { Product } from '@/types/content';

export const homepageContent = {
  hero: {
    title: 'Kaikki yhdeltä luukulta —\nsuunnittelusta valmiisiin elementteihin.',
    subtitle: 'Yli 3 750 toimitettua projektia. Omalla tehtaalla valmistettu. Toimitamme koko Suomeen.',
    backgroundImage: '/Puuelementit_hero.png',
    ctaText: 'LUE LISÄÄ',
    ctaLink: '/puutalot',
  },
  projects: {
    title: 'Talosta kodiksi — näin se etenee',
    description:
      'Rakentaminen tuntuu monimutkaiselta, ennen kuin se alkaa. Meillä prosessi on selvä: otamme suunnitelmasi vastaan, valmistamme elementit tehtaalla ja toimitamme ne rakennuspaikallesi aikataulussa. Sinä tiedät aina, missä mennään.',
    images: [
      {
        src: '/images/kohteet/kirjavaisenkatu-40/b7-01_DJI_0965-HDR.webp',
        alt: 'Kirjavaisenkatu 40 — rivitalo, ammattikuvaus',
        title: 'KIRJAVAISENKATU 40',
        href: '/kohteet/kirjavaisenkatu-40',
        rotate: 180,
      },
      {
        src: '/images/kohteet/leppatie-pori/leppatie-01.webp',
        alt: 'Leppätien rivitalot, Pori',
        title: 'LEPPÄTIE, PORI',
        href: '/kohteet/leppatie-pori',
      },
      {
        src: '/images/kohteet/hankreetintie-pori/hankreetintie-01.webp',
        alt: 'Hankreetintie 189, Pori — omakotitalo',
        title: 'HANKREETINTIE, PORI',
        href: '/kohteet/hankreetintie-pori',
      },
      {
        src: '/images/kohteet/vesikkotie-vantaa/vesikkotie-01.webp',
        alt: 'Vesikkotie 12, Vantaa — omakotitalo',
        title: 'VESIKKOTIE 12',
        href: '/kohteet/vesikkotie-vantaa',
      },
      {
        src: '/images/kohteet/nokia-villa-sand/villa-sand-01.webp',
        alt: 'As Oy Nokian Villa Sand — rivitalo',
        title: 'AS OY NOKIAN VILLA SAND',
        href: '/kohteet/nokia-villa-sand',
      },
      {
        src: '/images/kohteet/nokian-havumetsa/havumetsa-01.webp',
        alt: 'Nokian Havumetsä — asuinalue',
        title: 'NOKIAN HAVUMETSÄ',
        href: '/kohteet/nokian-havumetsa',
      },
      {
        src: '/images/kohteet/maitiaisentie-tuusula/maitiaisentie-01.webp',
        alt: 'Maitiaisentie 9, Tuusula — omakotitalo',
        title: 'MAITIAISENTIE, TUUSULA',
        href: '/kohteet/maitiaisentie-tuusula',
        rotate: 180,
      },
      {
        src: '/images/kohteet/hoylakatu/hoylakatu-01.webp',
        alt: 'Höyläkatu, Kankaanpää — rivitalo',
        title: 'HÖYLÄKATU',
        href: '/kohteet/hoylakatu',
        rotate: 90,
      },
      {
        src: '/images/kohteet/apatti-merikarvia/apatti-01.webp',
        alt: 'Loma-asunto Äpätti, Merikarvia',
        title: 'ÄPÄTTI, MERIKARVIA',
        href: '/kohteet/apatti-merikarvia',
      },
    ],
  },
  story: {
    title: 'Hietakulman tarina',
    description:
      'Hietakulma syntyi Kankaanpäässä halusta tehdä puurakentaminen paremmin. Kolmen vuosikymmenen aikana olemme kasvaneet hiljaisesta tekijästä yhdeksi Suomen luotetuimmista puuelementtivalmistajista — yli 3 750 toimitettua projektia puhuvat puolestaan.\n\nKaikki alkaa suunnittelupöydältä ja päättyy rakennuspaikalle. Suunnittelemme, valmistamme ja toimitamme — kaikki saman katon alta, omalla henkilöstöllä ja omalla vastuulla. Ei välikäsiä, ei epäselvyyksiä. Kun lupaamme jotain, pidämme sen.\n\nViime vuosina olemme investoineet merkittävästi tuotantoomme: uusi automaattinen tuotantolinjamme Kankaanpään tehtaalla on rakennettu vastaamaan kasvavaan kysyntään tinkimättä siitä, mistä emme koskaan tingi — laadusta. Sama käsityötaito, nopeampi tahti.\n\n*Tule mukaan rakentamaan. Me hoidamme rungon.*',
    ctaText: 'TUTUSTU TARINAAMME',
    ctaLink: '/tarina',
    image: '/images/hero/tehdas-drone-02.webp',
  },
  products: [
    {
      id: 'puutalot',
      title: 'Puutalot',
      description: 'Suunnittelemme ja valmistamme puuelementtitalot omakoti- ja paritalokohteisiin — avaimet käteen tai runkopakettina, juuri niin kuin tarvitset.',
      image: '/images/kohteet/kirjavaisenkatu-40/b7-01_DJI_0965-HDR.webp',
      link: '/puutalot',
    },
    {
      id: 'puuelementit',
      title: 'Puuelementit',
      description: 'Seinä-, välipohjа- ja kattoelementit tehtaassamme mittatilaustyönä — valmiina suoraan rakennuspaikallesi asennettavaksi.',
      image: '/images/tehdas/elementtituotanto/IMG_4222.webp',
      link: '/puuelementit',
    },
    {
      id: 'puuristikot',
      title: 'Kattoristikot',
      description:
        'CE-merkityt kattoristikot vakiomittoina tai kohdekohtaisesti mitoitettuna — toimitusvarmuus ja tekninen tarkkuus joka projektiin.',
      image: '/images/tehdas/ristikkotuotanto/IMG_4251.webp',
      link: '/kattoristikot',
    },
  ] as Product[],
};


import { Product } from '@/types/content';

export const homepageContent = {
  hero: {
    title: 'Kaikki yhdeltä luukulta —\nsuunnittelusta valmiisiin elementteihin.',
    subtitle: 'Yli 3 750 toimitettua projektia. Omalla tehtaalla valmistettu. Toimitamme koko Suomeen.',
    backgroundImage: '/images/hero/puuelementit-hero.webp',
    backgroundVideo: '/images/hero/mp_hero.mp4',
    ctaText: 'LUE LISÄÄ',
    ctaLink: '/puutalot',
  },
  projects: {
    title: 'Talosta kodiksi',
    subtitle: 'Näin se etenee.',
    description:
      'Meillä kokonaisuus kulkee saman katon alta: suunnittelu, tehdasvalmistus ja toimitus sovitetaan yhteen jo ennen kuin työmaa odottaa elementtejä.',
    steps: [
      {
        title: 'Suunnitelmat',
        description: 'Käymme lähtötiedot läpi ja varmistamme, että rakenne, mitoitus ja toimitus sopivat kohteeseesi.',
      },
      {
        title: 'Valmistus tehtaalla',
        description: 'Elementit ja ristikot tehdään omissa tuotantotiloissa kuivissa oloissa, sovitun aikataulun mukaan.',
      },
      {
        title: 'Toimitus työmaalle',
        description: 'Valmiit osat lähtevät Kankaanpäästä työmaalle oikeassa järjestyksessä ja oikeaan aikaan.',
      },
      {
        title: 'Selkeä vastuu',
        description: 'Yksi toimija pitää kokonaisuuden kasassa, joten tiedät missä mennään suunnittelusta toimitukseen.',
      },
    ],
    referencesTitle: 'Toteutettuja kohteita',
    referencesDescription:
      'Valmiista kohteista näkee, miltä tehtaalla valmistettu puurakentaminen näyttää käytännössä.',
    images: [
      {
        src: '/images/kohteet/kirjavaisenkatu-40/b7-03_DJI_0935-HDR.webp',
        alt: 'Asunto Oy Huunalan Herttua, Kirjavaisenkatu 40, Tampere — rivitalo',
        title: 'ASUNTO OY HUUNALAN HERTTUA',
        type: 'Rivitalo · Kirjavaisenkatu 40, Tampere',
        href: '/kohteet/kirjavaisenkatu-40',
      },
      {
        src: '/images/kohteet/leppatie-pori/leppatie-01.webp',
        alt: 'Asunto Oy Porin Leppä, Leppätie, Pori — rivitalo',
        title: 'ASUNTO OY PORIN LEPPÄ',
        type: 'Rivitalo · Leppätie, Pori',
        href: '/kohteet/leppatie-pori',
      },
      {
        src: '/images/kohteet/hankreetintie-pori/hankreetintie-01.webp',
        alt: 'Hankreetintie 189, Pori — omakotitalo',
        title: 'HANKREETINTIE, PORI',
        type: 'Omakotitalo',
        href: '/kohteet/hankreetintie-pori',
      },
      {
        src: '/images/kohteet/vesikkotie-vantaa/vesikkotie-01.webp',
        alt: 'Asunto Oy Vantaan Vesikkotie, Vesikkotie 12, Vantaa — omakotitalo',
        title: 'ASUNTO OY VANTAAN VESIKKOTIE',
        type: 'Omakotitalo · Vesikkotie 12, Vantaa',
        href: '/kohteet/vesikkotie-vantaa',
      },
      {
        src: '/images/kohteet/nokia-villa-sand/villa-sand-01.webp',
        alt: 'As Oy Nokian Villa Sand — rivitalo',
        title: 'AS OY NOKIAN VILLA SAND',
        type: 'Rivitalo',
        href: '/kohteet/nokia-villa-sand',
      },
      {
        src: '/images/kohteet/nokian-havumetsa/havumetsa-01.webp',
        alt: 'Nokian Havumetsä — asuinalue',
        title: 'NOKIAN HAVUMETSÄ',
        type: 'Asuinalue',
        href: '/kohteet/nokian-havumetsa',
      },
      {
        src: '/images/kohteet/maitiaisentie-tuusula/maitiaisentie-02.webp',
        alt: 'Asunto Oy Tuusulan Maitiaisentie, Maitiaisentie 9, Tuusula — omakotitalo',
        title: 'ASUNTO OY TUUSULAN MAITIAISENTIE',
        type: 'Paritaloja · Maitiaisentie 9, Tuusula',
        href: '/kohteet/maitiaisentie-tuusula',
      },
      {
        src: '/images/kohteet/hoylakatu/hoylakatu-01.webp',
        alt: 'Höyläkatu, Kankaanpää — rivitalo',
        title: 'HÖYLÄKATU',
        type: 'Rivitalo',
        href: '/kohteet/hoylakatu',
        rotate: 90,
      },
      {
        src: '/images/kohteet/apatti-merikarvia/apatti-01.webp',
        alt: 'Loma-asunto Levin Atrin Atmos, Suvannoisenkuja 9, Kittilä',
        title: 'LEVIN ATRIN ATMOS',
        type: 'Loma-asunto · Suvannoisenkuja 9, Kittilä',
        href: '/kohteet/apatti-merikarvia',
      },
    ],
  },
  story: {
    title: 'Hietakulman tarina',
    description:
      'Hietakulma syntyi Kankaanpäässä halusta tehdä puurakentaminen paremmin. \n\nKaikki alkaa suunnittelupöydältä ja päättyy rakennuspaikalle. Suunnittelemme, valmistamme ja toimitamme — kaikki saman katon alta, omalla henkilöstöllä ja omalla vastuulla.',
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

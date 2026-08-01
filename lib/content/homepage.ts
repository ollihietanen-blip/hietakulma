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
        src: '/images/kohteet/kivikolunkatu-7/kivikolunkatu-01.webp',
        alt: 'Kivikolunkatu 7 A, Nokia — valmis paritalo',
        title: 'KIVIKOLUNKATU 7 A',
        type: 'Paritalo · Nokia',
        href: '/kohteet/kivikolunkatu-7-nokia',
      },
      {
        src: '/images/kohteet/kirjavaisenkatu-40/huunala-01-piha.webp',
        alt: 'Asunto Oy Huunalan Herttua, Kirjavaisenkatu 40, Tampere — rivitalo',
        title: 'ASUNTO OY HUUNALAN HERTTUA',
        type: 'Rivitalo · Kirjavaisenkatu 40, Tampere',
        href: '/kohteet/kirjavaisenkatu-40',
      },
      {
        src: '/images/kohteet/leppatie-pori/leppatie-verstaantie-01.webp',
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
        src: '/images/kohteet/vesikkotie-vantaa/vesikkotie-markkinointi-01.webp',
        alt: 'As Oy Vantaan Vesikkotie 12 — paritalokokonaisuus',
        title: 'AS OY VANTAAN VESIKKOTIE 12',
        type: 'Paritalot · Vantaa',
        href: '/kohteet/vesikkotie-vantaa',
      },
      {
        src: '/images/kohteet/satakunnan-autopinta/autopinta-pori-01.webp',
        alt: 'Satakunnan Autopinnan Porin toimipiste',
        title: 'SATAKUNNAN AUTOPINNAN PORIN TOIMIPISTE',
        type: 'Halli · Pori',
        href: '/kohteet/satakunnan-autopinta',
      },
      {
        src: '/images/kohteet/as-oy-nokian-tokeenkatu-8/tokeenkatu-havainne-01.webp',
        alt: 'As Oy Nokian Tokeenkatu 8 — havainnekuva rivitalokohteesta',
        title: 'AS OY NOKIAN TOKEENKATU 8',
        type: 'Rivitalo · Nokia',
        href: '/kohteet/as-oy-nokian-tokeenkatu-8',
      },
      {
        src: '/images/kohteet/maitiaisentie-tuusula/maitiaisentie-02.webp',
        alt: 'Asunto Oy Tuusulan Maitiaisentie, Maitiaisentie 9, Tuusula — omakotitalo',
        title: 'ASUNTO OY TUUSULAN MAITIAISENTIE',
        type: 'Paritaloja · Maitiaisentie 9, Tuusula',
        href: '/kohteet/maitiaisentie-tuusula',
      },
      {
        src: '/images/kohteet/levin-atrin-atmos/atrin-atmos-01.webp',
        alt: 'Levin Atrin Atmos — loma-asunnot',
        title: 'LEVIN ATRIN ATMOS',
        type: 'Loma-asunto · Kittilä / Levi',
        href: '/kohteet/levin-atrin-atmos',
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
      description: 'Seinä-, välipohja- ja kattoelementit tehtaassamme mittatilaustyönä — valmiina suoraan rakennuspaikallesi asennettavaksi.',
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

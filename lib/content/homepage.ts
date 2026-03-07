import { Product } from '@/types/content';

export const homepageContent = {
  hero: {
    title: 'Seinät ja katot\narjen suojaksi',
    subtitle: 'Hietakulman arjenkestävät puutalot, -elementit ja -ristikot suunnitellaan ja rakennetaan Kankaanpäässä yli 30 vuoden kokemuksella.',
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
        src: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/1f9a6860-2d9f-418d-b02a-2ce04121dc61/hk_web_kohteet_0014_pori4_6.jpg',
        alt: 'Projekti 1',
        title: 'KOHTEEN NIMI 1',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/1fe4dbf3-cfda-4704-9ceb-8eb22f876a38/hk_web_kohteet_0027_pori2_2.jpg',
        alt: 'Projekti 2',
        title: 'KOHTEEN NIMI 4',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/1f9a6860-2d9f-418d-b02a-2ce04121dc61/hk_web_kohteet_0014_pori4_6.jpg',
        alt: 'Projekti 3',
        title: 'KOHTEEN NIMI 7',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/3deeb784-e177-4d28-9a13-ee0d4d1374ed/hk_web_kohteet_0006_pori6_3.jpg',
        alt: 'Projekti 4',
        title: 'KOHTEEN NIMI 2',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/4550596a-4672-4ae5-9d4b-5771ac39f3c2/hk_web_kohteet_0002_tre1_2.jpg',
        alt: 'Projekti 5',
        title: 'KOHTEEN NIMI 5',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/3deeb784-e177-4d28-9a13-ee0d4d1374ed/hk_web_kohteet_0006_pori6_3.jpg',
        alt: 'Projekti 6',
        title: 'KOHTEEN NIMI 8',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/4812ebe5-5ab5-43ae-b4c4-84310662d45f/hk_web_kohteet_0037_nokia2_1.jpg',
        alt: 'Projekti 7',
        title: 'KOHTEEN NIMI 3',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/a255ca72-2531-47b6-9ca7-3d64fec4e67b/hk_web_kohteet_0017_pori4_3.jpg',
        alt: 'Projekti 8',
        title: 'KOHTEEN NIMI 6',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/4812ebe5-5ab5-43ae-b4c4-84310662d45f/hk_web_kohteet_0037_nokia2_1.jpg',
        alt: 'Projekti 9',
        title: 'KOHTEEN NIMI 9',
      },
    ],
  },
  story: {
    title: 'Hietakulman tarina',
    description:
      'Hietakulma Oy on kankaanpääläinen perheyritys, joka on erikoistunut puuelementtitalojen ja kattoristikoiden tuotantoon. Suunnittelemme, valmistamme ja toimitamme puutaloja ja kattoristikoita sekä yritys- että yksityisasiakkaillemme ympäri Suomen.',
    ctaText: 'TUTUSTU TARINAAMME',
    ctaLink: '/tarina',
    image:
      'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/1745739487556-NEIPALA0AQZGO4UV9XZ8/unsplash-image-OLFA5DgSIFo.jpg',
  },
  products: [
    {
      id: 'puutalot',
      title: 'Puutalot',
      description: 'Puutaloratkaisuja omakoti-, pari- ja rivitalokohteisiin sekä useamman rakennuksen kokonaisuuksiin.',
      image:
        'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg',
      link: '/puutalot',
    },
    {
      id: 'puuelementit',
      title: 'Puuelementit',
      description: 'Seinä- ja runkoelementtejä tehokkaaseen ja hallittuun puurakentamiseen.',
      image:
        'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg',
      link: '/puuelementit',
    },
    {
      id: 'puuristikot',
      title: 'Kattoristikot',
      description:
        'CE-merkityt kattoristikot vakioratkaisuina tai kohdekohtaisesti mitoitettuna.',
      image:
        'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/f3c1e841-848b-41c9-afc2-3d7012848230/Hietakulma_tehdas_kuva2-860x530.jpg',
      link: '/kattoristikot',
    },
  ] as Product[],
};


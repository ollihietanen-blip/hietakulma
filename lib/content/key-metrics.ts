export interface KeyMetric {
  value: string;
  title: string;
  description: string;
}

export const keyMetricsByPage = {
  puutalot: [
    {
      value: '3 750',
      title: 'Kohdetta toimitettu',
      description: 'Omakoti-, rivi- ja paritaloja sekä loma-asuntoja ja liikerakennuksia – kokemus ratkaisee.',
    },
    {
      value: '2 175',
      title: 'Omakotitaloa',
      description: 'Vahvin osaamisemme. Lisäksi lähes 500 rivitaloa sekä yli tuhat loma-asuntoa ja liikerakennusta.',
    },
    {
      value: '30+ vuotta',
      title: 'Kokemusta',
      description: 'Suunnittelusta toimitukseen – kolmen vuosikymmenen kokemus näkyy jokaisessa yksityiskohdassa.',
    },
    {
      value: 'Kaikki yhdestä paikasta',
      title: '',
      description: 'Piirustukset, 3D-mallinnus, energiatodistus ja elementit. Yksi kumppani, selkeä prosessi.',
    },
  ] as KeyMetric[],
  puuelementit: [
    {
      value: '6 614',
      title: 'Valmistettua elementtiä',
      description: 'Seinä-, runko- ja väliseinäelementtejä – kaikki CE-merkitystä, lujuuslajitellusta puusta.',
    },
    {
      value: '81 542 m²',
      title: 'Pinta-alaa',
      description: 'Mittakaava puhuu puolestaan: toimitamme yksittäisistä taloista kokonaisiin asuinalueisiin.',
    },
    {
      value: '25 % yli määräysten',
      title: 'Energiatehokkuus',
      description: 'Elementtiemme eristyskyky ylittää rakennusmääräysten vähimmäisvaatimukset selvästi. Lämpö pysyy sisällä.',
    },
    {
      value: 'Maalattu valmiiksi',
      title: 'Tehtaalla',
      description: 'Pohja-, väli- ja pintamaalaus tehdään halliolosuhteissa – tasainen jälki, ei sääriippuvuutta.',
    },
  ] as KeyMetric[],
  kattoristikot: [
    {
      value: '6 500+',
      title: 'Ristikkoa vuosittain',
      description: 'Harjaristikoista halliristikoihin – jokainen ristikko on mitoitettu ja valmistettu kohdekohtaisesti.',
    },
    {
      value: 'CE-merkitty',
      title: 'Laatuvarmennettu',
      description: 'NR-ristikot valmistetaan sertifioidussa tuotannossa kotimaisesta lujuuslajitellusta puusta.',
    },
    {
      value: 'Suunnittelu mukana',
      title: 'Aina',
      description: 'Ristikkolaskelmat ja -piirustukset sisältyvät jokaiseen toimitukseen ilman erillistä laskutusta.',
    },
    {
      value: 'Kaikenkokoisiin kohteisiin',
      title: '',
      description: 'Omakotitalon katosta isohkon hallin kattoon – sama laatu ja palvelu joka mittakaavassa.',
    },
  ] as KeyMetric[],
  kohteet: [
    {
      value: '3 750+',
      title: 'Toimitettua kohdetta',
      description: 'Omakoti-, rivi- ja paritaloja sekä loma-asuntoja ympäri Suomen – tutustu valikoimaan.',
    },
    {
      value: '30+ vuotta',
      title: 'Rakentamisen historiaa',
      description: 'Ensimmäinen kohteemme valmistui 1990-luvun alussa. Siitä lähtien olemme kasvaneet yhdeksi Suomen kokeneimmista puuelementtitoimittajista.',
    },
    {
      value: 'Koko Suomi',
      title: 'Toimitusalueena',
      description: 'Valmistamme Kankaanpäässä, toimitamme sinne missä rakennetaan.',
    },
  ] as KeyMetric[],
  tarina: [
    { value: '30+', title: 'vuotta kokemusta', description: '' },
    { value: '3 750+', title: 'toimitettua kohdetta', description: '' },
    { value: '81 500+', title: 'm² elementtejä', description: '' },
    { value: '15–20', title: 'ammattilaista', description: '' },
  ] as KeyMetric[],
  tietopankki: [
    { value: '30+', title: 'vuotta kokemusta', description: '' },
    { value: '3 750+', title: 'toimitettua kohdetta', description: '' },
    { value: '81 500+', title: 'm² elementtejä', description: '' },
    { value: '15–20', title: 'ammattilaista', description: '' },
  ] as KeyMetric[],
};

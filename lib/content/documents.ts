export const documentStatuses = {
  luonnos: 'Luonnos olemassa',
  lahde: 'Lähde löytynyt',
  taydennettava: 'Täydennettävä',
  selvitettava: 'Selvitettävä',
} as const;

export interface Document {
  id: string;
  title: string;
  description: string;
  category: 'rakennetyypit' | 'ohjeet' | 'tuotedokumentit';
  status: keyof typeof documentStatuses;
  owner: string;
}

// Source/approval status is separate from the availability of a review draft.
// Main documents 0.4 and appendix review drafts 0.5 are readable in the portal.
export const documents: Document[] = [
  {
    "id": "HK-TP-01",
    "title": "Seinäelementtien rakennetyypit",
    "category": "rakennetyypit",
    "status": "luonnos",
    "owner": "Ville",
    "description": "US198-, US198+48- ja US223-rakenteiden luonnokset ovat olemassa. Rakennenimet, U-arvot ja julkaistavat rakennekuvat vahvistetaan."
  },
  {
    "id": "HK-TP-02",
    "title": "Materiaalierittely ja toimitusrajat",
    "category": "tuotedokumentit",
    "status": "luonnos",
    "owner": "Ville ja Tapani",
    "description": "Tarjouspohjasta esitäytetty luonnos. Materiaalit, toimitusrajat ja yhteys ERP:n tietoihin tarkistetaan."
  },
  {
    "id": "HK-TP-03",
    "title": "Toimituksen vastaanotto ja asennuksen valmistelu",
    "category": "ohjeet",
    "status": "luonnos",
    "owner": "Ville",
    "description": "Luonnos ja valmistelulomakkeet ovat olemassa. Tekninen asennusohje käsitellään erikseen liitteessä V3."
  },
  {
    "id": "HK-TP-04",
    "title": "Sähkövalmiit elementit ja talotekniikan lähtötiedot",
    "category": "ohjeet",
    "status": "luonnos",
    "owner": "Ville ja Tapani",
    "description": "Luonnos tehdasvarauksista ja suunnitelmien yhteensovittamisesta. Kaapelointi- ja toimitusrajat vahvistetaan."
  },
  {
    "id": "HK-TP-05",
    "title": "Puuelementtien tuote-esittely",
    "category": "tuotedokumentit",
    "status": "luonnos",
    "owner": "Tapani ja Ville",
    "description": "Tuoteryhmien ja verhousten luonnos. Tarjonta, tuotelupaukset ja avainluvut tarkistetaan."
  },
  {
    "id": "HK-TP-06",
    "title": "Kattoristikoiden toimitusasiakirjat",
    "category": "tuotedokumentit",
    "status": "luonnos",
    "owner": "Jorma",
    "description": "Asiakirjaluettelo ja tarkistusrunko ovat olemassa. Toimituksen ohjeiden versiot vahvistetaan."
  },
  {
    "id": "A1",
    "title": "US198 — ulkoseinän liitos perustukseen",
    "category": "rakennetyypit",
    "status": "lahde",
    "owner": "Ville",
    "description": "AP-US_198-lähde löytynyt. Piirustuksen päiväys, revisio ja soveltamisala vahvistetaan."
  },
  {
    "id": "A2",
    "title": "US198 — seinän ja yläpohjan liittymä",
    "category": "rakennetyypit",
    "status": "lahde",
    "owner": "Ville",
    "description": "US_198-YP_pelti-lähde löytynyt. Vastaavuus valittuun kattoon ja julkaistava versio tarkistetaan."
  },
  {
    "id": "A3",
    "title": "US198+48 — ulkoseinän liitos perustukseen",
    "category": "rakennetyypit",
    "status": "lahde",
    "owner": "Ville",
    "description": "Kaksi lähdeversiota löytynyt. Versioiden ero ja julkaistava piirustus vahvistetaan."
  },
  {
    "id": "A4",
    "title": "US223 — ulkoseinän liitos perustukseen",
    "category": "rakennetyypit",
    "status": "lahde",
    "owner": "Ville",
    "description": "AP-US_223-lähde löytynyt. Tunnus, revisio ja soveltamisala tarkistetaan."
  },
  {
    "id": "A5",
    "title": "Yläpohjaliittymät kate- ja päätyvarianteittain",
    "category": "rakennetyypit",
    "status": "lahde",
    "owner": "Ville",
    "description": "US-YP-piirustussarja löytynyt. Ville valitsee tietopankkiin sopivat yleisdetaljit."
  },
  {
    "id": "A6",
    "title": "US198+25 — perustusliitos",
    "category": "rakennetyypit",
    "status": "selvitettava",
    "owner": "Ville",
    "description": "Lähde löytynyt, mutta +25-rakenteen merkitys ja kuuluminen tarjontaan ovat avoinna."
  },
  {
    "id": "A7",
    "title": "Aukkojen pielet, elementtisaumat ja nurkat",
    "category": "rakennetyypit",
    "status": "lahde",
    "owner": "Ville",
    "description": "Vuorilautamallit sekä US223:n nurkkakuvat UN223 ja SN223 löytyivät. Nykyiset yleisversiot, suoran elementtisauman ja aukkojen liittymädetaljit yksilöidään."
  },
  {
    "id": "A8",
    "title": "HVS — huoneistonvälisen seinän liittymät",
    "category": "rakennetyypit",
    "status": "lahde",
    "owner": "Ville",
    "description": "AP-HVS_98_98- ja HVS-YP-lähteitä löytynyt. Julkaistavat rakenteet ja liittymät vahvistetaan."
  },
  {
    "id": "M1",
    "title": "Materiaalit ja hankintavastuut",
    "category": "tuotedokumentit",
    "status": "luonnos",
    "owner": "Ville ja Tapani",
    "description": "Esitäytetty taulukko. Tuotteet, hankintavastuut ja valinnat vahvistetaan."
  },
  {
    "id": "M2",
    "title": "Toimitusrajojen kirjaus",
    "category": "tuotedokumentit",
    "status": "luonnos",
    "owner": "Ville ja Tapani",
    "description": "Luonnos tilaajan ja tehtaan toimitusrajoista. Vastuut tarkistetaan."
  },
  {
    "id": "M3",
    "title": "Asennuksen laajuus",
    "category": "tuotedokumentit",
    "status": "luonnos",
    "owner": "Ville ja Tapani",
    "description": "Rastilista on luonnosteltu tarjouspohjasta. Asennukseen kuuluvat työt vahvistetaan."
  },
  {
    "id": "M4",
    "title": "Työmaatoimitusten materiaaliluettelo",
    "category": "tuotedokumentit",
    "status": "luonnos",
    "owner": "Ville ja Tapani",
    "description": "Täytettävä luettelopohja on olemassa. Nimikkeet, määrät ja ylläpitovastuu täydennetään."
  },
  {
    "id": "V1",
    "title": "Toimituksen ja asennuksen valmistelulomake",
    "category": "ohjeet",
    "status": "luonnos",
    "owner": "Ville",
    "description": "Lomakeluonnos on olemassa. Työmaan valmiudet, vastuut ja tarkistukset vahvistetaan."
  },
  {
    "id": "V2",
    "title": "Vastaanotto- ja luovutuspöytäkirja",
    "category": "ohjeet",
    "status": "luonnos",
    "owner": "Ville",
    "description": "Hietakulman pöytäkirjaluonnos on olemassa. Sisältö ja käyttö hyväksytään."
  },
  {
    "id": "V3",
    "title": "Elementtien asennus- ja varastointiohje",
    "category": "ohjeet",
    "status": "luonnos",
    "owner": "Ville",
    "description": "Asennussuunnitelmat ja tehtaan pakkausohje TO106 löytyivät. Ohjetekstin luonnos on koottu. Yleispohja, nykyiset revisiot ja kohdekohtaiset suunnitelmaviitteet vahvistetaan."
  },
  {
    "id": "T1",
    "title": "Sähkö- ja LVI-varausten luettelo",
    "category": "ohjeet",
    "status": "luonnos",
    "owner": "Ville ja Tapani",
    "description": "Varausluettelon pohja on olemassa. Tehdasvarausten sisältö ja tietovaatimukset tarkistetaan."
  },
  {
    "id": "T2",
    "title": "Suunnitelmien hyväksyntä ja muutokset",
    "category": "ohjeet",
    "status": "luonnos",
    "owner": "Ville ja Tapani",
    "description": "Hyväksyntä- ja muutoslomake on luonnosteltu. Vastuut ja määräajat vahvistetaan."
  },
  {
    "id": "U1",
    "title": "Ulkoverhouksen valinta",
    "category": "tuotedokumentit",
    "status": "luonnos",
    "owner": "Ville ja Tapani",
    "description": "Valintapohja on olemassa. Verhoustuotteet, käsittelyt ja värivaihtoehdot vahvistetaan."
  },
  {
    "id": "U2",
    "title": "Ulkoverhouksen rakennedetaljit",
    "category": "rakennetyypit",
    "status": "taydennettava",
    "owner": "Ville ja Tapani",
    "description": "Osittaiset lähteet ovat olemassa. Materiaalinvaihdosten, nurkkien ja saumojen detaljit sekä rappausalustan valmistajaohje on koottava."
  },
  {
    "id": "N1",
    "title": "Ristikkotoimituksen asiakirjaluettelo",
    "category": "ohjeet",
    "status": "luonnos",
    "owner": "Jorma",
    "description": "Luettelo on esitäytetty. Rakennekuvien, laskelmien, ohjeiden ja hankekohtaisten liitteiden versiot vahvistetaan."
  },
  {
    "id": "N2",
    "title": "Ristikko-ohjeiden vastaanotto ja avoimet asiat",
    "category": "ohjeet",
    "status": "luonnos",
    "owner": "Jorma",
    "description": "Vastaanoton seurantalomake on luonnosteltu. Se ei korvaa asennustarkastusta."
  },
  {
    "id": "NR-OHJE",
    "title": "Kattoristikoiden asennus- ja tuentaohje",
    "category": "ohjeet",
    "status": "lahde",
    "owner": "Jorma",
    "description": "Asennus- ja tuentaohje on jo nykyisellä verkkosivulla ja lähdekansiossa. Jorma vahvistaa jatkokäyttöön tulevan version ja julkaisulaajuuden."
  },
  {
    "id": "D1-SERT",
    "title": "Kattoristikoiden sertifikaatti ja liitteet",
    "category": "tuotedokumentit",
    "status": "lahde",
    "owner": "Jorma ja Olli",
    "description": "Nykyinen Control Unionin sertifikaatti 2412-CPR-215-05 löytynyt. Julkaistava kopio ja liitteen numeroviittaus tarkistetaan. Sertifiointi on toiminnassa."
  },
  {
    "id": "D1-DOP",
    "title": "Kattoristikoiden suoritustasoilmoitus (DoP)",
    "category": "tuotedokumentit",
    "status": "selvitettava",
    "owner": "Jorma ja Olli",
    "description": "Versioita löytynyt, mutta nykyiseen sertifikaattiin vastaava hyväksytty ja allekirjoitettu julkaisuversio on yksilöitävä. Uutta DoP-tekstiä ei ole laadittu."
  },
  {
    "id": "D2",
    "title": "Seinäelementtien varmennustodistus ja tuoteasiakirjat",
    "category": "tuotedokumentit",
    "status": "lahde",
    "owner": "Ville ja Olli",
    "description": "Nykyinen varmennustodistus 501-03 löytynyt. Julkaistava kopio, liitteet ja muut hyväksytyt tuoteasiakirjat yksilöidään. Sertifiointi jatkuu Control Unionilla."
  }
];

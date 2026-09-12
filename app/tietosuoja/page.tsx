import { pageMetadata } from '@/lib/metadata';
import { companyInfo } from '@/lib/content/contacts';
import Section from '@/components/sections/Section';

export const metadata = pageMetadata('/tietosuoja', 'Tietosuojaseloste', 'Tietoa Hietakulman verkkosivujen yhteydenottojen ja tietopankin henkilötietojen käsittelystä.');

export default function TietosuojaPage() {
  const heading = 'text-2xl font-bold mt-10 mb-4 text-text';
  const paragraph = 'text-gray-700 leading-relaxed mt-4';
  return (
    <Section background="white">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-text">Tietosuojaseloste</h1>
        <p className="text-sm text-gray-600">Luonnos esikatselua varten · 12.9.2026</p>
        <p className={paragraph}>
          Tämä kuvaus koskee yhteydenottoja ja tietopankin käyttäjätilejä. Ennen tuotantokäyttöä
          Hietakulma vahvistaa käsittelyn oikeusperusteet, säilytysajat, palveluntarjoajat ja
          mahdolliset kansainväliset tiedonsiirrot. Esikatselussa käytetään testitietoja.
        </p>

        <h2 className={heading}>1. Rekisterinpitäjä ja yhteydenotot</h2>
        <p className={paragraph}>
          {companyInfo.name}, Y-tunnus {companyInfo.businessId}<br />
          {companyInfo.address}, {companyInfo.postalCode} {companyInfo.city}<br />
          Puhelin {companyInfo.phone}<br />
          <a href={`mailto:${companyInfo.email}`} className="underline">{companyInfo.email}</a>
        </p>

        <h2 className={heading}>2. Yhteydenotot</h2>
        <p className={paragraph}>
          Yhteydenottolomakkeella annetaan nimi, sähköpostiosoite, puhelinnumero ja viesti sekä
          haluttaessa yritys. Tietoja tarvitaan yhteydenottoon vastaamiseen ja mahdollisen
          tarjouspyynnön käsittelyyn. Viesti välitetään sähköpostitse Hietakulmalle.
          Lomake ei tallenna viestiä tietopankin käyttäjätietokantaan.
        </p>

        <h2 className={heading}>3. Tietopankin käyttäjätili</h2>
        <p className={paragraph}>
          Rekisteröitymisessä kysytään etu- ja sukunimi, sähköposti, yritys tai organisaatio,
          rooli ja tietopankin käyttötarkoitus. Tehtävänimike ja puhelin ovat vapaaehtoisia.
          Tallennamme myös tietosuojakuvaukseen tutustumisen ajankohdan ja mahdollisen
          markkinointivalinnan. Tiedot saadaan käyttäjältä itseltään.
        </p>
        <p className={paragraph}>
          Sähköpostin vahvistamista ja salasanan palautusta varten käsitellään kertakäyttöisiä
          linkkejä ja niiden voimassaoloaikoja. Salasana tallennetaan tiivisteenä. Käyttäjätiliin
          tallennetaan luonti- ja päivitysajat, sähköpostin vahvistusaika, viimeisimmän
          onnistuneen kirjautumisen ajankohta ja kirjautumisten määrä. Näitä tietoja käytetään
          käyttöoikeuden toteuttamiseen ja palvelun ylläpitoon.
        </p>
        <p className={paragraph}>
          Väärinkäytösten ehkäisemiseksi kirjautumis- ja tunnuspyyntöjen määrää rajoitetaan.
          Rajoitustieto muodostetaan sähköpostin tai palautustunnuksen tiivisteestä ja
          aikaikkunasta. Käyttöoikeus voidaan evätä sähköpostin verkkotunnuksen perusteella.
          Jos rekisteröityminen ei onnistu, voit pyytää asian selvittämistä ottamalla yhteyttä.
        </p>

        <h2 className={heading}>4. Markkinointivalinta ja käsittelyn perusteet</h2>
        <p className={paragraph}>
          Sähköpostimarkkinoinnin valinta on vapaaehtoinen eikä se ole tietopankin käytön ehto.
          Valinnan voi peruuttaa ottamalla yhteyttä yllä olevaan osoitteeseen. Tunnuksen
          aktivointi- ja palautusviestit ovat palveluviestejä, eivät markkinointia.
        </p>
        <p className={paragraph}>
          Luonnoksen lähtökohtana on käsitellä tarjouspyyntöjä sopimuksen valmistelua varten,
          yhteydenottoja ja palvelun ylläpitoa oikeutetun edun perusteella sekä vapaaehtoista
          sähköpostimarkkinointia suostumuksella. Rekisterinpitäjän on vielä vahvistettava
          tarkoituskohtaiset perusteet ja oikeutetun edun arvio. Tietosuojakuvaukseen
          tutustumisen kuittaus ei itsessään ole suostumus kaikkeen henkilötietojen käsittelyyn.
        </p>

        <h2 className={heading}>5. Säilytysajat</h2>
        <p className={paragraph}>
          Aktivointilinkin voimassaolo ja salasanan palautuslinkin 30 minuutin voimassaolo
          rajaavat linkin käyttöä. Linkin vanheneminen ei itsessään poista siihen liittyvää
          tietokantariviä. Käyttäjätilien, vanhentuneiden pyyntöjen, yhteydenottojen,
          sähköpostipalvelun lokien ja varmuuskopioiden säilytysajat sekä poistomenettelyt
          vahvistetaan ennen tuotantokäyttöä. Aiemman selosteen kahden vuoden poistolupausta
          ei ole varmennettu käytännössä.
        </p>

        <h2 className={heading}>6. Palveluntarjoajat ja tiedonsiirrot</h2>
        <p className={paragraph}>
          Lomake-, aktivointi- ja palautusviestien lähetyksessä käytetään Resend-palvelua.
          Viestit käsitellään myös vastaanottajan sähköpostipalvelussa. Sivuston ylläpito,
          tietokanta ja tekniset lokit edellyttävät palveluntarjoajia, joiden lopullinen
          tuotantokokoonpano on vielä vahvistamatta. Palvelukohtaiset käsittelysopimukset,
          sijainnit, alihankkijat ja ETA-alueen ulkopuolisten siirtojen suojatoimet tarkistetaan
          ennen tuotantokäyttöä; niitä ei pidetä vahvistettuina tämän luonnoksen perusteella.
        </p>

        <h2 className={heading}>7. Evästeet ja Google-kartta</h2>
        <p className={paragraph}>
          Tietopankin kirjautuminen käyttää istunto- ja suojaustoimintoihin tarvittavia evästeitä.
          Kirjautumisistunto voi säilyä enintään 30 päivää; sen voimassaolo voi uusiutua palvelua
          käytettäessä. Uloskirjautuminen poistaa kirjautumisevästeen. Salasanan palautus
          mitätöi aiemmat istunnot. Evästeet eivät siis kaikki poistu selaimen sulkemisessa.
          Tässä toteutuksessa ei ole otettu käyttöön analytiikka- tai markkinointiseurantaa.
        </p>
        <p className={paragraph}>
          Yhteystietosivun Google-kartta ladataan vasta, kun valitset kartan lataamisen.
          Tällöin selain muodostaa yhteyden Googleen, joka saa esimerkiksi IP-osoitteesi ja
          selaimen teknisiä tietoja ja voi käyttää omia evästeitään.
          Valintaa ei tallenneta myöhempiä käyntejä varten. Kartan voi sulkea sivulla.
          Lisätietoja on <a className="underline" href="https://policies.google.com/privacy">Googlen tietosuojakäytännössä</a>.
          Osoite näkyy myös ilman kartan lataamista.
        </p>

        <h2 className={heading}>8. Oikeutesi ja tietojen suojaaminen</h2>
        <p className={paragraph}>
          Voit pyytää pääsyä tietoihisi, tietojen oikaisua tai poistamista sekä käsittelyn
          rajoittamista. Tilanteesta ja käsittelyperusteesta riippuen sinulla on oikeus
          vastustaa käsittelyä ja siirtää tiedot järjestelmästä toiseen. Voit peruuttaa antamasi
          suostumuksen. Pyyntö käsitellään sovellettavien edellytysten mukaisesti, ja henkilöllisyys
          varmistetaan tarvittaessa. Älä lähetä salasanaasi tai aktivointilinkkiä pyynnön mukana.
        </p>
        <p className={paragraph}>
          Ota yhteyttä rekisterinpitäjään yllä olevilla tiedoilla. Voit myös saattaa asian
          <a className="underline" href="https://tietosuoja.fi/ilmoitus-tietosuojavaltuutetulle"> tietosuojavaltuutetun käsiteltäväksi</a>.
          Käyttäjätilit suojataan salasanan tiivistyksellä, istuntojen tarkistuksilla ja
          käyttöyritysten rajoituksilla. Tuotannon käyttöoikeudet, varmuuskopiointi ja
          poistopyyntöjen vastuuhenkilö vahvistetaan käyttöönoton yhteydessä.
        </p>
      </div>
    </Section>
  );
}

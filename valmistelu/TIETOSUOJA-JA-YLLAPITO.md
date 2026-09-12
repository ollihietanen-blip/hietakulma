# Tietosuojan ja ylläpidon käyttöönottotarkistus

12.9.2026 · Sisäinen luonnos · Tuotannon menettelyjä ei ole vielä hyväksytty

Tietosuojasivun kuvaus on täydennetty portaalin tietosisällöllä ja merkitty esikatseluluonnokseksi. Alla erotetaan toteutuksen todellinen toiminta päätöksistä, jotka Hietakulman on vahvistettava. Sivun luonnosmerkintää ei poisteta ennen näiden kohtien ratkaisemista.

## Todellinen tietojen kulku

| Tietoryhmä | Toteutuksen sijainti ja käsittely | Säilytyksen nykytila |
|---|---|---|
| Yhteydenotto | Nimi, sähköposti, puhelin, vapaaehtoinen yritys ja viesti välitetään Resendillä vastaanottajalle. Ei tallennusta Prisma-tietokantaan. | Sähköpostilaatikon ja Resendin asetukset eivät ole varmennettuja. Kahden vuoden poistokäytäntöä ei ole todennettu. |
| Rekisteröitymispyyntö | RegistrationRequest sisältää profiilitiedot, valinnat, tunnuksen tiivisteen ja aikaleimat. | Uusi pyyntö poistaa saman sähköpostin aiemmat käyttämättömät pyynnöt. Käytetyt ja muiden osoitteiden vanhentuneet pyynnöt eivät poistu automaattisesti. |
| Käyttäjä | User sisältää profiilin, salasanatiivisteen, valintojen ajat, vahvistuksen, viimeisen kirjautumisen, kirjautumismäärän ja istuntoversion. | Tällä hetkellä ei automaattista passiivisten tilien poistamista. |
| Salasanan palautus | PasswordResetRequest sisältää käyttäjäviitteen, tunnuksen tiivisteen ja aikaleimat. | Linkki vanhenee 30 minuutissa; rivi ei poistu vanhenemisella. Käyttäjän poisto poistaa siihen liittyvät palautusrivit tietokannan relaation kautta. |
| Yritysrajoitus | RateLimitBucket sisältää tiivistetyn tunnisteen, laskurin ja aikaikkunan päättymisajan. | Vanhentuneet rivit poistetaan seuraavan rajoitustarkistuksen yhteydessä. Hiljaisessa palvelussa poisto odottaa seuraavaa pyyntöä. |
| Selainistunto | Auth.js:n salattu JWT-istuntoeväste; paikallisesti tarkastettu oletusikä 30 päivää. | Istunnon ikä voi uusiutua käytössä. Uloskirjautuminen poistaa evästeen, salasanan palautus muuttaa istuntoversiota. |
| Kartta | Google-iframe syntyy vain käyttäjän painettua Lataa Google-kartta. | Valinta on React-tilassa eikä tallennu seuraavalle käynnille. Sulkeminen poistaa iframen mutta ei poista Googlen jo saamia tietoja tai asettamia evästeitä. |
| Tekniset lokit ja varmuuskopiot | Riippuvat lopullisesta palvelin-, tietokanta- ja sähköpostiympäristöstä. | Palvelut, säilytysajat, käyttöoikeudet ja sijainnit vahvistamatta. |

Salaisuuksia, raakoja aktivointi- tai palautustunnuksia ja salasanatiivisteitä ei sisällytetä käyttäjälle annettavaan tietojäljennökseen tai tavalliseen tukipyyntöön. Testiaineisto pidetään erillään asiakkaista.

## Ennen tuotantokäyttöä vahvistettavat päätökset

Olli nimeää tietosuojapyyntöjen vastuuhenkilön ja varahenkilön. Yritys vahvistaa yhteydenottojen, käyttäjäprofiilien, kirjautumishistorian, suostumustietojen, pyyntörivien, sähköpostilokien ja varmuuskopioiden säilytysajat sekä käytännön poistotavan. Linkin voimassaoloaika ei ole sen henkilötietojen säilytysaika.

Käsittelyperusteet vahvistetaan tarkoituksittain. Luonnokseen on ehdotettu tarjouspyyntöjen käsittelyä sopimuksen valmisteluna, yhteydenottojen ja ylläpidon käsittelyä oikeutetun edun perusteella sekä vapaaehtoista sähköpostimarkkinointia suostumuksella. Oikeutetun edun arvio ja portaalin käyttöehdot eivät ole vielä vahvistettuja. Tietosuojailmoitukseen tutustumisen kuittausta ei käsitellä yleisenä suostumuksena.

Varmistetaan lopulliset palveluntarjoajat, sopimukset, tietojen sijainnit, alihankkijat, käyttöoikeudet ja mahdollisten ETA-siirtojen suojatoimet. Aiemman selosteen väitettä vakiosopimuslausekkeista ei pidetä todisteena sopimusten olemassaolosta. Resendin hyväksymä lähetys ei yksin todenna viestin saapumista.

## Ylläpitäjän menettelyluonnos

Tietopyyntö kirjataan rajattuun tukirekisteriin ja henkilöllisyys varmistetaan tilanteeseen sopivalla tavalla. Selvitetään tietokannan lisäksi sähköpostilaatikon ja muiden käytettyjen palvelujen tiedot. Asiakkaalle kerrotaan pyynnön lopputulos ja mahdollisten säilytettävien tietojen peruste. Täsmälliset vastausajat ja käsittelyohje vahvistetaan ajantasaisen sääntelyn perusteella.

Markkinointisuostumuksen peruuttamisessa päivitetään sekä User-taulun valinta että mahdollinen erillinen lähetyslista. Tässä repossa ei ole markkinointilähetysjärjestelmää. Peruutuksen todisteen säilyttämisestä sovitaan erikseen; suostumuksen alkuperäistä aikaleimaa ei tulkita peruutusajaksi.

Käyttöoikeuden poistossa mitätöidään istunnot ja ratkaistaan tilin poistaminen sovitun käytännön mukaan. User-rivin poistaminen ei yksin poista RegistrationRequest-rivejä, koska niillä ei ole käyttäjärelaatiota. Toteutettu `delete-user`-ylläpitokomento poistaa tilin sekä saman sähköpostin pyynnöt ja palautusrivit. Mahdolliset sähköpostit ja varmuuskopiot käsitellään erikseen. Komennot, rajoitukset ja palautusmenettely on kuvattu [ylläpito-ohjeessa](YLLAPITOKOMENNOT.md); toiminnot on testattu erillisellä SQLite-tietokannalla. Tuotannon käyttöönotto ja menettelyjen hyväksyntä ovat avoinna.

Tietopankin dokumenttien päivityksessä tarkistetaan tekninen hyväksyntä, versionumero, nimi, lataustiedosto ja jakelurajaus. Sisäiset luonnokset pysyvät valmistelu-kansiossa. Kirjautumista vaativia tiedostoja ei sijoiteta suojaamattomaan public-kansioon. Latauksen istuntotarkistus toteutetaan ennen yksityisten tiedostojen käyttöönottoa; nykyinen dokumenttiluettelo on tyhjä.

## Lähteet kuvauksen laadintaan

Toteutuslähteet: prisma/schema.prisma, lib/auth-options.ts, lib/rate-limit.ts, app/api/signup, app/api/activate, app/api/password-reset, app/api/contact ja components/sections/ContactMap.tsx. Auth.js:n istuntoikä tarkistettiin asennetun @auth/core-paketin lib/init.js-tiedostosta.

Viranomaislähteet tarkistettu 12.9.2026:

- [Tietosuojavaltuutettu: rekisteröidyn informointi](https://tietosuoja.fi/rekisteroidyn-informointi) — kuvauksen on katettava käsittelyn kokonaisuus ja vastattava todellisia käytäntöjä.
- [Tietosuojavaltuutettu: rekisteröidyn oikeudet](https://tietosuoja.fi/rekisteroidyn-oikeudet) — oikeuksien soveltaminen ja yhteydenottotapa.
- [Traficomin evästeohjeistus palveluntarjoajille](https://www.traficom.fi/sites/default/files/media/file/Ev%C3%A4steohjeistus_palveluntarjoajille.pdf) — evästeiden tarpeellisuuden ja suostumusratkaisun tarkistuksen lähtökohta. Kartan tekninen latausvalinta ei yksin osoita koko tuotantopalvelun lainmukaisuutta.

## Riippuvuuksien korjaus

Alkuperäisen npm audit -tarkistuksen 30 merkintää korjattiin 12.9.2026 riippuvuuspäivityksessä. Korjatun lukitustiedoston audit: 0 haavoittuvuutta. Versiot, välillisten riippuvuuksien override-määritykset ja testit on kuvattu [riippuvuuspäivityksessä](RIIPPUVUUSPAIVITYS.md). Tuotantovalmiutta ei ole vahvistettu.

# Esikatselun käynnistys ja testaus

Paikallinen esikatselu käyttää samaa tuotantokoostetta kuin sivusto, mutta omaa SQLite-tietokantaa ja paikallista sähköpostien talteenottoa. Se ei lähetä oikeita viestejä. Tämä on ensimmäisen vaiheen tekninen esikatselu; dokumenttien luonnokset ja tietosuojasivu odottavat vielä sisällöllisiä hyväksyntöjä.

## Käynnistä

Projektihakemistossa Node 24:llä ja Python 3:lla:

```bash
npm ci
npm run preview
```

Komento generoi Prisma Clientin, ajaa migraatiot vain `.local-preview/preview.db`-testitietokantaan, rakentaa sivuston `.local-preview/build`-hakemistoon ja käynnistää osoitteen **http://127.0.0.1:3108**. `.env.local`-tiedoston oikea tietokanta ja sähköpostiavaimet korvataan tässä prosessissa testiympäristön arvoilla. Tavallinen `npm run start` ei sisällä tätä suojausta.

Palvelin kuuntelee vain omalla koneella. Avaa se selaimessa. Lopeta Ctrl+C:llä. Testitilit säilyvät seuraavalle käynnistyskerralle. Älä säilytä testihakemistossa oikeita henkilötietoja. Hakemisto ja sen salaisuudet on rajattu pois Gitistä. Portin voi valita `npm run preview -- --port 3110` -komennolla; käytä yhtä paikallista esikatseluprosessia kerrallaan.

## Rekisteröityminen ja salasanan palautus

Rekisteröidy esimerkiksi `oma-testi@example.com`-osoitteella. Näytä paikallisesti talteen otettujen viestien aktivointi- ja palautuslinkit toisessa terminaalissa:

```bash
npm run preview:mails
```

Komento tulostaa testivastaanottajan, viestin aiheen ja tällä koneella avattavan linkin. Kopioi linkki selaimeen, aseta salasana ja jatka tietopankkiin. Salasanan palautus toimii samalla tavalla. Varsinaisissa talteen otetuissa viesteissä on erillinen testi-HTTPS-osoite, jonka komento muuttaa paikalliseksi. Viestit löytyvät `.local-preview/mail.ndjson`-tiedostosta; yhteydenottokokeen viesti näkyy siellä kokonaan. Tätä tiedostoa ei jaeta tarkistajille.

Tietopankki näyttää aineistopyynnön, koska hyväksyttyjä ladattavia teknisiä asiakirjoja ei ole vielä lisätty. Luonnokset ovat `valmistelu/tarkistuspaketti`-kansiossa ja muokattavassa Word-koosteessa.

## Toistettava selainkoe

Pidä esikatselu käynnissä ja varmista, että koneella on Google Chrome. Selaintesti käyttää Playwrightin `chrome`-kanavaa.

```bash
npm test
npm run test:browser
```

Selainajo varmistaa ennen toimia, että palvelimen esikatselutunniste vastaa paikallista testikonfiguraatiota. Se ei hyväksy mielivaltaista tuotanto- tai esikatseluosoitetta. Koetta ei pidä muuttaa osoittamaan ulkoiseen palveluun ilman sähköpostitoimituksen erillistä suunnittelua.

Kattavuus: 17 julkisen sitemap-sivun HTTP/metatiedot ja renderöinti 1440 ja 390 px koossa, seitsemän uudelleenohjausta, viiden tunnussivun noindex, henkilökuvat, koko portaalipolku, yhteydenoton virhetilanteet ja uudelleenyritys sekä kartan latausvalinta. Kuvakaappaukset tallennetaan käyttöjärjestelmän tilapäishakemistoon, jonka polku näkyy testin tulosteessa. Uudet testitilit lisätään vain paikalliseen testitietokantaan. Selainkoe ei yksin kata kaikkia navigaation, näppäimistökäytön, videoiden tai ulkoisen ympäristön tilanteita; nämä kuuluvat loppukatselmointiin.

## Ulkoinen Vercel-esikatselu

GitHubin Vercel-tila vahvisti 12.9.2026 commitien `77f91b4` ja `01e05e6` esikatselukoosteiden valmistumisen. Commitin `77f91b4` osoite [Vercel-esikatselu](https://hietakulma-mlugrakuw-olli-hietanens-projects.vercel.app) ohjasi kirjautumissivulle, joten sen sivuja tai portaalia ei tämän tiedon perusteella pidetä testattuina. Se ei ole tämän jälkeen tehtyjen muutosten esikatselu.

Vercel-liittimen aiempi käyttö vaati uudelleenkirjautumisen. Ulkoisen ympäristön käyttöoikeus, pysyvä tietokanta, migraatiot ja sähköpostiasetukset ovat edelleen varmentamatta. Paikallinen onnistuminen ei vahvista niitä. Tässä työssä ei ole avattu esikatselua julkiseksi, muutettu suojausta tai julkaistu tuotantoon.

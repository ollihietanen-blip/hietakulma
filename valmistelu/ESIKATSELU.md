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
npm run test:navigation
npm run test:media
```

Selainajo varmistaa ennen toimia, että palvelimen esikatselutunniste vastaa paikallista testikonfiguraatiota. Se ei hyväksy mielivaltaista tuotanto- tai esikatseluosoitetta. Koetta ei pidä muuttaa osoittamaan ulkoiseen palveluun ilman sähköpostitoimituksen erillistä suunnittelua.

Kattavuus: 17 julkisen sitemap-sivun HTTP/metatiedot ja renderöinti 1440 ja 390 px koossa, seitsemän uudelleenohjausta, viiden tunnussivun noindex, henkilökuvat, koko portaalipolku, yhteydenoton virhetilanteet ja uudelleenyritys sekä kartan latausvalinta. Navigaatiokoe kattaa valikon kohdistuksen molempiin suuntiin, Escape-sulkemisen, työpöytäkokoon siirtymisen, sivulinkit ja kohdesuodattimet näppäimistöllä. Mediakoe lataa näkyvät kuvat, tarkistaa niiden ja videoiden mukanaolon Gitissä, videoiden toiston työpöydällä, mobiilin videopyynnöt, vähennetyn liikkeen asetuksen, sisäiset linkit/ankkurit ja puuttuvien sivujen 404-vastaukset.

Kuvakaappaukset tallennetaan käyttöjärjestelmän tilapäishakemistoon, jonka polku näkyy testin tulosteessa. Uudet testitilit lisätään vain paikalliseen testitietokantaan. Kokeet on suunniteltu Chromelle; ne eivät yksin todista kaikkien selainten, ruudunlukijoiden tai ulkoisen ympäristön toimintaa.

## Ulkoinen Vercel-esikatselu

Jatkovaiheen PostgreSQL-valmistelu, käyttöönoton rajaukset ja testausjärjestys on kuvattu tiedostossa [ULKOINEN-TIETOKANTA.md](ULKOINEN-TIETOKANTA.md). Erillinen schema ja alkumigraatio on valmisteltu; sovelluksen tietokantayhteyttä ei vielä vaihdettu.

Commitin `df05d8c` [Vercel-esikatselu](https://hietakulma-f8u1luiho-olli-hietanens-projects.vercel.app) valmistui GitHubin deployment-tilan mukaan. Se avattiin 12.9.2026 Ollin nykyisellä Vercel-selainistunnolla: etusivu renderöityi ja Tietopankki-linkki ohjasi kirjautumissivulle. Ilman Vercel-istuntoa osoite ohjaa Vercelin kirjautumiseen. Suojausta ei muutettu.

Vercel-liitin vaati aiemmin uudelleenkirjautumisen, mutta projektin asetukset voitiin lopulta lukea selaimesta. Projektin Environment Variables -näkymä ilmoitti **No Environment Variables Added**, Shared-välilehti **No shared variables linked**, Storage-luettelo oli tyhjä ja Domains-näkymässä oli vain `hietakulma.vercel.app` Production-osoitteena. Ulkoiseen portaaliin tarvittavia tietokanta-, Auth- ja Resend-asetuksia ei ole näin konfiguroitu projektin ympäristömuuttujiin. Mahdollisia projektin ulkopuolisia palvelusopimuksia tämä näkymä ei kartoita.

Koko tunnuspolun testaus koskee paikallista eristettyä esikatselua. Ulkoisen version rekisteröitymistä, kirjautumista ja sähköpostitoimitusta ei pidä esittää käyttövalmiina. Ennen ulkoisen portaalin käyttöönottoa valitaan pysyvä tietokantaratkaisu, toteutetaan ympäristökohtaiset migraatiot/varmuuskopiot ja asetetaan oikeat palvelinosoitteet, salaisuudet sekä sähköpostitoimitus. Oikea toimitustesti edellyttää erillistä lähetyslupaa. Tässä goalissa ei muutettu Vercelin asetuksia, kytketty `hietakulma.fi`-verkkotunnusta tai julkaistu tuotantoon.

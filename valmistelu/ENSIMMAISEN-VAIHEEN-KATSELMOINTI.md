# Ensimmäisen vaiheen valmistumiskatselmointi

12.9.2026. Tarkistettu sovelluskoodi: `df05d8c`. Sen jälkeen tehdyt muutokset koskevat lähdehavaintoja, Word-luonnosta ja tätä dokumentaatiota. Tämä katselmointi koskee goalissa rajattua teknistä esikatselua ja asiantuntijoiden tarkistuspakettia. Se ei hyväksy sivustoa tuotantoon.

## Todennetut tulokset

| Goalin vaatimus | Tarkastettu näyttö | Tulos ja rajaus |
|---|---|---|
| Oma branch ja pushatut välietapit | `codex/julkaisuvalmistelu`, GitHubin commit- ja deployment-tilat | Työvaiheet omissa commiteissa. Vercelin branch-deploymentit ovat Preview-ympäristöä. |
| Aiemmat käyttäjän muutokset säilyvät | Työpuun erilliset kuva-, video-, QA- ja tmp-aineistot säilytetty; vain yksilöidyt työn tiedostot staged | Käyttäjän ylimääräisiä aineistoja ei siivottu tai sisällytetty vahingossa toimitukseen. Kehitystietokannat säilytettiin levyllä, seuranta poistettiin vasta sisältö- ja historiatarkistuksen jälkeen. |
| Tietokanta ja migraatiot | Neljä migraatiota tyhjään SQLiteen; oikeaa Prismaa käyttävät palvelintestit; WAL-varmuuskopion palautustesti | Paikallinen toiminta ja palautettavuus todennettu. Vanha testitili kirjautui esikatselun uudelleenrakennuksen jälkeen. Ulkoisen pysyvän tietokannan käyttöönotto on avoin. |
| Rekisteröinti ja aktivointi | `tests/portal-flow.test.cjs`, `scripts/qa/portal.cjs` | Validointi, normalisointi, domainrajat, lähetysvirheestä palautuminen, vanheneminen, kertakäyttöisyys ja rinnakkaiset aktivoinnit testattu. |
| Kirjautuminen, uloskirjautuminen ja palautus | Sama integraatio- ja selainkoe, 1440 ja 390 px | Koko ketju toimii oikealla testitietokannalla. Salasanan vaihto mitätöi vanhat istunnot; väärät/vanhentuneet tunnukset ja yritysrajat testattu. |
| Yhteydenotto | 16 palvelintestiä ja `scripts/qa/contact.cjs` | Lähetyspalvelun virhe, verkkokatko, virheellinen vastaus ja onnistunut uusi yritys; syötteet säilyvät virheessä. Kaikki toimitukset simuloitu. |
| Linkit ja hakukonetiedot | `scripts/qa/public.cjs`, `scripts/qa/media.cjs` | 17 sitemap-sivua, canonical/jakamiskuvat, 7 ohjausta, 5 tunnussivun noindex, 23 sisäistä linkkiä/ankkuria ja 404-tilanteet tarkistettu. Väärät PDF-linkit poistettu. |
| Kuvat ja videot | `scripts/qa/media.cjs` | 165 kuvaesiintymää kummassakin näyttökoossa dekoodattu; 95 erillistä mediaresurssia löytyy Gitistä. Videot toistuvat työpöydällä, mobiili ei lataa niitä, vähennetty liike piilottaa videot ja pysäyttää taustakuvan animaation. |
| Navigaatio ja mobiili | `scripts/qa/navigation.cjs` ja kuvakaappaus | Valikko, sarkainkierto, Escape, kohdistuksen palautus, koon vaihtaminen, kohdesuodattimet ja kohdelinkit tarkistettu. Havaitut kaksi valikkovirhettä korjattu. |
| Tietosuojan ja ylläpidon ensimmäinen versio | Tietosuojasivu, `TIETOSUOJA-JA-YLLAPITO.md`, `YLLAPITOKOMENNOT.md`, 9 ylläpitotestitulosta | Todelliset tietovirrat kuvattu, kartta ladataan valinnasta. Tietojen vienti, markkinointivalinnan peruutus, istuntojen mitätöinti, tilin poisto ja siivous toimivat testitietokannassa. Säilytysajat ja oikeudelliset hyväksynnät avoinna. |
| Riippuvuudet ja kooste | `npm ci`, `npm test`, `npm run preview` puhtaasta Git-arkistosta Node 24.19.0:lla | 46 testiä hyväksytty, tuotantokooste valmistui, npm audit 0 haavoittuvuutta. Puhtaan version 17 sivun, portaalin, lomakkeen, kartan ja navigaation selainkokeet läpäisivät. |
| Toistettava esikatselu | `scripts/preview.cjs`, `preview-mail.cjs`, `ESIKATSELU.md` | `npm run preview` käynnistää eristetyn esikatselun; testitiedot ja viestit pysyvät paikallisina. Muun palvelimen testaaminen estetään esikatselutunnisteella. |
| Lähteisiin perustuvat omat dokumentti- ja liiteluonnokset | `tarkistuspaketti/README.md`, `LAHTEET.md`, asiakirjat 01–06 | Kaikki aiemmat 11 dokumenttinimikettä katettu. Mukana R198/R248, A-, M-, V-, T-, U-, N- ja D-liitteiden luonnokset tai yksilöidyt hyväksyttävät lähteet. R248:n, U-arvojen, mittojen, DoP:n ja NR-ohjeen epävarmuudet näkyvät. |
| Muokattava tarkistuspaketti | `Hietakulma-tarkistuspaketti-luonnos.docx` | 20 sivua ja 18 taulukkoa. Kaikki Markdown-lähdekatkelmat löytyvät Wordista. Viimeisen muutoksen sivut 4 ja 16 luettu kuvina; muut 18 sivua pikselitasolla samoja kuin aiemmin tarkistetut sivut. |
| Ville, Jorma ja Tapani saavat täydennettävät luonnokset | `07-tarkistuspyynnot.md` ja Word | Kolme erillistä viestiluonnosta, dokumenttikohtaiset vastuut ja tarkistuskysymykset. Ei lähetyksiä. |
| Vahvistamattomia luonnoksia ei esitetä asiakasohjeina | Paketin luonnos-/tarkistusmerkinnät; tyhjä `lib/content/documents.ts`; lähteiden erottelu | Luonnoksia ei lisätty julkisiin latauksiin eikä allekirjoitettu. Tekniset arvot ja vanhojen lähteiden soveltuvuus odottavat asiantuntijoita. |
| Ulkoiset ja ihmisten päätöksiä vaativat avoimet kohdat kirjattu | Alla oleva jatkolista, esikatseluohje ja julkaisusuunnitelma | Vercelin asetukset saatiin luettua nykyisellä selainistunnolla; puuttuvat asetukset tunnistettu. |
| Jussi-Pekka ja tuotanto seuraavassa vaiheessa | Tarkistuspyyntöjen vaiheistus ja julkaisusuunnitelma | Jussi-Pekan katselmointia ei pyydetty ennen asiantuntijapäivityksiä. Tuotantoa, DNS:ää tai Vercelin asetuksia ei muutettu. |

Word-tiedoston SHA256: `bac7708dcda6483a7022a428fb040e0d47129cf223046af9c8b1f4e8834c0726`.

## Julkaisusuunnitelman jäljelle jäävät kohdat

Suunnitelman vaiheen 1 ulkoisen tietokannan pysyvyys, ympäristökohtaiset migraatiot ja varmuuskopiointi sekä Auth-asetukset ovat käyttöönottotyötä. Paikalliset vastineet on toteutettu ja testattu. Vercelin Project- ja Shared-ympäristömuuttujaluettelot sekä Storage-luettelo olivat tyhjät. Domains-luettelossa näkyi vain `hietakulma.vercel.app`; yrityksen varsinaista domainia ei kytketty.

Vaiheen 2 hyväksytyn aineiston täydellinen inventointi, asiantuntijapäivitykset, niiden yhdistäminen, versioiden hyväksyminen, latausten käyttöoikeus ja tiedostojen julkaiseminen odottavat Villeä, Jormaa, Tapania ja tarvittaessa Ollia. Valmiit ensimmäiset luonnokset eivät tarkoita hyväksyttyä teknistä ohjetta. Erityisesti NR-ohjeen ja tarkastuslomakkeen näkyvä päiväys on 15.4.2008, vaikka PDF:n luontimetatieto on vuodelta 2024. DoP:n vuoden 2013 ja käsikirjassa olevan vuoden 2025 tekstiversion ero on ratkaisematta.

Vaihe 3 tarvitsee Resendin ja lähettäjäverkkotunnuksen määritykset, vastaanottajan vahvistuksen ja erikseen sallitun oikean toimitustestin. Tässä työssä ei lähetetty sähköposteja.

Vaiheesta 4 ihmisten roolien ja avainlukujen ajantasainen vahvistus, toimituslupausten hyväksyntä sekä kahdeksan vanhan referenssin säilyttäminen/kohdevastaavuudet jäävät julkaisua edeltäviksi päätöksiksi. Niitä varten on lähde- ja osoitekartoitus; vahvistamattomia vastaavuuksia ei arvattu. Search Console- ja palvelinlokihistoriaa ei ollut käytettävissä.

Vaiheesta 5 säilytysajat, vastuuhenkilöt, sopimukset, käsittelyperusteet, siirtoperusteet ja tuotannon ajastukset vaativat yrityksen päätökset. Siksi tietosuojasivu on edelleen näkyvä luonnos. Ylläpitotyökalut eivät yksin osoita käytäntöjen oikeudellista hyväksyntää.

Vaiheen 6 Jussi-Pekan visuaalinen ja toiminnallinen katselmointi, palautteen korjaukset, domain/DNS/HTTPS-siirto, tuotannon palautussuunnitelma ja tuotantojulkaisu ovat goalin nimenomaisesti seuraavaan vaiheeseen rajaamaa työtä. Julkaisun jälkeiset analytiikka- ja sisältötehtävät pysyvät sen jälkeisinä.

## Käyttöön jäävät toimitukset

- Täysi paikallinen esikatselu: `http://127.0.0.1:3108`, uudelleenkäynnistys `npm run preview`.
- Branchin Vercel-esikatselu: `ESIKATSELU.md` sisältää varmennetun osoitteen ja sen rajaukset. Etusivu ja kirjautumissivulle ohjaus nähtiin kirjautuneella Vercel-istunnolla; ulkoista tunnuspolkua ei ole hyväksytty.
- Muokattava Word, Markdown-lähteet, liitteet ja kolme lähettämätöntä tarkistuspyyntöä kansiossa `valmistelu/tarkistuspaketti`.
- Käynnistys-, ylläpito-, tietosuoja-, riippuvuus- ja osoiteohjeet `valmistelu`-kansiossa. Laajempi tuotantoon asti ulottuva tehtävälista säilyy `JULKAISUSUUNNITELMA.md`-tiedostossa.

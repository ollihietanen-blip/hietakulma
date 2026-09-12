# Hietakulman verkkosivujen viimeistely

Päivitetty 12.9.2026. Perustuu paikalliseen koodiin ja tässä työssä tehtyihin testeihin. Tuotantopalvelun, DNS:n ja sähköpostitoimitusten tilaa ei ole vielä tarkistettu. Tämä on toteutussuunnitelma, ei vahvistus julkaisuvalmiudesta.

## Tavoite ja rajaus

Julkaistaan nykyiseen ulkoasuun perustuva sivusto, jonka yhteydenotot toimivat, sisällöt pitävät paikkansa ja tietopankin käyttöpolku on valmis. Uutta ulkoasusuunnittelua, blogia tai laajaa sisällöntuotantoa ei tarvita tähän julkaisuun.

Tietopankin aineistojen odottaminen ei estä muiden vaiheiden tekemistä. Jos aineistoja ei saada ajoissa, julkaisun laajuus päätetään erikseen: julkinen sivusto ja aineistopyyntö voidaan erottaa myöhemmin avattavasta portaalista. Rekisteröitymistä tyhjään tietopankkiin ei pidä pitää valmiina asiakaskokemuksena.

## Jo tehty paikallisesti

- [x] Yhteydenottolomakkeen sähköpostipalvelun virheenkäsittely ja palvelinvalidointi.
- [x] Lomakkeen tietojen säilyminen virheessä, näkyvä virheilmoitus ja uudelleenlähetys.
- [x] Yhteydenoton 16 palvelintestiä sekä simuloidut selainpolut tietokoneella ja mobiilissa.
- [x] Tietopankin 11 väärän PDF-linkin poisto; tilalle aineistopyyntö ja erillinen dokumenttiluettelo.
- [x] Tietopankin tyhjän tilan ja kirjautumisrajauksen selaintarkistus paikallisella testi-istunnolla.
- [x] Tuotantokooste, linttaus ja tyyppitarkistus läpi viimeisillä toiminnallisilla muutoksilla.

Portaalin rekisteröityminen, aktivointi, kirjautuminen, uloskirjautuminen ja salasanan palautus on testattu paikallisesti tietokoneella ja mobiilissa erillisellä testitietokannalla ja simuloidulla sähköpostipalvelulla. Oikea sähköpostitoimitus ja tuotantoympäristö ovat vielä varmentamatta.

## Versionhallinta ja välietapit

Työ tehdään haaralla `codex/julkaisuvalmistelu`. Jokaisesta valmiista, tarkistetusta työvaiheesta tehdään commit ja push GitHubiin, jotta välietapit säilyvät ja ovat tarkasteltavissa. Ensimmäinen välietappi kattaa portaalin ja yhteydenoton korjaukset sekä linkkien, kuvien ja hakukonetietojen viimeistelyn. Push tähän haaraan ei tarkoita tuotantojulkaisun hyväksymistä.

## 1. Portaali ja tuotannon tietokanta — ensimmäinen työvaihe

- [ ] Selvitä Vercelin nykyinen tuotantokonfiguraatio ja tietokannan pysyvyys. Prisma käyttää SQLitea; tuotannon ratkaisua ei ole varmennettu. Valitse tarvittaessa pysyvä tietokanta ja suunnittele tietojen siirto.
- [ ] Tarkista migraatiot, varmuuskopiointi ja palautettavuus.
- [ ] Selvitä Gitissä olevien `prisma/dev.db`- ja `prisma/prisma/dev.db`-tiedostojen tarkoitus ja sisältö. Älä poista tai siirrä niitä ennen selvitystä; varmista ettei oikeita käyttäjätietoja jaeta repossa tai julkaisupaketissa.
- [ ] Varmista kirjautumisen palvelinosoite-, salaisuus- ja luottamusasetukset. Aiemmassa paikallisessa tuotantoajossa tuli `UntrustedHost`; tuotannossa esiintymisestä ei ole näyttöä.
- [x] Korjaa aktivointiviestin lähetyksessä Resendin palauttaman `error`-arvon käsittely. Sekä palautettu virhe että poikkeus poistavat epäonnistuneen aktivointipyynnön ja sallivat uuden yrityksen; testattu erillisellä SQLite-tietokannalla.
- [x] Estä tuotannon aktivointilinkkien päätyminen localhostiin puuttuvan asetuksen vuoksi. Tuotanto edellyttää kelvollista HTTPS-alkuperäosoitetta ennen tietokantakirjoituksia.
- [x] Tarkista rekisteröitymisen ja kirjautumisen syötevalidointi, sähköpostin normalisointi ja toistuvien yritysten rajoitus. Yritysrajat tallennetaan tietokantaan ja rinnakkaiset yritykset on testattu; tuotannon verkkotason kuormitusrajoitus arvioidaan erikseen.
- [x] Testaa aktivointilinkin vanheneminen, uudelleenkäyttö ja samanaikaiset aktivoinnit sekä epäonnistuneen lähetyksen jälkeinen uusi yritys. Integraatiotestit käyttävät oikeaa Prismaa/SQLitea ja simuloitua sähköpostipalvelua. Linkin kulutus ja käyttäjän luonti tapahtuvat samassa transaktiossa.
- [x] Toteuta unohtuneen salasanan palautus. Palautuspyyntö, kertakäyttöinen 30 minuutin linkki, vanhojen istuntojen mitätöinti ja käyttöliittymä on toteutettu ja testattu.

Valmis, kun käyttäjä voi rekisteröityä, vastaanottaa aktivointiviestin, asettaa salasanan, kirjautua tietopankkiin, kirjautua ulos ja palauttaa pääsyn; tiedot säilyvät uuden julkaisun yli. Väärä tai vanhentunut tunnus ei avaa pääsyä.

## 2. Tietopankin dokumentit ja liitteet — omat luonnokset ja asiantuntijoiden päivitykset

- [x] Selvitä olemassa olevien dokumenttien lähdekansio luonnosten lähtöaineistoksi. Myynti/Detaljit-kansio ja vuoden 2025 NR-tuotannonvalvonnan käsikirja löytyivät; hyväksytyt asiakasversiot vahvistetaan asiantuntijoilta.
- [ ] Inventoi todelliset saatavilla olevat dokumentit. Aiemmat 11 otsikkoa ovat vain vanhan käyttöliittymän lista, eivät todiste aineistojen olemassaolosta.
- [ ] Laadi itse ensimmäiset luonnokset puuttuvista dokumenteista ja dokumentteihin tarvittavista liitteistä olemassa olevan aineiston pohjalta. Merkitse ne luonnoksiksi ja kirjaa puuttuvat tiedot sekä tarkistettavat tekniset kohdat näkyvästi.
- [ ] Kokoa luonnoksista tarkistuspaketti Villelle, Jormalle ja Tapanille. Liitä jokaiseen dokumenttiin tai liitteeseen selkeät kysymykset ja päivitystarpeet; heidän ei tarvitse aloittaa tyhjästä.
- [ ] Pyydä Villeltä, Jormalta ja Tapanilta luonnoksiin päivitykset ja täydennykset. Sovi vastuunjako dokumenttikohtaisesti.
- [ ] Yhdistä saadut päivitykset, ratkaise avoimet kohdat ja varmista lopullisten versioiden sisältö ennen tietopankkiin julkaisemista.
- [ ] Tarkista otsikko, sisältö, päiväys/versio ja jakeluun soveltuvuus. Älä julkaise hankekohtaisia piirustuksia yleisohjeina.
- [ ] Määritä latausten käyttöoikeus: jos aineistot ovat vain kirjautuneille, myös tiedostolataus tarkistaa istunnon; pelkkä sivun suojaus ei riitä.
- [ ] Lisää tiedostot hallittuun tallennukseen ja oikeat osoitteet `lib/content/documents.ts`-luetteloon.
- [ ] Testaa jokaisen dokumentin avautuminen, nimen vastaavuus, haku, suodatus ja mobiilikäyttö.

Selvitettävät aineistoryhmät: rakennetyypit ja liitosdetaljit, elementtien asennus, ristikoiden tuenta, sähkö-/LVI-ohjeet, tuote-esittelyt, suoritustasoilmoitukset ja materiaalierittelypohja. Julkaistaan vain oikeasti saatavilla oleva valikoima.

Valmis, kun dokumenttien ja liitteiden luonnokset on päivitetty Villen, Jorman ja Tapanin palautteen pohjalta, avoimet sisältökysymykset on ratkaistu, kaikki näkyvät lataukset avaavat oikean tarkistetun tiedoston ja pääsynhallinta vastaa sovittua käyttöä.

## 3. Yhteydenottojen todellinen toimitus — julkaisueste

- [ ] Tarkista tuotannon Resend-asetukset, lähettäjäosoite ja verkkotunnuksen määritykset.
- [ ] Tarkista tarjouspyyntöjen vastaanottaja ja vastausosoite.
- [ ] Lähetä erikseen sovittu testiviesti ja varmista saapuminen vastaanottajan postilaatikkoon. Tähän mennessä on käytetty vain simuloitua toimitusta.
- [ ] Varmista julkaistussa ympäristössä myös virheilmoitus ja uusi yritys.

Valmis, kun oikea testiyhteydenotto saapuu perille ja siihen vastaaminen menee asiakkaan osoitteeseen. Palvelun hyväksyntä ei yksin todista saapumista postilaatikkoon.

## 4. Sisältö, kuvat, linkit ja hakukonenäkyvyys

- [x] Korvaa footerin kaksi tyhjää some-linkkiä oikeilla osoitteilla. Facebook- ja Instagram-osoitteet varmennettu yrityksen nykyisen etusivun linkeistä 12.9.2026.
- [x] Siirrä viisi ulkoiseen Squarespace-kuvapalveluun viittaavaa henkilökuvaa omaan hallintaan. Alkuperäiset kuvat tallennettu muuttamattomina `public/images/henkilot`-kansioon; ulkoinen kuvapalvelumääritys poistettu.
- [x] Lisää sivustokuvake `app/icon.svg` ja `/favicon.ico`-uudelleenohjaus. Ei enää 404-virhettä.
- [x] Yhtenäistä yhteystiedot. Rakenteinen hakukonedata käyttää samaa yritystietolähdettä kuin sivusto. Vahvistamattomat koordinaatit, aukioloajat ja tarkka perustamisvuosi poistettu hakukonedatasta; kartta hakee osoitteella.
- [ ] Vahvista henkilöiden roolit, yhteystiedot, kohteiden tiedot sekä näkyvät avainluvut ja toimituslupaukset.
- [x] Tarkista sivukohtaiset otsikot, kuvaukset, jakoesikatselukuvat ja canonical-osoitteet. Julkisten sivujen yhteinen metadata-apuri lisätty; 17 sitemap-sivun vastaukset tarkistettu.
- [x] Tarkista sitemap ja indeksointi. Kirjautumista vaativa tietopankki poistettu sitemapista; tunnussivuilla ja tietopankissa noindex. Sitemap ei enää ilmoita keksittyä päivittäistä muokkausajankohtaa.
- [ ] Kokoa vanhojen sivuosoitteiden uudelleenohjaukset ennen verkkotunnuksen siirtoa.

Valmis, kun sivusto ei sisällä tyhjiä linkkejä, virheellisiä yhteystietoja tai vahvistamattomia sisältöväitteitä ja vanhojen osoitteiden tärkeät polut säilyvät.

## 5. Tietosuojakuvauksen ja ylläpidon täydentäminen

- [ ] Täydennä tietosuojaseloste vastaamaan todellista portaalin tietojen käsittelyä: käyttäjäprofiili, käyttötarkoitus, kirjautumistiedot ja markkinointivalinta puuttuvat nykyisestä pääosin yhteydenottoja kuvaavasta tekstistä.
- [ ] Vahvista säilytysajat, poistopyyntöjen käsittely ja vastuuhenkilö; toteuta sovitut käytännöt.
- [ ] Tarkista käytetyt ulkoiset palvelut, karttaupotus ja mahdollinen analytiikka sekä sovita sivun kuvaukset ja toiminta niihin. Varsinainen oikeudellinen arvio tehdään ajantasaisista lähteistä toteutusvaiheessa.
- [ ] Määritä, miten dokumentteja päivitetään ja käyttäjän käyttöoikeus poistetaan.

Valmis, kun sivuston kuvaus vastaa toteutusta ja ylläpitäjällä on toimiva tapa käsitellä aineistot ja käyttäjät.

## 6. Julkaisun valmistelu ja lopputarkistus

- [ ] Tarkista riippuvuuksien ajantasaisuus ja korjaa julkaisuun vaikuttavat tunnetut ongelmat ilman tarpeetonta versiouudistusta.
- [ ] Erottele toimitettavat muutokset työpuun vanhoista kuva-, video- ja väliaikaistiedostoista. Älä poista käyttäjän aineistoja siivouksen yhteydessä.
- [ ] Tee muutoksista selkeä commit ja tarkista julkaistava haara, Vercel-projekti ja tuotantoasetukset.
- [ ] Avaa esikatselu ja käy läpi kaikki julkiset sivut, navigaatio, lomakkeet, kohdesivut ja portaali tietokoneella sekä mobiilissa.
- [ ] Tarkista näppäimistökäyttö, kuvien/videoiden lataus, vaakavieritys, virhesivut ja olennaiset konsolivirheet.
- [ ] Kun tekniset korjaukset, sisällöt sekä dokumentit ja liitteet ovat valmiit Villen, Jorman ja Tapanin päivitysten jälkeen, kokoa koko sivusto esikatseluun Jussi-Pekka Koiviston katselmointia varten.
- [ ] Pyydä Jussi-Pekka Koivistolta tarkastelu sivuston visuaalisesta ilmeestä ja yleisestä toimivuudesta: ulkoasun yhtenäisyys, selkeys, navigaatio, mobiilikäyttö, yhteydenotto ja tietopankin käyttöpolku.
- [ ] Kirjaa Jussi-Pekan palaute, toteuta sovitut korjaukset ja tarkista niiden toimivuus ennen julkaisua.
- [ ] Varmista domain, DNS, HTTPS ja vanhan sivuston korvaaminen sekä palautus edelliseen julkaisuun.
- [ ] Julkaise sovittu versio ja toista tärkeimmät tarkistukset oikeassa tuotanto-osoitteessa.

Valmis, kun Jussi-Pekka Koiviston katselmointi on tehty ja sovitut korjaukset on toteutettu, sovittu sivusto toimii oikeassa verkkotunnuksessa, lomakkeet ja sovittu portaalipolku on testattu siellä ja palautustapa on selvillä.

## Julkaisun jälkeen

Analytiikan ja Search Consolen käyttöönotto, hakukonetulosten seuranta, uudet referenssit, asiakastarinat ja mahdollinen ajankohtaista-osio. Nämä eivät ole nykyisen sivuston ensimmäisen julkaisun edellytys.

## Seuraava konkreettinen askel

Aloita vaiheesta 1: tarkista tuotannon tietokanta ja kirjautumisen asetukset, korjaa aktivointiviestin virheenkäsittely ja testaa koko tunnuksen luontipolku. Tämän rinnalla selvitetään lähdeaineistot ja laaditaan tarvittavista dokumenteista ja liitteistä omat luonnokset, joihin pyydetään sen jälkeen päivitykset Villeltä, Jormalta ja Tapanilta.

## Työtilanne 12.9.2026: portaalin ensimmäiset korjaukset

- Vercel-liitin palautti `UNAUTHORIZED / Reauthentication required`. Tuotantoasetusten lukeminen edellyttää liittimen uudelleenkirjautumista; tuotantoa ei ole muutettu.
- Molempien Gitissä olevien paikallisten SQLite-tietokantojen User-tauluissa oli tarkistushetkellä 0 käyttäjää. Uudemmassa tietokannassa oli myös 0 rekisteröitymispyyntöä. Historiallista sisältöä ei ole tarkastettu.
- Rekisteröityminen tarkistaa sähköpostin, roolin, pakolliset kentät ja tuotannon aktivointiosoitteen. Kirjautuminen normalisoi sähköpostin ja hylkää vääräntyyppiset tunnistetiedot.
- Uusien salasanojen enimmäispituus vastaa bcryptin 72 tavun rajaa, jotta salasanaa ei katkaista hiljaisesti.
- `npm test` ajaa yhteydenoton ja portaalin palvelin-/integraatiotestit. Testit eivät lähetä oikeita sähköposteja eivätkä käytä projektin omia tietokantoja.
- Aktivointikorjausten jälkeen toteutettiin myös salasanan palautus, yritysrajoitus ja uloskirjautumispainike. Tuotannon pysyvä tietokanta ja ulkoiset asetukset ovat edelleen varmistamatta.

### Salasanan palautus ja täydellinen selainpolku

- Salasanan palautus ja tietokantaan perustuvat sähköpostikohtaiset yritysrajat on toteutettu. Migraatio: `20260912160000_password_reset_and_rate_limits`.
- `npm test`: 37 testitulosta hyväksytty; mukana oikea Prisma/SQLite, kertakäyttöisyys, vanheneminen, palautuksen jälkeinen vanhan salasanan ja istunnon mitätöinti sekä rinnakkaiset yritysrajat.
- Tuotantokooste hyväksytty. Selainpolku hyväksytty Chrome/Playwrightissa 1440 × 1000 ja 390 × 844 koossa: rekisteröityminen → aktivointi → suojattu tietopankki → uloskirjautuminen → palautuspyyntö → salasanan vaihto → kirjautuminen uudella salasanalla.
- Selainajossa käytettiin `/tmp/hietakulma-portal-preview.db`-testitietokantaa ja paikallisesti talteen otettuja testiviestejä. Oikeita sähköposteja ei lähetetty. Lähetyspalvelun tuotantotoimitusta tämä ei todenna.
- Selainajon skripti: `/tmp/hietakulma-full-portal-qa.cjs`. Kuvakaappaukset: `/tmp/hietakulma-reset-success-1440.png` ja `/tmp/hietakulma-reset-success-390.png`. Aiemmin havaittu favicon 404 korjattiin myöhemmässä linkkien ja metatietojen välietapissa.
- Prisma lukee nyt `.env.local`-tiedoston; README sisältää tietokannan alustuksen ja testauksen komennot. Projektin olemassa oleviin SQLite-tiedostoihin ei ole ajettu uutta migraatiota tässä testissä.

### Lähdehavainto dokumenttiluonnoksia varten

Yrityksen nykyisellä kattoristikkosivulla https://hietakulma.fi/kattoristikot on 12.9.2026 tarkistettaessa seuraavat lähteet:
- Sertifikaatti 2412-CPD-215: https://hietakulma.fi/download_file/115/182
- NR-suoritustasoilmoitus: https://hietakulma.fi/download_file/116/182 (PDF:n päiväys 1.7.2013; voimassaolo ja nykyinen versio tarkistettava Jormalta/Ollilta).
- NR-rakenteiden asennus- ja tuentaohje: https://hietakulma.fi/download_file/117/182 (noin 14,7 MB; verkkolukija ei avannut tiedostoa kokorajan vuoksi).
Nämä ovat lähde-ehdokkaita tarkistuspakettiin. Niitä ei ole lisätty uusina vahvistettuina latauksina tietopankkiin.

### Linkkien, kuvien ja hakukonetietojen tarkistus

- Lähde yhteystiedoille ja henkilöiden rooleille: https://hietakulma.fi/ota-yhteytta (tarkistettu 12.9.2026). Some-linkit löytyivät https://hietakulma.fi/ -sivun HTML:stä.
- Lisätty vanhojen pääsivujen ja tarjouspyyntösivujen uudelleenohjaukset. Yksittäisten vanhojen referenssisivujen vastaavuudet ovat vielä inventoitava ennen tuotantojulkaisua.
- Tuotantokooste hyväksytty. Julkisten sivujen selainajo hyväksytty 1440 × 1000 ja 390 × 844 koossa: etusivu, puutalot, puuelementit, kohteet ja yhteystiedot. Ei vaakavieritystä, framework-virhenäkymiä tai konsolivirheitä; kaikki viisi paikallista henkilökuvaa latautuivat.
- HTTP-tarkistus: 17 julkista sitemap-sivua vastasi 200 ja sisälsi canonical- ja jakamiskuvatiedot; seitsemän uudelleenohjausta sekä viiden tunnussivun noindex tarkistettu.
- QA-skripti `/tmp/hietakulma-public-qa.cjs`; kuvakaappaukset `/tmp/hietakulma-contacts-local-1440.png` ja `/tmp/hietakulma-contacts-local-390.png`.

### Dokumenttipaketin ensimmäiset luonnokset

- `valmistelu/tarkistuspaketti/README.md` kokoaa kaikkien 11 aiemman dokumenttinimikkeen kattavuuden ja ehdotetut tarkistajat. Paketti on keskeneräinen, ei asiakasjakelussa.
- `LAHTEET.md` erottaa tiedostolistauksella löydetyt aineistot todella luetuista lähteistä. Detaljikansiossa 44 rakenne-PDF:ää, kaksi LAM-tiedostoa ja yksi tekninen PDF. AP-US_198 ja US_198-YP_pelti luettiin kuvina; niiden päiväys ja revisio ovat tyhjät.
- `01-seinarakenteet.md` sisältää lähteeseen perustuvan 198 mm rakenteen kuvauksen, avoimen 248 mm rakennetyypin, liitosliiteluettelon ja Villen tarkistuskysymykset. 223- ja 198+48-piirustuksia ei tulkita 248 mm rakenteeksi.
- `02-materiaalierittely.md` sisältää esitäytetyt materiaaliryhmät, hankekohtaiset täydennyskentät, toimitusrajaliitteen ja muutosten käsittelyehdotuksen Villelle ja Tapanille.
- Vuoden 2025 käsikirjan tekstissä oleva DoP on päivätty 14.6.2025, julkisella sivustolla oleva versio 1.7.2013. Jorma/Olli vahvistavat hyväksytyn asiakasversion ja nykyisen sertifikaatin. Sisäistä käsikirjaa ei kopioida Git-repositorioon.
- Seuraavaksi laaditaan loput tuote-, asennuksen valmistelu-, talotekniikka-, verhous- ja NR-aineistojen luonnokset sekä varsinaiset tarkistuspyynnöt. Word-versiot tuotetaan ja tarkistetaan sisällön valmistuttua.

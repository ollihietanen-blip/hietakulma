# Hietakulman verkkosivujen viimeistely

Päivitetty 12.9.2026. Ensimmäisen vaiheen tekninen esikatselu ja asiantuntijoiden luonnospaketti on tarkistettu; vaatimuskohtainen näyttö on tiedostossa `valmistelu/ENSIMMAISEN-VAIHEEN-KATSELMOINTI.md`. Jatkovaiheessa Neon-Preview-kanta, Auth-asetukset ja rajattu Resend-lähetys on otettu käyttöön. Aktivointi- ja palautusviestit on toimitettu luvalla Ollin Gmailiin; molemmat päätyivät roskapostiin. Ajantasainen näyttö ja rajaukset ovat tiedostossa `valmistelu/PREVIEW-KAYTTOONOTTO.md`. DNS-siirtoa tai tuotantoasetusten muutoksia ei ole tehty. Tämä suunnitelma ulottuu myös myöhempään tuotantojulkaisuun, jonka avoimet ruudut säilyvät avoimina.

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

Portaalin rekisteröityminen, aktivointi, kirjautuminen, uloskirjautuminen ja salasanan palautus on testattu paikallisesti tietokoneella ja mobiilissa erillisellä testitietokannalla ja simuloidulla sähköpostipalvelulla. Ulkoisessa esikatselussa oikeat aktivointi- ja palautusviestit sekä API-tason tunnuspolku on lisäksi testattu. Ulkoisen ympäristön koko selainpolku molemmilla näyttökoilla ja tuotantoympäristö ovat vielä varmentamatta.

## Versionhallinta ja välietapit

Jatkovaiheessa PostgreSQL:n schema, migraatio, provider-kytkentä, 21 portaalitestitulosta, 8 ylläpitotestitulosta, varmuuskopion palautus ja koko tunnuspolun selainkoe on toteutettu ja tarkistettu paikallisesti. Ulkoisen käyttöönoton täsmälliset asetukset, testausjärjestys ja odottavat luvat löytyvät tiedostosta `valmistelu/PREVIEW-KAYTTOONOTTO.md`. Neon on perustettu ja migroitu, käyttäjätiedot säilyivät uuden deploymentin yli ja testitilin sähköpostipolku toimi. Ulkoisen kannan erillinen varmuuskopio-/palautuskoe, koko ulkoinen mobiilikoe ja asiantuntijapalautteet ovat avoinna.

Työ tehdään haaralla `codex/julkaisuvalmistelu`. Jokaisesta valmiista, tarkistetusta työvaiheesta tehdään commit ja push GitHubiin, jotta välietapit säilyvät ja ovat tarkasteltavissa. Ensimmäinen välietappi kattaa portaalin ja yhteydenoton korjaukset sekä linkkien, kuvien ja hakukonetietojen viimeistelyn. Push tähän haaraan ei tarkoita tuotantojulkaisun hyväksymistä.

## 1. Portaali ja tuotannon tietokanta — ensimmäinen työvaihe

- [ ] Viimeistele ulkoisen tietokannan käyttöönotto: Neon-Preview-kanta on perustettu, migroitu ja sovelluskäytössä; käyttäjätietojen pysyvyys uuden deploymentin yli on todennettu. Suora ylläpitoyhteys ja ulkoisen kannan palautuskoe ovat avoinna. Tuotannon ratkaisua ei ole hyväksytty. Paikallisia testitilejä ei siirretä esikatselukantaan.
- [ ] Viimeistele migraatioiden, varmuuskopioinnin ja palautettavuuden ulkoinen tarkistus. SQL-editorin migraatio ja historiarivi tarkistettu; suora Prisma-status/diff sekä Neon-kannasta otetun varmuuskopion palautus erilliseen kantaan puuttuvat. Paikallinen PostgreSQL-palautuskoe on läpäissyt.
- [x] Selvitä Gitissä olevien `prisma/dev.db`- ja `prisma/prisma/dev.db`-tiedostojen tarkoitus ja sisältö. Nykyiset tiedostot ja kaikki niitä muuttaneiden commitien versiot tarkistettu: vain migraatiotietoja, 0 käyttäjää ja 0 rekisteröitymispyyntöä. Tiedostot poistettu Git-seurannasta ja lisätty ignoreen; paikalliset tiedostot säilytetty muuttamattomina.
- [x] Varmista Preview-branchin kirjautumisen palvelinosoite-, salaisuus- ja luottamusasetukset. Auth-palvelu palauttaa vakaan HTTPS-branch-aliaksen; oikea kirjautuminen, istunto ja uloskirjautuminen on testattu. Tuotannon asetukset vahvistetaan erikseen ennen julkaisua.
- [ ] Varmista vastaavat Auth-asetukset tuotantoympäristössä erikseen hyväksytyn käyttöönoton yhteydessä.
- [x] Korjaa aktivointiviestin lähetyksessä Resendin palauttaman `error`-arvon käsittely. Sekä palautettu virhe että poikkeus poistavat epäonnistuneen aktivointipyynnön ja sallivat uuden yrityksen; testattu erillisellä SQLite-tietokannalla.
- [x] Estä tuotannon aktivointilinkkien päätyminen localhostiin puuttuvan asetuksen vuoksi. Tuotanto edellyttää kelvollista HTTPS-alkuperäosoitetta ennen tietokantakirjoituksia.
- [x] Tarkista rekisteröitymisen ja kirjautumisen syötevalidointi, sähköpostin normalisointi ja toistuvien yritysten rajoitus. Yritysrajat tallennetaan tietokantaan ja rinnakkaiset yritykset on testattu; tuotannon verkkotason kuormitusrajoitus arvioidaan erikseen.
- [x] Testaa aktivointilinkin vanheneminen, uudelleenkäyttö ja samanaikaiset aktivoinnit sekä epäonnistuneen lähetyksen jälkeinen uusi yritys. Integraatiotestit käyttävät oikeaa Prismaa/SQLitea ja simuloitua sähköpostipalvelua. Linkin kulutus ja käyttäjän luonti tapahtuvat samassa transaktiossa.
- [x] Toteuta unohtuneen salasanan palautus. Palautuspyyntö, kertakäyttöinen 30 minuutin linkki, vanhojen istuntojen mitätöinti ja käyttöliittymä on toteutettu ja testattu.

Valmis, kun käyttäjä voi rekisteröityä, vastaanottaa aktivointiviestin, asettaa salasanan, kirjautua tietopankkiin, kirjautua ulos ja palauttaa pääsyn; tiedot säilyvät uuden julkaisun yli. Väärä tai vanhentunut tunnus ei avaa pääsyä.

## 2. Tietopankin dokumentit ja liitteet — omat luonnokset ja asiantuntijoiden päivitykset

- [x] Selvitä olemassa olevien dokumenttien lähdekansio luonnosten lähtöaineistoksi. Myynti/Detaljit-kansio ja vuoden 2025 NR-tuotannonvalvonnan käsikirja löytyivät; hyväksytyt asiakasversiot vahvistetaan asiantuntijoilta.
- [ ] Inventoi todelliset saatavilla olevat dokumentit. Aiemmat 11 otsikkoa ovat vain vanhan käyttöliittymän lista, eivät todiste aineistojen olemassaolosta.
- [x] Laadi itse ensimmäiset luonnokset puuttuvista dokumenteista ja dokumentteihin tarvittavista liitteistä olemassa olevan aineiston pohjalta. Merkitse ne luonnoksiksi ja kirjaa puuttuvat tiedot sekä tarkistettavat tekniset kohdat näkyvästi.
- [x] Kokoa luonnoksista tarkistuspaketti Villelle, Jormalle ja Tapanille. Liitä jokaiseen dokumenttiin tai liitteeseen selkeät kysymykset ja päivitystarpeet; heidän ei tarvitse aloittaa tyhjästä.
- [ ] Pyydä Villeltä, Jormalta ja Tapanilta luonnoksiin päivitykset ja täydennykset. Dokumenttikohtaiset vastuut on yksilöity kolmessa Gmail-luonnoksessa, joissa on Word-paketti ja lähdeluettelo liitteinä. Lähetyslupa odottaa; pyyntöjä ei ole lähetetty.
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
- [ ] Lähetä erikseen sovittu testiviesti ja varmista saapuminen vastaanottajan postilaatikkoon. Yhteydenottoa on testattu vain simuloidulla toimituksella. Ollin Gmailiin hyväksytyt aktivointi- ja palautusviestit eivät korvaa tätä koetta. Resendin testilähettäjä rajoittuu tilinomistajan osoitteeseen; oman domainin DNS-varmennus tehdään käyttäjän ilmoituksen mukaan julkaisun yhteydessä.
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
- [ ] Kokoa vanhojen sivuosoitteiden uudelleenohjaukset ennen verkkotunnuksen siirtoa. Pääsivujen ohjaukset toteutettu; kahdeksan vanhaa referenssiä ja PDF-osoitteet kartoitettu `valmistelu/VANHAT-OSOITTEET.md`-tiedostoon. Kohdevastaavuudet ja vanhojen tarinoiden säilyttäminen vahvistetaan ennen domain-siirtoa.

Valmis, kun sivusto ei sisällä tyhjiä linkkejä, virheellisiä yhteystietoja tai vahvistamattomia sisältöväitteitä ja vanhojen osoitteiden tärkeät polut säilyvät.

## 5. Tietosuojakuvauksen ja ylläpidon täydentäminen

- [x] Täydennä tietosuojaseloste vastaamaan portaalin toteutusta. Profiili, käyttötarkoitus, kirjautumistiedot ja markkinointivalinta lisätty; sivu säilyy luonnoksena oikeudellisten ja säilytyspäätösten vahvistamiseen asti.
- [ ] Vahvista säilytysajat, poistopyyntöjen käsittely ja vastuuhenkilö; toteuta sovitut käytännöt.
- [ ] Tarkista käytetyt ulkoiset palvelut, karttaupotus ja mahdollinen analytiikka sekä sovita sivun kuvaukset ja toiminta niihin. Varsinainen oikeudellinen arvio tehdään ajantasaisista lähteistä toteutusvaiheessa.
- [x] Määritä, miten dokumentteja päivitetään ja käyttäjän käyttöoikeus poistetaan. Asiakirjojen hyväksyntä-/versiomenettely kuvattu; käyttäjien ylläpitokomennot toteutettu ja testattu. Tuotannon käyttäjäroolit ja tiedostotallennus vahvistetaan ennen käyttöönottoa.

Valmis, kun sivuston kuvaus vastaa toteutusta ja ylläpitäjällä on toimiva tapa käsitellä aineistot ja käyttäjät.

## 6. Julkaisun valmistelu ja lopputarkistus

- [x] Tarkista riippuvuuksien ajantasaisuus ja korjaa julkaisuun vaikuttavat tunnetut ongelmat ilman tarpeetonta versiouudistusta. Next 15.5.25 / React 19, korjatut välilliset riippuvuudet ja 0 audit-havaintoa; tarkistukset kuvattu `valmistelu/RIIPPUVUUSPAIVITYS.md`-tiedostossa.
- [x] Erottele toimitettavat muutokset työpuun vanhoista kuva-, video- ja väliaikaistiedostoista. Älä poista käyttäjän aineistoja siivouksen yhteydessä.
- [x] Tee muutoksista selkeä commit ja tarkista haara, Vercel-projekti ja asetukset. Branchin Preview-deploymentit ja käyttöönotetut ympäristöasetukset varmennettu; tuotantokonfiguraatiota ei muutettu.
- [x] Avaa esikatselu ja käy läpi kaikki julkiset sivut, navigaatio, lomakkeet, kohdesivut ja portaali tietokoneella sekä mobiilissa. Täysi koe tehty eristetyssä paikallisessa tuotantokoosteessa myös puhtaasta Git-aineistosta.
- [x] Tarkista näppäimistökäyttö, kuvien/videoiden lataus, vaakavieritys, virhesivut ja olennaiset konsolivirheet. Näissä kokeissa havaitut valikon ja vähennetyn liikkeen virheet korjattu ja testattu uudelleen.
- [ ] Kun tekniset korjaukset, sisällöt sekä dokumentit ja liitteet ovat valmiit Villen, Jorman ja Tapanin päivitysten jälkeen, kokoa koko sivusto esikatseluun Jussi-Pekka Koiviston katselmointia varten.
- [ ] Pyydä Jussi-Pekka Koivistolta tarkastelu sivuston visuaalisesta ilmeestä ja yleisestä toimivuudesta: ulkoasun yhtenäisyys, selkeys, navigaatio, mobiilikäyttö, yhteydenotto ja tietopankin käyttöpolku.
- [ ] Kirjaa Jussi-Pekan palaute, toteuta sovitut korjaukset ja tarkista niiden toimivuus ennen julkaisua.
- [ ] Varmista domain, DNS, HTTPS ja vanhan sivuston korvaaminen sekä palautus edelliseen julkaisuun.
- [ ] Julkaise sovittu versio ja toista tärkeimmät tarkistukset oikeassa tuotanto-osoitteessa.

Valmis, kun Jussi-Pekka Koiviston katselmointi on tehty ja sovitut korjaukset on toteutettu, sovittu sivusto toimii oikeassa verkkotunnuksessa, lomakkeet ja sovittu portaalipolku on testattu siellä ja palautustapa on selvillä.

## Julkaisun jälkeen

Analytiikan ja Search Consolen käyttöönotto, hakukonetulosten seuranta, uudet referenssit, asiakastarinat ja mahdollinen ajankohtaista-osio. Nämä eivät ole nykyisen sivuston ensimmäisen julkaisun edellytys.

## Seuraava konkreettinen askel

Seuraavassa vaiheessa Olli käy valmiin luonnospaketin ja lähettämättömät tarkistuspyynnöt läpi. Villeltä, Jormalta ja Tapanilta pyydetään päivitykset erillisellä lähetysluvalla. Ulkoista portaalia varten valitaan pysyvä tietokanta ja konfiguroidaan puuttuvat Auth- ja Resend-asetukset. Asiantuntijapäivitysten jälkeen pyydetään Jussi-Pekka Koiviston katselmointi. Tuotantojulkaisu päätetään erikseen.

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

### Luonnospaketin tekstisisältö täydennetty

- Dokumentit 03–06 sisältävät asennuksen valmistelun ja vastaanoton, sähkövalmiuden ja talotekniikan, tuotevalikoiman ja verhousten sekä NR-toimitusasiakirjojen luonnokset. Mukana yhdeksän nimettyä liitettä V1–V2, T1–T2, U1–U2, N1–N2 ja D1 sekä seinäelementtien asiakirjaselvitys D2.
- Dokumentti 07 sisältää erilliset tarkistuspyynnöt Villelle, Jormalle ja Tapanille. Niitä ei ole lähetetty.
- Kaikki 11 aiempaa tietopankkinimikettä on katettu luonnosten kattavuustaulukossa. Tämä ei tarkoita, että hyväksytyt tekniset ohjeet tai tuoteilmoitukset olisivat valmiit.
- Seuraava työ on Word-versioiden muodostaminen, kaikkien sivujen visuaalinen tarkistus ja paketin lopullinen laaduntarkistus.

### Muokattava tarkistuspaketti valmis

- `valmistelu/tarkistuspaketti/Hietakulma-tarkistuspaketti-luonnos.docx`: 20 sivua, 18 taulukkoa. Sisältää lähteet, seitsemän numeroidun asiakirjan sisällöt, liitteet ja kolme lähettämätöntä tarkistuspyyntöä.
- Word-kooste renderöity ja sivut tarkistettu. Korjattu otsikon ylimääräinen viiva, materiaalierittelyn lähes tyhjä jatkosivu, vastaanottolomakkeen sarakeleveydet ja tarkistuspyyntöjen sivunvaihdot. Viimeisen renderöinnin muuttumattomat sivusisällöt varmennettiin pikselivertailulla aiemmin tarkistettuihin sivuihin ja muuttuneet sivut luettiin uudelleen.
- Kaikkien Markdown-lähdetekstien mukanaolo Wordissa tarkistettu ohjelmallisesti. QA-renderöinti: `/tmp/hietakulma-docx-verified`. Word-tiedoston SHA256: `756f72e0b2a8c35040ce4fffc9614866a59f307d6394c859442e35eb07a035f2`.
- Toistettava muodostusskripti: `valmistelu/muodosta_tarkistuspaketti.py` (python-docx). Sisältömuutoksen jälkeen Word on muodostettava ja sivut tarkistettava uudelleen.
- Tämä päättää ensimmäisten dokumenttiluonnosten kokoamisen. Hyväksytyt tekniset piirustukset, voimassa olevat tuoteilmoitukset ja asiantuntijoiden päivitykset ovat edelleen seuraavan vaiheen tehtäviä.
- Goalin teknisestä osuudesta jäljellä tietosuojan ja ylläpidon täydentäminen, riippuvuustarkistus, lopullinen esikatselu ja kattava lopputarkistus; ulkoisen ympäristön asetukset ovat edelleen varmentamatta.

### Tietosuojaluonnos ja kartan latausvalinta

- Tietosuojasivu kuvaa nyt yhteydenottojen lisäksi portaalin profiilin, kirjautumistiedot, markkinointivalinnan, palautuspyynnöt ja yritysrajoitukset. Luonnosmerkintä säilyy, koska oikeusperusteet, säilytysajat ja palvelusopimukset ovat vahvistamatta.
- Poistettu vahvistamattomat lupaukset kahden vuoden poistamisesta, kaikille evästeille selaimen sulkemisessa tapahtuvasta poistosta ja toteutuneista kansainvälisten siirtojen suojatoimista. Rekisteröitymisen pakollinen valinta on nyt tutustumiskuittaus.
- Google-kartta ladataan vain käyttäjän valinnasta; sen voi sulkea ja valinta ei säily seuraavalle sivulataukselle. Osoite on nähtävissä ilman Google-yhteyttä.
- `valmistelu/TIETOSUOJA-JA-YLLAPITO.md` sisältää toteutukseen perustuvan tietovirta- ja säilytystaulukon, päätettävät asiat ja ylläpitomenettelyn luonnoksen. Ylläpitokomennot ja niiden testaus ovat vielä tekemättä.
- Build hyväksytty. Chrome-selainkoe 390 ja 1440 px: ei karttapyyntöä ennen valintaa, näppäimistöllä lataus, sulkeminen ja uudelleenlatauksen oletustila oikein. Tietosuojasivu ei aiheuta vaakavieritystä. Google-vastaus simuloitiin testissä. Skripti `/tmp/hietakulma-privacy-qa.cjs`.
- Riippuvuustarkistus tuotti 30 audit-merkintää. Niiden arviointi ja korjaaminen on seuraava tekninen työvaihe; tarkistus ei vielä täytä riippuvuuksien korjauskohtaa.

### Riippuvuuksien korjattu välietappi

- Edellisen kohdan 30 audit-havaintoa korjattu: nykyinen `npm audit` ilmoittaa 0 haavoittuvuutta. Next 15.5.25, React 19.3.0, Prisma 6.19.3 ja NextAuth beta.32; kaksi perusteltua välillisen riippuvuuden override-määritystä kuvattu erikseen.
- Node 24.19.0: Prisma-generointi, neljän migraation ajo erilliseen tyhjään SQLite-tiedostoon, 37 testiä ja tuotantokooste hyväksytty. Olemassa olevia projektin tietokantoja ei muutettu.
- Portaalin koko selainpolku, yhteydenoton virhetilanteet ja uudelleenyritys sekä julkinen ja tietosuojan QA läpäisivät uudelleen 1440 ja 390 px koossa. Oikeita sähköposteja ei lähetetty.
- Seuraavat riippumattomat työt: toistettavat ylläpito- ja esikatselutyökalut sekä kattava loppukatselmointi. Ulkoisen ympäristön asetukset ja varsinaisen sähköpostitoimituksen testaus ovat edelleen avoinna.

### Ylläpitotyökalut ja palautusharjoitus

- `scripts/portal-admin.cjs`: käyttäjätietojen vienti ilman salasana-/token-tiivisteitä, markkinointivalinnan peruutus myös odottavista aktivoinneista, istuntojen mitätöinti, tilin ja sen pyyntöjen poisto sekä vanhentuneiden pyyntöjen siivous erikseen valittavalla aikarajalla.
- Tietokanta on annettava eksplisiittisenä absoluuttisena polkuna. Muutoskomennot ovat oletuksena kuivaharjoittelua; toteutus edellyttää `--apply`-valintaa. Automaattista säilytysaikaa tai ajastusta ei otettu käyttöön.
- `scripts/sqlite-snapshot.py`: yhtenäinen SQLite-varmuuskopio ja palautus uuteen tiedostoon. Eheys ja vierasavaimet tarkistetaan, olemassa olevaa kohdetta ei ylikirjoiteta.
- `valmistelu/YLLAPITOKOMENNOT.md`: käyttöohjeet, palautusmenettely, tietosuojapyynnön rajaus ja tuotantoympäristössä ratkaistavat asiat.
- Node 24: kaikki 46 testiä hyväksytty. Uudet testit kattavat todellisen SQLite-aineiston kohdennetut muutokset, kuiva-ajon, viennin salaisuuksien rajauksen, vanhenemisrajan sekä WAL-tilassa olevan tietokannan varmuuskopion lukemisen palautuksen jälkeen Prismaan. Projektin tietokantoja ei muutettu.
- Seuraavaksi toistettava esikatselu ja sivuston kattava loppukatselmointi. Tuotannon pysyvyyttä tai ulkoisia palveluasetuksia paikallinen palautusharjoitus ei todenna.

### Toistettava paikallinen esikatselu

- `npm run preview` generoi Prisma Clientin, ajaa migraatiot omaan testitietokantaan, rakentaa sivuston omaan kooste-hakemistoon ja käynnistää osoitteen `http://127.0.0.1:3108`. Testitiedot säilyvät uudelleenkäynnistykseen. `.local-preview` on rajattu pois Gitistä.
- Sähköpostipalvelu korvataan käynnistyksessä paikallisella talteenotolla ja kelpaamattomalla testiavaimella. `npm run preview:mails` näyttää paikalliset aktivointi- ja palautuslinkit. Oikeita viestejä ei lähetetty.
- `npm run test:browser` on nyt repossa ylläpidettävä koe. Se tarkistaa esikatselutunnisteen ennen toimia. Hyväksytty: kaikki 17 julkista sitemap-sivua 1440 ja 390 px koossa, metatiedot, ohjaukset, noindex, koko portaalipolku, yhteydenoton virhetilanteet ja kartan latausvalinta.
- Kaikki 46 palvelin-/ylläpitotestiä hyväksytty; audit 0 haavoittuvuutta. Playwright lisätty kehitysriippuvuudeksi. Selainkoe käyttää asennettua Google Chromea, koska Browser-pluginia ei ollut käytettävissä.
- Kattoristikkosivun väärä lupaus tietopankista löytyvästä suoritustasoilmoituksesta korvattu yhteydenottopyynnöllä. Kohta tarkistettu myös mobiilin kuvakaappauksesta.
- GitHub vahvistaa Vercelin esikatselukoosteiden valmistumisen, mutta tarkistettu ulkoinen osoite ohjasi Vercelin kirjautumiseen. Ulkoisen ympäristön käyttäjäpolkuja ei pidetä tämän perusteella testattuina. Tarkempi käyttöohje ja rajoitukset: `valmistelu/ESIKATSELU.md`.
- Jäljellä loppukatselmoinnista navigaation ja näppäimistökäytön syvemmät kokeet, kuvien/videoiden kattava tarkistus, vanhojen referenssiosoitteiden kartoitus sekä koko goalia vasten tehtävä vaatimuskohtainen tarkastus.

### Navigaatio, mediat ja kehitystietokannat

- Mobiilivalikon sarkainkohdistus pääsi aiemmin taustasivulle ja työpöytäkokoon siirtyminen jätti vierityksen lukkoon. Valikko käyttää nyt selaimen dialogia, sarkainkierto pysyy sen sisällä, Escape palauttaa kohdistuksen ja työpöytäkokoon siirtyminen sulkee valikon sekä vapauttaa vierityksen.
- `npm run test:navigation` hyväksytty 390 ja 1440 px koossa: valikon avaus ja sulkeminen näppäimistöllä, kohdistus molempiin suuntiin, koon vaihto, päälinkit, kohdesuodattimet ja kohdesivulle siirtyminen. Mobiilivalikon kuvakaappaus tarkistettu.
- `npm run test:media` hyväksytty: 17 sivua, 165 näkyvää kuvaesiintymää kummassakin näyttökoossa, 95 erillistä Gitissä olevaa mediaresurssia, 23 sisäistä linkkiä/ankkuria ja puuttuvien sivujen 404-vastaukset. Kuvat dekoodattiin selaimessa; molempien taustavideoiden toisto tarkistettiin työpöydällä. Mobiilissa ei lähtenyt videopyyntöjä.
- Vähennetyn liikkeen kokeessa löydetty tyylisääntöjen ristiriita korjattu: videot piiloutuvat ja taustakuvan animaatio poistuu asetuksen ollessa käytössä. Korjauksen jälkeinen mediakoe hyväksytty.
- Molempien kehitystietokantojen historialliset versiot tarkistettiin commitien `63c20e2` ja `840af91` tiloissa. Niissä oli vain migraatiotietoja, 0 User-riviä ja uudemmassa 0 RegistrationRequest-riviä. Paikalliset tiedostot säilyivät, mutta ne poistettiin Git-seurannasta; tuore kehitystietokanta luodaan migraatioista.
- `valmistelu/VANHAT-OSOITTEET.md` kokoaa vanhan sivuston kahdeksan erillistä referenssipolkua ja PDF-osoitteet. Vahvistamattomia kohdevastaavuuksia ei muutettu arvatuiksi ohjauksiksi; säilytysratkaisu kuuluu domain-siirron valmisteluun.
- Ennen esikatselun uudelleenrakennusta luotu testitili kirjautui edelleen onnistuneesti sen jälkeen. Paikallisen esikatselun tietojen säilyminen uudelleenkäynnistyksessä on siten testattu.
- Jäljellä ensimmäisestä vaiheesta: tarkistus puhtaasta Git-aineistosta ja vaatimuskohtainen valmistumiskatselmointi. Ulkoisen ympäristön asetukset ja ihmisten hyväksynnät kirjataan jatkovaiheen avoimiksi kohdiksi.

### Puhtaan version loppukatselmointi ja lähdepäivitys

- Commitin `df05d8c` Git-arkisto purettiin erilliseen hakemistoon ilman työtilan asetuksia, tietokantoja tai ylimääräisiä kuvia. Node 24:n `npm ci`, 46 testiä, migraatiot ja tuotantokooste onnistuivat. Portin 3110 eristetty selainkoe kattoi julkiset sivut, portaalin, yhteydenoton, kartan ja navigaation molemmissa näyttökoissa.
- Vercelin selainistunto mahdollisti asetusten tarkistuksen liittimen virheestä huolimatta. Project- ja Shared-muuttujat puuttuvat, Storage-luettelo on tyhjä ja Domains-näkymässä näkyy vain `hietakulma.vercel.app`. Branchin etusivu ja tietopankista kirjautumissivulle ohjaus nähtiin; ulkoista tunnuspolkua tai sähköpostitoimitusta ei väitetä toimiviksi.
- V03:n 11-sivuisen NR-PDF:n sivut 1, 10 ja 11 luettiin kuvina. Ohjeen ja lomakkeen näkyvä päiväys on 15.4.2008. Havainto lisättiin lähteisiin ja N2-liitteeseen. Word päivitettiin ja renderöitiin: edelleen 20 sivua/18 taulukkoa, muuttuneet sivut 4 ja 16 tarkistettu, muut sivut vastaavat aiemmin hyväksyttyjä pikseleittäin. Kaikki lähdekatkelmat mukana.
- Viimeisen Word-version SHA256: `bac7708dcda6483a7022a428fb040e0d47129cf223046af9c8b1f4e8834c0726`. Vanhempi yllä kirjattu SHA koskee aiempaa välietappia.
- Valmistumisen vaatimuskohtainen tarkastus ja seuraavan vaiheen avoimet kohdat: `valmistelu/ENSIMMAISEN-VAIHEEN-KATSELMOINTI.md`.

### Dokumenttikierros 0.3 — 13.9.2026

Nykyinen tarkistusversio on `valmistelu/tarkistuspaketti-0.3/` (projektin juuresta). Se yhdistää Clauden 0.2:n ja Ollin täsmennykset. Uudempi elementtien varmennustodistus 501-03 löytyi; voimassaolo asiakirjan ehdoin 10.10.2028 saakka. Kaikki uudet dokumentit ovat Hietakulman nimellä, ja ulkoasu perustuu markkinointikansion graafiseen ohjeistoon. Aiemmat versiot säilyvät historiassa.

Word ja koko ZIP toimitetaan ensin Ollin tarkistettaviksi. Nykyiset Gmail-luonnokset sisältävät edelleen vanhan 0.1:n; ne on päivitettävä ennen lähettämistä. Mitään viestejä ei ole lähetetty. Villeltä, Jormalta ja Tapanilta pyydetään sisältöjen ja liitteiden päivitykset vasta lähetysvaiheessa. Jussi-Pekka Koiviston visuaalinen ja toiminnallinen katselmointi seuraa asiantuntijapäivitysten käsittelyä.


### Dokumenttikierros 0.4 — 13.9.2026

Nykyinen tarkistusversio on `valmistelu/tarkistuspaketti-0.4/`. Ollin nimeämien hk-ERP- ja Suunnittelu-kansioiden lisäkierros toi lähteet L35–L40, liitteen M4 työmaatoimitusten materiaaliluetteloon, kaapeloinnin kohdekohtaisen rajauksen sekä vuorilautamallien 1–2 valinnan. Tarkistuspyyntöjen luonnokset on päivitetty. Sertifiointien jatkuvuutta koskevat korjaukset säilyvät. ERP:tä ja OneDrive-lähteitä ei muutettu. Aiemmat sähköpostiluonnokset ovat edelleen vanhoilla liitteillä; ne päivitetään erikseen ennen lähettämistä. Villeltä, Jormalta ja Tapanilta pyydetään päivitykset ennen Jussi-Pekka Koiviston katselmointia. Mitään ei lähetetty eikä lisätty sivuston latauksiin.

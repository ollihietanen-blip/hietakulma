# Ulkoisen esikatselun käyttöönotto

## Päivitys: Neon perustettu käyttäjän luvalla

12.9.2026 käyttäjä hyväksyi Neonin ehdot ja tilitietojen jakamisen sekä maksuttoman esikatselutietokannan käyttöönoton. Ehdot hyväksyttiin Vercelin nykyisessä istunnossa. Resurssi **hietakulma-preview** (`red-forest-04557626`) on tilassa Available, paketilla **Free**, alueella **Frankfurt (fra1)**. Valintanäkymä ilmoitti 0,5 GB tallennustilaa ja 100 CU-tuntia projektia kohden; maksullista pakettia ei valittu. Neon Auth poistettiin valinnasta, koska sovelluksessa on jo Auth.js-kirjautuminen.

Kytkentä `hietakulma`-projektiin onnistui. Projects-näkymä vahvisti ympäristöksi vain **Preview**; Production ja Development eivät ole mukana. Muuttujien etuliitteeksi asetettiin `POSTGRES`, salaisuuksien Sensitive-valinta pidettiin käytössä. Integraation kytkentälomake ei tarjonnut Git-branchin rajausta: branch-kohtainen muuttujakohdistus on vielä varmistettava ennen käyttöönottoa.

### Migraatio suoritettu 12.9.2026

Käyttäjä hyväksyi migraatioiden ajamisen ja suoritti Vercelin vaatiman tunnistautumisen. Esitarkistus palautti `public`-skeemasta nolla taulua. Alkumigraation `20260912000100_portal_initial` DDL suoritettiin Vercelin Neon SQL-editorissa yhtenä atomisena `DO`-lohkona. Samassa tapahtumassa luotiin Prisma 6.19.3:n paikallisesta PostgreSQL-kannasta tarkistettu `_prisma_migrations`-taulu ja kirjattiin migraation valmistuminen. Vercel ilmoitti `Query executed successfully` (2150 ms). Tämä oli SQL-editorin kautta tehty alustus, ei CLI:n `prisma migrate deploy` -ajo.

Jälkitarkistus lukutilassa palautti 20 rakenneriviä:

- `User`: 20 saraketta; `RegistrationRequest`: 15; `PasswordResetRequest`: 6; `RateLimitBucket`: 3.
- Kahdeksan sovellusindeksiä ja neljä sovellustaulujen pääavainindeksiä sekä migraatiohistorian pääavainindeksi.
- `PasswordResetRequest_userId_fkey`: viittaus käyttäjän tunnukseen, `ON UPDATE CASCADE ON DELETE CASCADE`.
- Yksi migraatiohistoriarivi: `finished=true`, `rolled_back=false`, `applied_steps_count=1`.
- Tarkistussumma vastaa repositoryn alkuperäistä migraatiotiedostoa: `252881328c357cc515fa4455c20e61e2d1438cc23db3a9b32d3546325b6b02c3`.

Editorin Read-only-tila palautettiin päälle. Sovelluksen käyttäjiä tai paikallisia testitietoja ei tuotu kantaan. Yhteyssalaisuuksia ei avattu tai tulostettu. Vercel CLI 59.16.0 jäi kirjautumatta; sen Allow Access -painike ei aktivoitunut. Kun ylläpidon suora yhteys on käytettävissä, tarkista lisäksi Prisma `migrate status` ja skeeman diff ennen seuraavaa migraatiota. Älä aja alkumigraation DDL:ää uudelleen.

Kohde on Vercelin `hietakulma`-projektin **Preview**. Tavoiteltu branch-rajaus on `codex/julkaisuvalmistelu`; integraation ympäristölaajuinen kohdistus on vielä ratkaistava. Tuotanto ja `hietakulma.fi`-domain eivät kuulu tähän käyttöönottoon. Paikallinen PostgreSQL-selainkoe on valmis. Ulkoisen esikatselun Auth-salaisuudet ja sähköpostiasetukset, uusi deployment, toiminnallinen koe ja ulkoisen kannan varmuuskopio-/palautuskoe ovat vielä tekemättä. Asiantuntijapyyntöjen ja oikeiden testisähköpostien lähetyslupaa ei ole annettu tässä yhteydessä.

## Branch-asetusten tallennus 12.9.2026

Vercelin ympäristömuuttujanäkymä vahvisti viiden Config-muuttujan tallennuksen kohteeseen **Preview → codex/julkaisuvalmistelu**: `PORTAL_DATABASE_PROVIDER=postgresql`, `AUTH_TRUST_HOST=true` sekä `AUTH_URL`, `NEXTAUTH_URL` ja `NEXT_PUBLIC_APP_URL`, joiden yhteinen arvo on `https://hietakulma-git-codex-julkaisuvalmistelu-olli-hietanens-projects.vercel.app`. Production-oletus poistettiin ennen tallennusta. Vercel ilmoitti onnistumisesta ja uuden deploymentin tarpeesta.

Commitin `24ded41` deployment (`6411260919`) oli onnistunut jo ennen näitä asetuksia; se ei siten todista uusien asetusten käyttöönottoa. CLI-kirjautumista kokeiltiin uudelleen tietokannan tunnistautumisen jälkeen, mutta Allow Access oli edelleen pois käytöstä. Käyttäjälle annettiin mahdollisuus viimeistellä tämä saman Macin kirjautuminen omassa selaimessa. Auth-salaisuuksia tai Resend-avaimia ei vielä tallennettu.

## CLI-yhteys ja Auth-salaisuudet 12.9.2026

Vercel CLI -kirjautuminen onnistui ja `whoami` vahvisti tilin `ollihietanen-7645`. Branchille `codex/julkaisuvalmistelu` lisättiin `NEXTAUTH_SECRET` ja `AUTH_SECRET` samalla kryptografisesti satunnaisella 48 tavun salaisuudella. Molemmat tallennettiin Secret-tyyppisinä vain Preview-branchille. Arvoa ei tulostettu tai tallennettu Gitiin.

Ympäristömuuttujat ladattiin erilliseen käyttöoikeuksin suojattuun väliaikaishakemistoon, käyttäjän `.env.local` säilytettiin. Viisi Config-arvoa ja Auth-salaisuudet olivat käytettävissä, mutta integraation Neon-yhteysmuuttujat tulivat tyhjinä sekä branch- että yleisessä Preview-latauksessa. Muuttujanimet ja integraation Preview-kytkentä ovat olemassa. Pelkkä tyhjä paikallinen vienti ei todista runtime-yhteyden puuttumista tai branch-virhettä. Suora Prisma-status/diff ja ulkoisen kannan varmuuskopio/palautus jäävät odottamaan ylläpitoyhteyden saatavuutta.

Commitin `71f31c9` onnistuneesta Preview-deploymentista tehty uusi koonti `dpl_5v5SeAwjEpi3Lm3vo1KKfDKFFQaW` valmistui Ready-tilaan. Sen `/api/auth/providers` vastasi HTTP 200 ja palautti Credentials-palvelun kirjautumis- ja callback-osoitteet oikeaan vakaaseen branch-aliakseen. Tarkistus tehtiin Vercel CLI:n `curl`-komennolla, joka loi projektille deployment protection bypass -tokenin; tokenia ei tulostettu eikä kirjattu tähän. Tämä testi todistaa Auth-konfiguraation latautumisen, ei vielä tietokantakirjautumista tai sähköpostitoimitusta. Resend-tilin ja vahvistetun lähettäjän olemassaoloa kysyttiin käyttäjältä; API-avainta ei pyydetty keskusteluun. Oikeiden sähköpostien lähetyslupa ja asiantuntijapalautteet ovat edelleen erillisiä avoimia kohtia.

## Resend perustettu käyttäjän luvalla 12.9.2026

Käyttäjä hyväksyi Resendin ehdot, Vercelin Marketplace-liitteen ja tilitietojen jakamisen. Vercelin asennusnäkymä vahvisti resurssin **hietakulma-preview-email** onnistuneen luonnin. Valinnat: **Free (0,00)**, 3 000 viestiä kuukaudessa, 100 päivässä, kolme domainia; alue **Ireland (eu-west-1)** ja ulkoinen lähettäjädomain `hietakulma.fi`. Domainin määritys Resendissä ei ole DNS-vahvistus. DNS-tietueita ei muutettu eikä sähköposteja lähetetty.

Projektikytkentä valmisteltiin `hietakulma`-projektiin: Preview valittu, Production ja Development poistettu, Sensitive päällä. Kytkentä jäi tallentamatta, koska lomake ilmoitti vaadittavaksi lisäoikeudeksi **Read and Write → Domains**. Käyttäjän tilin perustamislupa ei vielä sisältänyt tätä domainien kirjoitusoikeutta. Pyydä oikeudelle erillinen hyväksyntä ennen Connect-painiketta tai käytä erikseen rajattua avainta ilman integraation domainoikeutta. `RESEND_API_KEY`-kytkentää, lähettäjäasetusta ja domainin DNS-vahvistusta ei ole vielä tehty. Maksullista pakettia ei valittu.

## Rajattu sähköpostikytkentä 12.9.2026

Käyttäjän pyytämän järkevän ratkaisun mukaisesti Marketplace-projektikytkentä ohitettiin **Skip**-painikkeella. Integraatiolle ei myönnetty projektin domainien kirjoitusoikeutta. Resendissä luotiin erillinen `hietakulma-preview-send`-avain oikeudella **Sending access**. Domain-valitsin tarjosi vain **All domains**, joten domain-kohtainen lisärajaus odottaa palvelun mahdollistamaa valintaa. Tämä avain ei anna asetusten hallintaoikeutta. Marketplace-asennuksen automaattisesti luoma Full access -avain jäi Resendin hallintaan eikä sitä kytketty projektiin.

Uusi avain siirrettiin suoraan selaimen avainnäkymästä Vercelin Secret-muuttujaksi `RESEND_API_KEY`, vain kohteeseen **Preview → codex/julkaisuvalmistelu**. Vercel CLI vahvisti tallennetun avaimen nimen, Secret-tyypin ja branch-kohdistuksen. Arvoa ei tulostettu tai tallennettu Gitiin. Lähettäjäksi tallennettiin `Hietakulma <noreply@hietakulma.fi>` samalle branchille Config-tyyppisenä; CLI vahvisti tallennuksen.

Resendin `hietakulma.fi`-domain on **Not Started**, Ireland-alueella. Valmiit kolme DNS-tietuetta, julkisen DNS:n esitarkistus ja nykyisen Microsoft 365 -sähköpostireitityksen säilyttävä toteutusohje ovat tiedostossa `RESEND-DNS.md`. DNS-muutoksia, Verify-toimintoa tai sähköpostien lähetystä ei tehty. Avaimen tallennus ei vielä todista lähetysvalmiutta. DNS-ylläpitäjä ja erillinen toteutus-/testilupa tarvitaan seuraavaksi.

## Oikea sähköpostikoe testilähettäjällä 12.9.2026

Käyttäjä ilmoitti, että DNS-asetuksia pääsee muuttamaan julkaisun yhteydessä. Resendin oman `hietakulma.fi`-lähettäjän vahvistus siirrettiin siihen vaiheeseen. Käyttäjä antoi erillisen luvan lähettää rekisteröinnin, aktivoinnin ja salasanan palautuksen testiviestit osoitteeseen `olli.hietanen@gmail.com`. Lupa ei kata yhteydenottolomakkeen viestejä `talotehdas@hietakulma.fi`-osoitteeseen eikä asiantuntijapyyntöjä.

Vain branchin `codex/julkaisuvalmistelu` `RESEND_FROM_EMAIL` vaihdettiin arvoon `Hietakulma esikatselu <onboarding@resend.dev>`. Deployment `dpl_Eg4Rq6yfws1ktmKj1Npbhkz1W3mq` (`hietakulma-mavvmy62z-olli-hietanens-projects.vercel.app`, lähtöcommit `9368656`) valmistui Ready-tilaan. Testi käytti vakaata branch-aliasta.

- Rekisteröintilomake lähetti onnistuneen pyynnön. Testihenkilö **Esikatselu Testi**, yritys **Hietakulma – tekninen testi**, rooli **Muu**, markkinointisuostumus pois. Tili on tekninen testitili.
- Aktivointiviesti saapui Gmailiin 12.9.2026 klo 19.48.36 Suomen aikaa. Resend-viesti `5e84775d-0b78-4c8e-8c2d-3c462a51c6e0`: Delivered. Gmail-viesti `1a0968558697e942`: **SPAM**.
- Gmailin tekstiosan aktivointilinkki osoitti oikeaan HTTPS-branch-aliakseen. Aktivointi API:n kautta palautti HTTP 200; sen jälkeen Credentials-kirjautuminen, oikean käyttäjän istunto ja suojattu `/tietopankki` palauttivat onnistuneet tulokset.
- Salasanapalautus pyydettiin selaimen lomakkeella. Viesti saapui Gmailiin klo 19.50.43, viesti `1a096874b17d4dfe`, myös **SPAM**. Salasanan vaihtamisen API palautti HTTP 200.
- Vanha istunto palautui kirjautumattomaksi (`/api/auth/session`: HTTP 200, `null`), käytetty palautustoken hylättiin HTTP 410:llä, vanha salasana hylättiin ja uudella salasanalla kirjautuminen onnistui. Uloskirjautumisen jälkeen istunto oli jälleen tyhjä.

Selainlomakkeiden lisäksi tekninen koe käytti oikeita ulkoisia HTTP-rajapintoja ja evästeitä Vercelin hyväksytyn CLI-yhteyden kautta. Salasanat generoitiin tätä testitiliä varten eikä niitä julkaistu. Tämä ei vielä ole koko tunnuspolun visuaalinen hyväksyntä molemmilla näyttökoilla: mobiilin 390 px -asetuksen jälkeen sivun mitattu leveys jäi 1280 px:iin, joten tästä ajosta ei kirjata mobiilikokeen läpäisyä.

Gmailin SPF-, DKIM- ja DMARC-tarkistukset menivät läpi, mutta viestit luokiteltiin roskapostiksi. Testidomainin HTML-linkki kulki palvelun seurantaosoitteen kautta, ja HTML sisälsi seurantakuvan. Omalla lähettäjädomainilla tarkistetaan seuranta-asetukset ja saapuminen uudelleen ennen julkaisuhyväksyntää. Testidomainin viesti ei todista oman domainin lähetysalueen tai toimitusvarmuuden toteutumista.

## Pysyvyys ja ylläpitoyhteyden rajaus 12.9.2026

Commitin `ad3421d` Vercel-deployment `dpl_3tmMjVDNw1Agd7yGrTG7HTeVgfnH` valmistui onnistuneesti. Sen jälkeen samalla testitilillä ja palautuksessa vaihdetulla salasanalla tehty kirjautuminen vakaan branch-aliaksen kautta onnistui: käyttäjäistunto oli oikea ja suojattu tietopankki vastasi HTTP 200. Tämä todentaa käyttäjätietojen säilymisen uuden deploymentin yli.

Mobiilin 390 × 844 -kokoa kokeiltiin myös uudessa selainvälilehdessä. Dokumentoitu viewport-asetus ei vaikuttanut mitattuun `window.innerWidth`-arvoon (1280); asetuksen palautus tehtiin testin jälkeen. Tästä ei kirjata ulkoisen mobiilipolun läpäisyä.

Vercelin Neon-opasnäkymä pystyi näyttämään suoran yhteyden. Selainliittymä ei tue `content.export`-toimintoa. Suora yhteys kopioitiin kokeeksi `POSTGRES_DIRECT_URL`-Secret-muuttujaksi vain omalle Preview-branchille. CLI:n ympäristövienti palautti sille, Auth-salaisuudelle ja Resend-avaimelle identtisen 11 merkin arvon varsinaisten salaisuuksien sijasta. Siksi latauksessa ei ollut käyttökelpoista yhteysosoitetta; Prisma-status ei päässyt yhteyden muodostamiseen. Kokeeksi lisätty muuttuja poistettiin, alkuperäisiin Neon-muuttujiin ei koskettu. Tämä täsmentää aiempaa merkintää Auth-salaisuuksien paikallisesta saatavuudesta: avainnimien olemassaolo ja ei-tyhjä vientiarvo eivät todista oikean arvon saatavuutta.

Ulkoisen kannan suora Prisma-status/diff ja varmuuskopio-/palautuskoe ovat edelleen tekemättä. SQL-editorilla tehty migraatio ja oikean sovelluspolun tietokantatoiminta on jo todennettu erikseen.

Neonin oman hallinnan sähköpostivahvistus tehtiin 12.9.2026, minkä jälkeen projekti `red-forest-04557626` avautui Neon Consolessa. Connect-näkymästä varmennettiin suora, poolaamaton `neondb`-yhteys. Neon CLI:n kirjautuminen keskeytettiin ennen hyväksyntää, koska se pyysi laajat projektien ja organisaatioiden luku-, luonti-, muutos- ja poisto-oikeudet. Uusia CLI-oikeuksia ei myönnetty. Yhteyden paikallinen siirto on edelleen avoin: tietokannan salasanaa ei kirjattu tähän dokumenttiin, eikä palautuskoetta ole ajettu. Käyttäjälle valmisteltiin repositorion ulkopuolelle tyhjä, oikeuksiltaan 0600 oleva tiedosto `~/.config/hietakulma/preview-database-url` suoran yhteyden turvallista paikallista luovutusta varten.

## Asetettavat muuttujat

| Muuttuja | Arvo tai valintaperuste | Tila |
|---|---|---|
| `PORTAL_DATABASE_PROVIDER` | `postgresql` | Tallennettu branchille; Vercelissä myös oletus |
| `POSTGRES_DATABASE_URL` | Uuden Preview-kannan poolattu yhteys, palveluntarjoajan vaatima TLS | Neon-integraatio lisäsi koko Preview-ympäristöön; ei Production/Development-kohdistusta eikä branch-rajausta |
| `NEXTAUTH_SECRET` | Vain Preview-ympäristölle generoitu vahva salaisuus | Tallennettu branchille Secret-tyyppisenä |
| `AUTH_SECRET` | Sama Preview-salaisuus Auth.js:n ympäristötunnistukselle | Tallennettu branchille Secret-tyyppisenä |
| `AUTH_URL` ja `NEXTAUTH_URL` | Vahvistettu vakaa HTTPS-esikatselun alkuperäosoite | Tallennettu branchille yllä olevaan vahvistettuun aliasosoitteeseen |
| `AUTH_TRUST_HOST` | `true` vain hallitussa Vercel-ympäristössä | Tallennettu branchille |
| `NEXT_PUBLIC_APP_URL` | Sama vakaa HTTPS-osoite ilman polkua, kyselyä tai fragmenttia | Tallennettu branchille; aktivointi- ja palautusviestien linkit tarkistettu |
| `RESEND_API_KEY` | Oikean lähetyspalvelun rajattu palvelinavain | Sending access -avain tallennettu branchille; luvalliset Gmail-kokeet tehty, oman domainin DNS avoinna |
| `RESEND_FROM_EMAIL` | Resendissä vahvistettu lähettäjä, esimerkiksi hyväksytyn domainin noreply-osoite | `Hietakulma esikatselu <onboarding@resend.dev>` käytössä vain Preview-branchilla; oman domainin lähettäjä odottaa DNS-varmennusta |

Ylläpitoprosessi tarvitsee lisäksi `POSTGRES_DIRECT_URL`-arvon suoraan esikatselukantaan. Sitä ei tarvita sovelluksen runtime-yhteydeksi. Älä käytä paikallisen esikatselun salaisuuksia, SQLite-osoitetta tai `HIETAKULMA_LOCAL_PREVIEW`-, `PREVIEW_MAIL_FILE`- ja muita testimuuttujia Vercelissä. Salaisuuksia ei tallenneta tähän dokumenttiin, Gitiin tai tulosteisiin.

Yhteydenottolomakkeen nykyinen vastaanottaja on koodissa `talotehdas@hietakulma.fi`. Rekisteröinti- ja palautusviestit menevät lomakkeella annettuun sähköpostiosoitteeseen. Oikeaan toimituskokeeseen tarvitaan siten erikseen hyväksytyt testiosoitteet ja lupa lähettää myös yhteydenottoviesti tähän vastaanottajaan. Asiantuntijapyyntöjen lähetyslupa ei sellaisenaan ole lomaketestien lupa.

## Toteutusjärjestys ja hyväksymisnäyttö

1. Hyväksy Neon-integraation ehdot vasta käyttäjän luvalla. Valitse sitten saatavilla oleva maksuton paketti ja EU-alue; jos sopivaa maksutonta vaihtoehtoa ei ole, pysähdy esittämään hinta ja vaihtoehdot. Tarkista integraation ympäristökohdistus ennen sen tallentamista.
2. Perusta erillinen esikatselukanta. Älä tuo paikallisia testitilejä. Tallenna suora yhteys vain ylläpidon prosessiin ja aja `npx prisma migrate deploy --config prisma.postgresql.config.ts`. Varmista ensin kohdekanta palveluntarjoajan näkymästä. Tarkista migraatiotila ja tietokannan rakenne ajon jälkeen.
3. Tarkista vakaa Preview-alias ja katseluoikeudet. Nykyinen Vercel Authentication -suojaus ei takaa, että ulkopuolinen tarkistaja pääsee sivulle. Sitä ei poisteta automaattisesti; oikea tarkistajien pääsytapa päätetään ennen kutsuja.
4. Lisää taulukon asetukset branch-kohtaisesti. Tarkista ettei Production tai toinen branch tullut mukaan. Älä kirjoita käyttäjän paikallisia ympäristötiedostoja yli.
5. Luo uusi Preview-deployment asetusten lisäämisen jälkeen. Tarkista sen commit, buildin onnistuminen, alias ja julkiset sivut. Deploymentin vihreä tila ei yksin todista portaalin toimivuutta.
6. Lähetysluvan jälkeen testaa oikealla testiosoitteella rekisteröinti, viestin saapuminen, linkin isäntä, aktivointi, kirjautuminen, uloskirjautuminen ja salasanan palautus sekä yhteydenoton saapuminen. Tee polut tietokoneella ja mobiilissa; kirjaa lähetysajat ja tulokset ilman tokenien tai salasanojen julkaisemista.
7. Varmista tietojen pysyvyys uudessa deploymentissa. Ota erillinen varmuuskopio ja palauta erilliseen tyhjään kantaan `YLLAPITOKOMENNOT.md`-ohjeen mukaan. Vahvista säilytys ja vastuuhenkilö. Paikallinen palautuskoe ei korvaa tätä ulkoisen kannan koetta.

## Asiantuntijapaketti ja odottavat päätökset

Ollin uusi ohjaus: ennen tarkistuspyyntöjen lähettämistä dokumentit parannetaan yhteisesti Clauden kanssa. Claudelle valmisteltiin ladattava `claude/Hietakulma-dokumentit-Claude.zip` ja työohje `claude/PROMPTI-CLAUDELLE.md`. Paketti sisältää nykyisen Word-koosteen, Markdown-luonnokset 01–07, README:n ja lähdeluettelon; alkuperäiset sisäiset lähdeasiakirjat eivät sisälly siihen. Aineistoa ei ole siirretty Claudeen automaattisesti. Clauden palautus verrataan nykyisiin lähteisiin, yhdistetään ja tarkistetaan ennen asiantuntijatoimitusta. Gmail-luonnokset ja niiden liitteet päivitetään tämän jälkeen; nykyisiä luonnoksia ei lähetetä sellaisinaan.

Word-paketti: `tarkistuspaketti/Hietakulma-tarkistuspaketti-luonnos.docx`, 20 sivua; SHA256 `bac7708dcda6483a7022a428fb040e0d47129cf223046af9c8b1f4e8834c0726`. Tarkistuspyyntöjen tekstit ovat tiedostossa `tarkistuspaketti/07-tarkistuspyynnot.md`. Lähetyslupaa on pyydetty näille sivuston yhteystiedoissa oleville vastaanottajille:

- Ville Pihlaja, `ville.pihlaja@hietakulma.fi`: dokumentit 01–05 ja D2, rakenteet, materiaalit, detaljit ja tuoteasiakirjat.
- Jorma Salomäki, `jorma.salomaki@hietakulma.fi`: dokumentti 06, DoP-/sertifikaattiversiot, asennusohjeet ja ristikkoväitteet.
- Tapani Katajisto, `tapani.katajisto@hietakulma.fi`: dokumentit 02, 04 ja 05, tarjonta, toimitusrajat ja myynnin lupaukset.

Ehdotettu palautuspäivä on 18.9.2026, ei vielä sovittu määräaika. Gmailiin tallennettiin 12.9.2026 kolme lähettämätöntä luonnosta lähettäjänä `olli.hietanen@gmail.com`. Viestit pyytävät vastaanottajaa ilmoittamaan palautusaikataulunsa; niihin ei asetettu vahvistamatonta määräaikaa.

| Vastaanottaja | Gmail-luonnoksen tunniste | Viestin tunniste |
|---|---|---|
| Ville | `r-1846559097011883117` | `1a0969b567bc6531` |
| Jorma | `r-5615856375889291544` | `1a0969b5c706d607` |
| Tapani | `r-5053673080345945937` | `1a0969b5fc975cd1` |

Tallennettujen viestien uudelleenluvulla tarkistettiin lähettäjä, vastaanottajat, aiheet, DRAFT-tila sekä molemmat liitteet: `Hietakulma-tarkistuspaketti-luonnos.docx` (58 659 tavua) ja `LAHTEET.md` (4 917 tavua). Word-paketti vastaa yllä yksilöityä versiota. Tarkistuspyynnöt ovat valmiina lähetyksen hyväksyntää varten; niitä ei ole lähetetty. Jussi-Pekka Koiviston katselmointia ei käynnistetä ennen palautteiden käsittelyä ja päivitetyn kokonaisuuden valmistumista.

### Dokumenttikierros 0.3 — 13.9.2026

Nykyinen tarkistusversio on `valmistelu/tarkistuspaketti-0.3/` (projektin juuresta). Se yhdistää Clauden 0.2:n ja Ollin täsmennykset. Uudempi elementtien varmennustodistus 501-03 löytyi; voimassaolo asiakirjan ehdoin 10.10.2028 saakka. Kaikki uudet dokumentit ovat Hietakulman nimellä, ja ulkoasu perustuu markkinointikansion graafiseen ohjeistoon. Aiemmat versiot säilyvät historiassa.

Word ja koko ZIP toimitetaan ensin Ollin tarkistettaviksi. Nykyiset Gmail-luonnokset sisältävät edelleen vanhan 0.1:n; ne on päivitettävä ennen lähettämistä. Mitään viestejä ei ole lähetetty. Villeltä, Jormalta ja Tapanilta pyydetään sisältöjen ja liitteiden päivitykset vasta lähetysvaiheessa. Jussi-Pekka Koiviston visuaalinen ja toiminnallinen katselmointi seuraa asiantuntijapäivitysten käsittelyä.

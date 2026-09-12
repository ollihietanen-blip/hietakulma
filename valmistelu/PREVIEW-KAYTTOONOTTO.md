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

## Asetettavat muuttujat

| Muuttuja | Arvo tai valintaperuste | Tila |
|---|---|---|
| `PORTAL_DATABASE_PROVIDER` | `postgresql` | Tallennettu branchille; Vercelissä myös oletus |
| `POSTGRES_DATABASE_URL` | Uuden Preview-kannan poolattu yhteys, palveluntarjoajan vaatima TLS | Neon-integraatio lisäsi Preview-ympäristöön; branch-rajaus tarkistamatta |
| `NEXTAUTH_SECRET` | Vain Preview-ympäristölle generoitu vahva salaisuus | Asettamatta; sovelluksen Auth-konfiguraatio käyttää tätä |
| `AUTH_SECRET` | Sama Preview-salaisuus Auth.js:n ympäristötunnistukselle | Asettamatta |
| `AUTH_URL` ja `NEXTAUTH_URL` | Vahvistettu vakaa HTTPS-esikatselun alkuperäosoite | Tallennettu branchille yllä olevaan vahvistettuun aliasosoitteeseen |
| `AUTH_TRUST_HOST` | `true` vain hallitussa Vercel-ympäristössä | Tallennettu branchille |
| `NEXT_PUBLIC_APP_URL` | Sama vakaa HTTPS-osoite ilman polkua, kyselyä tai fragmenttia | Tallennettu branchille; toimituskoe tekemättä |
| `RESEND_API_KEY` | Oikean lähetyspalvelun rajattu palvelinavain | Palvelu ja lähetyslupa vahvistamatta |
| `RESEND_FROM_EMAIL` | Resendissä vahvistettu lähettäjä, esimerkiksi hyväksytyn domainin noreply-osoite | Vahvistettava palvelusta; esimerkki ei osoita lähetysvalmiutta |

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

Word-paketti: `tarkistuspaketti/Hietakulma-tarkistuspaketti-luonnos.docx`, 20 sivua; SHA256 `bac7708dcda6483a7022a428fb040e0d47129cf223046af9c8b1f4e8834c0726`. Tarkistuspyyntöjen tekstit ovat tiedostossa `tarkistuspaketti/07-tarkistuspyynnot.md`. Lähetyslupaa on pyydetty näille sivuston yhteystiedoissa oleville vastaanottajille:

- Ville Pihlaja, `ville.pihlaja@hietakulma.fi`: dokumentit 01–05 ja D2, rakenteet, materiaalit, detaljit ja tuoteasiakirjat.
- Jorma Salomäki, `jorma.salomaki@hietakulma.fi`: dokumentti 06, DoP-/sertifikaattiversiot, asennusohjeet ja ristikkoväitteet.
- Tapani Katajisto, `tapani.katajisto@hietakulma.fi`: dokumentit 02, 04 ja 05, tarjonta, toimitusrajat ja myynnin lupaukset.

Ehdotettu palautuspäivä on 18.9.2026, ei vielä sovittu määräaika. Lähettäjätili vahvistetaan ennen toimitusta. Mitään näistä pyynnöistä ei ole lähetetty. Jussi-Pekka Koiviston katselmointia ei käynnistetä ennen palautteiden käsittelyä ja päivitetyn kokonaisuuden valmistumista.

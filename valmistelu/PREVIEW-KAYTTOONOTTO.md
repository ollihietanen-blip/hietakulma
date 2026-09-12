# Ulkoisen esikatselun käyttöönotto

12.9.2026. Kohde: Vercelin `hietakulma`-projektin **Preview**, vain branch `codex/julkaisuvalmistelu`. Tuotanto ja `hietakulma.fi`-domain eivät kuulu tähän käyttöönottoon. Tekninen toteutus ja paikallinen PostgreSQL-selainkoe ovat valmiit; ulkoisen kannan perustaminen ja sähköpostitoimitus odottavat lupia ja asetuksia.

## Asetettavat muuttujat

| Muuttuja | Arvo tai valintaperuste | Tila |
|---|---|---|
| `PORTAL_DATABASE_PROVIDER` | `postgresql` | Toteutettu; Vercelissä myös oletus |
| `POSTGRES_DATABASE_URL` | Uuden Preview-kannan poolattu yhteys, palveluntarjoajan vaatima TLS | Kanta perustamatta |
| `NEXTAUTH_SECRET` | Vain Preview-ympäristölle generoitu vahva salaisuus | Asettamatta; sovelluksen Auth-konfiguraatio käyttää tätä |
| `AUTH_SECRET` | Sama Preview-salaisuus Auth.js:n ympäristötunnistukselle | Asettamatta |
| `AUTH_URL` ja `NEXTAUTH_URL` | Vahvistettu vakaa HTTPS-esikatselun alkuperäosoite | Valitaan Vercelin aliasnäkymästä; ei arvata |
| `AUTH_TRUST_HOST` | `true` vain hallitussa Vercel-ympäristössä | Asettamatta |
| `NEXT_PUBLIC_APP_URL` | Sama vakaa HTTPS-osoite ilman polkua, kyselyä tai fragmenttia | Aktivointi- ja palautuslinkkien kohde |
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

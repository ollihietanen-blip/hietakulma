# Ulkoisen esikatselun PostgreSQL-valmistelu

12.9.2026. Tila: schema ja alkumigraatio valmisteltu ja portaalin palvelinpolut testattu paikallisella PostgreSQL:llä; ulkoista palvelua ei perustettu eikä sovelluksen tietokantayhteyttä vaihdettu. Ulkoinen esikatselu on edelleen kesken.

## Ratkaisu ja käyttöönoton rajaus

Ehdotus on Vercelin Marketplace-Neon, erillinen esikatselutietokanta EU-alueella ja maksuton palvelupaketti, jos nämä ovat tarjolla seuraavassa asetusvaiheessa. Projektin Storage-lista tarkistettiin uudelleen: tyhjä. Neonin asennus avautui käyttöehtoihin; vasta hyväksymisen jälkeen näkyvät Configuration and Plan -asetukset. Ehtoja ei hyväksytty. Vercel ilmoittaa jakavansa tilin tunnisteen, sähköpostin ja käyttötietoja Neonille. Hyväksymislupa on pyydetty käyttäjältä.

Hinta, alue, palautushistorian pituus ja mahdollinen automaattinen laskutus vahvistetaan asetusnäkymästä ennen perustamista. Maksulliseen pakettiin ei siirrytä automaattisesti. [Neonin hinnoittelu](https://neon.com/pricing) kuvaa vaihtoehtoja, mutta tässä ei luvata tiettyä ilmaispaketin kiintiötä.

## Valmistellut tiedostot

- `prisma/postgresql/schema.prisma`: samat neljä mallia ja relaatiot kuin nykyisessä SQLite-schemassa. Generoitu, ei erikseen käsin ylläpidettävä kopio.
- `scripts/postgres-schema.cjs`: generoi PostgreSQL-version; `--check` havaitsee vanhentuneen version.
- `prisma/postgresql/migrations/20260912000100_portal_initial/migration.sql`: Prisma 6.19.3:n generoima alkumigraatio tyhjään PostgreSQL-tietokantaan. Sisältää yksilöllisyydet, indeksit ja salasanan palautusrivien cascade-poiston.
- `prisma.postgresql.config.ts`: erillinen CLI-konfiguraatio. Ei lue `.env.local`-tiedostoa eikä käytä SQLite-varayhteyttä. Migraatioyhteys annetaan prosessin `POSTGRES_DIRECT_URL`-muuttujassa. Clientin yhteys on `POSTGRES_DATABASE_URL`.

Nykyinen `lib/prisma.ts`, build ja paikallinen esikatselu käyttävät edelleen SQLitea. PostgreSQL-clientin output on erillinen Gitistä rajattu `lib/generated/prisma-postgres`. Sovelluksen kytkentä tehdään vasta omana testattuna vaiheena. Pelkkä ympäristömuuttujan lisääminen ei tässä commitissa ota PostgreSQL:ää käyttöön.

Valmistelun paikalliset komennot:

```bash
node scripts/postgres-schema.cjs
node scripts/postgres-schema.cjs --check
npx prisma validate --config prisma.postgresql.config.ts
```

Validointi tarvitsee `POSTGRES_DATABASE_URL`-muuttujan, mutta ei yhteyttä palvelimeen. SQL muodostettiin `migrate diff --from-empty --to-schema-datamodel prisma/postgresql/schema.prisma --script` -komennolla.

### Oikealla PostgreSQL:llä toistettava koe

`npm run test:postgres` luo oman tilapäisen PostgreSQL-klusterin, käynnistää sen loopback-osoitteeseen vapaaseen porttiin ja poistaa testiklusterin pysäytyksen jälkeen. Tarvitaan PostgreSQL 17 -työkalut: oletus `/opt/homebrew/opt/postgresql@17/bin`, vaihtoehtoinen hakemisto `PG_BIN`-muuttujalla. Homebrew-asennus on tehty tällä koneella, mutta sen oletusklusteria tai automaattisesti käynnistyvää palvelua ei käytetä.

Koe generoi erillisen clientin, ajaa migraation kahdesti (toinen ajo ei muuta mitään), tarkistaa rakenteen Prisma-diffillä ja suorittaa samat 21 portaalin integraatiotestin tulosta kuin SQLite-koe. Lisäksi se ottaa custom-muotoisen `pg_dump`-kopion vain omistajan luettavaan tiedostoon ja palauttaa sen erilliseen tyhjään kantaan. Kaikkien neljän mallin kaikki kentät verrataan alkuperäiseen, ja palautetun viiteavaimen cascade-poisto testataan. Testitiedot ja kopio poistuvat ajon lopuksi. Oikeita sähköposteja ei lähetetä.

Tämä todentaa paikallisen migraation, palvelinpolut ja palautettavuuden. Se ei vielä testaa Vercelin poolattua yhteyttä, käyttöliittymää PostgreSQL:llä, ulkoista sähköpostitoimitusta eikä operatiivisen varmuuskopioinnin ajastusta tai säilytystä.

## Seuraava toteutus ja hyväksymisnäyttö

1. Testaa migraatio oikealla eristetyllä PostgreSQL-palvelimella, aja uudelleen ilman muutoksia ja vertaa tietokannan rakennetta schemaan. Testaa myös koko nykyinen portaalin integraatiokoe PostgreSQL-clientilla, etenkin rinnakkaiset aktivoinnit ja yritysrajat.
2. Lisää selkeä palvelinpuolen provider-valinta ja clientin generointi buildiin. Varmista, että paikallinen SQLite-esikatselu toimii edelleen. Ulkoisen ympäristön väärä tai puuttuva valinta ei saa luoda paikallista tiedostotietokantaa.
3. Perusta luvan jälkeen vain esikatselukanta. Älä siirrä SQLite-testitilejä tai migraatiohistoriaa siihen. Käytä sovellukselle poolattua yhteyttä ja migraatio-/ylläpitokomennoille suoraa yhteyttä; [Prisman yhteysohje](https://www.prisma.io/docs/orm/v6/prisma-client/setup-and-configuration/databases-connections/connection-management) käsittelee serverless-yhteyksien hallintaa.
4. Kohdista asetukset vain `codex/julkaisuvalmistelu`-haaran Preview-ympäristöön. Vahvista pysyvä Preview-osoite Auth- ja sähköpostilinkeille ennen niiden asettamista. Resend tarvitsee vahvistetun lähettäjän ja testivastaanottajat; oikeat toimituskokeet odottavat lähetyslupaa.
5. Toteuta PostgreSQL-ylläpito ja varmuuskopiointi: `pg_dump` custom-muodossa suoran yhteyden kautta, salassa säilytettävä kopio ja `pg_restore` erilliseen tyhjään palautuskantaan. Testaa palautetulla kannalla tilit, viitteet, tokenien tilat ja kirjautuminen. SQLite-snapshot-työkalu ei sovellu PostgreSQL:lle. Määritä säilytys, vastuuhenkilö ja ajastus ennen tuotantoa; palveluntarjoajan palautushistoria ei korvaa todennettua palautuskoetta.
6. Testaa ulkoinen tunnusketju ja yhteydenotto molemmissa näyttökoissa. Paikallisia selainkokeita ei suunnata ulkoiseen ympäristöön ohittamalla niiden suojausta. Tarkistetaan myös sähköpostien vastaanotto ja linkkien oikea isäntä.

Migraation tai buildin epäonnistuessa uutta käyttöönottoa ei hyväksytä. Esikatselun palautus tehdään aiempaan yhteensopivaan sovellusversioon ja tarvittaessa erilliseen palautettuun kantaan; tietokannan tai tuotannon tuhoavaa nollausta ei käytetä palautusmenetelmänä.

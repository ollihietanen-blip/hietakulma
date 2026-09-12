# Portaalin ylläpitokomennot

12.9.2026 · Paikallisesti testattu SQLite- ja PostgreSQL-toteutuksilla. Ulkoisen ympäristön yhteydet, vastuuhenkilöt, säilytysajat ja ajastus on vielä vahvistettava. PostgreSQL-komento on kuvattu tämän ohjeen lopussa.

Työkalut ajetaan repositorion juuresta Node 24:llä ja Python 3:lla. Ne eivät lue `.env`-tiedostoja tai valitse tietokantaa automaattisesti. Tietokannassa on oltava nykyiset migraatiot. Alla `/turvallinen/...` tarkoittaa ylläpitäjän valitsemaa absoluuttista polkua, ei valmista projektihakemistoa. Säilytä viennit ja varmuuskopiot rajatussa hakemistossa repositorion, `public`-kansion ja jaettujen kansioiden ulkopuolella.

## Käyttäjätiedot ja käyttöoikeus

Henkilön pyynnön ja henkilöllisyyden käsittelyn jälkeen:

```bash
node scripts/portal-admin.cjs export --database /turvallinen/portaali.db --email maija@example.com --output /turvallinen/maija-tiedot.json
node scripts/portal-admin.cjs withdraw-marketing --database /turvallinen/portaali.db --email maija@example.com
node scripts/portal-admin.cjs invalidate-sessions --database /turvallinen/portaali.db --email maija@example.com
node scripts/portal-admin.cjs delete-user --database /turvallinen/portaali.db --email maija@example.com
```

Muutoskomennot tulostavat oletuksena vain kohteen ja osumamäärät. Tarkista ne ja lisää saman komennon loppuun `--apply` toteuttaaksesi muutoksen. Viennissä `--apply` ei ole käytössä: vienti luo uuden tiedoston käyttöoikeudella 0600 eikä ylikirjoita olemassa olevaa. Sähköposti normalisoidaan kuten rekisteröitymisessä.

- **export:** profiili, rekisteröitymispyyntöjen tiedot ja palautuspyyntöjen aikaleimat. Salasanatiivisteet, token-tiivisteet ja istuntoversion sisäinen arvo jätetään pois. Ei tietoja Resendistä, postilaatikosta tai muista palveluista. Tarkista aineisto ennen luovutusta.
- **withdraw-marketing:** asettaa käyttäjän ja saman sähköpostin rekisteröitymispyyntöjen markkinointivalinnan epätodeksi. Alkuperäinen suostumuksen aikaleima säilyy historiallisena tietona, ei peruutuksen ajankohtana. Kirjaa peruutus sovittuun tukirekisteriin ja päivitä mahdollinen erillinen lähetyslista.
- **invalidate-sessions:** nostaa istuntoversiota. Nykyiset istunnot hylätään seuraavassa palvelimen istuntotarkistuksessa. Käyttäjä voi edelleen kirjautua uudelleen salasanallaan; tämä ei sulje tiliä pysyvästi.
- **delete-user:** poistaa tilin, saman sähköpostin kaikki rekisteröitymispyynnöt ja relaation kautta palautuspyynnöt samassa transaktiossa. Vanhat istunnot hylätään, koska käyttäjää ei enää löydy. Toisen käyttäjän tietoihin ei kosketa. Henkilö voi rekisteröityä myöhemmin uudelleen; pysyvää henkilökohtaista estolistaa ei ole toteutettu.

Poisto ei tyhjennä jo selaimeen ladattua sisältöä, ulkoisia palveluja tai varmuuskopioita. Tiivistetyt yritysrajoitusrivit poistuvat vanhenemisen jälkeen; ylläpitokomennolla ei poisteta muiden käyttäjien voimassa olevia rajoituksia.

## Vanhentuneet pyyntörivit

```bash
node scripts/portal-admin.cjs cleanup --database /turvallinen/portaali.db --before 2026-08-01T00:00:00.000Z
```

Päiväys on esimerkki, ei hyväksytty säilytysaika. Komento laskee rekisteröitymis-, palautus- ja yritysrajoitusrivit, joiden `expiresAt` on aidosti ennen valittua menneisyyden UTC-rajaa. Sama komento `--apply`-valinnalla poistaa ne. Käyttäjätilit ja voimassa olevat tokenit säilyvät. Käytettyjä mutta rajan jälkeen vanhenevia pyyntöjä ei poisteta tällä ajolla. Automaattista ajastusta ei ole asetettu ennen säilytyspäätöstä.

## Varmuuskopio ja palautusharjoitus

```bash
python3 scripts/sqlite-snapshot.py --source /turvallinen/portaali.db --destination /turvallinen/portaali-varmuuskopio.db
python3 scripts/sqlite-snapshot.py --source /turvallinen/portaali-varmuuskopio.db --destination /turvallinen/portaali-palautettu.db
node scripts/portal-admin.cjs export --database /turvallinen/portaali-palautettu.db --email maija@example.com --output /turvallinen/palautuksen-tarkistus.json
```

Työkalu käyttää [Pythonin SQLite backup -rajapintaa](https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.backup), joka tuottaa yhtenäisen kopion myös käytössä olevasta tietokannasta. Se lukee lähteen read-only-tilassa, tarkistaa eheyden ja luo vain uuden kohdetiedoston käyttöoikeudella 0600. Kohteen eheys ja vierasavaimet tarkistetaan. Olemassa olevaa tiedostoa ei ylikirjoiteta. Tavallinen tiedostokopio voi jättää WAL-lokin viimeiset muutokset pois.

Palautusta harjoitellaan uuteen tiedostoon: tarkista tärkeät tietueet ja käyttäjäpolut erillisessä ympäristössä simuloidulla sähköpostilla. Varsinaisessa palautuksessa pysäytetään kirjoittava palvelu, säilytetään nykyisestä tilasta kopio, valitaan tarkistettu palautettu tietokanta palvelun `DATABASE_URL`-asetukseen ja käynnistetään palvelu. Ympäristökohtainen kytkentä ja käyttökatko suunnitellaan tuotantoratkaisun varmistuttua. Palautus voi palauttaa myös aiemmin poistettuja tilejä ja vanhoja istuntoversioita: käsittele palautuksen jälkeiset poistot ja suostumusmuutokset ylläpitokirjanpidosta ja mitätöi palautuneiden käyttäjien istunnot ennen pääsyn avaamista.

Varmuuskopiossa on myös salasanatiivisteitä ja muita henkilötietoja. Tiedoston käyttöoikeus ei korvaa salattua tallennusta, rajattuja käyttöoikeuksia, säilytysajan toteutusta tai erillistä palautettavuuden seurantaa. Nämä valitaan tuotantoympäristön yhteydessä.

## Todennettu tässä vaiheessa

`npm test` sisältää oikeaan tilapäiseen SQLite-tietokantaan perustuvat ylläpitotestit. Testit tarkistavat oletusarvoisen kuivaharjoittelun, argumenttivirheiden hylkäämisen, viennin salaisuuksien rajauksen, peruutuksen ulottumisen odottaviin aktivointeihin, istuntoversion muutoksen, vanhenemisrajan, kohdennetun poiston ja varmuuskopion palautuksen Prismaan. Kopiointikokeessa tietokanta on WAL-tilassa ja palautuksesta tarkistetaan ennen kopiointia päivitetty tietue. Projektin tai tuotannon tietokantoihin ei tehdä testimuutoksia.
## PostgreSQL-esikatselun ylläpito

PostgreSQL:lle on erillinen `scripts/portal-admin-postgres.cjs`. Käytä sitä vasta migroidulle, oikeaksi varmennetulle esikatselukannalle. Se käyttää samoja tietojen vienti-, poisto-, markkinointivalinnan peruutus-, istuntojen mitätöinti- ja siivoustoimintoja kuin edellä kuvattu SQLite-työkalu.

Anna suora yhteys prosessin `POSTGRES_DIRECT_URL`-ympäristömuuttujassa turvallisen salaisuuksien hallinnan kautta. Työkalu ei lue `.env.local`-tiedostoa. Älä lisää yhteysosoitetta komentorivin argumentiksi tai Gitiin. Lisäksi komennossa vaaditaan `--database host:port/database`, jonka pitää vastata täsmälleen yhteyden kohdetta. Oletusportti on 5432. Kohde ei sisällä käyttäjätunnusta, salasanaa tai URL:n kyselyparametreja.

Esimerkki muodon tarkistamiseen (esimerkkikohde ei ole oikea tietokanta):

```bash
node scripts/portal-admin-postgres.cjs --help
node scripts/portal-admin-postgres.cjs invalidate-sessions --database example.invalid:5432/preview --email testi@example.com
```

Ilman `--apply`-valintaa muuttavat komennot raportoivat vain kohdistuvien rivien määrät. `export` vaatii uuden absoluuttisen `--output`-polun, ei hyväksy `--apply`-valintaa ja luo tiedoston oikeuksilla 0600. Siivous vaatii hyväksytyn UTC-aikarajan aivan kuten SQLite-versio. Virhetilanteessa PostgreSQL-komento ei tulosta yhteysosoitetta tai tietokantakirjaston mahdollisesti arkaluonteista virheviestiä.

Tarkistus 12.9.2026: `npm run test:postgres` ajaa ylläpitokokeet omaan erilliseen PostgreSQL-testikantaan. Kaikki 8 ylläpitotestitulosta läpäisivät: oletuksena vain raportointi, kohteen/argumenttien tarkistus, vienti ilman salaisuuksia, ylikirjoituksen esto, markkinointivalinnan peruutus, istuntojen mitätöinti, vanhentuneiden rivien siivous ja käyttäjän poiston rajaus. PostgreSQL-varmuuskopion palautus testataan saman ajon erillisessä osuudessa. SQLite-regressioiden 48 tulosta läpäisivät myös.

Ulkoisen ympäristön palvelutunnus, pääsyoikeudet, säilytysajat ja automatisoitu varmuuskopiointi ovat vielä käyttöönottovaiheen päätöksiä. Näitä komentoja ei ole ajettu oikeisiin ulkoisiin henkilötietoihin.

## PostgreSQL-varmuuskopio ja palautus

`scripts/postgres-snapshot.cjs` käyttää prosessin `POSTGRES_DIRECT_URL`-yhteyttä ja samaa erikseen annettavaa `--database host:port/database`-kohdistusta. Se ei lue ympäristötiedostoja eikä tulosta yhteyden salaisuuksia. `PG_BIN` valitsee PostgreSQL-työkalujen hakemiston. Käytä palvelimen kanssa yhteensopivaa pg_dump/pg_restore-versiota. URL-parametreista hyväksytään `sslmode`, `channel_binding` ja `connect_timeout`; käytä suoraa ylläpitoyhteyttä ilman Prisman client-parametreja.

```bash
node scripts/postgres-snapshot.cjs backup --database example.invalid:5432/preview --file /absolute/new-backup.dump
node scripts/postgres-snapshot.cjs restore --database example.invalid:5432/restored --file /absolute/new-backup.dump
node scripts/postgres-snapshot.cjs restore --database example.invalid:5432/restored --file /absolute/new-backup.dump --apply
```

Nämä ovat muotoesimerkkejä, eivät oikean ympäristön komentoja. Vaihda prosessin yhteys palautuskantaan ennen restore-komentoja. Palautuskanta perustetaan erikseen tyhjänä ja pidetään irti sovelluksen liikenteestä palautuksen ajan. Ennen palautusta komento tarkistaa, ettei kannassa ole käyttäjien relaatioita, funktioita tai tyyppejä. Pelkkä tarkistus ei kirjoita kantaan; varsinainen palautus vaatii `--apply` ja tehdään yhtenä transaktiona. Työkalu ei tyhjennä kantaa.

Backup luo vain uuden custom-muotoisen tiedoston oikeuksilla 0600 ja poistaa oman keskeneräisen tiedostonsa, jos vienti epäonnistuu. Se ei korvaa olemassa olevaa kopiota. Kopio sisältää myös salasanojen tiivisteet ja tokenien tilat: säilytä se käyttöoikeuksiltaan rajatussa ja salatussa varmistustallennuksessa, jonka säilytysaika ja vastuuhenkilö sovitaan erikseen. Kopio ei kuulu Gitiin tai asiantuntijoiden tarkistuspakettiin.

`npm run test:postgres` käyttää juuri tätä komentoa palautuskokeessa: ylikirjoituksen esto, käytössä olevan kannan esto, kuiva palautustarkistus, oikeuksien 0600 tarkistus, kaikkien mallien kaikkien kenttien vertailu ja cascade-viitteen toiminta. Paikallinen testi läpäisi 12.9.2026. Ulkoisen Neon-kannan vastaava palautuskoe sekä varmistusten ajastus ja säilytys ovat edelleen tekemättä.

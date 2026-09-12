# Portaalin ylläpitokomennot

12.9.2026 · Paikallisesti testattu SQLite-toteutuksella. Tuotannon palvelin, pysyvä tietokanta, vastuuhenkilöt, säilytysajat ja ajastus on vielä valittava ja varmistettava.

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

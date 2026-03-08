# Hietakulma.fi — Verkkosivuston toteutusraportti

**Päivämäärä:** 7.3.2026
**Versio:** Luonnos → Julkaisuvalmis
**Lähde:** hietakulma-git-master-olli-hietanens-projects.vercel.app
**Tarkoitus:** Ohjata verkkosivuston loppuunsaattaminen ja toimia sisältöohjeistuksena kehittäjälle

---

## OSA 1: JOHDON JA MARKKINOINNIN YHTEENVETO

### 1.1 Nykytilan arvio

Sivusto on edennyt merkittävästi: visuaalinen ilme on ammattimainen, sivurakenne on looginen ja pääsisällöt on kirjoitettu. Uusin versio (master-branch) on korjannut useita aiempia puutteita — hero-kuva on nyt paikallaan etusivulla ja kohteet-sivulle on lisätty oikeat projektinimet.

**Mikä toimii hyvin:**

- Brändi-ilme on yhtenäinen ja ammattimainen (tumma teema, selkeä typografia)
- Navigaatio on looginen ja kattaa kaikki osa-alueet
- Tuotesivujen sisältö (Puutalot, Puuelementit, Kattoristikot) on kirjoitettu hyvin
- Yhteystiedot ja henkilöesittelyt ovat kattavat
- Tietopankki-konsepti on erinomainen kilpailuetu
- Yhteydenottolomake on kaikilla sivuilla ja sisältää aihepudotusvalikon + GDPR-suostumuksen
- Etusivun hero-kuva (tehdaskuva) on nyt paikallaan
- Kohteet-sivulla on oikeat projektinimet (Villa Tähtiranta, Leppätien rivitalot jne.)

**Mitä pitää vielä tehdä ennen julkaisua:**

- Kohteet-sivun yksittäiset kohdesivut tarvitsevat sisällön (kuvat, tiedot, kuvaus)
- Tietopankin dokumenteista osa on vielä testiversioita
- SEO-perustiedot puuttuvat (meta-kuvaukset, alt-tekstit)
- Joitakin tekstejä on syytä tarkentaa aineiston pohjalta

### 1.2 Sivuston rooli liiketoiminnassa

Asiakasymmärrystutkimuksen (2 406 asiakasta) perusteella verkkosivusto palvelee kahta eri ostopolkua:

**Omakotirakentaja (B2C)** — 50 % asiakkaista, 31 % liikevaihdosta. Ensiostaja, joka etsii tietoa, vertailee ja haluaa vakuuttua ennen yhteydenottoa. Sivuston tehtävä: vastata kysymyksiin, rakentaa luottamusta, madaltaa yhteydenottokynnystä.

**Rakennusliike / urakoitsija (B2B)** — 34 % asiakkaista, 69 % liikevaihdosta. Ammattilainen, joka tarvitsee teknisiä tietoja, referenssejä ja nopean tarjouspyynnön. Sivuston tehtävä: vahvistaa luotettavuus, tarjota tekniset dokumentit, mahdollistaa tehokas yhteydenotto.

Sähköpostianalyysin perusteella yleisimmät kysymykset koskevat: hintaa ja toimitussisältöä (38 %), aikataulua (22 %), teknisiä yksityiskohtia (18 %) ja prosessin etenemistä (12 %). Nämä tulee huomioida sisällöissä.

### 1.3 Kilpailuasema ja erottautuminen

Markkinatutkimuksen (2026) perusteella Hietakulman keskeinen kilpailuetu on **kokonaistoimituspaketti** — tyypillisesti 14–16 tuotekategoriaa suunnittelusta valmiiseen, pintakäsiteltyyn elementtiin. Tätä "kaikki yhdeltä luukulta" -lupausta ei nykyinen sivusto vielä kommunikoi tarpeeksi selkeästi.

Uuden rakentamislain hiilijalanjälkivaatimukset (9.1.2026) suosivat puurakentamista, ja Hietakulman nykyiset U-arvot (0,17–0,21 W/m²K) ylittävät vaatimukset jo nyt. Tämä on konkreettinen kilpailuetu, joka tulee tuoda sivustolla esiin.

Keskeiset kilpailijat: LapWall Oy (suurempi, laajempi tuotevalikoima), Muurame-talot (kuluttajapainotteinen), paikalliset elementtivalmistajat. Hietakulman erottautumistekijät: joustavuus (pienistä kohteista suuriin), kokonaistoimituksen laajuus, yli 30 vuoden kokemus ja oma tehdas Kankaanpäässä.

### 1.4 Esiteltävät kohteet — suositus

Kohteet-sivulle tarvitaan 6–9 todellista referenssiä. Uudessa versiossa nimet ovat jo paikallaan. Suosittelen seuraavaa valintaa monipuolisen portfolion rakentamiseksi:

| # | Kohde | Tyyppi | Miksi mukana |
|---|-------|--------|-------------|
| 1 | **Villa Tähtiranta** | Omakotitalo/Villa | Premium-kohde, näyttää kyvykkyyden vaativissa projekteissa |
| 2 | **Leppätien rivitalot** | Rivitalo | B2B-kyvykkyys, isompi kohde, toistuvuus |
| 3 | **Rantakatu 5** | Omakotitalo | Kaupunkikohde, erilainen konteksti |
| 4 | **Vesikkotie 12** | Omakotitalo | Perusomakotitalo, samaistuttava B2C-asiakkaalle |
| 5 | **Kirjavaisenkatu 40** | Rivitalo/paritalo | Ammattikuvat (HDR), paras kuvasarja arkistossa |
| 6 | **Karhulan Kuusikko** | Asuinalue | Useamman rakennuksen kokonaisuus |
| 7 | **As Oy Nokian Villa Sand** | Rivitalo | Asunto-osakeyhtiö, B2B-kohde |
| 8 | **Meritorinin rivitalot** | Rivitalo | Merenrantakohde, visuaalinen vetovoima |
| 9 | **Nokian Havumetsä** | Asuinalue | Suurempi kokonaisuus |

**Jokainen kohdekortti tarvitsee:**
- 1–3 valokuvaa (julkisivu pakollinen, sisätila/rakennusvaihe toivottava)
- Kohteen tyyppi (OKT / rivitalo / paritalo / muu)
- Sijainti (kaupunki)
- Valmistumisvuosi
- Toimitussisältö lyhyesti (esim. "Ulkoseinäelementit, ikkunat, ovet, kattoristikot, yläpohja")
- 2–3 lauseen kuvaus

### 1.5 Tietopankin dokumentit — tilanne ja toimenpiteet

Tietopankissa on 11 dokumenttia, joista 6:ssa on "(TEST)" tai "(test)" -merkintä. Nämä tulee joko vahvistaa tuotantovalmiiksi tai poistaa.

| Dokumentti | Tila | Toimenpide |
|-----------|------|-----------|
| Elementtien asennusohje | Test | Vahvista lopulliseksi tai kirjoita puhtaaksi |
| Hietakulma Tuoteluettelo 2025 | OK | Päivitä 2026:ksi? |
| HK-seinä 198mm | Test | Vahvista rakennedetalji lopulliseksi |
| HK-seinä 248mm | Test | Vahvista rakennedetalji lopulliseksi |
| Materiaalierittely pohja | OK | Tarkista sisältö |
| Ristikoiden tuentaohje | Test | Vahvista lopulliseksi |
| DoP – Kattoristikot | OK | CE-dokumentti, pidä ajan tasalla |
| DoP – Seinäelementit | OK | CE-dokumentti, pidä ajan tasalla |
| Sähkö- ja LVI-suunnitteluopas | Test | Vahvista lopulliseksi |
| Sähkövalmiit elementit | Test | Vahvista lopulliseksi |
| Ulkoverhousdetaljit | Test | Vahvista lopulliseksi |

**Lisäksi suositellaan lisättäväksi:**
- Energiatodistusesimerkki (demonstroi U-arvoja)
- Toimitussisältö-esimerkki (mitä paketti tyypillisesti sisältää)
- Rakentajan muistilista (omakotirakentajalle)

### 1.6 Aikataulu ja toteutusjärjestys

**Vaihe 1 — Julkaisuvalmiiksi (1–2 viikkoa)**
1. Kohteiden sisällöt (kuvat + tiedot) kohdesivuille
2. Tietopankin TEST-merkintöjen poisto / dokumenttien viimeistely
3. SEO-perustiedot (meta-kuvaukset, title-tagit, alt-tekstit)
4. Tekstien viimeistely etusivulla
5. Yhteydenottolomakkeen backend-toimivuuden varmistus

**Vaihe 2 — Sisällön rikastus (3–4 viikkoa)**
6. Tarina-sivun rikastaminen (aikajana, avainluvut, arvot)
7. Tuotesivujen teknisten spesifikaatioiden lisääminen
8. Analytics-integraatiot (GA4, Search Console)
9. Mobiiliresponsiivisuuden testaus ja optimointi

**Vaihe 3 — Jatkuva kehitys (julkaisun jälkeen)**
10. Blogi/ajankohtaista-osio
11. Asiakastarinat ja arviot
12. Hakukoneoptimointiin panostaminen

---

## OSA 2: YKSITYISKOHTAINEN SIVUKOHTAINEN TOTEUTUSOHJE KEHITTÄJÄLLE

Tämä osio toimii suorana ohjeena Cursorille/kehittäjälle. Jokaiselle sivulle on määritelty tarkat muutokset, tekstit ja tekniset toteutukset.

---

### 2.1 ETUSIVU (/)

#### Hero-osio
**Nykytila:** Hero-kuva on nyt paikallaan (tehdaskuva, työntekijä sinisessä Hietakulma-paidassa). Otsikko ja teksti toimivat.

**Teksti (nykyinen, OK):**
- Otsikko: "Seinät ja katot arjen suojaksi"
- Alateksti: "Hietakulman arjenkestävät puutalot, -elementit ja -ristikot suunnitellaan ja rakennetaan Kankaanpäässä yli 30 vuoden kokemuksella."

**Muutosehdotus:** Vaihda alatekstiin konkreettisempi lupaus:

> "Hietakulman arjenkestävät puutalot, -elementit ja -ristikot suunnitellaan ja rakennetaan Kankaanpäässä yli 30 vuoden kokemuksella — kaikki yhdeltä luukulta suunnittelusta valmiiksi pintakäsiteltyihin elementteihin."

**CTA-napit (nykyinen):** KOHTEEMME | TARINAMME | TUOTTEEMME

**Muutosehdotus:** Vaihda ensimmäinen nappi "PYYDÄ TARJOUS" — se on konversiotavoitteen kannalta tärkein toiminto:

> PYYDÄ TARJOUS | KOHTEEMME | TUOTTEEMME

#### "Talosta kodiksi" -osio
**Nykytila:** Uudessa versiossa tässä on kohteiden karusellinäkymä (Villa Tähtiranta, Rivitalot, Rantakatu 5 jne.). Hyvä edistysaskel!

**Muutosehdotus:** Lisää osion kuvausteksti ennen karusellia:

> "Toteutamme rivi-, pari- ja omakotitalot yhteistyössä ammattirakentajien kanssa yksittäisistä kohteista aina useamman kohteen alueisiin saakka. Kaikkia kohteitamme yhdistää asiakaslähtöinen suunnittelu ja kustannustehokas tuotanto — me teemme taloja, joihin on helppo asettua kodiksi."

**Tekninen huomio:** Varmista, että kohdekortit linkittävät oikeisiin kohdesivuihin ja kuvat latautuvat oikein.

#### "Tuotteemme"-osio
**Nykytila:** Kolme tuotekategoriaa (P, E, R -ikoneilla) kuvauksilla ja linkeillä. Toimii hyvin.

**Tekstit (nykyiset OK, pieniä tarkennuksia):**

**Puutalot:**
> "Puutaloratkaisuja omakoti-, pari- ja rivitalokohteisiin sekä useamman rakennuksen kokonaisuuksiin."

**Puuelementit:**
> "Seinä- ja runkoelementtejä tehokkaaseen ja hallittuun puurakentamiseen."

*Korjaus:* "tehokkaaseen" → "tehokkaaseen" on väärin. Oikea muoto: "tehokkaaseen" tai paremmin:

> "Seinä- ja runkoelementtejä tehokkaaseen ja hallittuun puurakentamiseen — valmiiksi eristettyinä ja pintakäsiteltyinä tehtaaltamme."

**Kattoristikot:**
> "CE-merkityt kattoristikot vakioratkaisuina tai kohdekohtaisesti mitoitettuna."

**Muutosehdotus:** Lisää jokaiseen tuotekorttiin 2–3 avainfaktaa:

- Puutalot: "Yli 3 750 toimitettua kohdetta" + "30+ vuoden kokemus"
- Puuelementit: "U-arvo 0,17–0,21 W/m²K" + "Tehdasmaalaus vakiona"
- Kattoristikot: "CE-merkityt" + "Vakio- ja mittatilausristikot"

#### Yhteydenottolomake (footer-osio)
**Nykytila:** Lomake sisältää: Etunimi, Sukunimi, Sähköposti, Puhelin, Yritys (valinnainen), Aihe-pudotusvalikko, Viesti, GDPR-rasti, Lähetä-nappi. Yhteystiedot vasemmalla (puh, sähköpostit, osoite). Hyvä!

**Tarkistettavaa:**
- Varmista lomakkeen backend toimii (sähköposti-ilmoitus + tallennus)
- "LÄHETA" → korjaa "LÄHETÄ" (puuttuu Ä-kirjain)
- Lisää kiitosviesti lähetyksen jälkeen: "Kiitos yhteydenotostasi! Palaamme asiaan 1–2 arkipäivän kuluessa."

#### Footer
**Nykytila:** Hietakulma-logo, yhteystiedot, some-linkit (Facebook, Instagram), CE/Luotettava kumppani -merkit, © 2026.

**Muutosehdotukset:**
- Lisää Y-tunnus: 2547711-2
- Lisää linkki tietosuojaselosteeseen
- Tarkista some-linkkien kohteet oikeisiin profiileihin

---

### 2.2 TARINA-SIVU (/tarina)

**Nykytila:** Hero + yritystarina + tuote-esittely + yhteydenottolomake. Sisältö on kirjoitettu ja toimii.

**Parannusehdotukset:**

#### Avainluvut-palkki
Lisää Tarina-sivulle näkyvä avainlukupalkki (esim. heti hero-osion alle tai tarinatekstin yhteyteen):

| Luku | Teksti |
|------|--------|
| **30+** | vuotta kokemusta |
| **3 750+** | toimitettua kohdetta |
| **81 500+** | m² elementtipinta-alaa |
| **15–20** | ammattilaista |

#### Arvot ja erottautumistekijät
Lisää osio "Miksi Hietakulma" tai "Arvomme":

> **Kokonaispalvelu** — Suunnittelusta valmiiksi pintakäsiteltyihin elementteihin, kaikki yhdestä tehtaasta.
>
> **Tehdaslaatu** — Kontrolloidut olosuhteet takaavat tasalaatuisen lopputuloksen säällä kuin säällä.
>
> **Joustavuus** — Pienestä mökkiprojektista suureen rivitalokokonaisuuteen — mitoitamme palvelun tarpeesi mukaan.
>
> **Energiatehokkuus** — Elementtiemme U-arvot 0,17–0,21 W/m²K ylittävät nykyiset vaatimukset selvästi.

#### Aikajana (valinnainen rikastus)
Jos mahdollista, lisää visuaalinen aikajana:
- **1990-luku:** Yrityksen perustaminen Kankaanpäässä
- **2000-luku:** Elementtituotannon laajentaminen
- **2010-luku:** Kattoristikkotuotannon aloitus
- **2020-luku:** Digitalisointi ja tuotannon modernisointi
- **2025–2026:** Automaattinen linjatuotanto käyttöön (investointi 341 k€)

*Huom: Tarkista vuosiluvut Markku/Olli Hietaselta.*

---

### 2.3 PUUTALOT-SIVU (/puutalot)

**Nykytila:** Hero + "Suunnitelmasta valmiiksi kohteeksi" + 5-vaiheinen prosessikaavio + Hietakulman tarina -linkki + yhteydenottolomake.

**Teksti OK, pieniä tarkennuksia:**

#### Hero-osio
**CTA-napit:** PYYDÄ TARJOUS | KATSO KOHTEET — Hyvä!

**Muutosehdotus hero-alatekstiin:** Lisää konkretiaa toimitussisällöstä:

> "Toimitamme puutaloja avaimet käteen -periaatteella: suunnittelusta valmiiksi pintakäsiteltyihin ja eristettyihin elementteihin. Tyypillinen toimituspakettimme sisältää pääpiirustukset, ulkoseinäelementit, ikkunat, ovet, kattoristikot ja yläpohjan."

#### Prosessikaavio — vaiheiden kuvaukset
Nykyiset kuvaukset ovat lyhyitä. Ehdotan laajennettuja kuvauksia:

**1. TONTTI JA LUONNOS**
> "Tontin valinta ja alustavat suunnitelmat — kartoitamme tontin mahdollisuudet, laadimme alustavan pohjapiirroksen ja 3D-mallin."

**2. SUUNNITTELU JA LUVAT**
> "Arkkitehti- ja rakennesuunnittelu, energiatodistus sekä rakennuslupaprosessin hoitaminen — kaikki samasta talosta."

**3. BUDJETOINTI**
> "Tarkka kustannuslaskenta Talo-2000 -nimikkeistöllä, rahoitusratkaisujen kartoitus ja lopullinen tarjous."

**4. VALMISTUS**
> "Elementtien valmistus tehtaallamme kontrolloiduissa olosuhteissa — valmiiksi eristettyinä, ikkunoituna ja pintakäsiteltyinä."

**5. LUOVUTUS**
> "Elementtien toimitus ja asennus työmaalle, asennusohjeet ja tekninen tuki koko rakennusprojektin ajan."

#### Uusi osio: "Miksi puutalo elementeistä?"
Lisää prosessikaavion jälkeen osio, joka vastaa omakotirakentajan yleisimpään kysymykseen (elementtitalo vs. paikalla rakentaminen):

> **Nopeampi rakentaminen** — Elementit valmistetaan tehtaalla samalla kun perustukset rakennetaan. Säästöä aikataulussa viikkoja.
>
> **Tasalaatuinen lopputulos** — Tehtaan kontrolloidut olosuhteet takaavat, ettei sää, kosteus tai inhimilliset virheet vaikuta laatuun.
>
> **Energiatehokkuus** — Ulkoseinäelementtiemme U-arvo 0,17–0,21 W/m²K — ylittää nykyiset rakentamismääräykset selvästi.
>
> **Kokonaistoimituksen helppous** — Yksi toimittaja, yksi sopimus, yksi yhteyshenkilö. Ei tarvetta koordinoida kymmentä alihankkijaa.

---

### 2.4 PUUELEMENTIT-SIVU (/puuelementit)

**Nykytila:** Hero + "Turvallisuudesta ja laadusta tinkimättä" + "Ammattitaidolla viimeistelty" + Verhousvaihtoehtojen kortit + Tarina + Yhteydenotto.

**Parannusehdotukset:**

#### Teknisten tietojen lisääminen
Lisää osio "Elementtien tekniset tiedot" tai "Rakenneratkaisut":

**Ulkoseinäelementti (tyypillinen rakenne ulkoa sisäänpäin):**

| Kerros | Materiaali | Paksuus |
|--------|-----------|---------|
| Ulkoverhous | UTW-paneeli, tehdasmaalattu | 28 mm |
| Pystykoolaus | k600 | 32 mm |
| Tuulensuoja | Kipsilevy TS | 9 mm |
| Runko + eriste | Puurunko 42×198 mm + mineraalivilla | 198 mm |
| Höyrynsulku | Muovi 0,2 mm | — |
| Sisäverhous | Kipsilevy GEK | 13 mm |

**U-arvo: 0,17–0,21 W/m²K** (riippuen runkopaksuudesta 198/248 mm)

**Elementtikorkeus:** 2 760–3 950 mm (kohdekohtainen)

**Sähkövalmius:** Sähköputkitukset ja rasiat asennetaan tehtaalla asiakkaan sähkösuunnitelman mukaisesti.

#### Verhousvaihtoehtojen kuvaukset
Nykyiset verhouskorttien kuvaukset puuttuvat tai ovat lyhyitä. Lisää jokaiseen:

- **Vaakapanelointi:** Perinteinen ja ajaton valinta. UTW-profiili 28×195 mm, tehdasmaalattu kolmeen kertaan.
- **Pystypanelointi:** Moderni ja ryhdikäs ilme. Sopii erityisesti nykyaikaiseen arkkitehtuuriin.
- **Pysty-vaaka-pystypanelointi:** Elävä ja persoonallinen julkisivu, joka yhdistää molempien suuntien parhaat puolet.
- **Lomalaudoitus:** Luonnollinen ja perinteinen. Antaa julkisivulle elävän tekstuurin.
- **Rapattu pinnoite:** Kivitalomainen ilme puurakenteella. Moderni ja huoltovapaa vaihtoehto.

---

### 2.5 KATTORISTIKOT-SIVU (/kattoristikot)

**Nykytila:** Hero + "CE-Merkityt Kattoristikot" + "Valmiista mallista tai omista mitoista" + Tarina + Yhteydenotto.

**Huomio:** Uudessa versiossa kattoristikkovaihtoehtojen kortit eivät näy — ne olivat aiemmassa versiossa (8 ristikkotyyppiä). Tarkista, onko kyse sivun latauksesta vai onko ne poistettu.

**Ristikkotyyppikortit (palauta tai luo uudelleen):**

| Ristikkotyyppi | Tyypillinen käyttö | Jänneväli |
|---------------|-------------------|----------|
| **Harjaristikko** | Yleisin omakotitalokatto | 6–14 m |
| **Saksiristikko** | Avara sisätila, korkea harja | 8–16 m |
| **Murtoharjaristikko** | Monikerroksinen katto | 8–14 m |
| **Käyttöullakkoristikko** | Asuttava ullakkotila | 8–14 m |
| **Kehäristikko** | Hallit ja avoimet tilat | 10–24 m |
| **Pulpettiristikko** | Yksilappeinen katto | 4–12 m |
| **Pukkiristikko** | Laajat kattoalueet | 10–20 m |
| **Palkkiristikko** | Tasakatto ja loivat katot | 6–18 m |

**Lisää jokaiseen korttiin:**
- Yksinkertainen profiilivisualisointi (SVG/piirros)
- Tyypillinen jänneväli
- Yleisimmät käyttökohteet
- "Pyydä tarjous" -linkki

#### Uusi osio: "CE-merkinnän merkitys"
> "Kaikki kattoristikkomme ovat CE-merkittyjä EN 14250 -standardin mukaisesti. CE-merkintä takaa, että ristikot on suunniteltu ja valmistettu eurooppalaisten harmonisoidun standardin mukaisesti, ja niille on laadittu suoritustasoilmoitus (DoP). Suoritustasoilmoitukset löydät Tietopankistamme."

---

### 2.6 KOHTEET-SIVU (/kohteet)

**Nykytila:** Hero + 9 kohdekorttia oikeilla nimillä + Tarina + Yhteydenotto. Merkittävä parannus aiemmasta!

**Tarvittavat toimenpiteet:**

#### Kohdekorttien sisältö
Jokaiselle kohteelle tarvitaan yksittäinen kohdesivuvisio (tai vähintään laajennettu korttiview). Tiedot joita tarvitaan per kohde:

```
kohde:
  nimi: "Villa Tähtiranta"
  tyyppi: "Omakotitalo"
  sijainti: "Kaupunki"
  vuosi: 2024
  pinta_ala: "185 m²"
  toimitussisalto:
    - Pääpiirustukset ja 3D-mallinnus
    - Ulkoseinäelementit (tehdasmaalatut)
    - 3-lasiset ikkunat
    - Ulko-ovet ja terassiovet
    - Kattoristikot (harjaristikko)
    - Yläpohja (pelti/tiili)
  kuvaus: "Moderni puuvilla Pirkanmaalla. Avoin pohjaratkaisu ja suuret ikkunapinnat luovat valoisat ja tilavat asuintilat."
  kuvat:
    - julkisivu.jpg (pakollinen)
    - sisatila.jpg (toivottava)
    - rakennusvaihe.jpg (mahdollinen)
```

**HUOM: Kuvat ja tarkat tiedot on kerättävä projektiarkistosta tai henkilöstöltä (Tapani Katajisto / Olli Hietanen).**

#### Hero-alateksti
Nykyinen teksti OK. Ehdotettu tarkennus:

> "Olemme toteuttaneet yli 3 750 kohdetta ympäri Suomea — omakotitaloista rivitalokokonaisuuksiin. Tutustu valikoimaamme ja näe, miten puuelementtirakentaminen näyttää käytännössä."

---

### 2.7 TIETOPANKKI-SIVU (/tietopankki)

**Nykytila:** Hero + hakutoiminto + suodattimet (3 kategoriaa) + 11 dokumenttia + Yhteydenotto. Rakenne on erinomainen!

**Toimenpiteet:**

1. **Poista "(TEST)" ja "(test)"-merkinnät** kaikista dokumenttien nimistä
2. **Varmista PDF-tiedostojen toimivuus** — jokaisen latauslinkin tulee avata oikea dokumentti
3. **Lisää puuttuvat dokumentit:**
   - Toimitussisältöesimerkki (tyypillinen paketti)
   - Rakentajan muistilista (prosessin vaiheet)
   - Energiatehokkuustiedote (U-arvot, E-luku)

**Dokumenttien uudelleennimeäminen (selkeämmät nimet):**

| Nykyinen | Ehdotettu |
|---------|----------|
| Elementtien asennusohje | Elementtien asennusohje |
| Hietakulma Tuoteluettelo 2025 | Hietakulma Tuoteluettelo 2026 |
| HK-seinä 198mm | Seinäelementti 198 mm — rakennedetalji |
| HK-seinä 248mm | Seinäelementti 248 mm — rakennedetalji |
| Materiaalierittely pohja | Materiaalierittely (pohja) |
| Ristikoiden tuentaohje | Kattoristikoiden tuentaohje |
| Suoritusasiilmoitus (DoP) - Kattoristikot | Suoritustasoilmoitus (DoP) — Kattoristikot |
| Suoritusasiilmoitus (DoP) - Seinäelementit | Suoritustasoilmoitus (DoP) — Seinäelementit |
| Sähkö- ja LVI-suunnitteluopas | Sähkö- ja LVI-suunnitteluopas |
| Sähkövalmit elementit | Sähkövalmiit elementit — tuote-esittely |
| Ulkoverhousdetaljit | Ulkoverhouksen rakennedetaljit |

**Huom:** "Suoritusasiilmoitus" → kirjoitusvirhe, oikea muoto on "Suoritustasoilmoitus"

---

### 2.8 OTA YHTEYTTÄ -SIVU (/ota-yhteytta)

**Nykytila:** Hero + 5 henkilökorttia (Olli, Tapani, Jorma, Ville, Markku) + Laskutustiedot + Yhteydenotto. Erittäin hyvässä kunnossa!

**Pieniä korjauksia:**

1. **Tarkista tittelit:**
   - Jorma Salomäki: "Ristikkuotannon esimies" → "Ristikkotuotannon esimies" (kirjoitusvirhe)

2. **Lisää yleinen asiakaspalvelunumero näkyvästi:**
   > Puh. (02) 5730 300 | talotehdas@hietakulma.fi

3. **Karttaupotus:** Harkitse Google Maps -upotusta osoitteen yhteyteen (Koskenojankatu 11, Kankaanpää)

4. **Aukioloajat:** Lisää tehtaan/toimiston aukioloajat:
   > Ma–Pe 7:00–16:00

---

### 2.9 SEO-TOTEUTUS (kaikki sivut)

#### Meta-kuvaukset (< 160 merkkiä)

| Sivu | Title | Description |
|------|-------|-------------|
| Etusivu | Hietakulma Oy — Puutalot, puuelementit ja kattoristikot Kankaanpäästä | Suunnittelemme ja valmistamme tehdasvalmisteisia puutaloja, puuelementtejä ja CE-merkittyjä kattoristikoita yli 30 vuoden kokemuksella. Pyydä tarjous! |
| Tarina | Hietakulman tarina — Yli 30 vuotta puurakentamista | Kankaanpääläinen elementtitalovalmistaja, joka toimittaa kokonaisvaltaisen palvelun suunnittelusta valmiiksi elementeiksi. Tutustu tarinamme. |
| Puutalot | Puutalot elementeistä — Hietakulma Oy | Toteutamme omakoti-, pari- ja rivitaloja puuelementeistä. Kokonaistoimituspaketti suunnittelusta valmiiksi pintakäsiteltyihin elementteihin. |
| Puuelementit | Puuelementit — Tehdasvalmisteiset seinäelementit | Valmiiksi eristetyt ja pintakäsitellyt seinäelementit U-arvolla 0,17–0,21. Vaakapanelointi, pystypanelointi ja rapattu pinnoite. |
| Kattoristikot | CE-merkityt kattoristikot — Hietakulma Oy | CE-merkityt kattoristikot vakioratkaisuina tai mittatilaustyönä. Harjaristikot, saksiristikot, kehäristikot ja muut ratkaisut. |
| Kohteet | Referenssit ja kohteet — Hietakulma Oy | Tutustu toteuttamiimme kohteisiin: omakotitaloja, rivitaloja ja asuinalueita ympäri Suomea. Yli 3 750 toimitettua kohdetta. |
| Tietopankki | Tietopankki — Ohjeet, detaljit ja dokumentit | Lataa asennusohjeet, rakennedetaljit, suoritustasoilmoitukset ja tuotedokumentit Hietakulman puuelementeille ja kattoristikoille. |
| Ota yhteyttä | Ota yhteyttä — Hietakulma Oy | Yhteystiedot, henkilöstö ja yhteydenottolomake. Autamme rakennuskohteesi sopivan ratkaisun valinnassa. |

#### Alt-tekstit kuville
Lisää kuvaaavat alt-tekstit kaikkiin kuviin. Esimerkkejä:
- Hero: "Hietakulman työntekijä kokoamassa puuelementtejä tehtaalla Kankaanpäässä"
- Kohteet: "Villa Tähtiranta — moderni puutalo, julkisivukuva"
- Tuotteet: "Vaakapaneloitu seinäelementti, tehdasmaalattu harmaa"

#### Structured Data (Schema.org)
Lisää JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Hietakulma Oy",
  "description": "Tehdasvalmisteisia puutaloja, puuelementtejä ja CE-merkittyjä kattoristikoita",
  "url": "https://hietakulma.fi",
  "telephone": "+358504496321",
  "email": "talotehdas@hietakulma.fi",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Koskenojankatu 11",
    "addressLocality": "Kankaanpää",
    "postalCode": "38700",
    "addressCountry": "FI"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 61.8043,
    "longitude": 22.3949
  },
  "openingHours": "Mo-Fr 07:00-16:00",
  "foundingDate": "1993",
  "numberOfEmployees": "15-20"
}
```

---

### 2.10 TEKNISET KORJAUKSET

#### Kirjoitusvirheet (löydetyt)
1. **"LÄHETA"** → **"LÄHETÄ"** (Yhteydenottolomakkeen lähetysnappi, kaikki sivut)
2. **"Ristikkuotannon esimies"** → **"Ristikkotuotannon esimies"** (Ota yhteyttä -sivu, Jorma Salomäki)
3. **"Suoritusasiilmoitus"** → **"Suoritustasoilmoitus"** (Tietopankki, DoP-dokumenttien nimet)
4. **"tehokkaaseen"** — tarkista oikeinkirjoitus (Puuelementit-kortti etusivulla)
5. **"Verhousvaihtoehd0t"** — tarkista ettei ole nollaa O:n tilalla (Puuelementit-sivu)
6. **"Aakkosjärjestys"** vs "Aakkosjarjestys" — tarkista ä-kirjain (Tietopankki)

#### Suorituskyky
- Kuvien WebP-konversio ja lazy loading
- Hero-kuvan optimointi (nykyinen tehdaskuva on iso)
- Core Web Vitals -tarkistus ennen julkaisua

#### Mobiiliresponsiivisuus
- Testaa hero-osion luettavuus alle 768px näytöillä
- Navigaation hamburger-valikko mobiilissa
- Kohdekortit ja tuotekortit: varmista stackkaus pienillä näytöillä
- Yhteydenottolomake: varmista kenttien koko mobiilissa

---

### 2.11 PUUTTUVAT SIVUT / TOIMINNALLISUUDET

#### Tietosuojaseloste (pakollinen ennen julkaisua)
Luo /tietosuoja -sivu, joka sisältää:
- Rekisterinpitäjän tiedot (Hietakulma Oy)
- Henkilötietojen käsittelyn tarkoitus (yhteydenottolomake)
- Tietojen säilytysaika
- Rekisteröidyn oikeudet
- Evästekäytäntö

#### Evästebanneri
Lisää evästeilmoitus, jos sivustolla on Google Analytics tai muita seurantatyökaluja.

#### Sivukartta (sitemap.xml)
Generoi automaattinen sivukartta ja lähetä Google Search Consoleen julkaisun yhteydessä.

#### robots.txt
Varmista, että robots.txt sallii hakukoneiden indeksoinnin:
```
User-agent: *
Allow: /
Sitemap: https://hietakulma.fi/sitemap.xml
```

---

## OSA 3: YHTEENVETO JA PRIORITEETIT

### Kriittiset (estävät julkaisun)
1. Kohdesivujen sisältö (kuvat + tiedot) — **Vaatii aineistoa henkilöstöltä**
2. Tietopankin TEST-merkintöjen poisto ja dokumenttien viimeistely
3. Kirjoitusvirheiden korjaus (LÄHETÄ, Ristikkotuotannon, Suoritustasoilmoitus)
4. Tietosuojaseloste
5. Yhteydenottolomakkeen backend-toimivuus

### Tärkeät (parantavat merkittävästi)
6. SEO-metatiedot kaikille sivuille
7. Alt-tekstit kuviin
8. Etusivun tekstien tarkennukset (kokonaistoimitulupaus)
9. Tuotesivujen teknisten tietojen lisääminen
10. Ristikkotyyppikortit kattoristikot-sivulle

### Toivottavat (rikastus julkaisun jälkeen)
11. Tarina-sivun aikajana ja avainluvut
12. "Miksi puutalo elementeistä?" -osio
13. Google Maps -upotus
14. Schema.org structured data
15. Analytics-integraatiot (GA4, Search Console)

---

## OSA 4: KUVAVALINTA JA KUVAMATERIAALI

### 4.1 Kuvamateriaalin inventaario

OneDriven Kuvat-kansiossa on yhteensä noin 920 kuvaa jaettuna seuraaviin pääkategorioihin:

| Kansio | Sisältö | Kuvien lkm | Laatu |
|--------|---------|------------|-------|
| Koskenojankatu 11 kopterikuvat | Drone-kuvat tehtaasta | ~94 | Korkea (3–4 MB, DJI) |
| Kohteet/Kirjavaisenkatu 40 | Huunala A1/A2/B5/B7 ammattikuvat | ~196 | Erittäin korkea (HDR, ammattivalokuvaus) |
| Kohteet/Nokia, kuvaukset/Työmaakuvat | Ammattivalokuvaus työmaalta | ~186 | Korkea (3–6 MB, ammattikuvaaja) |
| Kohteet/Nokia (Kohde 1–2) | Valmis kohde, ammattikuvat | ~8 | Korkea (DSC-sarja, 5–10 MB) |
| Kohteet/Tampere (Kohde 9) | Valmis kohde, ammattikuvat | 5 | Korkea (DSC-sarja, 5–6 MB) |
| Kohteet/Pori (Kohde 3–8) | Valmiit kohteet, ammattikuvat | ~28 | Korkea (DSC-sarja, 5–9 MB) |
| Kohteet/Vesikkotie, Vantaa | Omakotitalo | 10 | Hyvä (2 MB) |
| Kohteet/Leppätie 5-9, Pori | Rivitalot | 13 | Hyvä (1 MB) |
| Kohteet/Hankreetintie 189, Pori | OKT 2025, tuore! | 7 | Hyvä (6–14 MB) |
| Kohteet/Höyläkatu | 2025, tuore! | 9 | Hyvä (1–4 MB) |
| Kohteet/Rivitalot/Pyrstötiaisentie | Rivitalot | 21 | Hyvä (5 MB) |
| Kohteet/Maitiaisentie, Tuusula | OKT/paritalo | 55 | Hyvä (1–2 MB) |
| Kohteet/Siiratie 5, Vantaa | Kohde | 56 | Keskitaso (0,5 MB) |
| Kohteet/Tehdas/Elementti | Elementtituotanto | ~25 | Hyvä (puhelinkuvat) |
| Kohteet/Tehdas/Ristikko | Ristikkotuotanto | ~12 | Hyvä (puhelinkuvat) |

### 4.2 Valitut kuvat sivukohtaisesti

Kuvat on valikoitu seuraavilla kriteereillä: ammattimaisuus, resoluutio (vähintään 2 MB), modernin rakentamisen ilme ja monipuolisuus.

**Kansiorakenne luotu:** `hietakulma.fi/verkkosivukuvat/`

#### HERO-KUVAT (etusivu + alasivut)

| Tiedosto | Lähde | Käyttökohde | Peruste |
|----------|-------|-------------|---------|
| `hero/tehdas-drone-01.jpg` | Koskenojankatu 11/DJI_0196.JPG | Tarina-sivu hero | Drone-kuva tehtaasta, näyttävä ilmakuva |
| `hero/tehdas-drone-02.jpg` | Koskenojankatu 11/DJI_0190.JPG | Vaihtoehtoinen hero | Eri kuvakulmasta |
| `hero/tehdas-drone-03.jpg` | Koskenojankatu 11/DJI_0192.JPG | Vaihtoehtoinen | Laajempi näkymä |
| `hero/tehdas-drone-restauroitu.jpg` | Restauroitu/HietakulmaOy_Koskenojankatu_11.jpg | Käsitelty versio | Restauroitu, valmis käyttöön |

*Huom: Etusivun hero-kuva (tehdaskuva työntekijästä) on jo sivustolla ja toimii hyvin. Drone-kuvat sopivat Tarina- ja tuotesivujen heroiksi.*

#### KOHTEET-SIVU — referenssikuvat

**Kirjavaisenkatu 40 / Huunala (paras kuvasarja):**

| Tiedosto | Sisältö | Käyttö |
|----------|---------|--------|
| `kohteet/kirjavaisenkatu-40/01_DJI_0965-HDR.jpg` | Drone-kuva, Huunala B7 | Kohdekortin pääkuva |
| `kohteet/kirjavaisenkatu-40/07_1KUV0829-HDR.jpg` | Julkisivu, lähikuva | Kohdesivun lisäkuva |
| `kohteet/kirjavaisenkatu-40/10_1KUV0904-HDR.jpg` | Sisätila / detalji | Kohdesivun lisäkuva |
| `kohteet/kirjavaisenkatu-40/28_1KUV1034-HDR.jpg` | Julkisivu, kokonaisuus | Vaihtoehtoinen pääkuva |
| + A1- ja A2-sarjan kuvat | Eri asunnot | Monipuolinen esittely |

*Peruste: Ammattivalokuvaajan HDR-kuvat, paras laatutaso koko arkistossa.*

**Nokia (Kohde 1 & 2):**

| Tiedosto | Sisältö |
|----------|---------|
| `kohteet/nokia/nokia-kohde1-01.jpg` | DSC01201.jpg — valmis kohde |
| `kohteet/nokia/nokia-kohde2-02.jpg` | DSC01256.jpg — julkisivu |
| `kohteet/nokia/nokia-kohde2-03.jpg` | DSC01997.jpg — kokonaisnäkymä (10 MB, paras) |

*Peruste: Ammattikameran DSC-kuvat, korkea resoluutio.*

**Tampere (Kohde 9):**

| Tiedosto | Sisältö |
|----------|---------|
| `kohteet/tampere/tampere-01.jpg` | DSC01790.jpg — julkisivu |
| `kohteet/tampere/tampere-02.jpg` | DSC02004.jpg — kokonaisnäkymä |

**Pori (Kohteet 3, 5, 6):**

| Tiedosto | Sisältö |
|----------|---------|
| `kohteet/pori/pori-kohde3-01.jpg` | DSC01887.jpg |
| `kohteet/pori/pori-kohde5-01.jpg` | DSC01798.jpg (9,5 MB — paras resoluutio) |
| `kohteet/pori/pori-kohde6-01.jpg` | DSC02971.jpg |

**Muut kohteet:**

| Kansio | Kuvat | Kohdetyyppi |
|--------|-------|-------------|
| `kohteet/vesikkotie-vantaa/` | 3 kuvaa | OKT, Vantaa |
| `kohteet/leppatie-pori/` | 3 kuvaa | Rivitalot, Pori |
| `kohteet/hankreetintie-pori/` | 2 kuvaa | OKT 2025, tuore! |
| `kohteet/hoylakatu/` | 2 kuvaa | 2025, tuore! |
| `kohteet/pyrstotiaisentie/` | 3 kuvaa | Rivitalot |
| `kohteet/maitiaisentie-tuusula/` | 2 kuvaa | OKT, Tuusula |

#### TEHDAS JA TUOTANTO — prosessikuvat

| Kansio | Kuvien lkm | Käyttö |
|--------|-----------|--------|
| `tehdas/elementtituotanto/` | 10 kuvaa + 11 Nokia-työmaakuvaa | Puuelementit-sivu, Tarina-sivu |
| `tehdas/ristikkotuotanto/` | 7 kuvaa | Kattoristikot-sivu |
| `tehdas/dronekuvat/` | 3 kuvaa | Tarina-sivu, About-hero |

*Nokia-työmaavalokuvaus (186 ammattikuvaa) on erityisen arvokas: kuvaa elementtien asennus- ja rakennusprosessia ammattimaisesti.*

#### LOGOT

| Tiedosto | Käyttö |
|----------|--------|
| `logot/Hietakulma_logo_valk.png` | Tumma tausta (header, footer) |
| `logot/Hietakulma_logo_cmyk_musta.jpg` | Vaalea tausta |

### 4.3 Sivukohtainen kuvakartta — missä mikäkin kuva

| Sivu | Hero-kuva | Sisältökuvat | Lähde |
|------|-----------|-------------|-------|
| **Etusivu** | Nykyinen tehdaskuva (OK) | Kohdekaruselli: kirjavaisenkatu, nokia, pori | kohteet/* |
| **Tarina** | `hero/tehdas-drone-restauroitu.jpg` | Tehdaskuvia, avainluvut-tausta | tehdas/dronekuvat/ |
| **Puutalot** | Nykyinen tai `kohteet/nokia/nokia-kohde2-03.jpg` | Prosessikuvat: nokia-työmaa | tehdas/elementtituotanto/ |
| **Puuelementit** | Nykyinen | Elementtikuvat: tehdas, verhous | tehdas/elementtituotanto/ |
| **Kattoristikot** | Nykyinen | Ristikkokuvat: tehdas | tehdas/ristikkotuotanto/ |
| **Kohteet** | Ei tarvita | 9 kohdekorttia: ks. alla | kohteet/* |
| **Tietopankki** | Nykyinen | — | — |
| **Ota yhteyttä** | Nykyinen | Henkilökuvat (jo paikallaan) | — |

### 4.4 Kohteet-sivun 9 korttia — kuvasuositus

| # | Kohteen nimi (sivustolla) | Kuvalähde | Tiedosto |
|---|--------------------------|-----------|----------|
| 1 | Villa Tähtiranta | *Puuttuu — tarvitaan erikseen* | — |
| 2 | Leppätien rivitalot | Leppätie 5-9, Pori | `kohteet/leppatie-pori/leppatie-01.jpg` |
| 3 | Rantakatu 5 | *Puuttuu — tarvitaan erikseen* | — |
| 4 | Vesikkotie 12 | Vesikkotie, Vantaa | `kohteet/vesikkotie-vantaa/vesikkotie-01.jpg` |
| 5 | Kirjavaisenkatu 40 | Kirjavaisenkatu 40/Huunala B7 | `kohteet/kirjavaisenkatu-40/01_DJI_0965-HDR.jpg` |
| 6 | Karhulan Kuusikko | *Puuttuu — tarvitaan erikseen* | — |
| 7 | As Oy Nokian Villa Sand | Nokia/Kohde 2 | `kohteet/nokia/nokia-kohde2-02.jpg` |
| 8 | Meritorinin rivitalot | *Käytä Pyrstötiaisentie* | `kohteet/pyrstotiaisentie/pyrstotiaisentie-01.jpg` |
| 9 | Nokian Havumetsä | Nokia/Kohde 1 | `kohteet/nokia/nokia-kohde1-01.jpg` |

**Puuttuvat kuvat (3 kohdetta):**
- Villa Tähtiranta — pyydä Tapanilta tai Ollilta
- Rantakatu 5 — pyydä Tapanilta tai Ollilta
- Karhulan Kuusikko — pyydä Tapanilta tai Ollilta

*Vaihtoehto: korvaa puuttuvat kohteet kohteilla joista on kuvat: Hankreetintie (OKT 2025), Höyläkatu (2025), Kirjavaisenkatu 40 (ammattikuvat), Maitiaisentie (Tuusula)*

### 4.5 Kopiointiskripti

Kansiossa `hietakulma.fi/verkkosivukuvat/` on valmis shell-skripti `kopioi-kuvat.sh`, joka kopioi kaikki valitut kuvat oikeisiin alikansioihin. Aja se OneDriven Markkinointi-kansiosta:

```bash
cd "Markkinointi - Tiedostot"
bash hietakulma.fi/verkkosivukuvat/kopioi-kuvat.sh
```

### 4.6 Kuvaoptimointi verkkosivuille

Ennen sivustolle vientiä kuvat tulee optimoida:

1. **Muoto:** Konvertoi WebP-muotoon (70–80 % pienemmät tiedostot)
2. **Hero-kuvat:** Max 1920×1080 px, < 300 KB
3. **Kohdekortit:** Max 800×600 px, < 150 KB
4. **Tuotekuvat:** Max 1200×800 px, < 200 KB
5. **Lazy loading:** Kaikki kuvat paitsi hero ja ensimmäinen kohdekortti

---

*Dokumentti laadittu ja päivitetty 7.3.2026 pohjautuen: verkkosivuston katselmointiin (master-branch), liiketoimintaraporttiin 2026, asiakasymmärrystutkimukseen (2 406 asiakasta), markkinatutkimukseen 2026, toimitussopimuksiin (45+ sopimusta), sähköpostianalyysiin, OneDrive-markkinointiaineistoon sekä kuvamateriaalin inventointiin (~920 kuvaa).*

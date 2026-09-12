# Vanhojen sivuosoitteiden kartoitus

Tarkistettu 12.9.2026 yrityksen nykyiseltä [referenssisivulta](https://hietakulma.fi/asiakaskertomukset) ja sen linkeistä. Alla oleva kartoitus täydentää jo toteutettuja pääsivujen ohjauksia. Tuotannon verkkotunnusta ei ole siirretty.

## Toteutetut pääsivujen ohjaukset

| Vanha polku | Uusi polku |
|---|---|
| `/puuristikot` | `/kattoristikot` |
| `/puutalot-ja-elementit` | `/puutalot` |
| `/asiakaskertomukset` | `/kohteet` |
| `/yritystarina` | `/tarina` |
| `/pyyda-tarjous-kattoristikko` | `/ota-yhteytta` |
| `/pyyda-tarjous-elementit` | `/ota-yhteytta` |
| `/favicon.ico` | `/icon.svg` |

Nämä ovat Next-konfiguraatiossa pysyviä 308-ohjauksia ja mukana selaintestin HTTP-tarkistuksessa. Sivut `/`, `/puutalot`, `/puuelementit`, `/kattoristikot`, `/kohteet`, `/tarina`, `/ota-yhteytta`, `/tietopankki` ja `/tietosuoja` ovat nykyisessä sovelluksessa käytössä.

## Vanhat yksittäiset referenssit

| Lähdesivu | Lähteestä tunnistettava kohde | Vastaavuus uudessa aineistossa |
|---|---|---|
| [rivitalo-porissa-4](https://hietakulma.fi/asiakaskertomukset/rivitalo-porissa-4) | 15 asuntoa, Mallirakennus, Aquapanel-julkisivu | Ei vahvistettua yksittäistä uutta kohdesivua. |
| [yritys-3](https://hietakulma.fi/asiakaskertomukset/yritys-3) | TilaCenterin monitoimikiinteistö Hervannassa | Ei sama kuin Porin Satakunnan Autopinta. |
| [yritys-1](https://hietakulma.fi/asiakaskertomukset/yritys-1) | Pellavaeristeinen omakotitalo Ulvilassa | Ei voida olettaa samaksi kuin Hankreetintien puukuitueristetty talo Porissa. |
| [rivitalo-nokialla-1](https://hietakulma.fi/asiakaskertomukset/rivitalo-nokialla-1) | 12 asuinhuoneistoa Nokialla | Ei voida olettaa samaksi kuin seitsemän asunnon Tokeenkatu 8. |
| [yritys-4](https://hietakulma.fi/asiakaskertomukset/yritys-4) | Valmiiksi maalattuja rivitaloelementtejä Poriin | Tarkka kohde ja yhteys Leppätien/Verstaantien kokonaisuuteen vahvistettava. |
| [yritys-5](https://hietakulma.fi/asiakaskertomukset/yritys-5) | Porin Antin-talojen asiakaskertomus | Ei sama asia kuin yksittäinen uusi kohdesivu; mahdollinen asiakastarinan säilyttäminen päätettävä. |
| [yritys-2](https://hietakulma.fi/asiakaskertomukset/yritys-2) | Paritaloja ammattirakentajille | Osoite puuttuu luettelon kuvauksesta; ei vahvistettua yhteyttä uuteen paritalokohteeseen. |
| [varastohalli-nokialla-2](https://hietakulma.fi/asiakaskertomukset/varastohalli-nokialla-2) | Luettelon mukaan 600 m² työ- ja varastohalli | Linkki löytyi sivun HTML:stä; erillisen sivun sisältö ei avautunut verkkolukijaan. Ei vahvistettua vastaavuutta. |

Näille ei lisätty arvattuja kohdekohtaisia uudelleenohjauksia. Olli/Tapani vahvistavat ennen domain-siirtoa, säilytetäänkö vanhat asiakastarinat, löytyykö sama kohde uudesta aineistosta vai ohjataanko poistuva tarina tietoisesti yleiseen kohdeluetteloon. Yleisohjaus ei säilytä vanhan tarinan sisältöä ja voi olla hakukoneelle heikko vastaavuus.

## Muut säilytettävät osoitteet ja rajaus

Vanhan sivuston `/download_file/115/182`, `/download_file/116/182` ja `/download_file/117/182` ovat lähdeaineistossa olevat sertifikaatti-, DoP- ja NR-ohjeosoitteet. Niitä ei saa ohjata uuteen eri asiakirjaan pelkän otsikon perusteella. Jorma/Olli vahvistavat hyväksytyt nykyversiot ja niiden julkisen tai kirjautuneen jakelun. Tarkistuspaketin `LAHTEET.md` sisältää versioepäselvyydet.

Tämä kartoitus perustuu sivuston näkyviin linkkeihin ja repositorion aineistoon. Search Consolea, analytiikkaa, palvelinlokeja tai kaikkia historiallisia URL-osoitteita ei ole saatavilla. Ennen domain-siirtoa niistä tarkistetaan saapuvaa liikennettä saavat muut osoitteet sekä mahdolliset PDF- ja kampanjalinkit. Puuttuvaa historiatietoa ei tulkita todisteeksi siitä, ettei muita osoitteita olisi käytössä.

# Luonnosten lähteet ja versiohavainnot

Inventoitu 12.9.2026. Tämä luettelo kertoo, mitä löytyi ja mitä todella tarkastettiin. Tiedoston olemassaolo tai muokkausaika ei osoita teknistä hyväksyntää.

## Paikalliset aineistot

Paikallisten lähteiden juuret ovat Ollin OneDrive-kansioissa. Alkuperäisiä sisäisiä asiakirjoja ei kopioida Git-repositorioon eikä verkkosivun `public`-kansioon.

| Tunnus | Lähde | Tarkastuksen laajuus ja havainto |
|---|---|---|
| L01 | `Myynti - Tiedostot/Detaljit/Alapohja/AP-US_198.pdf` | Yksi sivu luettu kuvana. Otsikko Ulkoseinäelementin liitos perustukseen. Tunnus AP-US_198, mittakaava 1:10. Päiväys, muutospäivä, tekijä ja rakennuskohde tyhjät. Rakennekerrokset kirjattu luonnokseen R198. |
| L02 | `Myynti - Tiedostot/Detaljit/YP/US_198-YP_pelti.pdf` | Yksi sivu luettu kuvana. Ulkoseinäelementin ja yläpohjan liitos, pystysaumapeltikate ja suora sisäkatto. Piirustuksen tunnus US_198-YP; päiväys, muutospäivä ja tekijä tyhjät. |
| L03 | `Myynti - Tiedostot/Detaljit/` | Tiedostoluettelo tarkastettu: 5 alapohja-PDF:ää, 39 yläpohja-PDF:ää, 2 LAM-tiedostoa ja yksi Knaufin tekninen PDF. Muiden piirustusten sisältöä ei ole tässä inventaariossa hyväksytty tai kattavasti luettu. |
| L04 | `OneDrive-HietakulmaOy/TEHTAAN TUOTANNON VALVONNAN KÄSIKIRJA_NR kattoristikot 1.5 14-6-2025.docx` | Kappaleteksti luettu. Kansiteksti ilmoittaa version 1.5 ja päiväyksen 14.6.2025. Luvussa 4.6 kuvataan toimituksen mukana annettavat asennusohjeet ja asennustyön tarkastuslomake. Asiakirjan loppuosan DoP-tekstissä päiväys 14.6.2025. Kuvia, allekirjoituksia ja kaikkien liitteiden täydellisyyttä ei ole vielä varmennettu. |
| L05 | `components/sections/WallStructureTable.tsx` | Verkkosivun nykyinen rakenne-esitys. Sisältää 198 mm rungon, U-arvoalueen sekä elementtien enimmäismittoja. Koodi on tarkistettavan sisältöväitteen lähde, ei tekninen todistus. |
| L06 | `app/puuelementit/page.tsx` | Nykyiset tuoteryhmät ja sanallinen toimitussisältö. Käytetään tuote-esittelyn luonnoksen pohjana; myyntilupaukset vahvistettava. |
| L07 | `app/kattoristikot/page.tsx` | Nykyinen ristikkosivun sisältö. CE-sanamuodot ja saatavilla olevia dokumentteja koskevat väitteet tarkistettava hyväksyttyjä aineistoja vasten. |

L01–L03 sijaitsevat jaetussa OneDrive-kirjastossa `OneDrive-Jaetutkirjastot-HietakulmaOy`. Rakennepiirustusten hakemistossa esiintyvät muun muassa 148, 198, 198+48 ja 223 -tunnukset. Tästä hakemistosta ei löytynyt tiedostonimellä tunnistettavaa 248 mm rakennedetaljia. 198+48- tai 223-tunnusta ei saa muuttaa 248:ksi päättelemällä.

## Yrityksen julkisella sivustolla löydetyt lähteet

| Tunnus | Osoite | Havainto ja avoin kysymys |
|---|---|---|
| V01 | https://hietakulma.fi/download_file/115/182 | Kattoristikkosivun sertifikaattilinkki 2412-CPD-215. Hyväksytty nykyversio ja voimassaolo varmistettava. |
| V02 | https://hietakulma.fi/download_file/116/182 | DoP 215–01/2013, päiväys 1.7.2013. Verkkolukijalla luettu teksti. Nykyisen asiakasversion hyväksyntä puuttuu. |
| V03 | https://hietakulma.fi/download_file/117/182 | 11-sivuinen PDF. Sivut 1, 10 ja 11 luettu kuvina: RIL 248-2008:n liite C, päiväys 15.4.2008; viimeisenä asennustyön tarkastuslomake. Nykyinen soveltuvuus vahvistettava. |
| V04 | https://hietakulma.fi/ota-yhteytta | Henkilöiden yhteystiedot ja roolit tarkistettu nykyiseltä julkiselta sivulta. |

## Jormalle ja Ollille ratkaistava versioristiriita

L04:n DoP-tekstissä on sama tunnus 215–01/2013 kuin julkisessa V02:ssa, mutta päiväys on 14.6.2025 eikä 1.7.2013. Pelkkä myöhempi päiväys ei todista, että kyseinen liite olisi hyväksytty tai allekirjoitettu. L04:n tekstissä esiintyy lisäksi valvontaa käsittelevässä kohdassa Control Union Finland Oy ja DoP-osassa Finotrol Oy. Näistä ei päätellä nykyistä ilmoitettua laitosta.

Tarvitaan vahvistus nykyisestä sertifikaatista, ilmoitetusta laitoksesta, hyväksytystä DoP:sta, allekirjoittajasta ja asiakasjakeluun tarkoitetusta tiedostosta. Uutta DoP:ta ei laadita yhdistämällä eri vuosien tietoja.

V03:n PDF-metatiedoissa on luontipäivä 11.10.2024, mutta ohjeen ja tarkastuslomakkeen painettu päiväys on 15.4.2008. Metatieto ei osoita ohjeen päivitystä. Jorma vahvistaa nykyisen ohjeversion ja lomakkeen; vanhan lähteen säädösviitteitä tai mitoitusarvoja ei siirretä uusiin ohjeisiin ilman tarkistusta. Muita V03:n sivuja ei tässä lähdetarkistuksessa arvioitu teknisesti.

## Sisältöväitteiden erot

L04:n yritysesittelyssä mainitaan 25 työntekijää ja toiminnan alkaminen vuonna 1990. Verkkosivun nykyisissä sisällöissä käytetään muita henkilöstö- ja kokemusta kuvaavia ilmaisuja. Tapani ja Olli vahvistavat julkaisuhetken avainluvut erikseen; vanhaa käsikirjatekstiä ei käytetä automaattisesti verkkosivun ajantasaisena tietolähteenä.

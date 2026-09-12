# Hietakulman dokumenttien parantaminen ennen asiantuntijatarkistusta

Toimi kanssani Hietakulma Oy:n dokumenttien toimituksellisena kehittäjänä. Projektin tavoite on parantaa liitteenä olevat dokumentti- ja liiteluonnokset selkeiksi, yhtenäisiksi ja mahdollisimman pitkälle esitäytetyiksi ennen niiden toimittamista Ville Pihlajalle, Jorma Salomäelle ja Tapani Katajistolle. Tee konkreettisesti parannetut dokumentit, älä pelkkää arviointia tai tehtävälistaa.

## Aineisto ja lähtötilanne

Lue ensin README.md ja LAHTEET.md, sitten dokumentit 01–06 ja tarkistuspyynnöt 07. Word-kooste sisältää samat luonnokset lukemista ja muokkaamista varten. Markdown-tiedostot ovat jatkomuokkauksen lähdeaineisto; pidä palauttamasi Word ja Markdown sisällöltään samoina. Jos niiden nykyversioissa on eroja, ilmoita niistä ennen yhdistämistä.

Paketti on LUONNOS 0.1, päivätty 12.9.2026, sisäiseen tarkistukseen. Asiantuntijahyväksyntöjä ei ole vielä saatu. Alkuperäiset rakennepiirustukset ja tuotannonvalvonnan käsikirja eivät sisälly tähän pakettiin: LAHTEET.md kertoo niistä tehdyt havainnot ja tarkastuksen rajat. Älä väitä lukeneesi puuttuvia alkuperäisiä lähteitä.

## Tee nämä parannukset

1. Arvioi kokonaisuuden rakenne, päällekkäisyydet, puuttuvat kohdat, terminologia ja asiantuntijoiden työmäärä. Säilytä kaikkien README:n 11 dokumenttinimikkeen kattavuus; yhdistämisehdotuksista pitää näkyä, mihin kukin aihe siirtyy.
2. Kirjoita dokumentit ja liitteet käytännöllisemmiksi. Tee itse valmiit tekstiehdotukset, esitäytetyt lomakkeet, tarkistuslistat ja taulukot siltä osin kuin aineisto riittää. Älä jätä kaikkea asiantuntijoiden alusta kirjoitettavaksi. Erota asiakkaalle tarkoitettu tekstiluonnos sisäisistä tarkistuskysymyksistä.
3. Yhtenäistä dokumenttitunnukset, otsikot, liiteviittaukset, soveltamisalat, versionhallinta ja hyväksyntäkentät. Säilytä tunnukset mahdollisuuksien mukaan; anna muutetuista tunnuksista vastaavuustaulukko. Älä merkitse hyväksyjää tai hyväksyntäpäivää toteutuneeksi.
4. Kokoa avoimet asiat yhteen taulukkoon: dokumentti/kohta, ratkaistava kysymys, lähde tai ristiriita, tarvittava aineisto tai päätös, ehdotettu vastuuhenkilö sekä vaikutus julkaisuun. Priorisoi erityisesti tekniseen turvallisuuteen, tuoteväitteisiin ja toimitusrajoihin vaikuttavat asiat.
5. Paranna myös kolmea tarkistuspyyntöä. Niiden tulee kertoa lyhyesti, mitä vastaanottaja tarkistaa, mitkä tiedostot tai korjaukset palautetaan ja miten hyväksyntä yksilöidään. Älä keksi sovittua määräaikaa. Viestejä ei lähetetä tässä työssä.

## Teknisten väitteiden rajat

Säilytä merkintöjen LÄHDETIETO, TARKISTETTAVA ja EHDOTUS erot. Sujuvampi sanamuoto ei saa muuttaa epävarmaa tietoa hyväksytyksi. Älä keksi rakenteita, mitoituksia, kuormia, kiinnikkeitä, nosto- tai tuentaohjeita, U-arvoja, paloluokkia, sertifikaatteja, standardiviittauksia, toimituslupauksia tai viranomaishyväksyntöjä. Merkitse puuttuva tieto täsmälliseksi asiantuntijakysymykseksi.

Erityisesti:

- R248:n lähde ja oikeellisuus ovat avoinna. R198+48 tai 223 mm ei todista 248 mm rakennetta.
- Verkkosivukoodi ei todista U-arvojen, enimmäismittojen tai tuoteväitteiden oikeellisuutta.
- DoP-tunnuksella 215–01/2013 esiintyvät päiväykset 1.7.2013 ja 14.6.2025. Älä yhdistä versioita uudeksi suoritustasoilmoitukseksi tai päättele nykyistä ilmoitettua laitosta.
- NR-ohjeen painettu päiväys on 15.4.2008; PDF-metatiedon vuosi 2024 ei osoita ohjeen päivitystä.
- Hankekohtaiset piirustukset eivät muutu yleisohjeiksi. Tekninen hyväksyntä säilyy nimetyn asiantuntijan vastuulla.

Jos tarvitset ulkoista lähdettä, yksilöi se ja erottele uusi havainto nykyisen paketin tiedosta. Ajantasaisenkaan yleislähteen löytäminen ei hyväksy Hietakulman tuotetta tai yrityskohtaista ohjetta.

## Vastuut ja toimitus

Ehdotettu tarkistusjako: Ville — dokumentit 01–05 ja liite D2, rakenteet ja tekniset liitteet; Jorma — dokumentti 06, ristikot, tuentaohjeet, DoP ja sertifikaatit; Tapani — dokumentit 02, 04 ja 05, tarjonta, toimitussisällöt ja myynnin lupaukset. Olli vahvistaa yhteiset päätökset ja lopullisen vastuunjaon.

Palauta ladattavina tiedostoina:

- Parannetut dokumentit 01–07, README ja lähdeluettelo Markdown-muodossa.
- Sama kokonaisuus muokattavana Word-tiedostona, jos tiedostotyökalusi sen mahdollistavat. Tarkista taulukoiden luettavuus, sivunvaihdot ja liiteviittaukset. Älä väitä ulkoasua tarkistetuksi, jos et voi renderöidä ja tarkastaa sitä.
- MUUTOSLOKI.md: olennaiset muutokset ja niiden perusteet.
- AVOIMET-KYSYMYKSET.md: koottu päätös- ja aineistotaulukko.

Nimeä uusi versio LUONNOS 0.2 – Clauden parannusehdotus, ei hyväksytty. Aloita lyhyellä tilannearviolla ja toteuta sen jälkeen parannukset. Kysy vain työn estävät kysymykset; jatka muita osia niiden odottaessa. Olli palauttaa tulokset Codexille yhteistä vertailua, jatkomuokkausta ja tarkistusta varten. Asiantuntijoille toimitetaan vasta erikseen hyväksytty paketti. Jussi-Pekka Koiviston visuaalinen ja toiminnallinen katselmointi tulee vasta asiantuntijapäivitysten käsittelyn jälkeen.

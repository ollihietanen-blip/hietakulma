# Riippuvuuspäivitys 12.9.2026

Next.js päivitetty versiosta 14.2.35 versioon 15.5.25, React versioon 19.3.0, NextAuth versioon 5.0.0-beta.32 ja Prisma versioon 6.19.3. Muut riippuvuudet päivitetty lukitustiedostossa sallittuihin versioihin. Firecrawl on vain `clone.js`-kehitystyökalun riippuvuus ja siirrettiin devDependencies-ryhmään.

Next 15:n vaatima asynkroninen `searchParams` korjattiin salasanan palautussivulle päivityscodemodilla. Muut dynaamiset sivut käyttivät jo asynkronisia parametreja. NextAuth on edelleen beta-versio; koko portaalipolku tarkistetaan jokaisessa sen päivityksessä.

`npm audit` ilmoitti aluksi 30 haavoittuvuutta. Päivityksen jälkeen lukitustiedostolle ajettu tarkistus: 0 haavoittuvuutta. Tulos kuvaa tarkistushetken rekisteritietoja, ei kaiken turvallisuuden kattavaa varmennusta.

## Välillisten riippuvuuksien override-määritykset

- Nextin PostCSS pakotetaan versioon 8.5.28. Next 15.5.25:n oma versio sisälsi audit-havainnon.
- `@prisma/config` käyttää `deepmerge-ts`-versiota 8.0.0. Prisma 6:n oma versio sisälsi audit-havainnon. Prisma-konfiguraation kutsukohta yhdistää tavallisia konfiguraatio-olioita; version 8 muuttuneet Map- ja deepmergeInto-toiminnot eivät ole siinä käytössä.

Tarkista ja poista override-määritykset, kun vastaavat korjaukset sisältyvät pääpaketteihin. Älä poista niitä ilman uutta audit-, Prisma- ja build-tarkistusta.

## Tarkistukset

- Node 24.19.0: Prisma Clientin generointi, neljä migraatiota erilliseen tyhjään SQLite-tiedostoon, kaikki 37 palvelin-/integraatiotestiä ja tuotantokooste hyväksytty.
- Projektin omiin tietokantoihin ei ajettu migraatioita. Tyhjä SQLite-tiedosto piti luoda ennen `migrate deploy` -komentoa; README sisältää havainnon.
- Chrome 1440 ja 390 px: rekisteröityminen → aktivointi → tietopankki → uloskirjautuminen → palautuspyyntö → salasanan vaihto → kirjautuminen hyväksytty oikealla erillisellä testitietokannalla. Sähköpostit otettiin paikallisesti talteen, mitään ei lähetetty.
- Julkinen QA: 17 sitemap-sivun HTTP/metatiedot, seitsemän uudelleenohjausta ja viiden tunnussivun noindex hyväksytty. Viiden julkisen sivun selainkoe, paikalliset henkilökuvat, kartan latausvalinta ja tietosuojasivu hyväksytty molemmissa näyttökoissa.
- Yhteydenoton simuloitu palveluvirhe, verkkokatko, virheellinen vastaus ja onnistunut uusi yritys hyväksytty molemmissa näyttökoissa. Odotetut 502/verkkokatko-konsolimerkinnät syntyivät testin tarkoituksellisista virheistä; ei JavaScript-ajonaikaisvirheitä.
- Ulkoisen esikatselun ja tuotannon Node-versio ja asetukset ovat edelleen varmentamatta.

Lähteet: [Next 15 -päivitysohje](https://nextjs.org/docs/app/guides/upgrading/version-15), [Nextin kuvankäsittelyn tietoturvakorjaus](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4), [deepmerge-ts 8:n muutokset](https://github.com/RebeccaStevens/deepmerge-ts/releases/tag/v8.0.0).

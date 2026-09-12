# Hietakulma Oy - Moderni verkkosivusto

Ammattimainen verkkosivusto Hietakulma Oy:lle, rakennettu Next.js 14+:lla, TypeScriptillä ja Tailwind CSS:llä.

## Ominaisuudet

- ✅ Moderni, responsiivinen suunnittelu
- ✅ TypeScript-tyypitetty koodi
- ✅ Komponenttipohjainen arkkitehtuuri
- ✅ SEO-optimointi (metadata, sitemap, robots.txt)
- ✅ Nopea suorituskyky (SSR/SSG)
- ✅ Optimoitu kuvien käsittely (Next.js Image)
- ✅ Saavutettavuus (a11y)
- ✅ Ylläpidettävä koodirakenne

## Teknologiapino

- **Next.js 14+** (App Router) - React-framework, SSR/SSG
- **TypeScript** - Tyypitetty koodi
- **Tailwind CSS** - Utility-first CSS
- **Next.js Image** - Automaattinen kuvaoptimointi
- **React Server Components** - Tehokas renderöinti

## Asennus

1. Asenna riippuvuudet:
```bash
npm install
```

2. Käynnistä kehityspalvelin:
```bash
npm run dev
```

3. Avaa selaimessa: [http://localhost:3000](http://localhost:3000)

## Build tuotantoon

```bash
npm run build
npm start
```

## Projektirakenne

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Päälayout
│   ├── page.tsx           # Etusivu
│   ├── puutalot/          # Puutalot-sivu
│   ├── puuelementit/      # Puuelementit-sivu
│   ├── puuristikot/       # Puuristikot-sivu
│   ├── kohteet/           # Kohteet-sivu
│   ├── tarina/            # Tarina-sivu
│   ├── tietopankki/       # Tietopankki-sivu
│   └── ota-yhteytta/      # Yhteystiedot-sivu
├── components/             # React-komponentit
│   ├── ui/                # UI-komponentit
│   ├── layout/            # Layout-komponentit
│   └── sections/          # Sivuspesifiset osiot
├── lib/                    # Apufunktiot
│   ├── content/           # Sisällön käsittely
│   └── utils/             # Yleiset apufunktiot
├── types/                  # TypeScript-tyypit
└── cloned-website/        # Firecrawl-kloonattu sisältö
```

## Sivut

- **Etusivu** (`/`) - Hero, projektit, tarina, tuotteet
- **Puutalot** (`/puutalot`) - Puutalojen esittely
- **Puuelementit** (`/puuelementit`) - Puuelementtien esittely
- **Puuristikot** (`/puuristikot`) - Kattoristikoiden esittely
- **Kohteet** (`/kohteet`) - Projektigalleria
- **Tarina** (`/tarina`) - Yritysesittely
- **Tietopankki** (`/tietopankki`) - PDF-dokumentit
- **Ota yhteyttä** (`/ota-yhteytta`) - Yhteystiedot

## SEO

Sivusto sisältää:
- Metadata-optimointi
- Open Graph -tagit
- Twitter Card -tuki
- Sitemap.xml
- robots.txt

## Kehitys

### Lisää uusi sivu

1. Luo uusi tiedosto `app/[sivu]/page.tsx`
2. Lisää navigaatioon `components/layout/Header.tsx`
3. Lisää sitemapiin `app/sitemap.ts`

### Muokkaa sisältöä

Sisältö on määritelty:
- `lib/content/homepage.ts` - Etusivun sisältö
- `lib/content/contacts.ts` - Yhteystiedot
- `lib/content/parser.ts` - Markdown-parseri (jos käytössä)

## Lisenssi

Copyright © Hietakulma Oy


## Tietopankin paikallinen kehitys ja testaus

Riippuvuuspäivitys on tarkistettu Node 24.19.0:lla. Käytä Node 24:ää; kehitystyökaluna oleva Firecrawl edellyttää vähintään Node 22:ta. Asenna lukitut riippuvuudet komennolla `npm ci`.

Kopioi `.env.example` tiedostoksi `.env.local` ja aseta paikalliset salaisuudet ennen kehityspalvelimen käynnistystä. Prisma-komennot lukevat myös `.env.local`-tiedoston. Olemassa olevat prosessin ympäristömuuttujat ovat ensisijaisia.

```bash
npm run db:generate
npm run db:migrate
npm run dev
```

`db:migrate` kohdistuu määritettyyn `DATABASE_URL`-tietokantaan. Varmista kohde ennen komentoa. Uusin migraatio lisää salasanan palautukset, istuntojen version ja yritysrajoituksen; vanhaa tietokantaa ei voi käyttää uuden koodin kanssa ilman migraatiota.

Uudessa SQLite-ympäristössä luo ensin tietokannan hakemisto ja tyhjä tiedosto valittuun osoitteeseen. Prisma 6.19.3:n `migrate deploy` palautti paikallisessa kokeessa yleisen `Schema engine error` -virheen, kun tiedostoa ei ollut; tyhjään olemassa olevaan tiedostoon kaikki neljä migraatiota onnistuivat. Älä korvaa tai tyhjennä olemassa olevaa tietokantaa.

```bash
npm test
npm run build
```

Palvelin-/integraatiotestit käyttävät tilapäistä SQLite-tietokantaa ja simuloitua sähköpostipalvelua. Ne eivät lähetä sähköposteja tai kirjoita projektin käyttäjätietokantaan. Integraatiotestien tietokannan alustaminen edellyttää Python 3:a.

Salasanan palautus avautuu kirjautumissivun **Unohtuiko salasana?** -linkistä. Palautuslinkki on voimassa 30 minuuttia, toimii kerran ja mitätöi vanhat kirjautumisistunnot. Sähköpostiin perustuvat yritysrajat ovat kirjautumiselle 10 ja rekisteröitymis-/palautuspyynnöille 5 yritystä 15 minuutin kiinteässä aikaikkunassa. Tietokantarajoitus ei korvaa tuotantopalvelun mahdollista verkko- tai IP-kohtaista kuormitusrajoitusta.

Tuotannossa `NEXT_PUBLIC_APP_URL` tulee asettaa oikeaan HTTPS-osoitteeseen ilman polkua. Tuotannon pysyvä tietokanta ja Vercel-asetukset on varmistettava erikseen ennen julkaisua; paikallinen SQLite-tiedosto ei todista niiden toimivuutta.

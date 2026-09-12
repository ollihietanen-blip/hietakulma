# Resendin lähettäjävahvistus – valmisteltu, ei toteutettu

12.9.2026. Kohde: `hietakulma.fi`, Resend Free, Ireland (`eu-west-1`). Resend-domainin tunnus: `186d9b36-26ea-4dc0-88c2-7b6aa163f0ec`. Tietueet luettiin tämän domainin Resend-hallinnasta. Tila oli **Not Started**. DNS-muutoksia ei ole tehty.

## Lisättävät tietueet

| Tyyppi | Täydellinen nimi | Arvo | Prioriteetti | TTL |
|---|---|---|---|---|
| TXT | `resend._domainkey.hietakulma.fi` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCq+hysbRDGNlxwsoOcoujKb35msCS+xKZRmKAR6tRDAMn9IGU8Hkwuuq966N3mGARgAURBVJQQA8QhjHrCnkXf7tgY5OUh2ZCF960+PSY2zPiUrymrbTdgIDBFelELhAS94sRgjH+nmQ44eKKzWJBXiGwoC001xpmU5j5WH0rsswIDAQAB` | – | Palvelun oletus / Auto |
| MX | `send.hietakulma.fi` | `feedback-smtp.eu-west-1.amazonses.com` | 10 | Palvelun oletus / Auto |
| TXT | `send.hietakulma.fi` | `v=spf1 include:amazonses.com ~all` | – | Palvelun oletus / Auto |

DKIM-arvo on julkinen vahvistusavain, ei API-salaisuus. DNS-paneelissa, joka lisää domainin automaattisesti, nimiksi annetaan `resend._domainkey` ja `send`. Varmista käytäntö paneelista ennen tallennusta.

## Nykyinen DNS ja muutoksen rajaus

Julkinen DNS-kysely palautti nimipalvelimiksi `ns1.he.net`–`ns5.he.net` ja päädomainin MX-tietueeksi prioriteetilla 1 `hietakulma-fi.mail.protection.outlook.com`. Resendin kolmessa yllä mainitussa nimessä ei ollut kyselyhetkellä vastaavia tietueita. DNS-ylläpidon käyttäjätili ja vastuuhenkilö ovat vahvistamatta.

Päädomainin nykyistä MX-tietuetta tai Microsoft 365:n muita tietueita ei korvata. Resendin Enable Receiving pidetään pois päältä; tämä työ koskee sovelluksen lähettämiä viestejä. Resend ehdotti valinnaista DMARC-tietuetta `v=DMARC1; p=none;`, mutta sitä ei sisällytetä automaattisesti tähän muutokseen: yrityksen DMARC-käytäntö sovitaan erikseen.

## Toteutuksen jälkeinen tarkistus

DNS-ylläpitäjä tarkistaa tietueiden nykytilan uudelleen, lisää yllä olevat kolme tietuetta hyväksynnän jälkeen ja vahvistaa ne Resendin **Verify DNS Records** -toiminnolla. Vasta Verified-tilan jälkeen testataan oikea sähköpostitoimitus erikseen hyväksytyillä vastaanottajilla. Tilin perustamislupa ei sisältänyt DNS-muutoksia tai lähetyslupaa.

Lähettäjäasetukseksi valmistellaan `Hietakulma <noreply@hietakulma.fi>`. Se ei luo postilaatikkoa. API-avaimen oikeus on **Sending access**; domain-valitsin tarjosi luontihetkellä vain **All domains**. Rajaa avain `hietakulma.fi`-domainiin, kun palvelu sallii sen. Avainta ei käytetä asetusten tai domainien hallintaan.

Lähde: https://resend.com/domains/186d9b36-26ea-4dc0-88c2-7b6aa163f0ec (kirjautuminen vaaditaan). Ohje: https://resend.com/docs/dashboard/domains/introduction

import Section from '@/components/sections/Section';

export const metadata = {
  title: 'Tietosuojaseloste - Hietakulma Oy',
  description:
    'Hietakulma Oy:n tietosuojaseloste. Tietoa henkilötietojen käsittelystä, rekisteröidyn oikeuksista ja evästekäytännöstä.',
};

export default function TietosuojaPage() {
  return (
    <Section background="white">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-text">Tietosuojaseloste</h1>
        <p className="text-sm text-gray-500 mb-8">Päivitetty 8.3.2026</p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-text">1. Rekisterinpitäjä</h2>
        <p className="text-gray-700 leading-relaxed">
          Hietakulma Oy<br />
          Y-tunnus: 2547711-2<br />
          Koskenojankatu 11<br />
          38700 Kankaanpää<br />
          Puh. 02 573 0300<br />
          talotehdas@hietakulma.fi
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-text">2. Henkilötietojen käsittelyn tarkoitus</h2>
        <p className="text-gray-700 leading-relaxed">
          Käsittelemme henkilötietoja seuraaviin tarkoituksiin:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
          <li>Yhteydenottolomakkeen kautta lähetettyjen viestien vastaanottaminen ja niihin vastaaminen</li>
          <li>Asiakassuhteen hoitaminen ja tarjousten laatiminen</li>
          <li>Lakisääteisten velvoitteiden noudattaminen</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-text">3. Käsiteltävät henkilötiedot</h2>
        <p className="text-gray-700 leading-relaxed">
          Yhteydenottolomakkeen kautta keräämme seuraavat tiedot:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
          <li>Etunimi ja sukunimi</li>
          <li>Sähköpostiosoite</li>
          <li>Puhelinnumero</li>
          <li>Yrityksen nimi (vapaaehtoinen)</li>
          <li>Viestin sisältö</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-text">4. Käsittelyn oikeusperuste</h2>
        <p className="text-gray-700 leading-relaxed">
          Henkilötietojen käsittely perustuu rekisteröidyn antamaan suostumukseen (yhteydenottolomakkeen lähettäminen)
          sekä rekisterinpitäjän oikeutettuun etuun asiakassuhteen hoitamisessa.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-text">5. Tietojen säilytysaika</h2>
        <p className="text-gray-700 leading-relaxed">
          Yhteydenottolomakkeen kautta saadut tiedot säilytetään niin kauan kuin on tarpeen yhteydenoton
          käsittelemiseksi ja mahdollisen asiakassuhteen hoitamiseksi. Tiedot poistetaan viimeistään kahden (2)
          vuoden kuluttua viimeisestä yhteydenotosta, ellei lainsäädäntö edellytä pidempää säilytysaikaa.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-text">6. Tietojen luovutus ja siirto</h2>
        <p className="text-gray-700 leading-relaxed">
          Henkilötietoja ei luovuteta kolmansille osapuolille markkinointitarkoituksiin. Tietoja voidaan luovuttaa
          viranomaisille lainsäädännön niin edellyttäessä. Sähköpostin välittämiseen käytämme Resend-palvelua,
          jonka palvelimet voivat sijaita EU/ETA-alueen ulkopuolella. Tiedonsiirto perustuu EU:n hyväksymiin
          vakiosopimuslausekkeisiin.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-text">7. Rekisteröidyn oikeudet</h2>
        <p className="text-gray-700 leading-relaxed">
          Sinulla on EU:n yleisen tietosuoja-asetuksen (GDPR) mukaisesti oikeus:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
          <li>Saada pääsy omiin henkilötietoihisi ja pyytää niistä jäljennös</li>
          <li>Pyytää tietojesi oikaisemista tai poistamista</li>
          <li>Rajoittaa tai vastustaa tietojesi käsittelyä</li>
          <li>Siirtää tietosi toiselle rekisterinpitäjälle (tietojen siirrettävyys)</li>
          <li>Peruuttaa suostumuksesi milloin tahansa</li>
          <li>Tehdä valitus tietosuojavaltuutetulle, mikäli koet, ettei tietojasi käsitellä asianmukaisesti</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          Voit käyttää oikeuksiasi ottamalla yhteyttä sähköpostitse osoitteeseen{' '}
          <a href="mailto:talotehdas@hietakulma.fi" className="text-blue underline hover:opacity-80">
            talotehdas@hietakulma.fi
          </a>.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-text">8. Tietosuojavaltuutetun yhteystiedot</h2>
        <p className="text-gray-700 leading-relaxed">
          Tietosuojavaltuutetun toimisto<br />
          Käyntiosoite: Lintulahdenkuja 4, 00530 Helsinki<br />
          Postiosoite: PL 800, 00531 Helsinki<br />
          Puhelinvaihde: 029 566 6700<br />
          tietosuoja.fi
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-text">9. Evästekäytäntö</h2>
        <p className="text-gray-700 leading-relaxed">
          Verkkosivustomme käyttää vain teknisesti välttämättömiä evästeitä, jotka ovat tarpeen sivuston
          perustoimintojen varmistamiseksi. Emme käytä analytiikka- tai markkinointievästeitä ilman
          erillistä suostumustasi.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Välttämättömiä evästeitä ovat esimerkiksi istuntoevästeet, jotka mahdollistavat sivuston
          toiminnan. Nämä evästeet eivät edellytä suostumustasi ja ne poistetaan selaimen sulkemisen yhteydessä.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-text">10. Tietoturva</h2>
        <p className="text-gray-700 leading-relaxed">
          Henkilötiedot suojataan asianmukaisin teknisin ja organisatorisin toimenpitein luvattomalta pääsyltä,
          muuttamiselta, luovuttamiselta, hävittämiseltä tai muulta laittomalta käsittelyltä. Yhteydenottolomakkeen
          tiedot välitetään salattua HTTPS-yhteyttä käyttäen.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-text">11. Selosteen muutokset</h2>
        <p className="text-gray-700 leading-relaxed">
          Pidätämme oikeuden päivittää tätä tietosuojaselostetta. Muutokset tulevat voimaan, kun päivitetty
          seloste on julkaistu verkkosivuillamme. Suosittelemme tarkistamaan tämän selosteen säännöllisesti.
        </p>
      </div>
    </Section>
  );
}

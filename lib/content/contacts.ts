import { ContactPerson } from '@/types/content';

export const contactPersons: ContactPerson[] = [
  {
    name: 'Olli Hietanen',
    title: 'Toimitusjohtaja',
    phone: '050 4496 321',
    email: 'olli.hietanen@hietakulma.fi',
    image: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/cec6f6bc-90f6-4ea3-afcf-266c3f7f655b/hk_web_hlok_0000.jpg',
  },
  {
    name: 'Tapani Katajisto',
    title: 'Myyntipäällikkö',
    phone: '040 6378 333',
    email: 'tapani.katajisto@hietakulma.fi',
    image: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/bde7e5e5-04c6-41d9-aca7-ca01157acdd5/hk_web_hlok_0003.jpg',
  },
  {
    name: 'Jorma Salomäki',
    title: 'Ristikkotuotannon esimies',
    phone: '044 5724 007',
    email: 'jorma.salomaki@hietakulma.fi',
    image: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/4a91acd0-dad9-4e8c-81dd-1f88544c984e/hk_web_hlok_0005.jpg',
  },
  {
    name: 'Ville Pihlaja',
    title: 'Tehtaanjohtaja',
    phone: '040 7240 632',
    email: 'ville.pihlaja@hietakulma.fi',
    image: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/e82c3ef8-b136-4f8b-8001-62cc78c46090/hk_web_hlok_0001.jpg',
  },
  {
    name: 'Markku Hietanen',
    title: 'Hallituksen puheenjohtaja',
    phone: '0500 597 405',
    email: 'markku.hietanen@hietakulma.fi',
    image: 'https://images.squarespace-cdn.com/content/v1/67fd435b2995dc1e8e125040/6d3ea60d-8a9a-4e45-8def-8fbadbd1696c/hk_web_hlok_0004.jpg',
  },
];

export const billingInfo = {
  electronicInvoices: {
    operator: 'Maventa',
    intermediaryId: '003721291126',
    address: '003725477112',
  },
  emailScanning: '25477112@scan.netvisor.fi',
  paperInvoices: {
    company: 'Hietakulma Oy',
    businessId: '25477112',
    address: 'PL 100',
    postalCode: '80020',
    city: 'Kollektor Scan',
  },
};


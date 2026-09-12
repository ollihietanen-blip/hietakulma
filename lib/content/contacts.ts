import { ContactPerson } from '@/types/content';

export const companyInfo = {
  name: 'Hietakulma Oy',
  phone: '02 573 0300',
  email: 'talotehdas@hietakulma.fi',
  emailTruss: 'ristikkotehdas@hietakulma.fi',
  address: 'Koskenojankatu 11',
  postalCode: '38700',
  city: 'Kankaanpää',
  businessId: '2547711-2',
};

export const contactPersons: ContactPerson[] = [
  {
    name: 'Olli Hietanen',
    title: 'Toimitusjohtaja',
    phone: '050 4496 321',
    email: 'olli.hietanen@hietakulma.fi',
    image: '/images/henkilot/olli-hietanen.jpg',
  },
  {
    name: 'Tapani Katajisto',
    title: 'Myyntipäällikkö',
    phone: '040 6378 333',
    email: 'tapani.katajisto@hietakulma.fi',
    image: '/images/henkilot/tapani-katajisto.jpg',
  },
  {
    name: 'Jorma Salomäki',
    title: 'Ristikkotuotannon esimies',
    phone: '044 5724 007',
    email: 'jorma.salomaki@hietakulma.fi',
    image: '/images/henkilot/jorma-salomaki.jpg',
  },
  {
    name: 'Ville Pihlaja',
    title: 'Tehtaanjohtaja',
    phone: '040 7240 632',
    email: 'ville.pihlaja@hietakulma.fi',
    image: '/images/henkilot/ville-pihlaja.jpg',
  },
  {
    name: 'Markku Hietanen',
    title: 'Hallituksen puheenjohtaja',
    phone: '0500 597 405',
    email: 'markku.hietanen@hietakulma.fi',
    image: '/images/henkilot/markku-hietanen.jpg',
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


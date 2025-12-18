import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hietakulma.fi'; // Päivitä oikea domain

  const routes = [
    '',
    '/puutalot',
    '/puuelementit',
    '/kattoristikot',
    '/kohteet',
    '/tarina',
    '/tietopankki',
    '/ota-yhteytta',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}


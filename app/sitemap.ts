import { MetadataRoute } from 'next';
import { getAllKohdeSlugs } from '@/lib/content/kohteet';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hietakulma.fi';

  const staticRoutes = [
    '',
    '/puutalot',
    '/puuelementit',
    '/kattoristikot',
    '/kohteet',
    '/tarina',
    '/ota-yhteytta',
    '/tietosuoja',
  ];

  const kohdeRoutes = getAllKohdeSlugs().map((slug) => `/kohteet/${slug}`);

  return [...staticRoutes, ...kohdeRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : route.startsWith('/kohteet/') ? 0.7 : 0.8,
  }));
}

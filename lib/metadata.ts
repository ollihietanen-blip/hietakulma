import type { Metadata } from 'next';

export const siteUrl = 'https://hietakulma.fi';
export const defaultShareImage = '/images/hero/tehdas-drone-01.webp';

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const fullTitle = path === '/' ? title : `${title} | Hietakulma Oy`;
  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: `${siteUrl}${path === '/' ? '' : path}` },
    openGraph: {
      type: 'website', locale: 'fi_FI', siteName: 'Hietakulma Oy',
      url: `${siteUrl}${path === '/' ? '' : path}`, title: fullTitle, description,
      images: [{ url: defaultShareImage, alt: 'Hietakulman tehdas Kankaanpäässä' }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [defaultShareImage] },
  };
}

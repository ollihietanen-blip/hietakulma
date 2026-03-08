export interface PageContent {
  title: string;
  slug: string;
  content: string;
  metadata?: {
    description?: string;
    image?: string;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface ContactPerson {
  name: string;
  title: string;
  phone: string;
  email: string;
  image?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image?: string;
  link: string;
  keyFacts?: string[];
}

export interface KohdeImage {
  src: string;
  alt: string;
}

export interface Kohde {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  type: string;
  heroImage: string;
  thumbnailImage: string;
  galleryImages: KohdeImage[];
}


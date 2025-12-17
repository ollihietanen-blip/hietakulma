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
}


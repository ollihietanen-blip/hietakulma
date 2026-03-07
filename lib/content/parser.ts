import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { PageContent } from '@/types/content';

const contentDirectory = path.join(process.cwd(), 'cloned-website');

// Server-side only functions
export function getPageContent(slug: string): PageContent | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || slug,
      slug,
      content,
      metadata: {
        description: data.description,
        image: data.image,
      },
    };
  } catch (error) {
    console.error(`Error reading content for ${slug}:`, error);
    return null;
  }
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}

export function getAllPageSlugs(): string[] {
  try {
    const files = fs.readdirSync(contentDirectory);
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, ''))
      .filter((slug) => !slug.includes('_metadata') && slug !== 'sitemap');
  } catch (error) {
    console.error('Error reading content directory:', error);
    return [];
  }
}


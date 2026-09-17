import { documents } from './documents';

export const draftFiles = Object.fromEntries(documents.map(doc => [doc.id, {
  path: `content/portal-drafts/${doc.id}.md`,
  name: `Hietakulma-${doc.id}-LUONNOS-${doc.id.startsWith('HK-TP-') ? '0.4' : '0.5'}.md`,
  type: 'text/markdown; charset=utf-8',
}]));

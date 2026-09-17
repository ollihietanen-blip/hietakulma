import { readFile } from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { documents } from '@/lib/content/documents';
import { draftFiles } from '@/lib/content/document-files';
import { requireAuth } from '@/lib/auth';
import { isOpenPortalPreview } from '@/lib/portal-preview';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Dokumenttiluonnos — Tietopankki', robots: { index: false, follow: false } };

// Render the controlled draft format as React text, never executable source HTML.
function DraftBody({ text }: { text: string }) {
  const lines = text.split('\n');
  const blocks = [];
  const clean = (value: string) => value.replace(/\*\*|`/g, '');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('# ') || /^---+$/.test(line)) continue;
    if (line.startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const row = lines[i++].trim();
        if (!/^[\s|:\-]+$/.test(row)) rows.push(row.replace(/^\||\|$/g, '').split('|').map(cell => clean(cell.trim())));
      }
      i--;
      blocks.push(<div key={i} className="my-6 overflow-x-auto rounded border border-gray-300" tabIndex={0} role="region" aria-label="Luonnoksen taulukko"><table className="w-full min-w-[560px] border-collapse text-left text-sm"><thead className="bg-sand"><tr>{rows[0]?.map((cell, n) => <th key={n} scope="col" className="border-b border-gray-300 p-3">{cell}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, n) => <tr key={n}>{row.map((cell, j) => <td key={j} className="border-b border-gray-200 p-3 align-top">{cell}</td>)}</tr>)}</tbody></table></div>);
    } else if (line.startsWith('##')) {
      blocks.push(<h2 key={i} className="mb-3 mt-8 text-xl font-bold">{clean(line.replace(/^#+\s*/, ''))}</h2>);
    } else {
      blocks.push(<p key={i} className="my-3 whitespace-pre-wrap leading-relaxed">{clean(line)}</p>);
    }
  }
  return <>{blocks}</>;
}

export default async function DraftPage({ params }: { params: Promise<{ id: string }> }) {
  if (!isOpenPortalPreview()) await requireAuth();
  const { id } = await params;
  const doc = documents.find(item => item.id === id);
  if (!doc || !Object.hasOwn(draftFiles, id)) notFound();
  const text = await readFile(path.join(process.cwd(), draftFiles[id].path), 'utf8');
  return <main className="bg-white px-4 pb-20 pt-28 sm:px-6">
    <article className="mx-auto max-w-5xl">
      <Link href="/tietopankki" className="inline-block py-3 font-semibold text-blue underline">← Takaisin tietopankkiin</Link>
      <p className="mt-5 font-semibold text-gray-600">{id} · Luonnos {id.startsWith('HK-TP-') ? '0.4' : '0.5'}</p>
      <h1 className="my-4 break-words text-3xl font-bold sm:text-4xl">{doc.title}</h1>
      <aside className="my-6 border-l-4 border-blue bg-sand p-5">Tarkistettavaksi. Tämä luonnos ei ole hyväksytty tekninen ohje tai tuoteasiakirja. Avoimet kohdat ja hyväksynnät täydennetään ennen käyttöönottoa. Tarkistaja: {doc.owner}.</aside>
      <a download href={`/api/documents/${id}`} className="inline-block py-3 font-semibold text-blue underline">Lataa muokattava tekstiluonnos (.md)</a>
      <DraftBody text={text} />
    </article>
  </main>;
}

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { auth } from '@/lib/auth-options';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const files: Record<string, { path: string; name: string; type: string }> = {
  'tarkistuspaketti-word': {
    path: 'valmistelu/tarkistuspaketti-0.4/Hietakulma-tarkistuspaketti-LUONNOS-0.4.docx',
    name: 'Hietakulma-tarkistuspaketti-LUONNOS-0.4.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  'tarkistuspaketti-zip': {
    path: 'valmistelu/Hietakulma-tarkistuspaketti-LUONNOS-0.4.zip',
    name: 'Hietakulma-tarkistuspaketti-LUONNOS-0.4.zip',
    type: 'application/zip',
  },
};

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const headers = { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' };
  const session = await auth();
  if (!session?.user) return new Response('Kirjaudu tietopankkiin ladataksesi aineiston.', { status: 401, headers });
  const { id } = await params;
  const file = Object.hasOwn(files, id) ? files[id] : undefined;
  if (!file) return new Response('Aineistoa ei löytynyt.', { status: 404, headers });
  try {
    const content = await readFile(path.join(process.cwd(), file.path));
    return new Response(new Uint8Array(content), {
      headers: {
        ...headers,
        'Content-Type': file.type,
        'Content-Disposition': `attachment; filename="${file.name}"`,
        'Content-Length': String(content.byteLength),
      },
    });
  } catch {
    return new Response('Aineiston lataaminen ei juuri nyt onnistu. Yritä hetken kuluttua uudelleen.', { status: 503, headers });
  }
}

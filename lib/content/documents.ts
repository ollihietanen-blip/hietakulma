export interface Document {
  title: string;
  description: string;
  url: string;
  category: 'rakennetyypit' | 'ohjeet' | 'tuotedokumentit';
  type: 'pdf' | 'dwg' | 'docx' | 'zip';
  version: string;
}

// Current review material, published as drafts at Olli's request on 13.9.2026.
// Download routes authenticate every request; files are never placed in public/.
export const documents: Document[] = [
  {
    title: 'Dokumentit ja liitteet — muokattava Word-kooste',
    description: 'Seinärakenteet, materiaalierittely ja toimitusrajat, asennuksen valmistelu, talotekniikka, verhoukset sekä ristikoiden tuoteasiakirjojen tarkistus. Mukana liiteluonnokset ja tarkistuspyynnöt.',
    url: '/api/documents/tarkistuspaketti-word',
    category: 'tuotedokumentit',
    type: 'docx',
    version: 'Luonnos 0.4 · 13.9.2026',
  },
  {
    title: 'Koko tarkistuspaketti — dokumentit, liitteet ja lähteet',
    description: 'Word-kooste, erilliset Markdown-dokumentit ja liiteluonnokset, lukuohje, lähderekisteri, avoimet kysymykset sekä muutosloki yhdessä ZIP-paketissa.',
    url: '/api/documents/tarkistuspaketti-zip',
    category: 'tuotedokumentit',
    type: 'zip',
    version: 'Luonnos 0.4 · 13.9.2026',
  },
];

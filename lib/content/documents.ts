export interface Document {
  title: string;
  url: string;
  category: 'rakennetyypit' | 'ohjeet' | 'tuotedokumentit';
  type: 'pdf' | 'dwg';
}

// Add only documents whose content, version and customer distribution are verified.
// The former 11 entries all pointed to the same unrelated brand graphics PDF.
// Keep the catalogue empty until the actual customer documents are available.
export const documents: Document[] = [];

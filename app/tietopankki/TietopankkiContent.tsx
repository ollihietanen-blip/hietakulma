'use client';

import { useState, useMemo } from 'react';
import Section from '@/components/sections/Section';

interface Document {
  title: string;
  url: string;
  category: string;
  type?: 'pdf' | 'dwg';
}

const documents: Document[] = [
  {
    title: 'HK-seinä 198mm (TEST)',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'rakennetyypit',
    type: 'pdf',
  },
  {
    title: 'Sähkövalmiit elementit (TEST)',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'rakennetyypit',
    type: 'pdf',
  },
  {
    title: 'HK-seinä 248mm (TEST)',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'rakennetyypit',
    type: 'pdf',
  },
  {
    title: 'Ulkoverhousdetaljit (TEST)',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'rakennetyypit',
    type: 'pdf',
  },
  {
    title: 'Elementtien asennusohje (test)',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'ohjeet',
    type: 'pdf',
  },
  {
    title: 'Sähkö- ja LVI-suunnitteluopas (test)',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'ohjeet',
    type: 'pdf',
  },
  {
    title: 'Ristikoiden tuentaohje (test)',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'ohjeet',
    type: 'pdf',
  },
  {
    title: 'Suoritustasoilmoitus (DoP) - Seinäelementit',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'tuotedokumentit',
    type: 'pdf',
  },
  {
    title: 'Suoritustasoilmoitus (DoP) - Kattoristikot',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'tuotedokumentit',
    type: 'pdf',
  },
  {
    title: 'Hietakulma Tuoteluettelo 2025',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'tuotedokumentit',
    type: 'pdf',
  },
  {
    title: 'Materiaalierittelypohja',
    url: 'https://pentagon-dolphin-ztr3.squarespace.com/s/hietakulma-graafiset-elementit_V1.pdf',
    category: 'tuotedokumentit',
    type: 'pdf',
  },
];

const categories = {
  rakennetyypit: 'Rakennetyypit ja detaljit',
  ohjeet: 'Asennus- ja suunnitteluohjeet',
  tuotedokumentit: 'Tuotedokumentit',
};

type SortOption = 'alphabetical' | 'category';

export default function TietopankkiContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['rakennetyypit', 'ohjeet', 'tuotedokumentit']);
  const [sortBy, setSortBy] = useState<SortOption>('alphabetical');

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let filtered = documents.filter((doc) => {
      // Search filter
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      // Category filter
      const matchesCategory = selectedCategories.includes(doc.category);
      return matchesSearch && matchesCategory;
    });

    // Sort documents
    if (sortBy === 'alphabetical') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title, 'fi'));
    } else if (sortBy === 'category') {
      filtered = [...filtered].sort((a, b) => {
        const categoryOrder = ['rakennetyypit', 'ohjeet', 'tuotedokumentit'];
        const aIndex = categoryOrder.indexOf(a.category);
        const bIndex = categoryOrder.indexOf(b.category);
        if (aIndex !== bIndex) return aIndex - bIndex;
        return a.title.localeCompare(b.title, 'fi');
      });
    }

    return filtered;
  }, [searchQuery, sortBy, selectedCategories.join(',')]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories(['rakennetyypit', 'ohjeet', 'tuotedokumentit']);
    setSortBy('alphabetical');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategories.length < 3 || sortBy !== 'alphabetical';

  // Get document type icon
  const getDocumentIcon = (type?: string) => {
    if (type === 'dwg') {
      return (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    }
    // Default PDF icon
    return (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
      </svg>
    );
  };

  return (
    <Section background="white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-lg text-gray-700 mb-4 text-center">
          Hietakulman tietopankki kokoaa yhteen suunnittelun tueksi tarvittavat materiaalit: detaljipiirrustukset,
          rakennetyypit, asennus- ja suunnitteluohjeet sekä valmiit tuotedokumentit.
        </p>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Meiltä saat myös sähkövalmiit elementit, CE-merkityt kattoristikot ja valmiiksi maalatut ulkoverhoukset –
          nyt kaikki tieto yhdessä paikassa.
        </p>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Hae dokumentteja..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue transition-colors"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(categories).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => toggleCategory(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategories.includes(key)
                      ? 'bg-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="ml-auto flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600 font-medium whitespace-nowrap">
                Järjestä:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all bg-white text-gray-900 cursor-pointer min-w-[160px]"
                style={{
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '12px 8px',
                } as React.CSSProperties}
              >
                <option value="alphabetical">Aakkosjärjestys</option>
                <option value="category">Kategoria</option>
              </select>
            </div>
          </div>

          {/* Results count and clear filters */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredDocuments.length} {filteredDocuments.length === 1 ? 'dokumentti' : 'dokumenttia'}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue hover:opacity-80 font-medium transition-colors"
              >
                Tyhjennä suodattimet
              </button>
            )}
          </div>
        </div>

        {/* Documents List */}
        {filteredDocuments.length > 0 ? (
          <div className="grid gap-4">
            {filteredDocuments.map((doc, index) => (
              <a
                key={index}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-gray-50 hover:bg-blue/10 border-2 border-transparent hover:border-blue/30 rounded-lg transition-all group"
              >
                {/* Document Type Icon */}
                <div className="flex-shrink-0 text-blue transition-colors">
                  {getDocumentIcon(doc.type)}
                </div>

                {/* Document Info */}
                <div className="flex-grow min-w-0">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue mb-1 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-500">{categories[doc.category as keyof typeof categories]}</p>
                </div>

                {/* Download Icon */}
                <div className="flex-shrink-0 text-gray-400 group-hover:text-blue transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Ei dokumentteja löytynyt hakuehdoilla.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue hover:opacity-80 font-medium transition-colors"
            >
              Tyhjennä suodattimet
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}


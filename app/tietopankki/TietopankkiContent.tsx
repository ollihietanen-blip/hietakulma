'use client';

import { useMemo, useState } from 'react';
import Section from '@/components/sections/Section';
import { documents, documentStatuses } from '@/lib/content/documents';

const categories = {
  rakennetyypit: 'Rakennetyypit ja detaljit',
  ohjeet: 'Asennus- ja suunnitteluohjeet',
  tuotedokumentit: 'Tuotedokumentit',
};
const statusStyles = {
  luonnos: 'bg-sky-50 text-sky-900',
  lahde: 'bg-stone-100 text-stone-800',
  taydennettava: 'bg-amber-50 text-amber-900',
  selvitettava: 'bg-violet-50 text-violet-900',
};

export default function TietopankkiContent() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const filtered = useMemo(() => documents.filter(doc =>
    (category === 'all' || doc.category === category)
    && (status === 'all' || doc.status === status)
    && `${doc.id} ${doc.title} ${doc.description} ${doc.owner}`.toLocaleLowerCase('fi').includes(search.trim().toLocaleLowerCase('fi')),
  ), [search, category, status]);
  const clear = () => { setSearch(''); setCategory('all'); setStatus('all'); };

  return (
    <Section background="white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-l-4 border-blue bg-sand p-5 sm:p-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide">Tietopankin sisältökartoitus</p>
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Mitä aineistoja meiltä tarvitaan?</h2>
          <p className="mb-3 text-base leading-relaxed">Varsinaiset dokumentit ja liitteet on koottu alle omilla nimillään. Näet, mistä on jo luonnos tai lähde ja mitä pitää vielä täydentää tai selvittää.</p>
          <p className="text-sm leading-relaxed text-gray-700">Tilanne päivitetty 17.9.2026: liiteluonnos 0.5 ja täydentävä lähdekartoitus. Lähteen löytyminen ei tarkoita julkaisuhyväksyntää. Tarkistajat ovat ehdotettuja vastuutahoja. Tästä luettelosta ei vielä avata tai ladata tiedostoja.</p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Aineistojen tilanne">
          {Object.entries(documentStatuses).map(([key, label]) => (
            <button key={key} type="button" aria-pressed={status === key} onClick={() => setStatus(status === key ? 'all' : key)}
              className={`rounded-lg border-2 p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${status === key ? 'border-blue' : 'border-transparent'} ${statusStyles[key as keyof typeof statusStyles]}`}>
              <span className="block text-3xl font-bold">{documents.filter(doc => doc.status === key).length}</span>
              <span className="mt-1 block text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        <div className="mb-8 space-y-4">
          <label className="block font-semibold">Hae dokumenttia tai liitettä
            <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Esim. HVS, tuenta, DoP tai Ville"
              className="mt-2 w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base font-normal text-gray-900 focus:border-blue focus:outline-none" />
          </label>
          <div className="flex flex-wrap gap-2" aria-label="Aineistoryhmät">
            {Object.entries({ all: 'Kaikki aineistot', ...categories }).map(([key, label]) => (
              <button key={key} type="button" aria-pressed={category === key} onClick={() => setCategory(key)}
                className={`rounded-lg px-4 py-3 text-left text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${category === key ? 'bg-blue text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{label}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <p role="status" className="text-gray-600">Näytetään {filtered.length} / {documents.length} aineistoa{status !== 'all' ? ` · ${documentStatuses[status as keyof typeof documentStatuses]}` : ''}</p>
            {(search || category !== 'all' || status !== 'all') && <button type="button" onClick={clear} className="py-2 font-semibold text-blue underline">Tyhjennä suodattimet</button>}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map(doc => (
            <article key={doc.id} className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-gray-500">{doc.id} · {categories[doc.category]}</span>
                <span className={`rounded px-3 py-1 text-sm font-semibold ${statusStyles[doc.status]}`}>{documentStatuses[doc.status]}</span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{doc.title}</h3>
              <p className="mb-4 text-base leading-relaxed text-gray-700">{doc.description}</p>
              <p className="text-sm text-gray-600">Tarkistaja: <span className="font-semibold">{doc.owner}</span></p>
            </article>
          ))}
          {filtered.length === 0 && <div className="py-10 text-center"><p>Hakuehdoilla ei löytynyt aineistoja.</p><button type="button" onClick={clear} className="mt-3 py-2 font-semibold text-blue underline">Näytä kaikki aineistot</button></div>}
        </div>
      </div>
    </Section>
  );
}

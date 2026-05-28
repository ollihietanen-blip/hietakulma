import Section from '@/components/sections/Section';

const wallLayers = [
  { layer: 'Ulkoverhous', material: 'UTW-paneeli, tehdasmaalattu', thickness: '28 mm' },
  { layer: 'Pystykoolaus', material: 'k600', thickness: '32 mm' },
  { layer: 'Tuulensuoja', material: 'Kipsilevy TS', thickness: '9 mm' },
  { layer: 'Runko + eriste', material: 'Puurunko 42x198 mm + mineraalivilla', thickness: '198 mm' },
  { layer: 'Höyrynsulku', material: 'Muovi 0,2 mm', thickness: '\u2014' },
  { layer: 'Sisäverhous', material: 'Kipsilevy GEK', thickness: '13 mm' },
];

export default function WallStructureTable() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Elementtien tekniset tiedot</h2>
      <p className="text-lg text-gray-700 mb-8">
        Ulkoseinäelementti — tyypillinen rakenne ulkoa sisäänpäin:
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2" style={{ borderColor: 'var(--dark)' }}>
              <th className="text-left py-3 px-4 font-bold text-sm uppercase tracking-wide">Kerros</th>
              <th className="text-left py-3 px-4 font-bold text-sm uppercase tracking-wide">Materiaali</th>
              <th className="text-left py-3 px-4 font-bold text-sm uppercase tracking-wide">Paksuus</th>
            </tr>
          </thead>
          <tbody>
            {wallLayers.map((layer, index) => (
              <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`} style={{ borderColor: '#e5e7eb' }}>
                <td className="py-3 px-4 font-medium">{layer.layer}</td>
                <td className="py-3 px-4 text-gray-700">{layer.material}</td>
                <td className="py-3 px-4 text-gray-700">{layer.thickness}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--sand)' }}>
          <p className="font-bold text-lg mb-1">U-arvo</p>
          <p className="text-gray-700">0,17–0,21 W/m²K</p>
          <p className="text-sm text-gray-500 mt-1">Riippuen runkopaksuudesta 198/248 mm</p>
        </div>
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--sand)' }}>
          <p className="font-bold text-lg mb-1">Elementin maksimimitat</p>
          <p className="text-gray-700">Korkeus max 3 500 mm</p>
          <p className="text-gray-700">Pituus max 12 000 mm</p>
          <p className="text-sm text-gray-500 mt-1">Minimikorkeutta ei ole määritelty</p>
        </div>
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--sand)' }}>
          <p className="font-bold text-lg mb-1">Sähkövalmius</p>
          <p className="text-gray-700">Rasiat ja putkitukset tehtaalla</p>
          <p className="text-sm text-gray-500 mt-1">Asiakkaan sähkösuunnitelman mukaisesti</p>
        </div>
      </div>
    </div>
  );
}

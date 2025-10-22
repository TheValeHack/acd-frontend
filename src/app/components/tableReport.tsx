const data = [
  {
    tanggal: '20-02-2023',
    lokasi: 'Sumur A-01',
    kedalaman: '1200 - 1400',
    segmentasi: 'Lumpur 10%, Siltstone 50%, Sandstone 30%, Shale 10%',
  },
]

export default function tableReport() {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Tanggal</th>
            <th className="px-4 py-2 text-left">Lokasi Sumur</th>
            <th className="px-4 py-2 text-left">Kedalaman (m)</th>
            <th className="px-4 py-2 text-left">Hasil Segmentasi</th>
            <th className="px-4 py-2 text-left">Persentase Bebatuan</th>
            <th className="px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{row.tanggal}</td>
              <td className="px-4 py-2">{row.lokasi}</td>
              <td className="px-4 py-2">{row.kedalaman}</td>
              <td className="px-4 py-2">{row.segmentasi}</td>
              <td className="px-4 py-2">{row.segmentasi}</td>
              <td className="px-4 py-2 space-x-2">
                <button className="text-blue-500">👁️</button>
                <button className="text-yellow-500">✏️</button>
                <button className="text-red-500">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((page) => (
          <button key={page} className={`px-3 py-1 rounded ${page === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}

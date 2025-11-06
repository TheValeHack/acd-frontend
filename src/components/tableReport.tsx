"use client";
import { useRouter } from "next/navigation";


export default function tableReport() {
  const router = useRouter();
  const data = [
    {
      tanggal: '20-02-2023',
      lokasi: 'Sumur A-01',
      kedalaman: '1200 - 1400',
      segmentasi: 'Lumpur 10%, Siltstone 50%, Sandstone 40%',
    },
    {
      tanggal: "2025-10-21",
      lokasi: "Bandung",
      kedalaman: "15 km",
      segmentasi: "Sesar Lembang, dasdadsa, dsadasd",
    },
    {
      tanggal: "2025-10-22",
      lokasi: "Yogyakarta",
      kedalaman: "12 km",
      segmentasi: "Zona Subduksi Jawa, asdasdasd, asdasda",
    },
    {
      tanggal: "2025-10-23",
      lokasi: "Surabaya",
      kedalaman: "8 km",
      segmentasi: "Sesar Kendeng, adsadas, asdasdads",
    },
  ];
  return (
    <div className="bg-white shadow  overflow-hidden">
      <table className="min-w-full text-xs">
        <thead className="bg-white text-[#000000] font-bold">
          <tr>
            <th className="px-4 py-3 text-left">Tanggal</th>
            <th className="px-4 py-3 text-left">Lokasi Sumur</th>
            <th className="px-4 py-3 text-left">Kedalaman (m)</th>
            <th className="px-4 py-3 text-left">Hasil Segmentasi</th>
            <th className="px-4 py-3 text-left">Persentase Bebatuan</th>
            <th className="px-4 py-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-t odd:bg-[#FDEEE7] even:bg-white"
            >
              <td className="px-4 py-2 text-black">{row.tanggal}</td>
              <td className="px-4 py-2 text-black">{row.lokasi}</td>
              <td className="px-4 py-2 text-black">{row.kedalaman}</td>
              <td className="px-4 py-2 text-black"></td>
              <td className="px-4 py-2 align-top text-black">
                <ul className="list-disc list-inside space-y-1">
                  {row.segmentasi.split(',').map((item, i) => (
                    <li key={i}>{item.trim()}</li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2 space-x-2">
                <div
                  onClick={() => router.push(`/laporan/${idx}`)}
                  className="hover:scale-110 inline-block cursor-pointer"
                >
                  <img 
                    src="images/detail.png" 
                    alt="Detail" 
                    className="w-5 h-5" 
                  />
                </div>
                <div
                  onClick={() => router.push(`/laporan/${idx}`)}
                  className="hover:scale-110 inline-block cursor-pointer"
                >
                  <img 
                    src="images/edit.png" 
                    alt="Detail" 
                    className="w-5 h-5" 
                  />
                </div>
                <div
                  onClick={() => router.push(`/laporan/${idx}`)}
                  className="hover:scale-110 inline-block cursor-pointer"
                >
                  <img 
                    src="images/hapus.png" 
                    alt="Detail" 
                    className="w-5 h-5" 
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

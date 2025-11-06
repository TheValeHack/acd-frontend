"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type DetailPageProps = {
  id?: number;
};

const data = [
  {
    tanggal: '20-02-2023',
    lokasi: 'Sumur A-01',
    waktu: '12:00 - 14:00',
    persentase: { Siltstone: 60, Sandstone: 30, Lainnya: 10 },
  },
  {
    tanggal: '21-10-2025',
    lokasi: 'Bandung',
    waktu: '09:00 - 11:00',
    persentase: { Siltstone: 40, Sandstone: 50, Lainnya: 10 },
  },
  {
    tanggal: '22-10-2025',
    lokasi: 'Yogyakarta',
    waktu: '10:00 - 12:00',
    persentase: { Siltstone: 20, Sandstone: 70, Lainnya: 10 },
  },
  {
    tanggal: '23-10-2025',
    lokasi: 'Surabaya',
    waktu: '13:00 - 15:00',
    persentase: { Siltstone: 50, Sandstone: 40, Lainnya: 10 },
  },
];

export default function DetailPage({ id = 0 }: DetailPageProps) {
  const router = useRouter();
  const laporan = data[id];

  if (!laporan) {
    return (
      <div className="p-8 text-red-600">
        Data tidak ditemukan.{" "}
        <button onClick={() => router.back()} className="underline text-orange-600">
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Konten Utama */}
      <main className="flex-1 p-8 space-y-6">
        <header>
          <h1 className="text-4xl font-bold text-gray-900">Hasil Analisis</h1>
          <p className="text-lg text-gray-500">Lihat dan kelola hasil analisis</p>
        </header>

        <div className="bg-white rounded-xl shadow p-6 space-y-6">
            {/* Informasi & Persentase */}
            <section className="flex flex-col md:flex-row gap-6">
                {/* Kiri: Informasi + Persentase */}
                <div className="w-full md:w-[40%] flex flex-col h-[500px] gap-4">
                    {/* Informasi - 40% */}
                    <div className="basis-[40%] bg-[#FDEEE7] border-2 border-[#FBDCD0] rounded-xl p-4 space-y-2 text-sm text-gray-700 overflow-auto">
                        <p className="text-2xl font-bold text-black">Informasi</p>
                    <div className="grid grid-cols-[auto_40px_1fr] gap-y-2 text-sm text-[#000000]">
                        <p className="font-semibold">Tanggal</p>
                        <p className="text-center">:</p>
                        <p>{laporan.tanggal}</p>

                        <p className="font-semibold">Lokasi Sumur</p>
                        <p className="text-center">:</p>
                        <p>{laporan.lokasi}</p>

                        <p className="font-semibold">Kedalaman</p>
                        <p className="text-center">:</p>
                        <p>{laporan.waktu}</p>
                    </div>
                    </div>

                    {/* Persentase Bebatuan - 60% */}
                    <div className="basis-[60%] bg-white border-2 border-[#E9EAEB] rounded-xl p-4 overflow-auto">
                        <h2 className="text-2xl font-bold text-black">Persentase Bebatuan</h2>
                        <table className="text-sm text-gray-700 w-full rounded-md mt-9">
                            <thead className="bg-[#FFFFFF]">
                                <tr>
                                <th className="px-3 py-2 text-left">Jenis Bebatuan</th>
                                <th className="px-3 py-2 text-left">Persentase</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(laporan.persentase).map(([key, value], index) => (
                                    <tr
                                    key={key}
                                    className={index % 2 === 0 ? "bg-[#FDEEE7]" : "bg-white"}
                                    >
                                    <td className="px-3 py-2">{key}</td>
                                    <td className="px-3 py-2">{value}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Kanan: Visual Distribusi */}
                <div className="w-full md:w-[60%] bg-[#FDEEE7] border-2 border-[#FBDCD0] rounded-xl p-4">
                    <h2 className="text-2xl font-bold text-black">Visual Distribusi</h2>
                    <div className="flex flex-col items-center">
                    <Image src="/images/pie-chart.png" alt="Pie Chart" width={300} height={300} />
                        <ul className="mt-4 text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-2">
                        {Object.keys(laporan.persentase).map((key, i) => (
                            <li key={i} className="flex items-center">
                            <span
                                className={`inline-block w-3 h-3 mr-2 rounded-full ${
                                i === 0 ? "bg-blue-500" : i === 1 ? "bg-green-500" : "bg-orange-500"
                                }`}
                            ></span>
                            {key}
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </section>



            {/* Hasil Segmentasi */}
            <section className="bg-white border-2 border-[#E9EAEB] rounded-xl p-4">
                <h2 className="text-2xl font-bold text-black">Hasil Segmentasi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <div>
                        <p className="text-base text-black mb-1 text-center font-semibold">Gambar Asli</p>
                        <Image src="/images/original-rock.png" alt="Gambar Asli" width={400} height={300} />
                    </div>
                    <div>
                        <p className="text-base text-black mb-1 text-center font-semibold">Gambar Hasil Analisis</p>
                        <Image src="/images/segmented-rock.png" alt="Gambar Analisis" width={400} height={300} />
                    </div>
                </div>
            </section>

            <button
                onClick={() => router.back()}
                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm"
            >
                Kembali
            </button>
            </div>
      </main>
    </div>
  );
}

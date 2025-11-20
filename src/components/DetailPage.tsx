"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { formatPercent } from "@/utils/formatPercent";


type DetailPageProps = {
  id: number;
};

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function DetailPage({ id }: DetailPageProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: analysis, loading, error } = useFetch(`/analysis/${id}`);

  // State untuk nama lokasi sumur
  const [wellName, setWellName] = useState<string>("Loading...");

  // Setelah analysis didapat → fetch well
  useEffect(() => {
    if (!analysis?.data?.well_id) return;

    const fetchWell = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/well/${analysis.data.well_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`, // token dari NextAuth
            },
          }
        );
        const json = await res.json();
        setWellName(json?.data?.name ?? "Tidak ditemukan");
      } catch (err) {
        setWellName("Error mengambil lokasi");
      }
    };

    fetchWell();
  }, [analysis]);

  if (loading) {
    return <div className="p-8 text-gray-500">Loading...</div>;
  }

  if (error || !analysis) {
    return (
      <div className="p-8 text-red-600">
        Data tidak ditemukan.
        <button
          onClick={() => router.back()}
          className="underline text-orange-600 ml-2"
        >
          Kembali
        </button>
      </div>
    );
  }

  const pieData = {
    labels: ["Siltstone", "Sandstone"],
    datasets: [
      {
        data: [formatPercent(analysis.data.siltstone_prcnt), formatPercent(analysis.data.sandstone_prcnt)],
        backgroundColor: ["#7086FD", "#6FD195"],
        borderWidth: 1,
      },
    ],
  };
  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold" as const,
          size: 14,
        },
        formatter: (value: number, context: any) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}\n${value}%`;
        },
        textAlign: "center" as const,
      },
    },
  };

  const a = analysis.data;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-8 space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-bold text-gray-900">Hasil Analisis</h1>
          <p className="text-lg text-gray-500">Lihat dan kelola hasil analisis</p>
        </header>

        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          {/* Informasi */}
          <section className="flex flex-col md:flex-row gap-6">
            {/* Kiri */}
            <div className="w-full md:w-[40%] flex flex-col h-[500px] gap-4">
              <div className="basis-[40%] bg-[#FDEEE7] border-2 border-[#FBDCD0] rounded-xl p-4 space-y-2">
                <p className="text-2xl font-bold text-black">Informasi</p>

                <div className="grid grid-cols-[auto_20px_1fr] gap-y-2 text-sm text-black">
                  <p className="font-semibold">Tanggal</p>
                  <p>:</p>
                  <p>{new Date(a.created_at).toLocaleString()}</p>

                  <p className="font-semibold">Lokasi Sumur</p>
                  <p>:</p>
                  <p>{wellName}</p>

                  <p className="font-semibold">Kedalaman</p>
                  <p>:</p>
                  <p>{a.vertical_depth} m</p>
                </div>
              </div>

              {/* Persentase */}
              <div className="basis-[60%] bg-white border-2 border-[#E9EAEB] rounded-xl p-4 overflow-auto">
                <h2 className="text-2xl font-bold text-black">Persentase Bebatuan</h2>

                <table className="text-sm text-gray-700 w-full mt-4">
                  <tbody>
                    <tr className="bg-[#FDEEE7]">
                      <td className="px-3 py-2">Siltstone</td>
                      <td className="px-3 py-2">{formatPercent(a.siltstone_prcnt)}%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-3 py-2">Sandstone</td>
                      <td className="px-3 py-2">{formatPercent(a.sandstone_prcnt)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Kanan */}
            <div className="w-full md:w-[60%] bg-[#FDEEE7] border-2 border-[#FBDCD0] rounded-xl p-4">
              <h2 className="text-2xl font-bold text-black">Visual Distribusi</h2>

              <div className="flex flex-col items-center mt-4">
                <div className="flex justify-center items-center h-[350px]">
                  <Pie data={pieData} options={pieOptions} />
                </div>
              </div>
            </div>
          </section>

          {/* Gambar */}
          <section className="bg-white border-2 border-[#E9EAEB] rounded-xl p-4">
            <h2 className="text-2xl font-bold text-black">Hasil Segmentasi</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div className="text-center">
                <p className="font-semibold mb-2">Gambar Asli</p>
                <Image src={
                        a?.original_image && (a.original_image.startsWith('http://') || a.original_image.startsWith('https://'))
                            ? a.original_image
                            : `${process.env.NEXT_PUBLIC_API_URL}/public${a?.original_image}`
                    } className="mx-auto" alt="Original" width={400} height={300} />
              </div>

              <div className="text-center">
                <p class-name="font-semibold mb-2">Hasil Analisis</p>
                <Image src={
                        a?.image && (a.image.startsWith('http://') || a.image.startsWith('https://'))
                            ? a.image
                            : `${process.env.NEXT_PUBLIC_API_URL}/public${a?.image}`
                    } className="mx-auto" alt="Segmented" width={400} height={300} />
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

"use client";

import Image from "next/image";
import UploadArea from "../../components/UploadArea";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import Alert from "../../components/Alert";

export default function AnalisisPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: wellData, loading } = useFetch("/well");

  const [wellId, setWellId] = useState("");
  const [depth, setDepth] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // 🔔 ALERT STATE
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!wellId || !depth || !file) {
      setAlertInfo({
        type: "error",
        message: "Semua field harus diisi!",
      });
      return;
    }

    const formData = new FormData();
    formData.append("well_id", wellId);
    formData.append("vertical_depth", depth);
    formData.append("file", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analysis`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      setAlertInfo({
        type: "error",
        message: "Gagal mengirim data!",
      });
      return;
    }

    const analysisData = await res.json();

    setAlertInfo({
      type: "success",
      message: "Analisis berhasil dibuat!",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-8 space-y-4">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-3xl font-bold text-[#000000]">Analisis</h1>
          <p className="text-[#5E5E5E] mt-1 text-base">
            Masukkan detail di bawah untuk menganalisis data.
          </p>
        </div>

        {/* 🔔 ALERT BOX */}
        {alertInfo && (
          <Alert
            type={alertInfo.type}
            message={alertInfo.message}
            onClose={() => setAlertInfo(null)}
          />
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
        >
          {/* Lokasi */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-black">
              Lokasi Sumur
            </label>
            <div className="flex items-center border-2 border-gray-300 bg-gray-50 rounded-xl px-3 py-2">
              <Image src="/images/location.svg" alt="Location" width={20} height={20} className="mr-3" />

              <select
                className="w-full bg-gray-50 outline-none text-black"
                value={wellId}
                onChange={(e) => setWellId(e.target.value)}
              >
                <option value="">Pilih lokasi sumur...</option>
                {wellData?.data?.map((well: any) => (
                  <option key={well.id} value={well.id}>
                    {well.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Kedalaman */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-black">
              Kedalaman (m)
            </label>
            <div className="flex items-center border-2 border-gray-300 bg-gray-50 rounded-xl px-3 py-2">
              <Image src="/images/depth.svg" alt="Depth" width={20} height={20} className="mr-3" />
              <input
                type="number"
                step="0.01"
                placeholder="Masukkan kedalaman"
                className="w-full bg-gray-50 outline-none text-[gray]"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
              />
            </div>
          </div>

          {/* Upload */}
          <div className="mb-6">
            <UploadArea onFileSelect={(file) => setFile(file)} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer"
          >
            Analisis
          </button>
        </form>
      </main>
    </div>
  );
}

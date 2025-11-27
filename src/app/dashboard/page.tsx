"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { reportHistory } from "../data/reportHistory";
import { quickActions } from "../data/quickActions";
import { tableHeaders } from "../data/tableHeaders";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import modal/detail components
import DeleteModal from "../../components/DeleteModal";
import EditModal from "../../components/EditModal";
import { formatPercent } from "@/utils/formatPercent";

export default function DashboardPage() {
  const router = useRouter();
  const wellFetch = useFetch("/well",)
  const analysisFetch = useFetch("/analysis")
  const { data: session } = useSession();

  // state untuk delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  // state untuk edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);

  const handleViewReport = (reportId: number) => {
    router.push(`/laporan/${reportId}`);
  };


  const handleDeleteReport = (reportId: number) => {
    setSelectedReportId(reportId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedReportId) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/analysis/${selectedReportId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`, // token dari NextAuth
            },
          }
        );

        if (!res.ok) {
          throw new Error("Gagal menghapus data");
        }

        analysisFetch.refetch()

        console.log("Delete success:", selectedReportId);
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menghapus data");
      }
    }
    setShowDeleteModal(false);
    setSelectedReportId(null);
  };


  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedReportId(null);
  };

  const handleEditReport = (report: any) => {
    setEditData({
      id: report.id,
      tanggal: new Date(report.created_at).toLocaleDateString(),
      lokasi: wellFetch.data?.data?.filter((item: any) => item.id == report.well_id)[0]?.name,
      kedalaman: report.vertical_depth,
      segmentasi: "Segmentasi placeholder",
    });
    setShowEditModal(true);
  };

  const confirmEdit = async (payload: {
    id: string;
    well_id: string;
    vertical_depth: string;
    date: string;
  }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analysis/${payload.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({
          well_id: parseInt(payload.well_id),
          vertical_depth: parseFloat(payload.vertical_depth),
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update analysis");
      }

      alert("Data berhasil diupdate!");

      closeEditModal();
      analysisFetch.refetch();

    } catch (error) {
      console.error(error);
      alert("Gagal update data");
    }
  };


  const closeEditModal = () => {
    setShowEditModal(false);
    setEditData(null);
  };

  useEffect(() => {
    console.log(wellFetch.loading, wellFetch.data)
    console.log(analysisFetch.loading, analysisFetch.data)
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full flex flex-col h-screen space-y-6 p-4">
        {/* Bagian atas: Header & Quick Action */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-[#000000]">
              Selamat datang, Admin!
            </h1>
            <p className="text-[#5E5E5E] mt-1 text-base">
              Aplikasi ini menggunakan teknologi AI berbasis visi komputer untuk
              membantu menganalisis serbuk
              <br /> bor. Hasil analisis ditampilkan dalam bentuk laporan
              sebagai bahan pendukung keputusan.
              <br />
            </p>
          </header>
          <section>
            <h2 className="text-xl font-bold text-[#000000] mb-3">
              Quick Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-h-[100px]">
              {quickActions.map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  className={`group overflow-visible ${
                    action.color === "blue"
                      ? "bg-white hover:bg-[#ED5E24]"
                      : "bg-white hover:bg-[#ED5E24]"
                  } text-black p-4 rounded-xl 
                    border-2 border-gray-200
                    hover:border-[#ED5E24]
                    hover:shadow-[0_6px_18px_3px_rgba(0,0,0,0.2)]
                    transition-all duration-300 flex items-center gap-4`}
                >
                  <div className="bg-[#E9EAEB] p-2 rounded-md flex items-center justify-center transition duration-300 group-hover:bg-[#F39772] ml-2">
                    <img
                      src={
                        action.color === "blue"
                          ? "/images/graph-logo.png"
                          : "/images/report-logo.png"
                      }
                      alt={`${action.title} logo`}
                      className="w-8 h-8 object-contain transition duration-300 filter group-hover:brightness-0 group-hover:invert"
                    />
                  </div>
                  <div className="text-left text-[#404040] transition duration-300 group-hover:text-white">
                    <h3 className="text-sm font-semibold group-hover:text-white">
                      {action.title}
                    </h3>
                    <p className="text-xs opacity-90 mt-1 group-hover:text-white">
                      {action.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Bagian bawah: Riwayat Laporan */}
        <div className="bg-white rounded-2xl shadow overflow-hidden border border-gray-200 overflow-y-auto">
          <section className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#000000]">
                Riwayat Laporan Hasil Analisis
              </h2>
              <Link href="/laporan">
                <button className="flex items-center text-sm text-[#2B2B2B] hover:underline font-medium gap-1 cursor-pointer">
                  Lihat Selengkapnya
                  <img
                    src="/images/arrow-right.png"
                    alt="arrow right"
                    className="w-4 h-4"
                  />
                </button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-white">
                  <tr>
                    {tableHeaders.map((header, index) => (
                      <th
                        key={index}
                        className="px-3 py-2 text-left text-xs text-[#000000] uppercase tracking-wider font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(analysisFetch.loading || wellFetch.loading) && (
                    <tr>
                      <td
                        colSpan={tableHeaders.length}
                        className="text-center py-5 text-gray-500"
                      >
                        Loading data...
                      </td>
                    </tr>
                  )}

                  {!analysisFetch.loading &&
                    !wellFetch.loading &&
                    (!analysisFetch.data?.data ||
                      analysisFetch.data.data.length === 0) && (
                      <tr>
                        <td
                          colSpan={tableHeaders.length}
                          className="text-center py-5 text-gray-500"
                        >
                          Tidak ada data ditemukan
                        </td>
                      </tr>
                    )}

                  {!analysisFetch.loading &&
                    !wellFetch.loading &&
                    analysisFetch.data?.data?.sort((a: any, b: any) => {
                        const dateA = new Date(a.created_at).getTime();
                        const dateB = new Date(b.created_at).getTime();

                        // Jika salah satu atau keduanya NaN, tempatkan objek yang valid di depan
                        if (isNaN(dateA) || isNaN(dateB)) {
                            if (isNaN(dateA) && !isNaN(dateB)) return 1; // a tidak valid, pindahkan a ke belakang
                            if (!isNaN(dateA) && isNaN(dateB)) return -1; // b tidak valid, pindahkan b ke belakang
                            return 0; // Keduanya tidak valid, jaga urutan
                        }

                        return dateB - dateA;
                    }).slice(0,3).map((report: any, index: number) => (
                      <tr
                        key={report.id}
                        className={`hover:bg-gray-50 ${
                          index % 2 === 0 ? "bg-[#FDEEE7]" : "bg-white"
                        }`}
                      >
                        <td className="px-3 py-3 text-xs">
                          {new Date(report.created_at).toLocaleDateString()}
                        </td>

                        <td className="px-3 py-3 text-xs">
                          {wellFetch.data?.data?.find((w: any) => w.id === report.well_id)?.name}
                        </td>

                        <td className="px-3 py-3 text-xs">{report.vertical_depth}</td>

                        <td className="px-3 py-3 text-xs">
                          <Image
                            src={
                                report?.image && (report.image.startsWith('http://') || report.image.startsWith('https://'))
                                    ? report.image
                                    : `${process.env.NEXT_PUBLIC_API_URL}/public${report?.image}`
                            }
                            alt="analysis image"
                            width={100}
                            height={100}
                            className="w-24 h-16 rounded-lg"
                          />
                        </td>

                        <td className="px-3 py-3 text-xs">
                          <ul className="list-disc pl-4">
                            <li>Siltstone {formatPercent(report.siltstone_prcnt)}%</li>
                            <li>Sandstone {formatPercent(report.sandstone_prcnt)}%</li>
                          </ul>
                        </td>

                        <td className="px-3 py-3 text-xs">
                          <div className="flex items-center space-x-3">
                            <button onClick={() => handleViewReport(report.id)}>
                              <img src="/images/detail.png" className="w-5 h-5 cursor-pointer" />
                            </button>

                            <button onClick={() => handleEditReport(report)}>
                              <img src="/images/edit.png" className="w-5 h-5 cursor-pointer" />
                            </button>

                            <button onClick={() => handleDeleteReport(report.id)}>
                              <img src="/images/hapus.png" className="w-5 h-5 cursor-pointer" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>

              </table>
            </div>
          </section>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteModal onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}

      {showEditModal && editData && (
        <EditModal data={editData} wellData={wellFetch.data?.data} onConfirm={confirmEdit} onClose={closeEditModal} />
      )}

    </div>
  );
}

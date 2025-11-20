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
          `${process.env.NEXT_PUBLIC_API_URL}/reports/${selectedReportId}`,
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

        // refresh data atau update state
        router.refresh(); // kalau pakai App Router
        // atau setAnalysisData(prev => prev.filter(r => r.id !== selectedReportId))

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
      tanggal: new Date(report.created_at).toLocaleDateString(),
      lokasi: wellFetch.data?.data?.filter((item: any) => item.id == report.well_id)[0]?.name,
      kedalaman: report.vertical_depth,
      segmentasi: "Segmentasi placeholder",
    });
    setShowEditModal(true);
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
                <button className="flex items-center text-sm text-[#2B2B2B] hover:underline font-medium gap-1">
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
                  {
                   ( analysisFetch.loading && wellFetch.loading ) ? (<p>loading....</p>) :   !(analysisFetch.data?.data?.length > 0) ? (
                    <p className="mt-5">Tidak ada data ditemukan</p>
                  ) : analysisFetch.data?.data?.map((report: any, index: any) => (
                    <tr
                      key={report.id}
                      className={`hover:bg-gray-50 ${
                        index % 2 === 0 ? "bg-[#FDEEE7]" : "bg-white"
                      }`}
                    >
                      <td className="px-3 py-3 whitespace-nowrap text-xs text-[#000000]">
                        {(new Date(report.created_at).toLocaleDateString())}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-xs font-medium text-[#000000]">
                        {wellFetch.data?.data?.filter((item: any) => item.id == report.well_id)[0]?.name}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-xs text-[#000000]">
                        {report.vertical_depth}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-xs text-[#000000]">
                        <Image
                          src={report.image}
                          alt="analysis image"
                          width={100}
                          height={100}
                          className="w-24 h-16 rounded-lg"
                        />
                      </td>
                      <td className="px-3 py-3 text-xs text-[#000000]">
                        <ul className="list-disc pl-4">
                          <li>Siltstone {report.siltstone_prcnt}%</li>
                          <li>Sandstone {report.siltstone_prcnt}%</li>
                        </ul>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-xs font-medium">
                        <div className="flex items-center space-x-3">
                          <button onClick={() => handleViewReport(report.id)}>
                            <img
                              src="/images/detail.png"
                              alt="Detail"
                              className="w-5 h-5 hover:opacity-70 transition"
                            />
                          </button>
                          <button onClick={() => handleEditReport(report)}>
                            <img
                              src="/images/edit.png"
                              alt="Edit"
                              className="w-5 h-5 hover:opacity-70 transition"
                            />
                          </button>
                          <button onClick={() => handleDeleteReport(report.id)}>
                            <img
                              src="/images/hapus.png"
                              alt="Hapus"
                              className="w-5 h-5 hover:opacity-70 transition"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}

      {/* Edit Modal */}
      {showEditModal && editData && (
        <EditModal data={editData} onClose={closeEditModal} />
      )}

    </div>
  );
}

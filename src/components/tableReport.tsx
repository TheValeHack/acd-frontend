"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { useSession } from "next-auth/react";
import { formatPercent } from "@/utils/formatPercent";
import Alert from "./Alert";

export default function TableReport({
    analysisData,
    wellData,
    currentPage,
    maxData,
    onRefresh
  }: {
    analysisData: any;
    wellData: any;
    maxData: number;
    currentPage: number;
    onRefresh: () => void
  }) {
  const router = useRouter();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const { data: session } = useSession();

  // STATE untuk EditModal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);

  // STATE untuk Alert
  const [alertInfo, setAlertInfo] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Auto-hide alert setelah 4 detik
  useEffect(() => {
    if (alertInfo) {
      const timer = setTimeout(() => {
        setAlertInfo(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

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
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Gagal menghapus data");
        }

        onRefresh();
        setAlertInfo({ type: "success", message: "Data berhasil dihapus!" });

      } catch (err) {
        console.error(err);
        setAlertInfo({ type: "error", message: "Terjadi kesalahan saat menghapus data" });
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
      lokasi: wellData.filter((item: any) => item.id == report.well_id)[0]?.name,
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

      onRefresh();
      setAlertInfo({ type: "success", message: "Data berhasil diupdate!" });
      closeEditModal();

    } catch (error) {
      console.error(error);
      setAlertInfo({ type: "error", message: "Gagal update data" });
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditData(null);
  };

  useEffect(() => {
    console.log('currentPage: ', currentPage)
    console.log('maxData: ', maxData)
  }, [currentPage])

  return (
    <div className="bg-white shadow overflow-hidden p-4">
      
      {/* ALERT */}
      {alertInfo && (
        <div className="mb-4">
          <Alert
            type={alertInfo.type}
            message={alertInfo.message}
            onClose={() => setAlertInfo(null)}
          />
        </div>
      )}

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
          {!analysisData && (
            <tr>
              <td colSpan={6} className="text-center py-5 text-gray-500">
                Loading data...
              </td>
            </tr>
          )}

          {analysisData && analysisData.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-5 text-gray-500">
                Tidak ada data ditemukan
              </td>
            </tr>
          )}

          {analysisData &&
            analysisData.length > 0 &&
            analysisData.slice((currentPage-1) * maxData, maxData * currentPage).map((report: any, index: number) => (
              <tr
                key={report.id}
                className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-[#FDEEE7]" : "bg-white"}`}
              >
                <td className="px-3 py-3 whitespace-nowrap text-xs text-[#000000]">
                  {new Date(report.created_at).toLocaleDateString()}
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-xs font-medium text-[#000000]">
                  {wellData.find((item: any) => item.id === report.well_id)?.name}
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-xs text-[#000000]">
                  {report.vertical_depth}
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-xs text-[#000000]">
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
                <td className="px-3 py-3 text-xs text-[#000000]">
                  <ul className="list-disc pl-4">
                    <li>Siltstone {formatPercent(report.siltstone_prcnt)}%</li>
                    <li>Sandstone {formatPercent(report.sandstone_prcnt)}%</li>
                  </ul>
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-xs font-medium">
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleViewReport(report.id)}>
                      <img src="/images/detail.png" alt="Detail" className="w-5 h-5 hover:opacity-70 transition cursor-pointer" />
                    </button>
                    <button onClick={() => handleEditReport(report)}>
                      <img src="/images/edit.png" alt="Edit" className="w-5 h-5 hover:opacity-70 transition cursor-pointer" />
                    </button>
                    <button onClick={() => handleDeleteReport(report.id)}>
                      <img src="/images/hapus.png" alt="Hapus" className="w-5 h-5 hover:opacity-70 transition cursor-pointer" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <DeleteModal onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}

      {showEditModal && editData && (
        <EditModal data={editData} wellData={wellData} onConfirm={confirmEdit} onClose={closeEditModal} />
      )}
    </div>
  );
}

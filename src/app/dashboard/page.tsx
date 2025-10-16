"use client";

import Sidebar from "../components/Sidebar";
import { reportHistory } from "../data/reportHistory";
import { quickActions } from "../data/quickActions";
import { tableHeaders } from "../data/tableHeaders";

export default function DashboardPage() {

  const handleViewReport = (reportId: number) => {
    console.log("View report:", reportId);
  };

  const handleDeleteReport = (reportId: number) => {
    console.log("Delete report:", reportId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto flex gap-4 min-h-screen">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Konten utama */}
        <div className="w-4/5 flex flex-col h-screen space-y-4 p-4">
          
          {/* Bagian atas: Header & Quick Action */}
          <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-200 overflow-y-auto">
            <header className="mb-4">
              <h1 className="text-3xl font-bold text-[#000000]">
                Selamat datang, Admin!
              </h1>
              <p className="text-[#5E5E5E] mt-1 text-base">
                Aplikasi ini menggunakan teknologi AI berbasis visi komputer untuk membantu 
                menganalisis serbuk<br /> bor. Hasil analisis ditampilkan dalam bentuk laporan 
                sebagai bahan pendukung keputusan.<br />
              </p>
            </header>

            <section>
              <h2 className="text-xl font-semibold text-[#000000] mb-3">Quick Action</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-h-[100px]">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className={`group overflow-visible ${
                      action.color === "blue"
                        ? "bg-white hover:bg-[#ED5E24]"
                        : "bg-white hover:bg-[#ED5E24]"
                    } text-black p-4 rounded-2xl 
                    shadow-[0_4px_12px_2px_rgba(0,0,0,0.1)] 
                    hover:shadow-[0_6px_18px_3px_rgba(0,0,0,0.2)]
                    transition-all duration-300 flex items-center gap-4`}
                  >
                    <div className="bg-[#E9EAEB] p-2 rounded-md flex items-center justify-center transition duration-300 group-hover:bg-[#F39772] ml-2">
                      <img
                        src={action.color === "blue" ? "/images/graph-logo.png" : "/images/report-logo.png"}
                        alt={`${action.title} logo`}
                        className="w-8 h-8 object-contain transition duration-300 filter group-hover:brightness-0 group-hover:invert"
                      />
                    </div>
                    <div className="text-left text-[#404040] transition duration-300 group-hover:text-white">
                      <h3 className="font-medium text-sm font-semibold group-hover:text-white">
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
          <div className="flex-1 bg-white rounded-lg shadow overflow-hidden border border-gray-200 overflow-y-auto">
            <section className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-[#000000]">
                  Riwayat Laporan Hasil Analisis
                </h2>
                <button className="flex items-center text-sm text-[#2B2B2B] hover:underline font-medium gap-1">
                  Lihat Selengkapnya
                  <img src="/images/arrow-right.png" alt="arrow right" className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-white">
                    <tr>
                      {tableHeaders.map((header, index) => (
                        <th
                          key={index}
                          className="px-3 py-2 text-left text-xs font-medium text-[#000000] uppercase tracking-wider font-semibold"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reportHistory.map((report, index) => (
                      <tr
                        key={report.id}
                        className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-orange-50" : "bg-white"}`}
                      >
                        <td className="px-3 py-3 whitespace-nowrap text-xs text-[#000000]">{report.tanggal}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-xs font-medium text-[#000000]">{report.lokasiSumur}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-xs text-[#000000]">{report.kedalaman}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-xs text-[#000000]">{report.hasilSegmentasi}</td>
                        <td className="px-3 py-3 text-xs text-[#000000]">
                          <ul className="list-disc pl-4">
                            {report.parameterBatuan.map((param, i) => (
                              <li key={i}>{param}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-xs font-medium">
                          <div className="flex items-center space-x-3">
                            <button onClick={() => handleViewReport(report.id)}>
                              <img src="/images/detail.png" alt="Detail" className="w-5 h-5 hover:opacity-70 transition" />
                            </button>
                            <button>
                              <img src="/images/edit.png" alt="Edit" className="w-5 h-5 hover:opacity-70 transition" />
                            </button>
                            <button onClick={() => handleDeleteReport(report.id)}>
                              <img src="/images/hapus.png" alt="Hapus" className="w-5 h-5 hover:opacity-70 transition" />
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
      </div>
    </div>
  );
}

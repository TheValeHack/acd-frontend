"use client"

import { useFetch } from '@/hooks/useFetch'
import Sidebar from '../../components/Sidebar'
import Table from '../../components/tableReport'
import { useState } from "react";



export default function LaporanPage() {
    const wellFetch = useFetch("/well",)
    const analysisFetch = useFetch("/analysis")
    const [currentPage, setCurrentPage] = useState(1)
    const maxData = 5;

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
        <main className="flex-1 p-4">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold text-black">
                    Laporan Hasil Analisis
                    </h1>

                    <div className="flex items-center bg-[#FDEEE7] rounded-full overflow-hidden w-120">
                        <input
                            type="text"
                            placeholder="Cari"
                            className="px-4 py-2 w-full outline-none text-orange-500"
                        />
                        <button className="bg-[#FDEEE7] p-2">
                            <img src="images/search.png" alt="Cari" className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <p className="text-gray-600">
                    Lihat dan kelola hasil analisis
                </p>
            </div>
            <Table maxData={maxData} currentPage={currentPage} wellData={wellFetch.data?.data} analysisData={analysisFetch.data?.data} onRefresh={analysisFetch.refetch} />
            {/* PAGINATION */}
                <div className="p-4 flex justify-center items-center space-x-2">

                    {/* Tombol kiri */}
                    <button 
                        className="w-8 h-8 flex items-center justify-center cursor-pointer"
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    >
                        <img src="images/nav-arrow-left.png" alt="Sebelumnya" className="w-4 h-4" />
                    </button>

                    {/* Tombol halaman */}
                    { Array.from({length: Math.ceil(analysisFetch?.data?.data?.length / maxData)}, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-8 h-8 rounded-full font-medium border cursor-pointer border-gray-300 transition-transform duration-200 
                                ${currentPage === page
                                    ? 'bg-[#ED5E24] text-white scale-125'
                                    : 'bg-white text-black hover:bg-orange-200 hover:scale-105'
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    {/* Tombol kanan */}
                    <button 
                        className="w-8 h-8 flex items-center justify-center cursor-pointer"
                        onClick={() => currentPage < 5 && handlePageChange(currentPage + 1)}
                    >
                        <img src="images/nav-arrow-right.png" alt="Berikutnya" className="w-4 h-4" />
                    </button>

                </div>  
        </main>
        </div>
    )
}

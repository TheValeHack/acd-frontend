"use client"

import { useFetch } from '@/hooks/useFetch'
import Sidebar from '../../components/Sidebar'
import Table from '../../components/tableReport'
import { useEffect, useState } from "react";



export default function LaporanPage() {
    const wellFetch = useFetch("/well",)
    const analysisFetch = useFetch("/analysis")
    const [currentPage, setCurrentPage] = useState(1)
    const [analysisData, setAnalysisData] = useState(null)
    const [queryData, setQueryData] = useState([])
    const [query, setQuery] = useState("")
    const maxData = 5;

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }
    const handleChange = (event: any) => {
        setQuery(event.target.value)
    }

    useEffect(() => {
        if(!analysisFetch.loading){
            console.log(analysisFetch?.data?.data)
           // setAnalysisData(analysisFetch?.data?.data.sort((a: any, b: any) => (new Date(a.created_at)) - (new Date(b.created_at))))
            setAnalysisData(analysisFetch?.data?.data.sort((a: any, b: any) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();

            // Jika salah satu atau keduanya NaN, tempatkan objek yang valid di depan
            if (isNaN(dateA) || isNaN(dateB)) {
                if (isNaN(dateA) && !isNaN(dateB)) return 1; // a tidak valid, pindahkan a ke belakang
                if (!isNaN(dateA) && isNaN(dateB)) return -1; // b tidak valid, pindahkan b ke belakang
                return 0; // Keduanya tidak valid, jaga urutan
            }

            return dateB - dateA;
        }));
        }
    }, [analysisFetch])

    useEffect(() => {
        const data = analysisData || []
        const filteredData = data.filter((item: any) => {
            const wellData = wellFetch?.data?.data?.filter((x: any) => x.id == item.well_id)
            item['well'] = wellData
            console.log(item)
            console.log(wellData[0].name.toLowerCase().includes(query))
            if(wellData[0].name.toLowerCase().includes(query)){
                return item
            }
        })
        setQueryData(filteredData)
    }, [query])
    

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
                            value={query}
                            onChange={handleChange}
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
            <Table maxData={maxData} currentPage={currentPage} wellData={wellFetch.data?.data} analysisData={query.length > 0 ? queryData : analysisData} onRefresh={analysisFetch.refetch} />
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

import Sidebar from '../components/Sidebar'
import Table from '../components/tableReport'

export default function LaporanPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-4">
        <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-black">
                Laporan Hasil Analisis
                </h1>

                <div className="flex items-center border bg-[#FDEEE7] rounded-full overflow-hidden w-120">
                    <input
                        type="text"
                        placeholder="Cari"
                        className="px-3 py-2 w-full outline-none text-[#ED5E24]"
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
        <Table />
      </main>
    </div>
  )
}

import Sidebar from '../components/Sidebar'
import Table from '../components/tableReport'

export default function LaporanPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-2">Laporan Hasil Analisis</h1>
        <p className="text-gray-600 mb-6">Lihat dan kelola hasil analisis</p>
        <Table />
      </main>
    </div>
  )
}

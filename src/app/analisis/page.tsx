"use client";

import Sidebar from '../components/Sidebar';
import UploadArea from '../components/UploadArea';

export default function AnalisisPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Analisis</h1>
        <form className="space-y-6 max-w-xl">
          <div>
            <label className="block text-sm font-medium mb-1">Lokasi Sumur</label>
            <input
              type="text"
              placeholder="Masukkan lokasi sumur"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kedalaman (m)</label>
            <input
              type="number"
              placeholder="Masukkan kedalaman"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <UploadArea />
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Analisis
          </button>
        </form>
      </main>
    </div>
  );
}

"use client";

import Image from 'next/image';
import Sidebar from '../components/Sidebar';
import UploadArea from '../components/UploadArea';

export default function AnalisisPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        <div className='mb-5'>
          <h1 className="text-3xl font-bold text-[#000000]">
          Analisis
          </h1>
          <p className="text-[#5E5E5E] mt-1 text-base">
            Masukkan detail di bawah untuk menganalisis data.
          </p>
        </div>
        <form className="w-full bg-white rounded-2xl p-8 shadow-sm border border-gray-200 overflow-y-auto">
          <div className='mb-6'>
            <label className="block text-sm font-semibold mb-2">Lokasi Sumur</label>
            <div className="flex items-center border-2 border-gray-300 bg-gray-50 rounded-xl px-3 py-2 focus-within:border-orange-500">
              <Image
                src="/images/location.svg"
                alt="Location Icon"
                width={100}
                height={100}
                className="w-5 h-5 mr-3"
              />
              <input
                type="text"
                placeholder="Masukkan lokasi sumur"
                className="w-full bg-gray-50 outline-none"
              />
            </div>
          </div>
          <div className='mb-6'>
            <label className="block text-sm font-semibold mb-2">Kedalaman (m)</label>
            <div className="flex items-center border-2 border-gray-300 bg-gray-50 rounded-xl px-3 py-2 focus-within:border-orange-500">
              <Image
                src="/images/depth.svg"
                alt="Depth Icon"
                width={100}
                height={100}
                className="w-5 h-5 mr-3"
              />
              <input
                type="text"
                placeholder="Masukkan kedalaman"
                className="w-full bg-gray-50 outline-none"
              />
            </div>
          </div>
          <div className='mb-6'>
            <UploadArea />
          </div>
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

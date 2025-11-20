"use client";

export default function DeleteModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
      <div className="bg-white p-9 rounded-lg w-[360px] shadow-lg">
        <div className="flex justify-center mb-4">
          <img src="/images/hapus.png" alt="Delete Icon" className="w-12 h-12" />
        </div>
        <h2 className="text-lg font-bold text-[#000000] mb-2 text-center">
          Hapus Hasil Analisis?
        </h2>
        <p className="text-sm text-[#404040] mb-6 text-center">
          Apakah Anda yakin ingin melakukan ini?
        </p>
        <div className="flex gap-2 w-full max-w-[400px] mx-auto">
          <button
            onClick={onCancel}
            className="w-full px-4 py-2 bg-white border-2 border-[#E9EAEB] text-black rounded-lg cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}

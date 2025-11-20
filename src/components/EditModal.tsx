import { useState } from "react";

interface EditModalProps {
  data: {
    id: string;
    tanggal: string;
    lokasi: string;
    kedalaman: string;
  };
  wellData: any[];
  onClose: () => void;
  onConfirm: (payload: { id: string; well_id: string; vertical_depth: string; date: string }) => void;
}

export default function EditModal({ data, wellData, onClose, onConfirm }: EditModalProps) {
  const [tanggal, setTanggal] = useState(data.tanggal);
  const [wellId, setWellId] = useState(
    wellData.find((w) => w.name === data.lokasi)?.id || ""
  );
  const [kedalaman, setKedalaman] = useState(data.kedalaman);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onConfirm({
      id: data.id,
      well_id: wellId,
      vertical_depth: kedalaman,
      date: tanggal
    });
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-3xl w-full max-w-md">
        <div className="bg-[#FDEEE7] border-2 border-[#FBDCD0] rounded-2xl p-6">
          <h2 className="text-2xl text-black font-bold mb-2">Informasi</h2>

          <form onSubmit={handleSubmit}>
            {/* Tanggal */}
            <div className="flex items-center mb-2 text-black font-medium">
              <label className="w-24 mr-2">Tanggal</label>
              <span className="mr-1">:</span>
              <input
                type="text"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="flex-1 border-2 border-[#ED5E24] border-dashed p-1 rounded text-center"
              />
            </div>

            {/* Lokasi */}
            <div className="flex items-center mb-2 text-black font-medium">
              <label className="w-24 mr-2">Lokasi</label>
              <span className="mr-1">:</span>
              <select
                value={wellId}
                onChange={(e) => setWellId(e.target.value)}
                className="flex-1 border-2 border-[#ED5E24] border-dashed p-1 rounded text-center text-black"
              >
                {wellData.map((well) => (
                  <option key={well.id} value={well.id}>
                    {well.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Kedalaman */}
            <div className="flex items-center mb-2 text-black font-medium">
              <label className="w-24 mr-2">Kedalaman</label>
              <span className="mr-1">:</span>
              <input
                type="text"
                value={kedalaman}
                onChange={(e) => setKedalaman(e.target.value)}
                className="flex-1 border-2 border-[#ED5E24] border-dashed p-1 rounded text-center"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="basis-1/4 px-4 py-2 bg-[#E9EAEB] text-gray-400 rounded-lg cursor-pointer"
              >
                Batal
              </button>

              <button
                type="submit"
                className="basis-1/4 px-4 py-2 bg-[#ED5E24] text-white rounded-lg cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

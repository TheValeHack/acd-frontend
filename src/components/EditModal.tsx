interface EditModalProps {
  data: {
    tanggal: string;
    lokasi: string;
    kedalaman: string;
    segmentasi: string;
  };
  onClose: () => void;
}

export default function EditModal({ data, onClose }: EditModalProps) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-3xl w-full max-w-md">
        <div className="bg-[#FDEEE7] border-2 border-[#FBDCD0] rounded-2xl p-6">
          <h2 className="text-2xl text-black font-bold mb-2">Informasi</h2>
          <form>
            <div className="flex items-center mb-2 text-black font-medium">
              <label className="w-24 mr-2">Tanggal</label>
              <span className="mr-1">:</span>
              <input
                type="text"
                defaultValue={data.tanggal}
                className="flex-1 border-2 border-[#ED5E24] border-dashed p-1 rounded text-center"
              />
            </div>

            <div className="flex items-center mb-2 text-black font-medium">
              <label className="w-24 mr-2">Lokasi</label>
              <span className="mr-1">:</span>
              <input
                type="text"
                defaultValue={data.lokasi}
                className="flex-1 border-2 border-[#ED5E24] border-dashed p-1 rounded text-center"
              />
            </div>

            <div className="flex items-center mb-2 text-black font-medium">
              <label className="w-24 mr-2">Kedalaman</label>
              <span className="mr-1">:</span>
              <input
                type="text"
                defaultValue={data.kedalaman}
                className="flex-1 border-2 border-[#ED5E24] border-dashed p-1 rounded text-center"
              />
            </div>

           
          </form>
        </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="basis-1/4 px-4 py-2 bg-[#E9EAEB] text-gray-400 rounded-lg"
              >
                Batal
              </button>
              <button
                type="submit"
                className="basis-1/4 px-4 py-2 bg-[#ED5E24] text-white rounded-lg"
              >
                Simpan
              </button>
            </div>
      </div>
    </div>
  );
}

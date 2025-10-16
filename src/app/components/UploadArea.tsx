export default function UploadArea() {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Unggah Foto Bebatuan</label>
      <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center cursor-pointer hover:border-orange-500">
        <p className="text-sm text-gray-600">Klik untuk mengunggah atau seret dan lepas</p>
        <p className="text-xs text-gray-400">(JPG, PNG, MAKS 50MB)</p>
        <input type="file" accept=".jpg,.png" className="hidden" />
      </div>
    </div>
  );
}

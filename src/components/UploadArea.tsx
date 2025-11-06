import Image from "next/image";

export default function UploadArea() {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">Unggah Foto Bebatuan</label>
      <div className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl p-6 text-center cursor-pointer hover:border-orange-500">
        <Image
          src="/images/upload.svg"
          alt="Upload Icon"
          width={100}
          height={100}
          className="mx-auto mb-4 w-10 "
        />
        <p className="text-sm text-gray-600 font-semibold mb-2">Klik untuk mengunggah atau seret dan lepas</p>
        <p className="text-xs text-gray-400">(JPG, PNG, MAKS 50MB)</p>
        <input type="file" accept=".jpg,.png" className="hidden" />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function UploadArea({
  onFileSelect,
}: {
  onFileSelect: (file: File | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold mb-2 text-black dark:text-black">Unggah Foto Bebatuan</label>

      {/* Area upload */}
      <div
        onClick={handleClick}
        className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl p-6 
                 text-center cursor-pointer hover:border-orange-500"
      >
        {!preview ? (
          <>
            <Image
              src="/images/upload.svg"
              alt="Upload Icon"
              width={80}
              height={80}
              className="mx-auto mb-4 w-10"
            />
            <p className="text-sm text-gray-600 font-semibold mb-2">
              Klik untuk mengunggah atau seret dan lepas
            </p>
            <p className="text-xs text-gray-400">(JPG, PNG, MAKS 50MB)</p>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <Image
              src={preview}
              alt="Preview"
              width={300}
              height={300}
              className="rounded-lg object-contain max-h-80"
            />
            <p className="text-xs text-gray-500 mt-2">Klik untuk mengganti gambar</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

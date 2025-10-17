"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname(); // ambil URL aktif
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true); // Ganti dengan state jika ingin menambahkan fungsionalitas expand/collapse

  const menus = [
    {
      name: "Beranda",
      icon: "/images/homes-logo.png",
      href: "/dashboard",
    },
    {
      name: "Analisis",
      icon: "/images/graph-logo.png",
      href: "/analisis",
    },
    {
      name: "Laporan Hasil Analisis",
      icon: "/images/report-logo.png",
      href: "/laporan",
    },
  ];

  return (
    <div className={`${isExpanded ? "w-1/5" : "w-20"} bg-white rounded-r-3xl shadow-sm border border-gray-200 p-4 h-screen sticky top-0 flex flex-col justify-between`}>
      {/* Bagian atas: Logo & Menu */}
      <div>
        <div className="text-center">
          <img
            src="/images/logo_pdu.jpg"
            alt="Logo PDU"
            className="w-48 h-32 object-contain mx-auto mb-4"
          />
          <div className="border-b border-gray-300 mb-4"></div>
          <div className="absolute -right-7 top-35">
            <div onClick={() => setIsExpanded(!isExpanded)} className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer">
              <Image
                src="/images/chevron-left.svg"
                alt="Dekorasi Sidebar"
                className="w-3 h-3"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        {/* Menu */}
        <ul className="space-y-2">
          {menus.map((menu) => {
            const isActive = pathname === menu.href; // cek apakah halaman aktif
            return (
              <li
                key={menu.name}
                onClick={()=> router.push(menu.href)}
                className={`flex items-center space-x-2 p-2 ${isExpanded ? "" : "justify-center"} rounded-md transition group cursor-pointer ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-500 text-gray-600"
                }`}
              >
                <img
                  src={menu.icon}
                  alt={menu.name}
                  className={`w-6 h-6 object-contain transition ${
                    isActive
                      ? "brightness-0 invert"
                      : "group-hover:brightness-0 group-hover:invert"
                  }`}
                />
                {isExpanded && <p
                  className={`text-xs font-medium ${
                    isActive ? "text-white" : "group-hover:text-white"
                  }`}
                >
                  {menu.name}
                </p>}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bagian bawah: Profil & Logout */}
      <div className="border-t border-gray-300 pt-4">
        <div className={isExpanded ? "flex items-center space-x-3 mb-3" : "flex items-center space-x-3 mb-3 justify-center"}>
          <img
            src="/images/profile-logo.png"
            alt="Profil Pengguna"
            className="w-10 h-10 rounded-full object-cover"
          />
          {isExpanded && <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>}
        </div>
        <div>
          <button className="group w-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-xs font-semibold py-2 rounded-md transition">
            <div className="flex items-center justify-center space-x-2">
              <img
                src="/images/logout.png"
                alt="Logout"
                className="w-6 h-6 object-contain transition duration-200 group-hover:brightness-0 group-hover:invert"
              />
              {isExpanded && <p>Keluar</p>}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

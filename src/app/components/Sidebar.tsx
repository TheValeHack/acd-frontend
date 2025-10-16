"use client";

import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname(); // ambil URL aktif

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
    <div className="w-1/5 bg-white rounded-3xl shadow-sm border border-gray-200 p-4 h-screen sticky top-0 flex flex-col justify-between">
      {/* Bagian atas: Logo & Menu */}
      <div>
        <div className="text-center">
          <img
            src="/images/pdu-logo.png"
            alt="Logo PDU"
            className="w-48 h-32 object-contain mx-auto mb-4"
          />
          <div className="border-b border-gray-300 mb-4"></div>
          <div className="absolute -right-7 top-35">
            <img
              src="/images/sidebar-button.png"
              alt="Tombol Sidebar"
              className="w-10 h-10 object-contain mx-auto mb-4"
            />
          </div>
        </div>

        {/* Menu */}
        <ul className="space-y-2">
          {menus.map((menu) => {
            const isActive = pathname === menu.href; // cek apakah halaman aktif
            return (
              <li
                key={menu.name}
                className={`flex items-center space-x-2 p-2 rounded-md transition group cursor-pointer ${
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
                <a
                  href={menu.href}
                  className={`text-xs font-medium ${
                    isActive ? "text-white" : "group-hover:text-white"
                  }`}
                >
                  {menu.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bagian bawah: Profil & Logout */}
      <div className="border-t border-gray-300 pt-4">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src="/images/profile-logo.png"
            alt="Profil Pengguna"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
        <div>
          <button className="group w-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-xs font-semibold py-2 rounded-md transition">
            <div className="flex items-center justify-center space-x-2">
              <img
                src="/images/logout.png"
                alt="Logout"
                className="w-6 h-6 object-contain transition duration-200 group-hover:brightness-0 group-hover:invert"
              />
              <p>Keluar</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

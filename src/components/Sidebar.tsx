"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);

  const menus = [
    { name: "Beranda", icon: "/images/homes-logo.png", href: "/dashboard" },
    { name: "Analisis", icon: "/images/graph-logo.png", href: "/analisis" },
    { name: "Laporan Hasil Analisis", icon: "/images/report-logo.png", href: "/laporan" },
  ];

  return (
    <div
      className={`${
        isExpanded ? "w-1/5" : "w-20"
      } bg-white rounded-r-3xl shadow-sm border border-gray-200 p-4 h-screen sticky top-0 flex flex-col justify-between`}
    >
      {/* Logo + Toggle */}
      <div>
        <div className="text-center relative">
          <img
            src="/images/logo_pdu.jpg"
            alt="Logo PDU"
            className="w-48 h-32 object-contain mx-auto mb-4"
          />
          <div className="border-b border-gray-300 mb-4"></div>

          {/* Button Expand/Collapse */}
          <div className="absolute -right-11 top-32">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer"
            >
              <Image
                src="/images/chevron-left.svg"
                alt="Toggle Sidebar"
                width={100}
                height={100}
                className={`w-3 h-3 transition-transform ${
                  isExpanded ? "" : "rotate-180"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Menu */}
        <ul className="space-y-2">
          {menus.map(({ name, icon, href }) => {
            const isActive = pathname === href;

            return (
              <Link key={href} href={href}>
                <li
                  className={`flex items-center p-2 rounded-md transition group cursor-pointer ${
                    isExpanded ? "space-x-2" : "justify-center"
                  } ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "hover:bg-orange-500 text-gray-600"
                  }`}
                >
                  <img
                    src={icon}
                    alt={name}
                    className={`w-6 h-6 object-contain transition ${
                      isActive
                        ? "brightness-0 invert"
                        : "group-hover:brightness-0 group-hover:invert"
                    }`}
                  />

                  {isExpanded && (
                    <p
                      className={`text-xs font-medium ${
                        isActive ? "text-white" : "group-hover:text-white"
                      }`}
                    >
                      {name}
                    </p>
                  )}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

      {/* Profil + Logout */}
      <div className="border-t border-gray-300 pt-4">
        <div
          className={`flex items-center mb-3 ${
            isExpanded ? "space-x-3" : "justify-center"
          }`}
        >
          <img
            src="/images/profile-logo.png"
            alt="Profil Pengguna"
            className="w-10 h-10 rounded-full object-cover"
          />

          {isExpanded && (
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {session?.user?.username}
              </p>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="group w-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-xs font-semibold py-2 rounded-md transition
        cursor-pointer"
        >
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
  );
}

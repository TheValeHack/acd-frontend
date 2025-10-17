"use client"

import Image from "next/image";
import { useState } from "react";


export default function Home() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  return (
    <div className="relative font-sans flex items-center justify-center min-h-screen gap-16">
    <div className="absolute top-0 left-0 w-[60%] h-full -z-10">
        <Image
            src="/images/login_bg_2.png"
            alt="Login bg"
            fill
            className="object-cover"
            priority
        />
    </div>
      <div className="bg-[#FFFFFF] w-[60%] max-w-[1400px] aspect-3/2  gap-8 rounded-3xl flex justify-between pl-14">
        <div className="flex flex-col items-center justify-center bg-white-500 flex-1">
            <Image
              className="w-28 h-28"
              src="/images/logo_pdu.jpg"
              alt="Logo"
              width={1000}
              height={1000}
              priority
            />
            <div className="w-full py-12 space-y-2">
                <h1 className="text-4xl font-bold">Selamat Datang</h1>
                <p className="text-[#5E5E5E]">Selamat datang kembali! Tolong isi email dan kata sandi.</p>
            </div>
            <div className="w-full">
                <div className="space-y-2 pb-6">
                    <label className="block text-sm font-medium text-gray-700">
                    Email
                    </label>
                    <div className="flex items-center border rounded-lg px-3 py-2 bg-none border-[#E5E7EA]">
                        <div className="w-5 h-5 flex items-center justify-center">
                            <Image
                                className="w-full h-full"
                                src="/images/user.svg"
                                alt="user icon"
                                width={1000}
                                height={1000}
                                />
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="ml-2 flex-1 outline-none text-sm"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2 pb-4">
                    <label className="block text-sm font-medium text-gray-700">
                    Kata Sandi
                    </label>
                    <div className="flex items-center border rounded-lg px-3 py-2 bg-none border-[#E5E7EA]">
                        <div className="w-5 h-5 flex items-center justify-center">
                            <Image
                                className="w-full h-full"
                                src="/images/lock.svg"
                                alt="lock icon"
                                width={1000}
                                height={1000}
                                />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Kata Sandi"
                            className="ml-2 flex-1 outline-none text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? (
                            <div className="w-5 h-5 flex items-center justify-center">
                            <Image
                                    className="w-full h-full"
                                    src="/images/eye-alt.svg"
                                    alt="eye show icon"
                                    width={1000}
                                    height={1000}
                                    />
                            </div>
                            ) : (
                            <div className="w-5 h-5 flex items-center justify-center">
                            <Image
                                    className="w-full h-full"
                                    src="/images/eye-close.svg"
                                    alt="eye close icon"
                                    width={1000}
                                    height={1000}
                                    />
                            </div>
                            )}
                        </button>
                    </div>
                </div>
                <div className="flex items-center pb-4">
                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ms-2 text-sm font-medium text-gray-900">Ingat saya</label>
                </div>
            </div>
            <button className={"w-full py-2 rounded-lg mt-4 transition-colors " + ((username.length == 0 && password.length == 0) ? "bg-[#E9EAEB] text-[#A6A6A6]" : "bg-[#ED5E24] text-white hover:bg-[#b33503]")}>Masuk</button>
        </div>
        <div className="flex items-center w-[50%] rounded-3xl overflow-hidden py-8">
            <Image
              className="w-full h-full"
              src="/images/login_bg.png"
              alt="Login bg"
              width={1000}
              height={1000}
              priority
            />
        </div>
      </div>
    </div>
  );
}

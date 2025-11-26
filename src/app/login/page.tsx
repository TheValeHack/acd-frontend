"use client"

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Home() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setLoading(true);

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      setLoading(false);

      if (res?.error) {
        toast.error("Email atau kata sandi salah ❌", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      toast.success("Login berhasil 🎉", {
        position: "top-right",
        autoClose: 2000,
      });

      router.push("/dashboard");
    }

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
                    <h1 className="text-4xl font-bold text-black dark:text-black">Selamat Datang</h1>
                    <p className="text-[#5E5E5E]">Selamat datang kembali! Tolong isi email dan kata sandi.</p>
                </div>
                <div className="w-full">
  <form onSubmit={handleSubmit}>
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
          className="ml-2 flex-1 outline-none text-sm text-black dark:text-black bg-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          className="ml-2 flex-1 outline-none text-sm block text-sm font-medium text-gray-700 dark:text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <Image
            className="w-5 h-5"
            src={showPassword ? "/images/eye-alt.svg" : "/images/eye-close.svg"}
            alt="toggle password"
            width={1000}
            height={1000}
          />
        </button>
      </div>
    </div>

    <div className="flex items-center pb-4">
      <input id="checked-checkbox" type="checkbox" className="w-4 h-4" />
      <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">Ingat saya</label>
    </div>

    <button
      type="submit"
      disabled={loading}
      className={`w-full cursor-pointer h-10 rounded-lg mt-4 flex items-center justify-center transition-colors ${
        email && password
          ? "bg-[#ED5E24] text-white hover:bg-[#b33503]"
          : "bg-[#E9EAEB] text-[#A6A6A6]"
      }`}
    >
      {loading ? (
        <svg
          className="inline w-4 h-4 text-gray-200 animate-spin fill-white"
          viewBox="0 0 100 101"
          xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      ) : (
        "Masuk"
      )}
    </button>
  </form>
</div>

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
        <ToastContainer />
        </div>
    );
}

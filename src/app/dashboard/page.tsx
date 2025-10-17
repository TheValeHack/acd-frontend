"use client"

export default function DashboardPage() {
  // Data riwayat laporan
  const reportHistory = [
    {
      id: 1,
      tanggal: "20-09-2025",
      lokasiSumur: "Sumur-A-01",
      kedalaman: "1200 - 1400",
      hasilSegmentasi: "Tersedia",
      parameterBatuan: [
        "Siltstone 60%",
        "Sandstone 30%",
        "Lainnya 10%"
      ]
    },
    {
      id: 2,
      tanggal: "20-09-2025",
      lokasiSumur: "Sumur-A-01",
      kedalaman: "1200 - 1400",
      hasilSegmentasi: "Tersedia",
      parameterBatuan: [
        "Siltstone 60%",
        "Sandstone 30%",
        "Lainnya 10%"
      ]
    },
    {
      id: 3,
      tanggal: "20-09-2025",
      lokasiSumur: "Sumur-A-01",
      kedalaman: "1200 - 1400",
      hasilSegmentasi: "Tersedia",
      parameterBatuan: [
        "Siltstone 60%",
        "Sandstone 30%",
        "Lainnya 10%"
      ]
    }
  ];

  const quickActions = [
    {
      title: "Mulai Analisis",
      description: "Analisis otomatis serbuk bor dengan AI",
      href: "/analisis",
      color: "blue"
    },
    {
      title: "Laporan Hasil Analisis",
      description: "Akses laporan hasil analisis",
      href: "/laporan",
      color: "green"
    }
  ];

  const tableHeaders = [
    "Tanggal",
    "Lokasi sumur",
    "Kedalaman (m)",
    "Hasil segmentasi",
    "Parameter Batuan",
    "Aksi"
  ];

  const handleViewReport = (reportId: number) => {
    console.log('View report:', reportId);
  };

  const handleDeleteReport = (reportId: number) => {
    console.log('Delete report:', reportId);
  };

  const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'medium',
    onClick,
    href,
    className = ''
  }: any) => {
    const baseStyles = 'font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants: any = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
    };
    
    const sizes: any = {
      small: 'px-3 py-2 text-sm',
      medium: 'px-4 py-2 text-sm',
      large: 'px-6 py-3 text-base'
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button onClick={onClick} className={classes}>
        {children}
      </button>
    );
  };

  return (
   <div className="min-h-screen bg-gray-50 ">
    <div className="max-w-7xl mx-auto flex gap-4 min-h-screen">
      
      {/* Sidebar kiri - 1/5 */}
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
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-orange-500 transition group cursor-pointer">
            <img
              src="/images/homes-logo.png"
              alt="Beranda"
              className="w-6 h-6 object-contain group-hover:brightness-0 group-hover:invert"
            />
            <a href="#" className="text-xs text-gray-600 group-hover:text-white">
              Beranda
            </a>
          </div>

          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-orange-500 transition group cursor-pointer">
            <img
              src="/images/graph-logo.png"
              alt="Analisis"
              className="w-6 h-6 object-contain group-hover:brightness-0 group-hover:invert"
            />
            <a href="#" className="text-xs text-gray-600 group-hover:text-white">
              Analisis
            </a>
          </div>

          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-orange-500 transition group cursor-pointer">
            <img
              src="/images/report-logo.png"
              alt="Laporan"
              className="w-6 h-6 object-contain group-hover:brightness-0 group-hover:invert"
            />
            <a href="#" className="text-xs text-gray-600 group-hover:text-white">
              Laporan Hasil Analisis
            </a>
          </div>
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
                alt="Profil Pengguna"
                className="w-6 h-6 object-contain transition duration-200 group-hover:brightness-0 group-hover:invert"
              />
              <p>Keluar</p>
            </div>
          </button>
        </div>
      </div>
    </div>


      {/* Konten utama - 4/5 */}
      <div className="w-4/5 flex flex-col h-screen space-y-4 p-4">
        
        {/* Bagian atas: Header dan Quick Actions (50%) */}
        <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-200 overflow-y-auto">
          <header className="mb-4">
            <h1 className="text-3xl font-bold text-[#000000]">
              Selamat datang, Admin!
            </h1>
            <p className="text-[#5E5E5E] mt-1 text-base">
              Aplikasi ini menggunakan teknologi AI berbasis visi komputer untuk membantu 
              menganalisis serbuk<br /> bor. Hasil analisis ditampilkan dalam bentuk laporan 
              sebagai bahan pendukung keputusan.<br />
            </p>

          </header>

          <section>
            <h2 className="text-xl font-semibold text-[#000000] mb-3">
              Quick Action
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-h-[100px]">
              {quickActions.map((action, index) => (
                <a 
                  key={index}
                  href={action.href}
                  className={`group overflow-visible ${
                    action.color === 'blue' 
                      ? 'bg-white hover:bg-[#ED5E24]' 
                      : 'bg-white hover:bg-[#ED5E24]'
                  } text-black p-4 rounded-2xl 
                  shadow-[0_4px_12px_2px_rgba(0,0,0,0.1)] 
                  hover:shadow-[0_6px_18px_3px_rgba(0,0,0,0.2)]
                  transition-all duration-300 flex items-center gap-4`}
                >
                  {/* 🖼️ Wrapper abu-abu untuk gambar */}
                  <div className="bg-[#E9EAEB] p-2 rounded-md flex items-center justify-center transition duration-300 group-hover:bg-[#F39772] ml-2">
                    <img 
                      src={action.color === 'blue' ? '/images/graph-logo.png' : '/images/report-logo.png'}
                      alt={`${action.title} logo`}
                      className="w-8 h-8 object-contain transition duration-300 filter group-hover:brightness-0 group-hover:invert"
                    />
                  </div>

                  {/* 📄 Teks di kanan */}
                  <div className="text-left text-[#404040] transition duration-300 group-hover:text-white">
                    <h3 className="font-medium text-sm font-semibold group-hover:text-white">
                      {action.title}
                    </h3>
                    <p className="text-xs opacity-90 mt-1 group-hover:text-white">
                      {action.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>

        </div>

        {/* Bagian bawah: Riwayat Laporan (50%) */}
        <div className="flex-1 bg-white rounded-lg shadow overflow-hidden border border-gray-200 overflow-y-auto">
          <section className="p-4">
            {/* Bagian header: judul kiri + link kanan */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-[#000000]">
                Riwayat Laporan Hasil Analisis
              </h2>
               <button
                // onClick={handleViewAllReports}  {/* dikomentari sementara */}
                className="flex items-center text-sm text-[#2B2B2B] hover:underline font-medium gap-1"
              >
                Lihat Selengkapnya
                <img
                  src="/images/arrow-right.png"
                  alt="arrow right"
                  className="w-4 h-4"
                />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-white">
                  <tr>
                    {tableHeaders.map((header, index) => (
                      <th 
                        key={index}
                        className="px-3 py-2 text-left text-xs font-medium text-[#000000] uppercase tracking-wider font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportHistory.map((report, index) => (
                    <tr
                      key={report.id}
                      className={`hover:bg-gray-50 ${
                        index % 2 === 0 ? "bg-orange-50" : "bg-white"
                      }`}
                    >
                      <td className="px-3 py-3 whitespace-nowrap text-xs text-[#000000]">
                        {report.tanggal}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-xs font-medium text-[#000000]">
                        {report.lokasiSumur}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-xs text-[#000000]">
                        {report.kedalaman}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-xs text-[#000000]">
                        {report.hasilSegmentasi}
                      </td>
                      <td className="px-3 py-3 text-xs text-[#000000]">
                        <ul className="list-disc pl-4">
                          {report.parameterBatuan.map((param, i) => (
                            <li key={i}>{param}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-xs font-medium">
                        <div className="flex items-center space-x-3">
                          <button onClick={() => handleViewReport(report.id)}>
                            <img
                              src="/images/detail.png"
                              alt="Detail"
                              className="w-5 h-5 hover:opacity-70 transition"
                            />
                          </button>

                         <button >
                            <img
                              src="/images/edit.png"
                              alt="Edit"
                              className="w-5 h-5 hover:opacity-70 transition"
                            />
                          </button>

                          <button onClick={() => handleDeleteReport(report.id)}>
                            <img
                              src="/images/hapus.png"
                              alt="Hapus"
                              className="w-5 h-5 hover:opacity-70 transition"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

      </div>

    </div>
  </div>
  );
}

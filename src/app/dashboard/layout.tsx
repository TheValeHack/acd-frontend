import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Analisis Serbuk Bor",
  description: "Aplikasi analisis serbuk bor dengan teknologi AI",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Layout khusus dashboard - tidak mempengaruhi halaman login
    <div>
      {children}
    </div>
  );
}
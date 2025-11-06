export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/analisis/:path*",
    "/laporan/:path*",
],
};

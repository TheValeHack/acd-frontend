"use client";

import { useParams } from "next/navigation";
import DetailPage from "../../../components/DetailPage"; // pastikan path sesuai

export default function LaporanDetailRoute() {
  const { id } = useParams() as { id: string };
  const index = Number(id);

  return <DetailPage id={index} />;
}

"use client";

import { useParams } from "next/navigation";
import DetailPage from "../../../components/DetailPage";

export default function LaporanDetailRoute() {
  const { id } = useParams();
  const index = Number(id);

  return <DetailPage id={index} />;
}

"use client"
import { ReactNode, useEffect } from "react";

export default function VehiclesLayout({ children }: { children: ReactNode }) {
  useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), []);
  return (
    <>
      {children}
    </>
  );
}

import { ComperatorStoreProvider } from "@/providers/ComperatorStoreProvider";

export default function VehiclesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ComperatorStoreProvider>
      {children}
    </ComperatorStoreProvider>
  );
}

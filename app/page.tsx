import Image from "next/image";
import AppLayout from "@/layouts/AppLayout";
import Hero from "@/components/common/Hero";

export default function Home() {
  return (
    <AppLayout>
      <Hero />
    </AppLayout>
  );
}

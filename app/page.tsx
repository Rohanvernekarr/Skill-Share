'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Hero from "@/components/common/Hero";
import AppLayout from "@/layouts/AppLayout";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('sb-nyqqtjoeiektrrksfkbw-auth-token');
    if (token) {
      router.push('/landing');
    }
  }, []);

  return (
    <AppLayout>
      <Hero />
    </AppLayout>
  );
}

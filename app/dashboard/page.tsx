'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';

export default function DashboardPage() {
  const { profile, loading } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!profile) {
        router.push('/verify-email');
      } else if (!profile.email_confirmed_at) {
        router.push('/verify-email');
      }
    }
  }, [profile, loading, router]);

  if (loading || !profile) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {profile.username}!</h1>
    </div>
  );
}

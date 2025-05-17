'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Clear the URL hash immediately on mount
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    async function checkSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error.message);
        setLoading(false);
        return;
      }

      if (session?.user.email_confirmed_at) {
        router.replace('/'); // Redirect if email is verified
      } else {
        setLoading(false); // Show verification prompt
      }
    }

    checkSession();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Processing login...</p>;

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-xl font-semibold mb-4">Please verify your email</h1>
      <p>We’ve sent a verification link to your email. Once verified, this page will redirect you automatically.</p>
    </div>
  );
}

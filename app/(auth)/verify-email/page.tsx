'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import AuthLayout from '@/layouts/AuthLayout';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

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
        router.replace('/landing'); // Redirect if email is verified
      } else {
        setLoading(false); // Show verification prompt
      }
    }

    checkSession();
  }, [router]);

  if (loading) {
    return (
     
        <div className="flex items-center justify-center space-x-2">
          <ArrowPathIcon className="h-5 w-5 animate-spin" />
          <p>Processing...</p>
        </div>
      
    );
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-2xl shadow-zinc-50/50 dark:bg-zinc-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-zinc-100">
            Check Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-zinc-200">
            We've sent you a verification link
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Verification Required
                </h3>
                <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                  <p>
                    Please check your email for a verification link. Click the link to verify your account and get started.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 dark:text-zinc-400">
            <p>Didn't receive the email?</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-2 font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Return to login
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

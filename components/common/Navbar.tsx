'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.replace('/');
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <Link href="/" className="text-xl font-bold text-zinc-600">
          SkillShare Hub
        </Link>

        <div className="space-x-4">
          <Link href="/learn" className="text-gray-600 hover:text-zinc-600">Learn</Link>
          <Link href="/teach" className="text-gray-600 hover:text-zinc-600">Teach</Link>
          <Link href="/about" className="text-gray-600 hover:text-zinc-600">About</Link>

          {user ? (
            <>
              <Link href="/profile" className="text-gray-600 hover:text-zinc-600">Profile</Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 border rounded text-zinc-600 border-red-600 hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1 border rounded text-zinc-600 border-indigo-600 hover:bg-zinc-600 hover:text-white transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

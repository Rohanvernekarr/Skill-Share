'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { BookOpenIcon, AcademicCapIcon, InformationCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
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
    <nav className="w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold bg-gradient-to-r from-zinc-300 to-blue-400 bg-clip-text text-transparent"
        >
          SkillShare 
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/learn" icon={<BookOpenIcon className="h-5 w-5" />} label="Learn" />
            <NavLink href="/teach" icon={<AcademicCapIcon className="h-5 w-5" />} label="Teach" />
            <NavLink href="/about" icon={<InformationCircleIcon className="h-5 w-5" />} label="About" />
          </div>

          <div className="flex items-center gap-4 ml-4">
            {user ? (
              <>
                <NavLink href="/profile/{username}" icon={<UserCircleIcon className="h-5 w-5" />} label="Profile" />
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm font-medium hover:from-red-700 hover:to-orange-600 transition-all transform hover:scale-[1.02]"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-zinc-600 to-blue-500 text-white text-sm font-medium hover:from-zinc-700 hover:to-blue-600 transition-all transform hover:scale-[1.02]"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

const NavLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Link
    href={href}
    className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </Link>
);
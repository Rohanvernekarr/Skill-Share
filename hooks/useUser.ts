import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js'; 

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getUserAndSave = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user;

      if (currentUser) {
        setUser(currentUser);
        await saveUserToDB(currentUser);
      }

      setLoading(false);
    };

    getUserAndSave();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        await saveUserToDB(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}

// Save user to `profiles` table
const saveUserToDB = async (user: User) => {
  const { id, email, user_metadata, app_metadata } = user;
  const provider = app_metadata?.provider || 'email';

  // Try to extract username
  const username =
    user_metadata?.username ||
    user_metadata?.full_name ||
    user_metadata?.name ||
    email?.split('@')[0];

  // Check if already in DB
  const { data: existingUser } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', id)
    .single();

  if (!existingUser) {
    await supabase.from('profiles').insert({
      id,
      email,
      username,
      provider,
    });
  }
};

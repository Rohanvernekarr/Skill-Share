import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js'; 

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserAndSave = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user;

      if (currentUser) {
        setUser(currentUser);
        await saveUserToDB(currentUser); // Save to DB if new
      }

      setLoading(false);
    };

    getUserAndSave();
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

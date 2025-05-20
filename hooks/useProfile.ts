'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useProfile({ role }: { role?: string } = {}) {
  const [mentors, setMentors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      try {
        let query = supabase.from('profiles').select('*');
        
        if (role) {
          query = query.eq('role', role);
        }

        const { data, error } = await query;

        if (error) throw error;
        setMentors(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [role]);

  return { mentors, isLoading, error };
}

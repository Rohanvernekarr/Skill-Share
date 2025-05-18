// app/profile/[username]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import UserCard from "@/components/common/UserCard";

export default function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (!error && data) setProfile(data);
      setLoading(false);
    }

    if (username) fetchProfile();
  }, [username]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!profile) return <p className="p-4">Profile not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <UserCard profile={profile} />
    </div>
  );
}

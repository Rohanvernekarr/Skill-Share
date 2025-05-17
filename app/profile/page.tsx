"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
        setFullName(user?.user_metadata?.full_name || "");
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const handleUpdate = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });

    if (!error) {
      setUser((prev: any) => ({
        ...prev,
        user_metadata: { ...prev.user_metadata, full_name: fullName },
      }));
      setEditing(false);
    } else {
      alert("Update failed: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ArrowPathIcon className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user)
    return <p className="text-center mt-10">Please log in to view this page</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl  shadow-indigo-50/50 dark:bg-slate-800">
        <div className="flex flex-col md:flex-row">
          {/* Profile Image Section */}
          <div className="md:w-1/3 p-8  bg-indigo-50 rounded-l-2xl dark:bg-slate-800">
            <div className="relative group ">
              <div className="w-32 h-32 rounded-full bg-indigo-100 mx-auto flex items-center justify-center mb-4 dark:bg-indigo-900">
                <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-300">
                  {user.email?.[0]?.toUpperCase()}
                </span>
              </div>

              {/* Username below the image */}
              <p className="text-center text-lg font-semibold text-gray-800 dark:text-indigo-100">
                {user.user_metadata?.full_name || "Unnamed User"}
              </p>
              <p className="text-center mt-18 font-serif text-2xl font-semibold text-gray-800 dark:text-indigo-100">
                Skill Share
              </p>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 dark:text-indigo-100">
              Profile Information
            </h1>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-indigo-300">
                  Full Name
                </label>
                <p className="text-lg text-gray-900 dark:text-indigo-100">
                  {user.user_metadata?.full_name || "Not set"}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-indigo-300">
                  Email Address
                </label>
                <p className="text-lg text-gray-900 dark:text-indigo-100">
                  {user.email}
                </p>
              </div>

              <div className="flex gap-4 mt-8">
                <Link href="/">
                  <Button className="transform rounded-xl bg-gradient-to-r from-slate-600 to-slate-500 px-6 py-3 font-medium text-white transition-all hover:from-slate-700 hover:to-slate-600 hover:shadow-lg active:scale-95">
                    Back to Home
                  </Button>
                </Link>

                <Button
                  onClick={() => setEditing(true)}
                  className="transform rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-3 font-medium text-white transition-all hover:from-indigo-700 hover:to-blue-600 hover:shadow-lg active:scale-95"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md dark:bg-slate-800">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-indigo-100">
              Edit Profile
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-indigo-300">
                  Full Name
                </label>
                <input
                  title="place"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-700 dark:text-indigo-100"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  onClick={() => setEditing(false)}
                  className="transform rounded-xl bg-gradient-to-r from-slate-600 to-slate-500 px-6 py-3 font-medium text-white transition-all hover:from-slate-700 hover:to-slate-600 hover:shadow-lg active:scale-95"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  className="transform rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-3 font-medium text-white transition-all hover:from-indigo-700 hover:to-blue-600 hover:shadow-lg active:scale-95"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

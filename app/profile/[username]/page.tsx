"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ArrowPathIcon, PencilSquareIcon, MapPinIcon, UserCircleIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import  Button  from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/common/Navbar"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profileData, setProfileData] = useState({
    full_name: "",
    bio: "",
    skills: "",
    location: "",
    avatar_url: ""
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) return;

      setUser(user);

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfileData({
        full_name: profile?.full_name || "",
        bio: profile?.bio || "",
        skills: profile?.skills || "",
        location: profile?.location || "",
        avatar_url: profile?.avatar_url || ""
      });

      setLoading(false);
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("id", user.id);

    if (!error) {
      setEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      alert("Update failed: " + error.message);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      setProfileData(prev => ({ ...prev, avatar_url: publicUrl }));
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
       
        
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="animate-pulse space-y-8">
          <div className="h-32 w-32 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto" />
          <div className="space-y-4">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-48 mx-auto" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-64 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Profile Sidebar */}
            <div className="lg:w-1/3 bg-gradient-to-b from-indigo-600 to-indigo-500 dark:from-slate-900 dark:to-slate-800 p-8 text-center">
              <div className="relative group w-48 h-48 mx-auto mb-6 rounded-full border-4 border-white/20 hover:border-white/40 transition-all duration-300">
                {profileData.avatar_url ? (
                  <Image
                    src={profileData.avatar_url}
                    alt="Profile"
                    width={192}
                    height={192}
                    className="rounded-full object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <UserCircleIcon className="w-24 h-24 text-indigo-400 dark:text-indigo-600" />
                  </div>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <input
                    title="file"
                    type="file"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <PencilSquareIcon className="w-8 h-8 text-white" />
                </label>
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">
              {user.user_metadata?.full_name || "Unnamed User"}
              </h2>
              <div className="flex items-center justify-center space-x-2 text-indigo-100">
                <MapPinIcon className="w-5 h-5" />
                <span className="text-lg">{profileData.location ||"Earth"}</span>
              </div>

              <div className="mt-8 space-y-4 text-left">
                <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {profileData.skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-2/3 p-8 space-y-8">
              <div className="flex justify-between items-start">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                  Profile Overview
                </h1>
                <Button
                  onClick={() => setEditing(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                  Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard
                  icon={<UserCircleIcon className="w-6 h-6" />}
                  title="Full Name"
                  value={profileData.full_name}
                />
                <InfoCard
                  icon={<EnvelopeIcon className="w-6 h-6" />}
                  title="Email"
                  value={user.email}
                />
                <InfoCard
                  icon={<MapPinIcon className="w-6 h-6" />}
                  title="Location"
                  value={profileData.location}
                />
                <div className="md:col-span-2">
                  <InfoCard
                    icon={<PencilSquareIcon className="w-6 h-6" />}
                    title="Bio"
                    value={profileData.bio}
                    fullWidth
                  />
                </div>
              </div>

              {showSuccess && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-up">
                  Profile updated successfully! 🎉
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        open={editing}
        onClose={() => setEditing(false)}
        profileData={profileData}
        setProfileData={setProfileData}
        onSave={handleUpdate}
        uploading={uploading}
      />
    </div>
  );
}

function InfoCard({ icon, title, value, fullWidth }: { icon: React.ReactNode; title: string; value: string; fullWidth?: boolean }) {
  return (
    <div className={`${fullWidth ? 'col-span-2' : ''} bg-slate-50 dark:bg-slate-700 p-6 rounded-xl transition-all hover:shadow-md`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{title}</h3>
      </div>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        {value || "Not specified"}
      </p>
    </div>
  );
}

function EditModal({ open, onClose, profileData, setProfileData, onSave, uploading }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Edit Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                title="name"
                value={profileData.full_name}
                onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Location
              </label>
              <input
                title="loc"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div className="md:col-span-2 space-y-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Bio
              </label>
              <textarea
                title="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                rows={4}
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div className="md:col-span-2 space-y-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Skills (comma separated)
              </label>
              <input
                title="skill"
                value={profileData.skills}
                onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
              disabled={uploading}
            >
              {uploading ? (
                <ArrowPathIcon className="w-4 h-4 animate-spin" />
              ) : (
                <PencilSquareIcon className="w-4 h-4" />
              )}
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
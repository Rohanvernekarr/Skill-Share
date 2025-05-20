import Link from "next/link";

type UserProfile = {
  username: string;
  full_name: string;
  bio: string;
  skills: string[];
  avatar_url?: string; // Optional
};

export default function UserCard({ profile }: { profile: UserProfile }) {
  return (
    <div className="border p-4 rounded-2xl shadow-md hover:shadow-lg transition space-y-3 bg-white">
      <div className="flex items-center gap-4">
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.full_name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-white font-semibold">
            {profile.full_name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <Link href={`/profile/${profile.username}`}>
            <h2 className="text-xl font-bold text-blue-700 hover:underline">
              @{profile.username}
            </h2>
          </Link>
          <p className="text-gray-800">{profile.full_name}</p>
        </div>
      </div>

      <p className="text-gray-600 text-sm line-clamp-3">{profile.bio}</p>

      <div className="flex flex-wrap gap-2 mt-2">
        {profile.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

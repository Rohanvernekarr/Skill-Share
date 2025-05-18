type UserProfile = {
    username: string;
    full_name: string;
    bio: string;
    skills: string[];
  };
  
  export default function UserCard({ profile }: { profile: UserProfile }) {
    return (
      <div className="border p-4 rounded-lg shadow-md space-y-2">
        <h2 className="text-2xl font-semibold">@{profile.username}</h2>
        <p className="text-lg">{profile.full_name}</p>
        <p className="text-gray-600">{profile.bio}</p>
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
  
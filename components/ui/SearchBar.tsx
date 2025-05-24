export default function SearchBar({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
      <div className="relative w-full">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search for skills..."
          className="w-full px-4 py-2 rounded-full bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span className="absolute right-4 top-2.5 text-gray-400">🔍</span>
      </div>
    )
  }
  
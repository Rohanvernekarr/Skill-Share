import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-zinc-900 to-zinc-900">
      <div className="w-full max-w-md bg-zinc-900 shadow-md p-6 rounded-xl">
        <Link href="/" className="block mb-6 text-center font-serif text-gray-200 transparent  text-3xl">
          SkillShare
        </Link>
        {children}
      </div>
    </div>
  )
}

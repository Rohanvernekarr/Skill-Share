import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md p-6 rounded-xl">
        <Link href="/" className="block mb-6 text-center text-zinc-600 font-bold text-2xl">
          SkillShare
        </Link>
        {children}
      </div>
    </div>
  )
}

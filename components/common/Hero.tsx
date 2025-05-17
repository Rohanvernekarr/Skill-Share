'use client'

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 py-24 px-6 text-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30 dark:opacity-20"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30 dark:opacity-20"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-100 to-blue-300 bg-clip-text text-transparent mb-6 leading-tight">
          Learn & Teach Skills,<br />Together
        </h1>
        
        <p className="text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto mb-8">
          Connect with peers, exchange knowledge, and grow together in our collaborative learning community.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/signup"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg shadow-indigo-100 dark:shadow-slate-800/50"
          >
            Get Started Free
          </a>
          <a
            href="/learn"
            className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-xl font-medium hover:bg-gray-500 dark:hover:bg-slate-800 transition-all"
          >
            Explore Skills
          </a>
        </div>

        {/* Stats preview */}
        <div className="mt-12 flex justify-center gap-8 text-zinc-600 dark:text-zinc-400">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">1k+</div>
            <div className="text-sm">Active Mentors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">5k+</div>
            <div className="text-sm">Skills Shared</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">98%</div>
            <div className="text-sm">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
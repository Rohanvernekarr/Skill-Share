"use client"

export default function Hero() {
    return (
      <section className="bg-indigo-50 h-dvh py-20 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-800 mb-4">
          Learn & Teach Skills, Together.
        </h1>
        <p className="text-lg text-zinc-700 max-w-xl mx-auto">
          Connect with peers, book sessions, share knowledge — all in one platform.
        </p>
        <div className="mt-6">
          <a
            href="/signup"
            className="bg-zinc-600 text-white px-6 py-3 rounded-lg hover:bg-zinc-700 transition"
          >
            Get Started
          </a>
        </div>
      </section>
    )
  }
  
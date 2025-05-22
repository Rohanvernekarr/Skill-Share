"use client";

import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
      
      <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-10 text-center max-w-3xl mx-auto">
        We believe in learning together. Our platform connects people to share skills,
        learn from peers, and grow through collaboration. Whether you're a beginner or expert,
        there's always something new to teach and learn.
      </p>

      <div className="grid sm:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl shadow-md bg-white dark:bg-zinc-900">
          <h2 className="text-2xl font-semibold mb-2">🌟 Our Mission</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            To democratize learning by making it peer-driven, accessible, and fun. We empower individuals
            to teach what they know and learn what they love.
          </p>
        </div>

        <div className="p-6 rounded-xl shadow-md bg-white dark:bg-zinc-900">
          <h2 className="text-2xl font-semibold mb-2">🤝 How It Works</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Join as a mentor or learner, explore skills, book sessions, and grow your network.
            It's simple, flexible, and built for community-driven learning.
          </p>
        </div>

        <div className="p-6 rounded-xl shadow-md bg-white dark:bg-zinc-900">
          <h2 className="text-2xl font-semibold mb-2">💡 Why Choose Us?</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            We focus on real skill exchange, mentorship culture, and accessibility. No expensive courses—just people helping people.
          </p>
        </div>

        <div className="p-6 rounded-xl shadow-md bg-white dark:bg-zinc-900">
          <h2 className="text-2xl font-semibold mb-2">🚀 Future Vision</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            We're building a decentralized knowledge-sharing ecosystem powered by community,
            credibility, and collaboration.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">
          Made with ❤️ by learners, for learners. Join the movement today.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;

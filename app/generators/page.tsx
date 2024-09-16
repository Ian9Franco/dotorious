import React from "react";
import { Navigation } from "../components/nav";
import Link from "next/link";

const generators = [
  {
    name: "Strategies",
    description: "Team and combo generator for your Dota 2 matches.",
    href: "/generators/strategies",
  },
  {
    name: "Heroes",
    description: "Explore Dota 2 heroes and their itemization.",
    href: "/generators/heroes",
  },
  {
    name: "Stats",
    description: "View your personal Dota 2 statistics.",
    href: "/generators/stats",
  },
];

export default function GeneratorsPage() {
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Generators
          </h2>
          <p className="mt-4 text-zinc-400">
            Explore various Dota 2 tools and statistics.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          {generators.map((generator) => (
            <Link
              href={generator.href}
              key={generator.name}
              className="flex flex-col items-start justify-between rounded-lg border border-zinc-700 p-6 hover:bg-zinc-800 transition-colors duration-300"
            >
              <div className="flex items-center text-zinc-300">
                <span className="text-lg font-medium">{generator.name}</span>
              </div>
              <p className="mt-2 text-zinc-400">{generator.description}</p>
              <div className="flex items-center mt-4 text-sm text-zinc-500">
                <span>Explore</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
'use client'

import React, { useState, useEffect } from "react";
import { Navigation } from "../components/nav";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { app } from "../firebase/firebaseConfig";

const auth = getAuth(app);
const db = getDatabase(app);

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
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [steamAccountId, setSteamAccountId] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showSteamAccountIdModal, setShowSteamAccountIdModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        checkIfIdSaved(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const checkIfIdSaved = async (userId: string) => {
    const steamAccountIdRef = ref(db, `players/${userId}/steamAccountId`);
    const snapshot = await get(steamAccountIdRef);
    if (snapshot.exists()) {
      setSteamAccountId(snapshot.val());
    } else {
      setShowSteamAccountIdModal(true);
    }
  };

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      
      await set(ref(db, `players/${userCredential.user.uid}/email`), email);
      
      setErrorMessage("");
      setShowModal(false);
      setShowSteamAccountIdModal(true);
    } catch (error) {
      setErrorMessage(isSignUp ? "Failed to sign up. Please try again." : "Failed to log in. Please check your credentials.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setErrorMessage("");
      setSteamAccountId("");
    } catch (error) {
      setErrorMessage("Failed to log out. Please try again.");
    }
  };

  const handleSubmitSteamAccountId = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await set(ref(db, `players/${user.uid}/steamAccountId`), steamAccountId);
      setErrorMessage("");
      setShowSteamAccountIdModal(false);
    } catch (error) {
      setErrorMessage("Failed to save Steam Account ID. Please try again.");
    }
  };

  return (
    <div className="relative pb-16">
      <Navigation teamLogic="lane" setTeamLogic={() => {}} />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Generators
            </h2>
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-zinc-600 text-white rounded hover:bg-zinc-500 transition-colors duration-300"
              >
                Login
              </button>
            )}
          </div>
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-8 rounded-lg max-w-md w-full">
            <h3 className="text-2xl font-bold text-zinc-100 mb-4">
              {isSignUp ? "Sign Up" : "Login"}
            </h3>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-700 text-zinc-100 shadow-sm focus:border-zinc-500 focus:ring-zinc-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-700 text-zinc-100 shadow-sm focus:border-zinc-500 focus:ring-zinc-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-zinc-600 text-white rounded hover:bg-zinc-500 transition-colors duration-300"
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </button>
            </form>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="mt-4 w-full px-4 py-2 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600 transition-colors duration-300"
            >
              {isSignUp
                ? "Already have an account? Log In"
                : "Don't have an account? Sign Up"}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full px-4 py-2 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showSteamAccountIdModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-8 rounded-lg max-w-md w-full">
            <h3 className="text-2xl font-bold text-zinc-100 mb-4">Enter Your Steam Account ID</h3>
            <form onSubmit={handleSubmitSteamAccountId} className="space-y-4">
              <div>
                <label
                  htmlFor="steamAccountId"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Steam Account ID
                </label>
                <input
                  type="text"
                  id="steamAccountId"
                  value={steamAccountId}
                  onChange={(e) => setSteamAccountId(e.target.value)}
                  className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-700 text-zinc-100 shadow-sm focus:border-zinc-500 focus:ring-zinc-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-zinc-600 text-white rounded hover:bg-zinc-500 transition-colors duration-300"
              >
                Save Steam Account ID
              </button>
            </form>
            <button
              onClick={() => setShowSteamAccountIdModal(false)}
              className="mt-4 w-full px-4 py-2 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
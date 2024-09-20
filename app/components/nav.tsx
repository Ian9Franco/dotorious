"use client";

import { ArrowLeft, Moon, Sun, MessageCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "./menu";
import { usePathname } from "next/navigation";
import { getAuth } from "firebase/auth";
import { getDatabase, ref as dbRef, onValue, DataSnapshot } from "firebase/database";
import { app } from "../firebase/firebaseConfig";
import { useTheme } from "next-themes";
import { Chat } from "./Chat";

const auth = getAuth(app);
const db = getDatabase(app);

interface NavigationProps {
  teamLogic: 'lane' | 'legis' | 'Asuza';
  setTeamLogic: React.Dispatch<React.SetStateAction<'lane' | 'legis' | 'Asuza'>>;
}

export const Navigation: React.FC<NavigationProps> = ({ teamLogic, setTeamLogic }) => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      const parsedUser = JSON.parse(cachedUser);
      fetchUserName(parsedUser.uid);
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        fetchUserName(user.uid);
      } else {
        setUserName(null);
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserName = (userId: string) => {
    const userRef = dbRef(db, `players/${userId}/playerId`);
    onValue(userRef, (snapshot: DataSnapshot) => {
      const playerId = snapshot.val();
      if (playerId) {
        fetch(`https://api.opendota.com/api/players/${playerId}`)
          .then((response) => response.json())
          .then((data) => {
            const name = data.profile?.personaname || null;
            setUserName(name);
            localStorage.setItem('userName', name);
          })
          .catch((error) => console.error("Error fetching player data:", error));
      }
    });
  };

  const getParentPath = (path: string) => {
    const parts = path.split("/");
    parts.pop();
    return parts.join("/") || "/";
  };

  const toggleTeamLogic = () => {
    setTeamLogic(prev => {
      if (prev === "lane") return "legis";
      if (prev === "legis") return "Asuza";
      return "lane";
    });
  };

  // Hide navigation on the home page
  if (pathname === "/") return null;

  // Navigation sections
  const navigationSections = [
    { name: "Dota2", href: "/generators" },
  ];

  // Filter sections depending on the current route
  const filteredSections = navigationSections.filter(
    (section) => section.href !== pathname
  );

  // Check if the current page is 'Strategies'
  const isStrategiesPage = pathname.includes("/generators/strategies");

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500 border-zinc-800"
        } ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}
      >
        <div className="container flex items-center justify-between p-6 mx-auto">
          <Link
            href={getParentPath(pathname)}
            className={`duration-200 ${theme === 'dark' ? 'text-zinc-300 hover:text-zinc-100' : 'text-zinc-600 hover:text-zinc-900'}`}
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>

          {/* Show navigation links only on the contact page */}
          {pathname === "/contact" && (
            <div className="flex justify-between gap-8">
              {filteredSections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className={`duration-200 ${theme === 'dark' ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-600 hover:text-zinc-900'}`}
                >
                  {section.name}
                </Link>
              ))}
            </div>
          )}

          {/* Show the user's name if available */}
          {userName && (
            <div className="flex justify-end items-center gap-4">
              <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>{userName}</span>
              {isStrategiesPage && (
                <button
                  onClick={toggleTeamLogic}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                      : 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300'
                  }`}
                >
                  {teamLogic === "lane" && "Switch to Legis"}
                  {teamLogic === "legis" && "Switch to Asuza"}
                  {teamLogic === "Asuza" && "Switch to Lane"}
                </button>
              )}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`p-2 ${
                  theme === 'dark'
                    ? 'text-zinc-300 hover:text-zinc-100'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-2 ${
                  theme === 'dark'
                    ? 'text-zinc-300 hover:text-zinc-100'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          )}

          <Menu />
        </div>
      </div>
      {showChat && <Chat />}
    </header>
  );
};
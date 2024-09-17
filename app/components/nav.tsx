"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "./menu";
import { usePathname } from "next/navigation";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { app } from "../firebase/firebaseConfig";

const auth = getAuth(app);
const db = getDatabase(app);

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

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
      setUser(parsedUser);
      fetchUserName(parsedUser.uid);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        fetchUserName(user.uid);
      } else {
        setUser(null);
        setUserName(null);
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserName = (userId: string) => {
    const userRef = dbRef(db, `players/${userId}/playerId`);
    onValue(userRef, (snapshot) => {
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

  // Ocultar navegación en la página de inicio
  if (pathname === "/") return null;

  // Secciones de navegación
  const navigationSections = [
    { name: "Dota2", href: "/generators" },
  ];

  // Filtrar las secciones dependiendo de la ruta actual
  const filteredSections = navigationSections.filter(
    (section) => section.href !== pathname
  );

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500 border-zinc-800"
        }`}
      >
        <div className="container flex items-center justify-between p-6 mx-auto">
          <Link
            href={getParentPath(pathname)}
            className="duration-200 text-zinc-300 hover:text-zinc-100"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>

          {/* Mostrar enlaces de navegación solo en la página de contacto */}
          {pathname === "/contact" && (
            <div className="flex justify-between gap-8">
              {filteredSections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className="duration-200 text-zinc-400 hover:text-zinc-100"
                >
                  {section.name}
                </Link>
              ))}
            </div>
          )}

          {/* Mostrar el nombre del usuario si está disponible */}
          {userName && (
            <div className="flex justify-end w-full">
              <span className="text-zinc-300">Ah sos vos {userName}</span>
            </div>
          )}

          <Menu />
        </div>
      </div>
    </header>
  );
};

"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "./menu";
import { usePathname } from "next/navigation";

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getParentPath = (path: string) => {
    const parts = path.split("/");
    parts.pop();
    return parts.join("/") || "/";
  };

  // Ocultar navegación en la página de inicio
  if (pathname === "/") return null;

  // Definir las secciones de navegación
  const navigationSections = [
    { name: "Generators", href: "/generators" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  // Filtrar secciones según la ruta actual
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

          <Menu />
        </div>
      </div>
    </header>
  );
};

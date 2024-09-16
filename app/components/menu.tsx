"use client";
import React, { useState } from "react";
import { Compass, Sun, Moon, MessageCircle } from "lucide-react";
import { motion } from "framer-motion"; // Añadimos framer-motion para animar la rotación

export const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Aquí podrías actualizar el tema de tu aplicación
    // Por ejemplo: document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors duration-200 fixed top-1/2 transform -translate-y-1/2"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Compass className="w-6 h-6" />
        </motion.div>
      </button>

      {isOpen && (
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-48 bg-zinc-800 rounded-md shadow-lg py-1">
          <button
            onClick={toggleDarkMode}
            className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 w-full text-left"
          >
            {isDarkMode ? (
              <>
                <Sun className="inline-block w-4 h-4 mr-2" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="inline-block w-4 h-4 mr-2" />
                Dark Mode
              </>
            )}
          </button>
          <button className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 w-full text-left">
            <MessageCircle className="inline-block w-4 h-4 mr-2" />
            Chat
          </button>
        </div>
      )}
    </div>
  );
};

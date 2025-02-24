"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-montserrat text-primary font-bold flex items-center">
          🏠 BALLOUCHI
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex space-x-6">
          <NavLinks />
        </div>

        {/* Bouton de connexion (desktop) */}
        <button className="hidden md:block bg-secondary text-white px-5 py-2 rounded-lg shadow-md hover:bg-opacity-90 transition">
          Connexion
        </button>

        {/* Bouton menu mobile */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full p-4 flex flex-col items-center space-y-4">
          <NavLinks />
          <button className="bg-secondary text-white px-5 py-2 rounded-lg shadow-md w-full text-center">
            Connexion
          </button>
        </div>
      )}
    </nav>
  );
}

function NavLinks() {
  return (
    <>
      <Link href="/" className="hover:text-primary transition">Accueil</Link>
      <Link href="/annonces" className="hover:text-primary transition">Annonces</Link>
      <Link href="/publier" className="hover:text-primary transition">Publier</Link>
      <Link href="/contact" className="hover:text-primary transition">Contact</Link>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Moon, Sun } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: "/annonces", label: "Annonces" },
    { href: "/publier", label: "Publier" },
    { href: "/contact", label: "Contact" },
  ];

  const handlePublishNavigation = (e) => {
    if (!session?.user) {
      e.preventDefault();
      router.push("/login");
    }
    closeMobileMenu();
  };

  if (!mounted || status === "loading") {
    return (
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md rounded-xl px-4 py-2 mx-4 my-2">
        <div className="flex justify-between items-center animate-pulse h-12">
          <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-4 z-50  lg:mx-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg mt-2 rounded-xl px-2 py-2 transition-all">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo & dark mode bouton mobile */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl font-bold text-primary dark:text-primary-300">
            🏠 BALLOUCHI
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Changer thème"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-8 flex-1">
          {/* Navigation links - Centré */}
          <div className="flex-1 flex justify-center">
            <ul className="flex space-x-6 font-semibold text-gray-700 dark:text-gray-300">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-secondary dark:hover:text-secondary-300 transition-colors px-3 py-2 relative
                       after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-secondary after:transition-all
                       hover:after:w-full"
                    onClick={label === "Publier" ? handlePublishNavigation : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dark mode bouton et authentification */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {session?.user ? (
              <div className="flex items-center gap-3">
                <img
                  src={session.user.image || "/default-avatar.png"}
                  alt="Profil"
                  className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-600 shadow-sm"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="bg-secondary text-white px-4 py-1.5 rounded-md hover:bg-red-700 transition transform hover:scale-105"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link href="/login">
                <button className="bg-primary text-white px-4 py-1.5 rounded-md hover:bg-opacity-90 transition transform hover:scale-105">
                  Connexion
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Menu Mobile Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-primary dark:text-primary-300"
          aria-label="Ouvrir menu mobile"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 right-0 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50 space-y-2">
            <ul className="flex flex-col font-semibold text-gray-700 dark:text-gray-300 space-y-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={label === "Publier" ? handlePublishNavigation : closeMobileMenu}
                    className="block hover:text-secondary dark:hover:text-secondary-300 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t pt-2 border-gray-200 dark:border-gray-700">
              {session?.user ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={session.user.image || "/default-avatar.png"}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm">{session.user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      closeMobileMenu();
                    }}
                    className="text-left w-full text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 px-3 py-1 rounded"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="block text-secondary dark:text-secondary-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded"
                >
                  Connexion
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

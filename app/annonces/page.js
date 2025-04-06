// app/annonces/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AnnonceList from "../components/AnnonceList";
import useAnnonceStore from "../store/useAnnonceStore";

const gouvernorats = [
  "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba",
  "Kairouan", "Kasserine", "Kébili", "Le Kef", "Mahdia", "La Manouba",
  "Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana",
  "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
];

export default function AnnoncesPage() {
  const router = useRouter();
  const {
    selectedGouvernorat,
    selectedCategorie,
    setSelectedGouvernorat,
    setSelectedCategorie
  } = useAnnonceStore();
  
  const [annonces, setAnnonces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const limit = 6;

  useEffect(() => {
    // Récupération des catégories
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Erreur de récupération des catégories");
        setCategories(await res.json());
      } catch (err) {
        console.error("Erreur chargement catégories:", err);
      }
    };

    // Vérification utilisateur connecté
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setUser(data.user || null);
      } catch (err) {
        setUser(null);
      }
    };

    fetchCategories();
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchAnnonces = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString()
        });
        
        if (selectedGouvernorat) {
          params.append("emplacement", selectedGouvernorat);
          console.log("Gouvernorat sélectionné:", selectedGouvernorat); // Debug
        }
        
        if (selectedCategorie) params.append("categorieId", selectedCategorie);
    
        const res = await fetch(`/api/annonces?${params.toString()}`);
        console.log("URL appelée:", res.url); // Debug
        if (!res.ok) throw new Error("Erreur de chargement des annonces");
        
        const { annonces, total } = await res.json();
        setAnnonces(annonces);
        setTotal(total);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, [page, selectedGouvernorat, selectedCategorie]);

  return (
    <section className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
      {/* En-tête avec filtres */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Groupe gauche : Titre + Filtres */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-grow">
            <h1 className="text-3xl font-bold text-primary dark:text-primary-300 whitespace-nowrap">
              Toutes les annonces
            </h1>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedGouvernorat}
                onChange={(e) => {
                  setSelectedGouvernorat(e.target.value);
                  setPage(1); // Réinitialiser la pagination
                }}
                className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value="">Tous gouvernorats</option>
                {gouvernorats.map((gov) => (
                  <option key={gov} value={gov} className="dark:bg-gray-800">
                    {gov}
                  </option>
                ))}
              </select>

              <select
                value={selectedCategorie}
                onChange={(e) =>{ setSelectedCategorie(e.target.value);
                  setPage(1); // Réinitialiser la pagination
                } }
                className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white min-w-[200px]"
              >
                <option value="">Toutes catégories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="dark:bg-gray-800">
                    {cat.nom}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bouton à droite */}
          {user && (
            <button
              onClick={() => router.push("/mes-annonces")}
              className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-800 transition whitespace-nowrap self-end sm:self-auto"
            >
              Mes annonces
            </button>
          )}
        </div>
      </div>

      {/* Liste des annonces */}
      <AnnonceList annonces={annonces} loading={loading} error={error} />

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          Précédent
        </button>
        
        <span className="flex items-center px-4 font-medium text-gray-700 dark:text-gray-300">
          Page {page}
        </span>
        
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * limit >= total}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          Suivant
        </button>
      </div>
    </section>
  );
}
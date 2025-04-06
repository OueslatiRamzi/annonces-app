"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaSpinner, FaExclamationTriangle, FaPlus } from "react-icons/fa";
import AnnonceList from "../components/AnnonceList";

export default function MesAnnoncesPage() {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 🔧 Récupération de l'utilisateur connecté
        const userRes = await fetch("/api/auth/me");
        if (!userRes.ok) throw new Error("Impossible de récupérer l'utilisateur");

        const userData = await userRes.json();
        const user = userData.user;

        if (!user?.id) {
          router.push("/connexion");
          return;
        }

        // 🔧 Récupération des annonces de l'utilisateur
        const annoncesRes = await fetch(`/api/annonces?userId=${user.id}`);
        if (!annoncesRes.ok) {
          const message = await annoncesRes.text();
          console.error("Réponse brute de l'API:", annoncesRes.status, message);
          throw new Error("Erreur lors du chargement des annonces");
        }


        const data = await annoncesRes.json();
        if (!Array.isArray(data.annonces)) throw new Error("Format de données inattendu");

        setAnnonces(data.annonces);
      } catch (err) {
        console.error("Erreur dans MesAnnoncesPage:", err);
        setError(err.message || "Une erreur est survenue");
        router.push("/annonces");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <FaSpinner className="animate-spin text-4xl text-primary mb-4 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">
            Chargement de vos annonces...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="mb-4">
            <FaExclamationTriangle className="text-red-500 text-5xl mx-auto" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">
            Une erreur est survenue
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <FaSpinner className="animate-spin" />
            Réessayer
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Mes Annonces
        </h1>

        {annonces.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Vous n&apos;avez aucune annonce active pour le moment.
            </p>
            <button
              onClick={() => router.push("/publier")}
              className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <FaPlus />
              Publier une nouvelle annonce
            </button>
          </div>
        ) : (
          <AnnonceList
            annonces={annonces}
            showUser={false}
            actions={true}
            onEdit={(id) => router.push(`/annonces/${id}/editer`)}
            onDelete={async (id) => {
              try {
                const res = await fetch(`/api/annonces/${id}`, {
                  method: "DELETE"
                });

                if (!res.ok) throw new Error("Échec de la suppression");

                setAnnonces(prev => prev.filter(a => a.id !== id));
              } catch (err) {
                setError(err.message || "Erreur lors de la suppression");
              }
            }}
          />
        )}
      </motion.div>
    </main>
  );
}

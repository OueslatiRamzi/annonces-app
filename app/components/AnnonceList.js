/* eslint-disable no-unused-vars */
"use client";

import PropTypes from 'prop-types';
import AnnonceCard from "./AnnonceCard";
import { FaExclamationTriangle, FaSearch } from "react-icons/fa"; // Retiré FaSpinner inutilisé
import { motion } from "framer-motion";

AnnonceList.propTypes = {
  annonces: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      // Ajoutez les autres propriétés nécessaires ici
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
export default function AnnonceList({ annonces, loading, error }) {
  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Squelette de chargement animé
          Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 h-48 w-full" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                  <div className="flex justify-between mt-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : error ? (
          // État d'erreur amélioré
          <div className="col-span-full py-12 text-center">
            <div className="max-w-md mx-auto bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
              <FaExclamationTriangle className="text-red-500 dark:text-red-400 text-4xl mx-auto mb-4" />
              <p className="text-red-600 dark:text-red-300 font-medium">{error}</p>
            </div>
          </div>
        ) : annonces.length > 0 ? (
          annonces.map((annonce) => (
            <AnnonceCard key={annonce.id} annonce={annonce} />
          ))
        ) : (
          // État vide amélioré
          <div className="col-span-full py-12 text-center">
            <div className="max-w-md mx-auto bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <FaSearch className="text-blue-500 dark:text-blue-400 text-4xl mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Aucune annonce trouvée
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
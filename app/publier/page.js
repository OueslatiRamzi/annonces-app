/* eslint-disable no-unused-vars */
'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import AnnonceForm from "../components/AnnonceForm";
import { FaSpinner } from "react-icons/fa";

export default function PublierPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaSpinner className="text-3xl text-primary dark:text-secondary animate-spin" />
          </motion.div>
          <p className="text-gray-600 dark:text-gray-400">Vérification de l&apos;authentification...</p>
        </div>
      </motion.div>
    );
  }

  if (status !== 'authenticated') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-slate-300 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto space-y-6 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
        <div className="text-center p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
          <motion.h1
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent dark:from-primary-400 dark:to-secondary-300"
          >
            Publier une annonce
          </motion.h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Partagez votre annonce avec la communauté en remplissant ce formulaire
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <AnnonceForm />
        </div>

        <div className="p-6 sm:p-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Votre annonce sera vérifiée avant publication. Les champs marqués d&apos;un * sont obligatoires.
        </p>
        </div>
      </div>
    </motion.div>
  );
}
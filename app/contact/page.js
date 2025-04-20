'use client';
import { motion } from 'framer-motion';
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-300 to-primary dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Contactez-nous
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Une question ? Notre équipe vous répond sous 24h
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
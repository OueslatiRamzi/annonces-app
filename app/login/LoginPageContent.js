"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGoogle, FaExclamationTriangle, FaArrowLeft, FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link"; 

export default function LoginPageContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-gray-100 dark:border-gray-700"
      >
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary mb-4"
          >
            <FaArrowLeft className="inline mr-2" /> Retour à l&apos;accueil
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Connectez-vous
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Accédez à votre espace personnel</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-start space-x-3 border border-red-100 dark:border-red-900/30"
          >
            <FaExclamationTriangle className="text-red-500 dark:text-red-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-red-600 dark:text-red-300 font-medium">
                {decodeURIComponent(error) === "CredentialsSignin"
                  ? "Identifiants invalides"
                  : decodeURIComponent(error)}
              </p>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center space-x-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-all"
          >
            <FaGoogle className="text-xl" />
            <span>Continuer avec Google</span>
          </motion.button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Plus d&apos;options prochainement</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 opacity-50 cursor-not-allowed">
            <button className="p-3 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
              <FaFacebookF className="w-5 h-5" />
            </button>

            <button className="p-3 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-blue-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 8.554 0 13.255-7.208 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
              </svg>
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          En vous connectant, vous acceptez nos{" "}
          <Link href="/privacy" className="text-primary dark:text-secondary hover:underline">
            Conditions d&apos;utilisation
          </Link>{" "}
          et{" "}
          <Link href="/terms" className="text-primary dark:text-secondary hover:underline">
            Politique de confidentialité
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
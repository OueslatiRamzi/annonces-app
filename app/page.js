"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaBullhorn, FaPlus, FaSpinner } from "react-icons/fa";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handlePublishClick = (e) => {
    if (!session?.user) {
      e.preventDefault();
      router.push("/login");
    }
  };

  // Variantes d'animation améliorées
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 120,
        damping: 20,
        mass: 0.5
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-300 dark:bg-slate-900">
      {/* Animation de fond améliorée */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10">
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-primary/20 blur-3xl"
          animate={{
            x: ["-20%", "100%", "-20%"],
            y: ["-30%", "80%", "-30%"],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-secondary/20 blur-3xl"
          animate={{
            x: ["100%", "-20%", "100%"],
            y: ["80%", "-30%", "80%"],
            scale: [1.2, 0.8, 1.2]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />
      </div>

      {/* Contenu principal */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Titre avec effet de profondeur */}
        <motion.h1 
          className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          variants={itemVariants}
        >
          <motion.span className="block">BALLOUCHI</motion.span>
          <motion.span 
            className="block text-lg md:text-2xl font-normal mt-4 text-slate-700 dark:text-slate-300"
            variants={itemVariants}
          >
            Votre marché tunisien nouvelle génération
          </motion.span>
        </motion.h1>

        {/* Boutons avec effet holographique */}
        <motion.div 
          className="flex flex-col md:flex-row gap-6 mt-8"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Link 
              href="/annonces"
              className="relative flex items-center justify-center gap-3 bg-white/10 backdrop-blur-lg text-slate-800 dark:text-white px-8 py-4 rounded-xl 
                        shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 border-white/20"
            >
              <FaBullhorn className="text-xl shrink-0" />
              <span className="text-lg font-medium">Explorer les annonces</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href="/publier"
              onClick={handlePublishClick}
              className="relative flex items-center justify-center gap-3 bg-primary/10 backdrop-blur-lg text-primary dark:text-white px-8 py-4 rounded-xl 
                        shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 border-primary/20"
            >
              <FaPlus className="text-xl shrink-0" />
              <span className="text-lg font-medium">Publier une annonce</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Section caractéristiques améliorée */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mt-16 md:mt-24 w-full max-w-6xl px-4"
          variants={containerVariants}
        >
          {[
            { 
              title: "🔒 Sécurité totale", 
              text: "Protection des données et transactions chiffrées",
              icon: "🛡️"
            },
            { 
              title: "🚀 Rapidité garantie", 
              text: "Interface optimisée pour une expérience fluide",
              icon: "⚡"
            },
            { 
              title: "🤝 Communauté vérifiée", 
              text: "Utilisateurs authentifiés et annonces contrôlées",
              icon: "✅"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-white/20"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Overlay de chargement amélioré */}
        {status === "loading" && (
          <motion.div 
            className="absolute inset-0 bg-slate-300/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <FaSpinner className="text-5xl text-primary dark:text-secondary animate-pulse" />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
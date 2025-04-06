'use client';
import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary shadow-2xl 
      after:absolute after:bottom-0 after:left-0 after:w-full after:h-8 after:bg-gradient-to-t 
      after:from-primary/80 after:to-transparent after:pointer-events-none">
      
      {/* Bandeau animé */}
      <motion.div
        className="absolute top-0 h-1 bg-gradient-to-r from-white/30 to-transparent w-full"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      <div className="container mx-auto px-4 py-6 relative">
        <div className="flex flex-col items-center space-y-3">
          {/* Logo animé */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex items-center space-x-3 group"
          >
            <FaRocket className="text-4xl text-white animate-bounce" />
            <h1 className="text-4xl font-bold text-white font-itim tracking-tight">
              BALLOUCHI
              <span className="block text-sm font-normal mt-1 opacity-90">
                La révolution des annonces
              </span>
            </h1>
          </motion.div>

          {/* Phrase d'accroche avec séparateur estompé */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-lg text-white/90 font-light italic">
              « Trouvez l&apos;insaisissable, vendez l&apos;incroyable »
            </p>
            <div className="mt-2 h-0.5 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto rounded-full" />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
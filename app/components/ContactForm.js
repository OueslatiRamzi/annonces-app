/* eslint-disable no-unused-vars */
'use client';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";

// Schéma de validation inchangé
const schema = yup.object().shape({
  name: yup.string().min(4, "Le nom doit contenir au moins 4 caractères").required("Le nom est obligatoire"),
  email: yup.string().email("Email invalide").required("Email obligatoire"),
  telephone: yup.string().matches(/^\d{8}$/, "Numéro invalide").required("Numéro de téléphone obligatoire"),
  message: yup.string().max(30, "Le message ne doit pas dépasser 30 caractères").required("Message obligatoire"),
});

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: yupResolver(schema) 
  });

  const onSubmit = (data) => {
    console.log("Message envoyé :", data);
    alert("Votre message a été envoyé !");
  };

  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        {/* Nom */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
            <FaUser className="text-primary" />
            <span>Nom complet</span>
          </label>
          <div className="relative">
            <input 
              {...register("name")} 
              placeholder="Votre nom"
              className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="text-xs">⚠</span> {errors.name.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
            <FaEnvelope className="text-primary" />
            <span>Adresse email</span>
          </label>
          <div className="relative">
            <input
              {...register("email")}
              placeholder="exemple@email.com"
              className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="text-xs">⚠</span> {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Téléphone */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
            <FaPhone className="text-primary" />
            <span>Téléphone</span>
          </label>
          <div className="relative">
            <input
              {...register("telephone")}
              placeholder="12345678"
              className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            />
            {errors.telephone && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="text-xs">⚠</span> {errors.telephone.message}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
            <FaPaperPlane className="text-primary" />
            <span>Message</span>
          </label>
          <div className="relative">
            <textarea
              {...register("message")}
              placeholder="Votre message..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all h-32"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="text-xs">⚠</span> {errors.message.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <FaPaperPlane />
        Envoyer le message
      </motion.button>
    </motion.form>
  );
}
/* eslint-disable no-unused-vars */
"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaTag, FaMapMarkerAlt, FaPhone, FaEuroSign, FaUser, FaCheck, FaSpinner, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import PropTypes from 'prop-types';

const schema = yup.object().shape({
  nom: yup.string().min(4, "Le nom doit contenir au moins 4 caractères").required(),
  prix: yup.string().matches(/^\d+(\.\d{1,2})?$/, "Le prix doit être un nombre valide").required(),
  description: yup.string().max(100, "Max 100 caractères").required(),
  categorie: yup.string().required("La catégorie est obligatoire"),
  telephone: yup.string().matches(/^\d{8}$/, "Numéro invalide (8 chiffres)").required(),
  emplacement: yup.string().required("L’emplacement est obligatoire"),
  images: yup
    .mixed()
    .test("fileSize", "Chaque image doit être inférieure à 2MB", (value) =>
      (Array.from(value || [])).every(file => file?.size <= 2 * 1024 * 1024)
    )
    .test("fileType", "Formats acceptés: JPEG, PNG", (value) =>
      (Array.from(value || [])).every(file => ["image/jpeg", "image/png"].includes(file?.type))
    )
    .required("Les images sont obligatoires"),
});

const gouvernorats = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Bizerte", "Béja", "Jendouba",
  "Le Kef", "Siliana", "Sousse", "Monastir", "Mahdia", "Sfax", "Kairouan", "Kasserine",
  "Sidi Bouzid", "Gabès", "Medenine", "Tataouine", "Gafsa", "Tozeur", "Kebili"
];

export default function AnnonceForm() {
  const router = useRouter();
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
    setValue // Ajout crucial
  } = useForm({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    
    try {
      formData.append("nom", data.nom);
      formData.append("prix", data.prix);
      formData.append("description", data.description);
      formData.append("categorie", data.categorie.trim());
      formData.append("telephone", data.telephone);
      formData.append("emplacement", data.emplacement);

      Array.from(data.images).forEach((file) => formData.append("images", file));

      const response = await fetch("/api/annonces", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la publication");
      }

      setShowSuccessModal(true);
      reset();
      setTimeout(() => router.push("/annonces"), 3000);

    } catch (error) {
      toast.error(error.message || "Une erreur est survenue", { position: "bottom-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 shadow-primary dark:shadow-secondary-dark
          rounded-xl overflow-hidden transition-all duration-300 max-w-2xl mx-auto
          border dark:border-gray-700/50"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 h-full flex flex-col">
          {/* Section Images corrigée */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Images ({previews.length}/3)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {previews.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="relative aspect-square">
                    <Image
                      src={url}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="rounded-lg object-cover border dark:border-gray-700/50"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviews(prev => prev.filter((_, i) => i !== index));
                      setValue("images", (prevFiles) => {
                        const updatedFiles = Array.from(prevFiles || []);
                        updatedFiles.splice(index, 1);
                        return updatedFiles.length > 0 ? updatedFiles : null;
                      }, { shouldValidate: true });
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 
                      transition-opacity hover:bg-red-600 dark:hover:bg-red-400"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}

              {previews.length < 3 && (
                <label className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center 
                  cursor-pointer hover:border-primary dark:hover:border-primary-400 transition-colors 
                  border-gray-300 dark:border-gray-600">
                  <input
                    type="file"
                    multiple
                    {...register("images")}
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const newFiles = files.slice(0, 3 - previews.length);
                      
                      setPreviews(prev => [
                        ...prev, 
                        ...newFiles.map(file => URL.createObjectURL(file))
                      ]);
                      
                      setValue("images", [
                        ...(Array.from(e.target.files || [])),
                        ...newFiles
                      ].slice(0, 3), { 
                        shouldValidate: true 
                      });
                    }}
                    
                    className="hidden"
                    accept="image/jpeg, image/png"
                  />
                  <span className="text-gray-500 dark:text-gray-400">+ Ajouter</span>
                </label>
              )}
            </div>
            
            {errors.images?.message && (
              <p className="text-sm text-red-500 mt-1">{errors.images.message}</p>
            )}
            
            {previews.length >= 3 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Maximum de 3 images atteint
              </p>
            )}
          </div>

          {/* Formulaire */}
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 mb-2 font-medium text-gray-700 dark:text-gray-300">
                <FaUser className="text-secondary dark:text-primary" />
                Nom de l&apos;annonce
              </label>
              <input
                {...register("nom")}
                className="w-full px-4 py-2.5 rounded-lg border dark:border-gray-700/50 bg-transparent
                  focus:ring-2 focus:ring-secondary dark:focus:ring-primary outline-none transition-all"
              />
              <FormError message={errors.nom?.message} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 mb-2 font-medium text-gray-700 dark:text-gray-300">
                  <FaEuroSign className="text-secondary dark:text-primary" />
                  Prix (TND)
                </label>
                <input
                  {...register("prix")}
                  className="w-full px-4 py-2.5 rounded-lg border dark:border-gray-700/50 bg-transparent
                    focus:ring-2 focus:ring-secondary dark:focus:ring-primary outline-none transition-all"
                />
                <FormError message={errors.prix?.message} />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 font-medium text-gray-700 dark:text-gray-300">
                  <FaPhone className="text-secondary dark:text-primary" />
                  Téléphone
                </label>
                <input
                  {...register("telephone")}
                  className="w-full px-4 py-2.5 rounded-lg border dark:border-gray-700/50 bg-transparent
                    focus:ring-2 focus:ring-secondary dark:focus:ring-primary outline-none transition-all"
                />
                <FormError message={errors.telephone?.message} />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 font-medium text-gray-700 dark:text-gray-300">
                <FaTag className="text-secondary dark:text-primary" />
                Catégorie
              </label>
              <input
                {...register("categorie")}
                className="w-full px-4 py-2.5 rounded-lg border dark:border-gray-700/50 bg-transparent
                  focus:ring-2 focus:ring-secondary dark:focus:ring-primary outline-none transition-all"
              />
              <FormError message={errors.categorie?.message} />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 font-medium text-gray-700 dark:text-gray-300">
                <FaMapMarkerAlt className="text-secondary dark:text-primary" />
                Emplacement
              </label>
              <select
                {...register("emplacement")}
                className="w-full px-4 py-2.5 rounded-lg border dark:border-gray-700/50 bg-transparent
                  focus:ring-2 focus:ring-secondary dark:focus:ring-primary outline-none transition-all"
              >
                <option value="">Sélectionnez un gouvernorat</option>
                {gouvernorats.map((gov, index) => (
                  <option key={index} value={gov}>{gov}</option>
                ))}
              </select>
              <FormError message={errors.emplacement?.message} />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                {...register("description")}
                className="w-full px-4 py-2.5 rounded-lg border dark:border-gray-700/50 bg-transparent
                  focus:ring-2 focus:ring-secondary dark:focus:ring-primary outline-none transition-all h-32"
              />
              <FormError message={errors.description?.message} />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-secondary dark:bg-primary text-white py-3.5 px-6 rounded-lg
              font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" />
                Publication en cours...
              </div>
            ) : "Publier l'annonce"}
          </motion.button>
        </form>
      </motion.div>

      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md text-center space-y-4"
            >
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center"
                >
                  <FaCheck size={28} />
                </motion.div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Annonce publiée avec succès !
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400">
                Redirection vers la liste des annonces...
              </p>

              <div className="flex justify-center">
                <div className="w-12 h-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <FaSpinner className="text-2xl text-gray-600 dark:text-gray-400" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const FormError = ({ message }) => (
  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
    {message && <span className="text-xs">⚠</span>} {message}
  </p>
);

FormError.propTypes = {
  message: PropTypes.string
};
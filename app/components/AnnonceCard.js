
"use client";

import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaTag, FaUser, FaMapMarkerAlt } from "react-icons/fa"; 
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

AnnonceCard.propTypes = {
  annonce: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
    prix: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    emplacement: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    categorie: PropTypes.shape({
      nom: PropTypes.string
    }),
    user: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string
    })
  }).isRequired
};


export default function AnnonceCard({ annonce }) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const getInitials = (name) => {
    return name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "?";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 
      shadow-primary hover:shadow-primary-hover
      dark:shadow-secondary-dark dark:hover:shadow-secondary-dark-hover
      rounded-xl overflow-hidden transition-all duration-300 
      h-full flex flex-col relative z-0
      border dark:border-gray-700/50"
    >
      <div className="relative flex-grow min-h-[250px]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-bullet dark:bg-gray-600",
            bulletActiveClass: "swiper-bullet-active !bg-secondary dark:!bg-primary"
          }}
          autoplay={{ delay: 3500 }}
          className="h-full w-full"
        >
          {annonce.imageUrls.map((image, index) => (
            <SwiperSlide
              key={index}
              className="!flex items-stretch justify-stretch bg-gray-100 dark:bg-gray-900"
            >
              <div className="relative w-full h-full">
                <Image
                  src={imageError ? '/placeholder.jpg' : image}
                  alt={`${annonce.nom} - Image ${index + 1}`}
                  fill
                  className="object-contain"
                  onError={() => setImageError(true)}
                  sizes="(max-width: 768px) 100vw, 100vw"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation personnalisée */}
        <div className="swiper-button-prev-custom absolute top-1/2 left-2 transform -translate-y-1/2 z-10 w-6 h-6 rounded-full border-2 border-gray-300/50 hover:border-gray-400/50 bg-transparent transition-colors cursor-pointer"></div>
        <div className="swiper-button-next-custom absolute top-1/2 right-2 transform -translate-y-1/2 z-10 w-6 h-6 rounded-full border-2 border-gray-300/50 hover:border-gray-400/50 bg-transparent transition-colors cursor-pointer"></div>
      </div>
      {/* Contenu compact */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
            {annonce.nom}
          </h2>
          <span className="bg-secondary dark:bg-primary text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
            {annonce.prix} TND
          </span>
        </div>

        {/* Badges d'information */}
        <div className="flex flex-wrap gap-2 text-sm justify-between items-center">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              <FaTag className="text-secondary dark:text-primary text-xs" />
              <span className="text-gray-600 dark:text-gray-300">
                {annonce.categorie?.nom || "Non catégorisé"}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              <FaMapMarkerAlt className="text-secondary dark:text-primary text-xs" />
              <span className="text-gray-600 dark:text-gray-300">
                {annonce.emplacement}
              </span>
            </div>
          </div>

          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            Publié : {new Date(annonce.createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
        {/* Description concise */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {annonce.description}
        </p>

        {/* Footer compact */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
            {annonce.user?.image ? (
                <Image
                  src={annonce.user.image}
                  alt={`Avatar de ${annonce.user.name}`}
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <FaUser className="text-gray-500 dark:text-gray-400" />
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {annonce.user?.name || "Anonyme"}
            </span>
          </div>

          <button
            onClick={() => router.push(`/annonces/${annonce.id}`)}
            className="bg-secondary dark:bg-primary text-white px-3 py-1.5 rounded-md text-sm hover:opacity-90 transition-opacity"
          >
            Voir plus
          </button>
        </div>
      </div>
    </motion.div>
  );
}
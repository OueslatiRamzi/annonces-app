/* eslint-disable no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { notFound, useRouter, useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; 
import { FaTag, FaPhone, FaMapMarkerAlt, FaEdit, FaTrash, FaUser, FaCalendar } from "react-icons/fa";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";

// ✅ Assure-toi d'importer Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';

export default function DetailsAnnonce() {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const response = await fetch(`/api/annonces/${id}`);
        if (!response.ok) {
          if (response.status === 404) return setAnnonce(null);
          throw new Error("Échec du chargement");
        }
        const data = await response.json();
        setAnnonce(data);
      } catch (err) {
        console.error("Erreur:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnonce();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) return;
    if (!session?.user?.id) return;

    try {
      const response = await fetch(`/api/annonces/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Échec de la suppression");
      }

      toast.success("Annonce supprimée avec succès !");
      router.push("/annonces");
    } catch (err) {
      console.error("Erreur:", err);
      toast.error(err.message || "Erreur lors de la suppression");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!annonce || error) return notFound();

  const isOwner = session?.user?.id === annonce.userId;
  const datePublication = new Date(annonce.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric"
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-slate-300 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">

        {/* ✅ Carrousel d'images sans flèches */}
        <div className="relative aspect-video">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            className="h-full"
          >
            {annonce.imageUrls.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <Image
                    src={image}
                    alt={`Image ${index + 1} de l'annonce ${annonce.nom}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>


        {/* Contenu principal */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* En-tête */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {annonce.nom}
              </h1>
              <p className="text-2xl font-semibold text-primary dark:text-primary-400">
                {annonce.prix.toLocaleString()} TND
              </p>
            </div>

            <Button
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3"
              onClick={() => setOpenModal(true)}
            >
              Commander
            </Button>
          </div>

          {/* Informations vendeur */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <div className="relative h-12 w-12">
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
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {annonce.user?.name || "Anonyme"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Vendeur vérifié</p>
            </div>
          </div>

          {/* Métadonnées */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <div className="p-2 bg-primary/10 text-primary dark:text-primary-400 rounded-full">
                <FaTag className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Catégorie</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {annonce.categorie?.nom || "Non catégorisé"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <div className="p-2 bg-primary/10 text-primary dark:text-primary-400 rounded-full">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Localisation</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {annonce.emplacement}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <div className="p-2 bg-primary/10 text-primary dark:text-primary-400 rounded-full">
                <FaCalendar className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Publié le</p>
                <p className="font-medium text-gray-900 dark:text-white">{datePublication}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="prose max-w-none dark:prose-invert">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Description
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {annonce.description}
            </p>
          </div>

          {/* Actions propriétaire */}
          {isOwner && (
            <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="secondary"
                className="gap-2 px-6 py-3 bg-primary"
                onClick={() => router.push(`/annonces/${id}/edit`)}
              >
                <FaEdit /> Modifier
              </Button>
              <Button
                variant="destructive"
                className="gap-2 px-6 py-3 bg-secondary"
                onClick={handleDelete}
              >
                <FaTrash /> Supprimer
              </Button>
            </div>
          )}
        </div>

        {/* Modal de contact */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="max-w-sm rounded-xl" aria-describedby="contact-info">
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Contacter le vendeur
            </DialogTitle>
            <div id="contact-info" className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <div className="p-2 bg-primary/10 text-primary dark:text-primary-400 rounded-full">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Téléphone</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {annonce.telephone}
                  </p>
                </div>
              </div>
              <Button className="w-full" onClick={() => setOpenModal(false)}>
                Fermer
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </motion.div>
  );
}
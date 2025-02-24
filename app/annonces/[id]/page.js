"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import { annonces } from "@/app/data/annonces";

export default function DetailsAnnonce({ params }) {
  const handleCommander = () => {
    alert("Commande confirmée !");
  };
  const { id } = use(params); // 🔹 Extraction correcte des paramètres

  const annonce = annonces.find((a) => a.id === parseInt(id));

  if (!annonce) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <img src={annonce.image} alt={annonce.nom} className="w-full h-60 object-cover rounded-md" />
      <h1 className="text-3xl font-itim mt-4">{annonce.nom}</h1>
      <p className="text-xl text-primary font-semibold">{annonce.prix}</p>
      <p className="text-gray-600 mt-4">{annonce.description}</p>
      <button onClick={handleCommander} className="bg-secondary text-white px-6 py-3 rounded mt-6">Commander</button>
    </div>
  );
}


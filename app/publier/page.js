'use client';

import AnnonceForm from "../components/AnnonceForm";

export default function PublierPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-itim text-center">Publier une annonce</h1>
      <p className="text-gray-600 text-center mb-4">
        Remplissez ce formulaire pour soumettre votre annonce.
      </p>
      <AnnonceForm />
    </div>
  );
}

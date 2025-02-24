'use clien';
import React from 'react'

import Link from "next/link";

export default function AnnonceCard({ annonce }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={annonce.image} alt={annonce.nom} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-xl font-itim mt-2">{annonce.nom}</h2>
      <p className="text-primary font-semibold">{annonce.prix} TND</p>
      <p className="text-gray-600">{annonce.categorie}</p>
      
      <Link href={`/annonces/${annonce.id}`} passHref>
        <button className="mt-3 bg-secondary text-white px-4 py-2 rounded">Voir détail</button>
      </Link>
    </div>
  );
}

  

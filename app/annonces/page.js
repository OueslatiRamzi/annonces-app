'use client';

import React from 'react'
import AnnonceList from '../components/AnnonceList';
import { annonces } from '../data/annonces';

export default function AnnoncesPage() {
  return (
    <div>
      <h1 className="text-3xl font-itim text-center">Toutes les annonces</h1>
      <AnnonceList annonces={annonces} />
    </div>
  );
}


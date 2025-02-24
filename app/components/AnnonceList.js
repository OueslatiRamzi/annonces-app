'use client';
import React from 'react'
import AnnonceCard from './AnnonceCard';

export default function AnnonceList({ annonces }) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {annonces.map((annonce) => (
          <AnnonceCard key={annonce.id} annonce={annonce} />
        ))}
      </div>
    );
  }

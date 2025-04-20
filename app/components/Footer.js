'use client';
import React from 'react';
import Image from 'next/image';
import avatar from '@/public/images/profile-pic.webp';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-8 gap-4">
          {/* Copyright */}
          <div className="text-center text-sm text-gray-300">
            BALLOUCHI © 2025 | Tous droits réservés
          </div>

          {/* Développeur */}
          <div className="flex items-center gap-3">
            
            <span className="text-sm text-gray-300">
              Développé par {' '}
              <strong className="text-white hover:text-blue-300 transition-colors">
                Oueslati Ramzi
              </strong>
            </span>
            <a 
              href="https://oueslati-ramzi.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image 
                src={avatar}
                alt="Oueslati Ramzi"
                width={40}
                height={40}
                className="rounded-full object-cover border-2 border-white"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
'use client';
import React from 'react'

import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-itim text-center">Contactez-nous</h1>
      <p className="text-gray-600 text-center mb-4">
        Vous avez une question ? Remplissez ce formulaire et nous vous répondrons rapidement.
      </p>
      <ContactForm />
    </div>
  );
}

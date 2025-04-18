"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/login?error=${encodeURIComponent('Erreur de connexion')}`);
  }, [router]);

  return null;
}
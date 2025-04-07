/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Optionnel pour les builds de production
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: '**.googleusercontent.com', // Exemple pour Google Auth
        },
        // Ajoutez d'autres domaines si nécessaire
      ],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60,
    },
  };
export default nextConfig;

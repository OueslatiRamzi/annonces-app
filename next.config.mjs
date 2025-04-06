/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Optionnel pour les builds de production
    },
    images: {
      domains: ["lh3.googleusercontent.com"],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/**',
        },
        // Ajoutez d'autres domaines si nécessaire
      ],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60,
    },
  };
export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    serverActions:true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["**"],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig

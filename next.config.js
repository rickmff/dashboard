/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ferf1mheo22r9ira.public.blob.vercel-storage.com',
      },
    ],
  },
  experimental: {
    turbo: {
      enabled: true
    }
  }
}

module.exports = nextConfig 
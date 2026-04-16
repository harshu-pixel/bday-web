/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com'], // Add your image domains
  },
  output: 'export', // Static export configuration
}

module.exports = nextConfig;
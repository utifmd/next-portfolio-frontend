/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true //, esmExternals: false
  }
  /*remotePatterns: [
    {
      protocol: 'https',
      hostname: 'via.placeholder.com',
      port: '',
      pathname: '/150/!**',
    },
  ]*/
}

module.exports = nextConfig

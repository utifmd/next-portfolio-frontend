/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  async headers() {
    return [
      {
        headers: [
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig

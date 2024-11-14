/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "livestream.ardarmutcu.com"
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/a/hj5xs4m6pg/*",
      },
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) config.resolve.fallback.fs = false;
    return config;
  }
};

module.exports = nextConfig;

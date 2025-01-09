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
      { // assets
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/a/hj5xs4m6pg/*",
      },
      { // gallery
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/a/41l64ami3u/*",
      },
      { // speedpaints
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/a/fal25h328h/*",
      }
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) config.resolve.fallback.fs = false;
    return config;
  }
};

module.exports = nextConfig;

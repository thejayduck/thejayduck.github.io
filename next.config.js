/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.ibb.co", "i.imgur.com"],
  },
  module: {
    rules: [
      {
        test: /.md$/,
        use: "raw-loader"
      }
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) config.resolve.fallback.fs = false;
    return config;
  }
};

module.exports = nextConfig;

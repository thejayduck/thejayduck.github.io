module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["i.ibb.co", "i.imgur.com"],
  },
  node: {
    fs: "empty",
  },
  module: {
    rules: [
      {
        test: /.md$/,
        use: "raw-loader"
      }
    ]
  }
};

module.exports = {
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
  }
};

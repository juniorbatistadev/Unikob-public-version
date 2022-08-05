const withReactSvg = require("next-react-svg");
const path = require("path");
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,

  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },

  include: path.resolve(__dirname, "src/assets/icons"),
  webpack(config, options) {
    return config;
  },

  // i18n: {
  //   locales: ["es", "en"],
  //   defaultLocale: "es",
  // },
};

module.exports = withReactSvg(withPWA(nextConfig));

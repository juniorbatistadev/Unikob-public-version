const withReactSvg = require("next-react-svg");
const path = require("path");
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,

  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },

  include: path.resolve(__dirname, "src/assets/icons"),
  webpack(config, options) {
    return config;
  },

  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
};

module.exports = withReactSvg(withPWA(nextConfig));

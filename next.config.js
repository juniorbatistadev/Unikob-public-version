const withReactSvg = require("next-react-svg");
const path = require("path");
const withPWA = require("next-pwa");

module.exports = withPWA(
  withReactSvg({
    include: path.resolve(__dirname, "src/assets/icons"),
    webpack(config, options) {
      return config;
    },

    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
    },

    // i18n: {
    //   locales: ["es", "en"],
    //   defaultLocale: "es",
    // },

    reactStrictMode: true,
  })
);

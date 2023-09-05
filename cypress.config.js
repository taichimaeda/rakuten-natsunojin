const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    baseUrl: "http://aat.mydns.jp/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

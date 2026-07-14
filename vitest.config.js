const path = require("node:path");
const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
  resolve: {
    alias: {
      "@shared-ui": path.resolve(__dirname, "packages/shared-ui"),
    },
  },
});

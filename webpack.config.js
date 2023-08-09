const path = require("path");
const CopyPlagin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  devtools: "source-map",
  plugins: [new CopyPlagin({
    patterns: [{from 'public'}]
  })],
};

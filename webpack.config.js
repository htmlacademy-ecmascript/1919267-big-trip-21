const path = require("path");
const CopyPlagin = require("copy-webpack-plugin");
const HTMLPlagin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  devtool: "source-map",
  plugins: [
    new HTMLPlagin({
      template: "public/index.html",
    }),
    new CopyPlagin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};

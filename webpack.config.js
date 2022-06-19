const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CleanTerminalPlugin = require("clean-terminal-webpack-plugin");

const PORT = 5000;
const API_PORT = 6000;

module.exports = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new ESLintPlugin(),
    new CleanTerminalPlugin({
      message: `Server running on http://localhost:${PORT}, "/api" -> 6000`,
      skipFirstRun: true,
    }),
  ],
  devServer: {
    client: {
      reconnect: false,
    },
    open: true,
    port: PORT,
    static: false,
    proxy: {
      "/api": `http://localhost:${API_PORT}`,
    },
  },
};

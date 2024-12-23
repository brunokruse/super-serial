const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: require.resolve("p5"),
        use: [
          {
            loader: "expose-loader",
            options: { exposes: ["p5"] },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    hot: true,
  },
};

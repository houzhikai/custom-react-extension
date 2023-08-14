const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: path.join(__dirname, "./src/view/index.tsx"), // 进口文件
  output: {
    filename: "static/js/[name].js",
    path: path.join(__dirname, "./dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/view/index.html"),
      inject: true, // 主动注入静态资源
    }),
  ],
};

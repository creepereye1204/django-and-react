// const path = require("path");
// const webpack = require("webpack");

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     path: path.resolve(__dirname, "./static/frontend"),
//     filename: "[name].js",
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//         },
//       },
//     ],
//   },
//   optimization: {
//     minimize: true,
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//         'process.env.NODE_ENV' : JSON.stringify('production')
//     })
// ],
// };
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // CSS 파일을 처리하는 규칙 추가
        use: ["style-loader", "css-loader"], // style-loader와 css-loader 사용
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};

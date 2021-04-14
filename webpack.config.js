const HtmlWebPackPlugin = require("html-webpack-plugin");
const {resolve, join} = require("path");

const firstLesson = "./src/chapter-01/01_02/begin";

module.exports = {
  context: __dirname,
  entry: `${firstLesson}/main.js`,
  output: {
    path: resolve(__dirname, "dist"),
    filename: "main.js",
  },
  mode: 'development',
  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebPackPlugin({
      title: "Treejs",
      template: `${firstLesson}/index.html`,
    }),
  ],

  watch: true,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.scss', '.css'],
    // Resolve {N} system modules from tns-core-modules
    modules: [
      resolve(__dirname, 'node_modules'),
    ],
  },

  devServer: {
    contentBase: join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
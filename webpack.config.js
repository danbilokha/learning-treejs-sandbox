const HtmlWebPackPlugin = require("html-webpack-plugin");
const {resolve, join} = require("path");
const CopyPlugin = require("copy-webpack-plugin");

let student = process.env.ESTUDIANTE;
const folder = `${__dirname}/src/${student}`;

module.exports = {
  context: __dirname,
  entry: `${folder}/main.js`,
  output: {
    path: resolve(__dirname, "dist"),
    filename: "main.js",
  },
  mode: 'development',
  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebPackPlugin({
      title: "Treejs",
      template: `${folder}/index.html`,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "dist" },
      ],
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
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
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

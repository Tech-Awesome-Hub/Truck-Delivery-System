const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // 'production' for production builds
  entry: './src/index.js', // Entry point of your React app
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Process .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel to transpile
        },
      },
      {
        test: /\.css$/, // Process CSS files
        use: ['style-loader', 'css-loader'], // Inject CSS into DOM
      },
      {
        test: /\.(mp4|webm|ogg|avi|mkv)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets',
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve .js and .jsx files
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Serve content from "dist"
    port: 3000, // Development server port
    open: true, // Open browser automatically
    hot: true, // Enable hot module replacement
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Template file
      filename: 'index.html', // Output file name
    }),
  ],
};

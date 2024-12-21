const path = require('path');

module.exports = {
  // The entry point for your application
  entry: './src/index.jsx',
  
  // The output configuration
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  // Setting up the development server
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    port: 3000,
    open: true,
  },

  // Module rules for loading files
  module: {
    rules: [
      {
        // Rule for JavaScript and JSX files
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        // Rule for CSS files
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Rule for image files
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },

  // Resolving file extensions and setting up aliases
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for 'src' directory
    },
  },

  // Setting the mode to development or production
  mode: 'development', // Change to 'production' when building for production

  // Source map for easier debugging
  devtool: 'source-map',
};

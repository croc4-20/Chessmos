// const path = require('path');
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

export default{
  mode: 'production',
  entry: {
    main: [
      "@apollo/client", 
       path.resolve(__dirname, "./public/jsFiles/classPiece.js"), 
      path.resolve(__dirname, "./public/jsFiles/classGame.js"), 
      path.resolve(__dirname, "./public/jsFiles/classBoard.js"),
      path.resolve(__dirname, "./public/jsFiles/utility.js"),
      path.resolve(__dirname, "./public/jsFiles/seedRng.js"),
      path.resolve(__dirname, "./public/jsFiles/KeplrConnect.js"),
      path.resolve(__dirname, "./public/jsFiles/calculateValidMoves.js"),
      path.resolve(__dirname, "./public/jsFiles/gameSessions.js"),
      
      ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js',
    publicPath: '/',  // <-- Added this line for dynamic imports
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // Optionally, handle other file types like CSS, images etc.
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
    ],
  },
 resolve: {
    fallback: {
      "vm": require.resolve("vm-browserify"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify")
    },
   modules: [path.resolve(__dirname, 'public/jsFiles'), 'node_modules'],
    extensions: ['.js', '.json'],
  },
  devtool: 'source-map',
};

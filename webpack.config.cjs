const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: [
      "@apollo/client", 
      "./jsFile/classPiece.js", 
      "./jsFile/classGame.js", 
      "./jsFile/classBoard.js"
      ],
  },
  output: {
    path: path.resolve(__dirname, 'New'),
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
    // mainFields: ['browser', 'module', 'main']
    modules: ['node_modules'],
    alias: {
      // Here you could alias specific modules if needed
    },
    extensions: ['.js', '.jsx', '.json'], // <-- Added this line to resolve .js extensions
  },
  devtool: 'source-map',
};

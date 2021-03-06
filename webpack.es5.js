// Webpack
require('webpack');

// Modules
const path = require('path');

// Plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// Configuration
module.exports = {
  mode: 'production',
  entry: {
    'highway': path.resolve(__dirname, 'src/index.js'),
    'highway.min': path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'es5'),
    filename: '[name].js',
    library: 'Highway',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: [
                      '> 0.25%',
                      'edge >= 14',
                      'not ie <= 10',
                      'not op_mini all'
                    ]
                  },
                  useBuiltIns: 'usage'
                }]
              ]
            }
          },
          'eslint-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min.js$/
      })
    ]
  },
  plugins: [
    new CompressionPlugin({
      test: /\.min.js$/
    })
  ]
};

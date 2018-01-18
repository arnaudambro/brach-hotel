
const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'production';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const extractSass = new ExtractTextPlugin({
    filename: "./src/css/styles.css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
    'babel-polyfill',
    './src/components/app.js',
    './src/scss/styles.scss'
    ]
  },
  output: {
    filename: './_build/bundle.js'
  },
  module: {
    rules: [
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    },
      {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [{
                loader: "css-loader?url=false"
            },{
                loader: "sass-loader"
            }, {
            loader: 'postcss-loader'
          }],
            // use style-loader in development
            fallback: "style-loader"
        })
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', {
          shippedProposals: true, // to support spread operators
          forceAllTransforms: true
            }]
        },
      }
    ]
  },
  plugins: [
    //uglify js
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        ie8: false,
        ecma: 5,
        warnings: false,
        compress: true,
        mangle: {
          safari10: true,
        },
        output: {
          comments: false,
        },
      }
    }),
    // env plugin
    // new webpack.DefinePlugin({
    //   'process.env': { NODE_ENV: JSON.stringify(nodeEnv)}
    // }),
    //browser-sync
    extractSass,
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    // new StaticSiteGeneratorPlugin('main', data.routes, data),
    new BrowserSyncPlugin({
      notify: false,
      host: 'localhost',
      port: 3000,
      files: ['./*.html', './public/*.html', './src/css/styles.css'],
      server: { baseDir: ['./']}
    })
    ],
    watch: true
  }

const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
};

const PAGES_DIR = `${PATHS.src}/pages/`;

function getFiles(dir, files_, folder = '') {
  const filesArray = files_ || [];
  let folderPath = folder;
  fs.readdirSync(dir).forEach((filePath) => {
    const name = path.join(dir, filePath);
    if (fs.statSync(name).isDirectory()) {
      folderPath = path.join(folder, filePath);
      getFiles(name, filesArray, folderPath);
    } else if (filePath.endsWith('.pug')) {
      filesArray.push(path.join(folder, filePath));
    }
  });
  return filesArray;
}
const PAGES = getFiles(PAGES_DIR);

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    app: `${PATHS.src}/js`,
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: PATHS.dist,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [{
      test: /\.pug$/,
      loader: 'pug-loader',
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      exclude: [/blocks/, /img/, /static/],
      use: {
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]',
          publicPath: '../',
        },
      },
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      exclude: [/fonts/, /static/],
      options: {
        name: './img/[name].[ext]',
        publicPath: '../',
      },
    },
    {
      test: /\.(svg|png|ico|xml|json)$/,
      exclude: [/fonts/, /blocks/, /img/, /node_modules/],
      use: [{
        loader: 'file-loader',
        options: {
          name: './favicons/[name].[ext]',
          publicPath: '../',
        },
      }],
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            data: '@import \'./src/styles/main-presets\';',
            includePaths: [path.join(__dirname, 'src')],
          },
        },
        {
          loader: 'webpack-px-to-rem',
          query: {
            // 1rem=npx default 10
            basePx: 14,
            min: 1,
            floatWidth: 3,
          },
        },
      ],
    },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      './dependencyLibs/inputmask.dependencyLib': './dependencyLibs/inputmask.dependencyLib.jquery',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].[hash].css',
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),

    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/.*[\\]/, '').replace(/\.pug/, '.html')}`,
      inject: true,
    })),

  ],
};

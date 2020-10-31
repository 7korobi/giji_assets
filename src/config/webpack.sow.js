const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const Autoprefixer = require('autoprefixer')

const template = path.join(__dirname, '../../src/index-sample.html')

const postcss = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [Autoprefixer({})],
    },
  },
}

const file = {
  loader: 'file-loader',
  options: {
    name: '[name].[ext]',
  },
}

module.exports = {
  entry: {
    sow: path.join(__dirname, '../sow.tsx'),
  },
  output: {
    path: path.join(__dirname, '../../dist/'),
  },
  module: {
    rules: [
      {
        test: /\.(gif|jpg|png|svg)/i,
        use: [file],
      },
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-nullish-coalescing-operator',
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', postcss],
      },
      {
        test: /\.(scss|sass)$/i,
        use: ['style-loader', 'css-loader', postcss, 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },
  externals: [],
  plugins: [new HTMLPlugin({ template })],
}

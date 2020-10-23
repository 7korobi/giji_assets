const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const Autoprefixer = require('autoprefixer')

const template = path.join(__dirname, '../../src/index-sample.html')

const postcss = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [Autoprefixer({})]
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
  target: 'node',
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
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', postcss]
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', postcss, 'sass-loader']
      },
      {
        test: /\.yml$/i,
        use: [
          'json-loader',
          {
            loader: 'yaml-loader',
            options: {
              merge: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },
  externals: [],
  plugins: [
    new HTMLPlugin({ template }),
  ]
}

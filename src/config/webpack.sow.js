const path = require('path')

module.exports = {
  target: 'node',
  devtool: 'hidden-source-map',
  entry: {
    sow: path.join(__dirname, '../sow.ts'),
  },
  output: {
    path: path.join(__dirname, '../../dist/'),
  },
  module: {
    rules: [
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
    extensions: ['.js', '.ts', '.tsx', '.json', '.coffee'],
  },
  externals: [],
}

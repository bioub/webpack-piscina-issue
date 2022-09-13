import webpack from 'webpack';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

const config: webpack.Configuration = {
  target: 'electron-main',
  entry: './src/index.ts',

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          babelrc: false,
          compact: true,
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: false,
                corejs: 3,
                modules: false,
                targets: {
                  esmodules: true,
                },
              },
            ],
            '@babel/preset-typescript',
          ],
        },
      },
      {
        test: /\.worker\.(c|m)?(ts|js)$/i,
        use: {
          loader: 'worker-loader',
          options: {
            filename: '[name].js',
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  node: {
    // __dirname: false,
  },

  optimization: {
    minimize: false,
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'node_modules/piscina/dist/src/worker.js', to: 'worker.js' },
        { from: 'node_modules/piscina/dist/src/common.js', to: 'common.js' },
        { from: 'src/monitor.worker.js', to: 'monitor.worker.js' },
      ],
    }),
  ],
};

export default config;

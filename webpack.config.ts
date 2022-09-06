import webpack from "webpack"
import path from "path"

const config: webpack.Configuration = {
  target: "electron-main",
  entry: "./src/index.ts",

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          babelrc: false,
          compact: true,
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: false,
                corejs: 3,
                modules: false,
                targets: {
                  esmodules: true,
                },
              },
            ],
            "@babel/preset-typescript",
          ],
        },
      },
      {
        test: /\.worker\.(c|m)?(ts|js)$/i,
        use: {
          loader: "worker-loader",
          options: {
            filename: "[name].js",
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  node: {
    // __dirname: false,
  },

  optimization: {
    minimize: false,
  },
}

export default config

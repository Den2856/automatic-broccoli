const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

class CopyPublicDirPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap("CopyPublicDirPlugin", () => {
      const sourceDir = path.resolve(__dirname, "public");
      const targetDir = path.resolve(__dirname, "dist");

      if (!fs.existsSync(sourceDir)) {
        return;
      }

      fs.cpSync(sourceDir, targetDir, { recursive: true });
    });
  }
}

module.exports = {
  entry: path.resolve(__dirname, "src/main.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/[name].[contenthash].js",
    clean: true,
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
    }),
    new CopyPublicDirPlugin()
  ],
  devServer: {
    port: 5173,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "public"),
      publicPath: "/"
    },
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:4025",
        changeOrigin: true
      }
    ]
  }
};

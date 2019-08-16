const path = require("path");
const CleanPlugin = require("webpack-clean-plugin");
const HTMLPlugin = require("html-webpack-plugin");
const WorkerPlugin = require("worker-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src/main/index")
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader"
      },
      {
        test: /\.tsx?/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanPlugin(),
    new WorkerPlugin(),
    new HTMLPlugin({ template: path.join(__dirname, "src/index.html") }),
    new CopyPlugin([
      {
        from: "src/manifest.webmanifest",
        to: "manifest.webmanifest"
      },
      {
        from: "src/assets",
        to: "assets"
      }
    ])
  ]
};

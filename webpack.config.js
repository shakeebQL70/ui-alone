const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const deps = require("./package.json").dependencies;
module.exports = (_, argv) => {
  return {
    output: {
      publicPath: "auto",
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    devtool: "eval",

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 3004,
      historyApiFallback: true,
      allowedHosts: "all",
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "ui",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./button": "./src/Components/Buttons",
          "./table": "./src/Components/Tables",
          "./icons": "./src/Components/MuiIcons",
          "./select": "./src/Components/Selects",
          "./modal": "./src/Components/Modals",
          "./input": "./src/Components/Inputs",
          "./utils": "./src/utils",
          "./templates": "./src/utils/templates.ts",
          "./indianStateAndDistrict": "./src/utils/indianStateAndDistrict.ts",
          "./tabs": "./src/Components/Tabs",
          "./dragndrop": "./src/Components/DragNDrop",
          "./previewImg": "./src/Components/PreviewImg",
          "./daterange": "./src/Components/DateRange",
          "./others": "./src/Components/Others",
          "./contentSkeleton": "./src/Components/Loaders/ContentSkeleton.tsx",
          // "./dist/Components/Buttons": "Buttons",
          // "./dist/Components/Tables": "Tables",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};

const path = require("path");
const webpack = require("webpack");
const yaml = require("yaml");
const fs = require("graceful-fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPath = path.resolve(__dirname, "../");

const configFile = fs.readFileSync(`./${"development"}.yaml`);
const config = yaml.parse(configFile);

module.exports = {
    target: 'web',

    node: {fs: 'empty'},

    mode: "development",

    context: path.resolve(__dirname, "../"),

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    entry: "./index.tsx",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".scss"],
        modules: ["node_modules"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin(config.env),
        new HtmlWebpackPlugin({
            template: path.resolve(rootPath, "./public/index.ejs"),
            meta: config.meta
        })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // TODO check that webpack is waiting for external modules if they are not bundled with webpack
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};
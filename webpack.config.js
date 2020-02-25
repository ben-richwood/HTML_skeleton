
////////////////////////////////////////////////////////////////////////////////
// Need absolute path to your project
// E.g. on Mac const path = "/Library/WebServer/Documents/php/basic_skeleton";
const path = "/";
////////////////////////////////////////////////////////////////////////////////

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// IF USING NODEJS
////////////////////////////////////////////////////////////////////////////////
// const env = process.env.NODE_ENV
//   const config = {
//    mode: env || 'development'
// }

module.exports = (env, options) => {
    console.log(`This is the Webpack 4 'mode': ${options.mode}`);
    return {

      // entry: "./src/assets/js/**/*.js",
      context: path,
      entry: "./src/js/app.js",
      output: {
        path: path + "dist/js",
        chunkFilename: "bundle.js?v=[contenthash]",
        filename: "bundle.js?v=[contenthash]"
      },
      optimization: {
        // for production only
        minimizer: [new UglifyJsPlugin(
          { sourceMap: false }
        )],
      },
      devtool: "cheap-eval-source-map",
      resolve: {
        alias: {
          // if using npm jquery module
          // jQuery: "jquery/src/jquery"
        }
      },
      node: {
        fs: "empty"
      },
      watch: options.mode === "development" ? true : false

    }
}
/* eslint-disable */
import webpack from 'webpack'
import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import { commonConfig, getModuleRules } from './commonConfig.mjs'
import { configuration } from '../node/configuration.mjs'

export default () => ({
  ...commonConfig,
  mode: 'production',
  module: {
    rules: getModuleRules({ isProduction: true, withSourceMaps: false }),
  },
  optimization: {
    mangleWasmImports: true,
    moduleIds: 'deterministic',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {},
          ecma: 5,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          mangle: true,
          module: false,
          nameCache: null,
          output: null,
          parse: {},
          safari10: false,
          toplevel: false,
          warnings: false,
        },
      }),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
          chunks: 'all',
        },
        sdk: {
          test: /[\\/]sdk[\\/]/,
          priority: -20,
          name: 'sdk',
          chunks: 'all',
        },
        default: {
          priority: -40,
          reuseExistingChunk: true,
        },
      },
      chunks: 'all',
    },
  },
  output: {
    chunkFilename: '[name].[contenthash].js',
    filename: '[name].[contenthash].js',
    path: path.join(path.resolve(), '/build'),
  },
  plugins: [
    new MiniCssExtractPlugin(),
    ...commonConfig.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.SDK_BASE_PATH': JSON.stringify(configuration.SDK_BASE_PATH),
    }),
    new CleanWebpackPlugin()
  ],
})

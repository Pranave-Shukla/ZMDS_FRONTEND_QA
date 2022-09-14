import CircularDependencyPlugin from 'circular-dependency-plugin'
import webpack from 'webpack'
import StylelintWebpackPlugin from 'stylelint-webpack-plugin'

import { commonConfig } from './commonConfig.mjs'
import { configuration } from '../node/configuration.mjs'

export const devConfig = {
  ...commonConfig,
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  entry: {
    app: [commonConfig.entry.app, 'webpack-hot-middleware/client'],
  },
  mode: 'development',
  plugins: [
    ...commonConfig.plugins,
    new CircularDependencyPlugin({
      // eslint-disable-next-line no-undef
      cwd: process.cwd(),
      exclude: /node_modules|sdk/,
      failOnError: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new StylelintWebpackPlugin({
      fix: true,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.IS_SERVER_MOCKED': JSON.stringify(configuration.DEVELOPMENT.IS_SERVER_MOCKED),
      'process.env.SDK_BASE_PATH': JSON.stringify(configuration.SDK_BASE_PATH),
    //   'process.env.SDK_BASE_PATH': JSON.stringify("http://localhost:8443/"),
    }),
  ],
}

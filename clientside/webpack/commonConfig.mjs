import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import autoprefixer from 'autoprefixer'
import path from 'path'
import incstr from 'incstr'
import cssnano from 'cssnano'

const srcDir = path.join(path.resolve(), '/src')

const createUniqueIdGenerator = () => {
  const index = {}
  const generateNextId = incstr.idGenerator({
    alphabet: 'abcdefghijklmnopqrstuvwxyz0123456789_-',
  })

  return (name) => {
    if (index[name]) {
      return index[name]
    }

    let nextId

    do {
      nextId = generateNextId()
    } while (/^[0-9_-]/.test(nextId))

    index[name] = generateNextId()

    return index[name]
  }
}

const idLocal = createUniqueIdGenerator()
const idComponent = createUniqueIdGenerator()
const generateScopedName = (localName, resourcePath) =>
  idComponent(resourcePath).toUpperCase() + idLocal(localName)
const getStyleModuleRules = ({ isCssModules, isProduction, withSourceMaps } = {}) => ({
  exclude: isCssModules ? /node_modules/ : /src/,
  test: /\.(scss|css)$/,
  use: [
    isProduction ? MiniCssExtractPlugin.loader : { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        modules: (() => {
          if (isCssModules) {
            return isProduction
              ? {
                  getLocalIdent: (context, _localIdentName, localName) =>
                    generateScopedName(localName, context.resourcePath),
                }
              : { localIdentName: '[name]__[local]___[hash:base64:5]' }
          }

          return false
        })(),
        sourceMap: withSourceMaps,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [autoprefixer].concat(isProduction ? cssnano() : []),
        },
        sourceMap: withSourceMaps,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: withSourceMaps,
      },
    },
    // {
    //   loader: 'resolve-url-loader',
    //   options: { sourceMap: withSourceMaps },
    // },
  ],
})

export const getModuleRules = ({ isProduction, withSourceMaps = true } = {}) => [
  {
    enforce: 'pre',
    include: srcDir,
    loader: 'eslint-loader',
    options: {
      fix: true,
    },
    test: /\.(ts|tsx)$/,
  },
  {
    enforce: 'pre',
    include: srcDir,
    loader: 'tslint-loader',
    options: {
      fix: true,
    },
    test: /\.(ts|tsx)$/,
  },
  {
    include: srcDir,
    test: /\.(ts|tsx)?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: !isProduction,
        },
      },
    ],
  },
  getStyleModuleRules({
    isCssModules: true,
    isProduction,
    withSourceMaps,
  }),
  getStyleModuleRules({
    isCssModules: false,
    isProduction,
    withSourceMaps,
  }),
  {
    // generator: {
    //   filename: 'assets/[name].[ext]',
    // },
    test: /\.(png)$/i,
    // type: 'asset/resource',
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: 'assets/[hash].[ext]',
        },
      },
    ],
  },
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          minimize: true,
        },
      },
    ],
  },
  {
    generator: {
      filename: 'fonts/[name].[ext]',
    },
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    // use: [
    //   {
    //     loader: 'file-loader',
    //     options: {
    //       name: '[name].[ext]',
    //       outputPath: 'fonts/',
    //     },
    //     type: 'asset/resource',
    //   },
    // ],
  },
]

export const commonConfig = {
  entry: {
    app: './src/index.tsx',
  },
  module: {
    rules: getModuleRules(),
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  output: {
    chunkFilename: '[name].[hash].js',
    filename: '[name].[hash].js',
    path: path.join(path.resolve(), '/dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/assets/images/favicon.png',
      filename: `./index.html`,
      template: `./src/index.html`,
    }),
  ],
  resolve: {
    alias: {
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
      'react/jsx-runtime': 'react/jsx-runtime.js',
    },
    extensions: ['.ts', '.tsx', '.js'],
    modules: [srcDir, 'node_modules'],
  },
  watchOptions: {
    aggregateTimeout: 2000,
    ignored: /node_modules/,
    poll: 2000,
  },
}

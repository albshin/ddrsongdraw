const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const isDevelopment = argv.mode !== 'production';

  const config = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
      main: './src/index.tsx',
    },
    output: {
      filename: '[name].[contenthash:5].bundle.js',
      chunkFilename: '[name].[contenthash:5].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', 'json'],
    },
    devtool: isDevelopment ? 'eval-source-map' : false,
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    useBuiltIns: 'entry',
                    corejs: 3,
                    targets: '>1%, not dead, not ie 11, not op_mini all',
                  },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: ['@babel/plugin-syntax-dynamic-import', '@emotion'],
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '/src/index.html'),
        chunks: ['main'],
        inject: 'body',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'src', 'assets'),
            to: 'assets/[path][name].[ext]',
          },
        ],
      }),
    ],
  };

  if (isDevelopment) {
    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      port: 1234,
    };
    config.plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (argv.analyze) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};

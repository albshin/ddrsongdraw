const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode !== 'production';

  const config = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
      main: './src/index.tsx',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
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
                    targets: '> 0.25%, not dead',
                  },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: ['@emotion'],
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
  }

  return config;
};

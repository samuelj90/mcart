const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const METADATA = require('./metadata.js');
const apiMocker = require('connect-api-mocker');
module.exports = function (env) {
    return webpackMerge(baseConfig(), {
        devtool: 'inline-source-map',

        // Webpack Development Server config
        devServer: {
            port: METADATA.port,
            host: METADATA.host,
            historyApiFallback: true,
            before: function(app) {
                app.use(apiMocker('/api', {
                    target: 'mocks/api',
                    verbose: ({ req, filePath, fileType }) => console.log(`Mocking endpoint ${req.originalUrl} using ${filePath}.${fileType}.`)
                  }));
            },
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000,
                ignored: /node_modules/
            }
        }
    })
};
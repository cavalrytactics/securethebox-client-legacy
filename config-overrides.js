const rewireYAML = require('react-app-rewire-yaml');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {

    // config.module['rules'].push(
    //     {
    //         test: /\.yml$/,
    //         use: [{ loader: 'json-loader' }, { loader: 'yaml-flat-loader' }]
    //     }

    // )
    if (!config.plugins) {
        config.plugins = [];
    }
    config.plugins.push(
        new MonacoWebpackPlugin(),
    );
    config = rewireYAML(config, env);
    return config;
    // // ...
    // config = rewireYAML(config, env);
    // // ...
    // return config;
}
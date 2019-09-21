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
    config.module["rules"][2]["oneOf"][7]['use'].pop(3)
    // config.module["rules"][2]["oneOf"][7]['use'][3] = {
    //     loader: '/Users/charleschong/go/src/securethebox/securethebox-client/node_modules/yaml-lint-loader/index.js',
    //     options: {
    //         "schema": "DEFAULT_FULL_SCHEMA",
    //         "ignore": "*.yaml"
    //     }
    // }
    console.log("CONFIG:",config.module["rules"][2]["oneOf"][7]['use'])
    return config;
    // // ...
    // config = rewireYAML(config, env);
    // // ...
    // return config;
}
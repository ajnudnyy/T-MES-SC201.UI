/**
  * @file mock文件
  * @author dva<gjeunney@163.com>
  */
const fs = require('fs');
const path = require('path');

module.exports = function (webpackConfig, env) {
    webpackConfig.babel.plugins.push('transform-runtime');

    // Support hmr
    if (env === 'development') {
        webpackConfig.devtool = '#eval';
        webpackConfig.babel.plugins.push(['dva-hmr', {
            entries: [
                './src/index.js'
            ]
        }]);
    }
    else {
        webpackConfig.babel.plugins.push('dev-expression');
    }

    webpackConfig.resolve.alias = {
        components: `${__dirname}/src/components`,
        feature: `${__dirname}/src/components/feature`,
        common: `${__dirname}/src/components/common`,
        // components: `${__dirname}/src/components`,
        // utils: `${__dirname}/src/utils`,
        // config: `${__dirname}/src/utils/config`,
        // enums: `${__dirname}/src/utils/enums`,
        // services: `${__dirname}/src/services`,
        // models: `${__dirname}/src/models`,
        // routes: `${__dirname}/src/routes`,
        // themes: `${__dirname}/src/themes`,
    }
    return webpackConfig;
};

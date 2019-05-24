const ExtensionService = require('../services/extension.service');
const CreateExtensionPlugin = require('../plugins/create-extension.plugin');
const DeployExtensionPlugin = require('../plugins/deploy-extension.plugin');
const ConcatEntryPointsPlugin = require('../plugins/concat-entry-points.plugin');
const path = require('path');

/**
 * @todo find better solution for this
 */
function beforeRun(config) {
    /** configure extension service */
    const extensionService     = ExtensionService.getInstance();
    extensionService.rootDir   = config.context;
    extensionService.outDir    = config.output.path;
    extensionService.extOutDir = path.resolve(config.output.path, '../qlik-extension');
}

/** export modified webpack config */
module.exports = (config) => {
    // add custom plugins
    config.plugins = [
        ...config.plugins,
        new ConcatEntryPointsPlugin(),
        new CreateExtensionPlugin(),
        new DeployExtensionPlugin()
    ];

    config.output.jsonpFunction = ExtensionService.getInstance().extensionName;
    
    /** set library target to umd for requirejs */
    config.output.libraryTarget = "umd";
    /** configure extension service */
    beforeRun(config);
    return config;
};

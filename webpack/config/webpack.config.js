const ExtensionService = require('../services/extension.service');
const CreateExtensionPlugin = require('../plugins/create-extension.plugin');
const DeployExtensionPlugin = require('../plugins/deploy-extension.plugin');
const path = require('path');

/**
 * rewrite entry files so we dont create multiple chunks anymore
 * and create only one
 */
function rewriteEntryFiles(config) {
    /** 
     * create new file chunk named "extension" which combine all previous entry points
     */
    config.entry['extension-bundle'] = [
        ...config.entry.polyfills,
        ...config.entry['es2015-polyfills'],
        ...config.entry.styles,
        ...config.entry.main,
    ];

    /** remove old entry points since we dont need them anymore now */
    delete config.entry['es2015-polyfills'];
    delete config.entry['polyfills'];
    delete config.entry['main'];
    delete config.entry['styles'];
}

/**
 * @todo should placed into seperat hook
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
    // add entry files
    rewriteEntryFiles(config);
    // add custom plugins
    config.plugins = [
        ...config.plugins,
        new CreateExtensionPlugin(),
        new DeployExtensionPlugin()
    ];
    /** set library target to umd for requirejs */
    config.output.libraryTarget = "umd";
    /** configure extension service */
    beforeRun(config);
    return config;
};

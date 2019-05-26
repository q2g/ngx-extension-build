# Webpack

This build process uses a npm module Custom Webpack Builder currently for angular 7.

* [Custom Webpack Builder: NPM](https://www.npmjs.com/package/@angular-builders/custom-webpack)
* [Custom Webpack Builder: GitHub](https://github.com/meltedspark/angular-builders/tree/master/packages/custom-webpack)

to modify angular webpack configuration which will used by angular. At this point u can add plugins or override some base value for your own requirements.

Folder structure webpack / dist

```text
root
  ├─ dist
  |   ├─ qlik-extension
  |   |   ├─ EXTENSION_NAME.js (js extension file include all sources)
  |   |   ├─ EXTENSION_NAME.qext (qext file for qlik sense)
  |   |   ├─ wbfolder.wbl
  |   |   └─ EXTENSION_NAME.zip (zip file contain js, qext and wbl file)
  |   └─ tmp (defined in angular.json)
  |       ├─ extension-bundle.js (@see plugins: concat-entry-points.plugin)
  |       └─ angular generated files  
  ├─ src
  └─ webpack
       ├─ config
       |   └─ webpack.config.js
       ├─ plugins
       |   ├─ concat-entry-points.plugin.js
       |   ├─ create-extension-plugin.js
       |   └─ deploy-extension.plugin.js
       └─ services
           ├─ extension.service.js
           └─ qrs.service.js
```

## Dist Folders (qlik-extension, tmp)

* tmp we defined in angular.json, it is only a temporary directory where the angular compiler write all files needed for the app. Could have another name as u like define it in angular.json.  
:warning: change this directory contents with plugins, remove / rename files will break __*ng build --watch*__
* qlik-extension
  
## Webpack Folder

* webpack/config/webpack.config.js will be load by custom webpack builder to merge angular webpack configuration with the customized configuration.
* webpack/config/plugins current plugins to create / deploy extension
* services

At this point u can extend current webpack.config for your own needs and could be customized. I would recommend if u want to change some configuration values:

* module rules
* output params (carefully to override the output path here, could used by other configurations)
* add new Plugins (recommended)

As best practice i would advice, if u want to change some values use plugins and webpack hooks. So we can ensure we use webpack configuration values which are set in any other plugin / config which will be used and not only known in our webpack configuration. And u can use the Plugins again on other projects.

```js
const ExtensionService = require('../services/extension.service');
/** own plugins */
const CreateExtensionPlugin = require('../plugins/create-extension.plugin');
const DeployExtensionPlugin = require('../plugins/deploy-extension.plugin');
const ConcatEntryPointsPlugin = require('../plugins/concat-entry-points.plugin');
const path = require('path');

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
    return config;
};
```

## Plugins

Current plugins which will added to webpack config

* concat-entry-points.plugin: combine all entry points which are defined in webpack.config to one so we ensure there will be only one file at the end (@example polyfills/es2015-polyfills and main)
* create-extension.plugin: create all extension specific files
  * extension-name.qext
  * extension-name.js
  * wbfolder.wbl
  * extension-name.zip ( contain qext, js and wbl file)
* deploy-extension.plugin: deploy extension on qrs import zip file if extension not exists or just upload js file if extension allready installed. Also copy all files to default qlik sense windows path.
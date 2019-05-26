# Q2g Ngx Extension Boilerplate

Boilerplate to create Angular 7+ extensions for Qlik Sense / Qlik Sense Desktop.

## Quick Start

clone repository

```bash
cd ngx-extension-build
npm i
ng build #--watch #development mode with watch
# ng build --prod /* production mode */

# example for simple kpi extension
# ng build q2g-ngx-simple-kpi
# ng build q2g-ngx-simple-kpi --prod
```

The extension will automatically imported to Qlik Sense Desktop and Qlik Sense Server (QRS).

## How it works

In shorten to create angular 7+ extensions we use angular custom elements, which are "micro apps" if u not familiar with custom elements u can read this article [Angular Custom Elements](https://blog.angulartraining.com/tutorial-how-to-create-custom-angular-elements-55aea29d80c5)

The custom component will be compiled through webpack / angular-compiler into multiple chunks which will combined into one file (including angular sources, webpack bootstrap, polyfills) with webpack plugins, which runs after the compile process has been completed and all default angular files have been written to dist.

## Folder structure

```text
root
  ├─ dist
  |   └─ create bundles / extension file
  ├─ src
  |   └─ app configuration / app files
  ├─ webpack
  |    └─ webpack configuration / plugins
  ├─ ...
  ├─ angular.json
  └─ package.json
```

## further reading

[Configuration](./docs/configuration.md)  
[Webpack](./docs/webpack.md)

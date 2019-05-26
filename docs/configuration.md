# Configuration

This is only a boilerplate and u have to configure the app by your own, this should happen diffrent files.

## package.json

Contains all package and extension informations, all extension specific values will be read out from package.json file and create a qext file from this.

```json
{
  "name": "[EXTENSION NAME]",
  "author": "[AUTHOR NAME]",
  "description": "[EXTENSION_DESCRIPTION]",
  "version": "[EXTENSION_VERSION_NUMER]",
  "license": "[EXTENSION_LICENSE_TYPE]",
  ...
  "qext": {
    "icon": "[EXTENSION_ICON]",
    "id": "[EXTENSION ID]",
    "type": "[EXTENSION_TYPE]",
    "dependencies": {
      "qlik-sense": "[QLIK_SENSE_VERSION_REQUIRED]"
    }
  }
}
```

All properties u can add to qext section in the package.json, if not given it will use the fallback from package.json directly. As example, Author will be taken from qext section in package.json, description is not set so it will use the fallback from package.json description directly.

```json
{
    "author": "Max Mustermann",
    "description": "awesome extension",
    "name": "awesome-extension",
    ...
    "qext": {
        "author": "John Doe",
        "icon": "extension",
        "id": "awesim-extension",
        "type": "visualization",
        "dependencies": {
            "qlik-sense": ">=3.2.x"
        }
    }
}
```

will result in following file: **awesome-extension.qext**

```json
{
    "author": "John Doe",
    "dependencies": {
        "qlik-sense": ">=3.2.x"
    },
    "description": "awesome extension",
    "icon": "extension",
    "name": "awesome-extension",
    "type": "visualization",
    "id": "awesome-extension"
}
```

### Possible properties

| Name | Mandatory | type | description | has fallback |
|-|-|-|-|-|
| author | :white_check_mark: | string | author of the extension | :white_check_mark: |
| description | :white_check_mark: | string | description of the extension | :white_check_mark: |
| name | :white_check_mark: | string | name of the extension | :white_check_mark: |
| icon | :white_check_mark: | string | | - |
| id | :white_check_mark: | string | | | - |
| type | :white_check_mark: | string | | - |
| version | :white_check_mark: | string | version number of the extension like 1.0.0 | :white_check_mark: |
| preview | - | string | preview image filename | - |
| license | - | string | license for the extension | :white_check_mark: |
| repository | - | string | repository | :white_check_mark: |
| keywords | - | string | | :white_check_mark: |
| homepage | - | string | | :white_check_mark: |
| dependencies | - | object | dependencies for extension | - |

## angular.json

The angular.json file is the main configuration file for angular cli / angular webpack, at this point we define our projects, out directorys.

```text
root
  ├─ ...
  └─ angular.json
```

This B

```js
{
  ...
  "projects": {
    /** rename to your project name */
    "angular-extension": {
      ...
      "architect": {
        "build": {
           /** angular custom webpack builder */
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
                /** path to custom webpack configuration which will be used */
                "path": "./webpack/config/webpack.config.js"
            },
            /**
             * path where angular should add specific dist files
             * the complete extension will deployed into a seperate directory
             * called dist/qlik-extension
             */
            "outputPath": "dist/tmp",
            /**
             * default angular main file and should contain qlik extension
             * this is the one which will be exported from webpack and loaded
             * in require.js specific code
             */
            "main": "src/main.ts",
          },
          ...
        },
        ...
    },
    ...
  },
  /** rename to your project name */
  "defaultProject": "angular-extension"
}
```

## App Module

The custom element will defined / registered in app.module.ts.
:warning u could take any other module file for that just ensure u boostrapping
this module in your main file.

```text
root
  ├─ ...
  └─ src
     ├─ app
     |   └─ app.module.ts
     └─ main.ts  
```

```ts
import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    entryComponents: [
        AppComponent
    ]
})
export class AppModule implements DoBootstrap {

    public constructor(private injector: Injector) { }

    public ngDoBootstrap() {
        const el = createCustomElement(AppComponent, {injector: this.injector});
        /** change name of element here should be unique since this could define only once */
        customElements.define('my-custom-element', el);
    }
}
```

## main.ts

this is the file which will exported from bundle and loaded into qlik sense via require.js. And should contain extension specific definitions.

:warning Qlik Sense Extensions will only support angular1 not angular 7. If u want pass properties

* **myInputVar="data"** should be written as my-input-var="data"
* only pass simple values ( boolean, numbers, string ) values, complex Objects will not work

```text
root
  ├─ ...
  └─ src
     ├─ ...
     └─ main.ts  
```

```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

/** angular specific extension code starts here */
export default {
    definition: {},
    initialProperties: {},
    /** load custom element into dom should be the same name as defined in app.module.ts */
    template: '<my-custom-element></my-custom-element>',
    support: {
        snapshot: false,
        export: false,
        exportData: false
    },
    controller: ['$scope', '$element', ($scope: any, $element: any) => {
    }]
};
```
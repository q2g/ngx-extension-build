import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

export default {
    definition: {},
    initialProperties: {},
    template: '<h1>q2g-ngx-extension-boilerplate v1.0.1</h1>',
    support: {
        snapshot: false,
        export: false,
        exportData: false
    },
    controller: ['$scope', '$element', ($scope: any, $element: any) => {
        $element.append(`<my-custom-element></my-custom-element>`);
    }]
};

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ExampleModule, EXTENSION_ID } from './example.module';
import { environment } from '../../environments/environment';

if ( environment.production ) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule( ExampleModule );

export default {
    definition: {
        type: 'items',
        component: 'accordion',
        items: {
            settings: {
                type: 'items',
                uses: 'settings',
                items: {
                    kpiValue: {
                        type: 'string',
                        ref: 'qDef.value',
                        label: 'Icon',
                        expression: 'always',
                        defaultValue: '',
                        show: true,
                    }
                }
            }
        }
    },
    initialProperties: {},
    template: `<${EXTENSION_ID}></${EXTENSION_ID}>`,
    support: {
        snapshot: false,
        export: false,
        exportData: false
    },
    controller: ['$scope', '$element', ($scope: any, $element: any) => {
        $element.find(EXTENSION_ID).get(0).appModel = $scope.component.model.enigmaModel;
    }]
};

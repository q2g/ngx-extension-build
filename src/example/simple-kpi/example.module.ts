import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { ExampleComponent } from './components/example.component';

export const EXTENSION_ID = 'q2g-ngx-simple-kpi';

@NgModule({
    declarations: [
        ExampleComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    entryComponents: [
        ExampleComponent
    ]
})
export class ExampleModule implements DoBootstrap {

    public constructor(private injector: Injector) { }

    public ngDoBootstrap() {
        const el = createCustomElement(ExampleComponent, {injector: this.injector});
        customElements.define(EXTENSION_ID, el);
    }
}

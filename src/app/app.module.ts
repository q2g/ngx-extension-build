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
        customElements.define('my-custom-element', el);
    }
}

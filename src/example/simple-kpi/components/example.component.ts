import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-example-component',
    templateUrl: 'example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {

    public kpi: string;

    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    @Input()
    set appModel(model: EngineAPI.IGenericObject) {
        model.on('changed', () => {
            model.getLayout().then((layout: any) => {
                this.kpi = layout.qDef.value;
                this.changeDetectorRef.detectChanges();
            });
        });
        model.emit('changed');
    }
}

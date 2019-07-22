import { Component, Input } from '@angular/core';

@Component({
    selector: 'demo1-item',
    templateUrl: './demo1-item.component.html'
})
export class Demo1ItemComponent {
    @Input() item = '';
    @Input() margin = '';
    visible = false;

    setVisibility(e: boolean) {
        this.visible = e;
    }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxVisibilityModule } from '../../../../ngx-visibility/src/public-api';

@Component({
    selector: 'demo1-item',
    templateUrl: './demo1-item.component.html',
    imports: [CommonModule, NgxVisibilityModule],
})
export class Demo1ItemComponent {
    @Input() item = 0;
    @Input() margin = '';
    visible = false;

    setVisibility(e: boolean) {
        this.visible = e;
    }
}

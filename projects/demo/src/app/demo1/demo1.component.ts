import { CommonModule } from '@angular/common';
import {
    Component,
    HostBinding,
    Input,
    OnChanges,
    signal,
} from '@angular/core';
import { Demo1ItemComponent } from './demo1-item.component';
import { MarginComponent } from '../margin.component';
import { NgxVisibilityModule } from '../../../../ngx-visibility/src/public-api';

@Component({
    selector: 'demo1',
    templateUrl: './demo1.component.html',
    imports: [
        CommonModule,
        Demo1ItemComponent,
        MarginComponent,
        NgxVisibilityModule,
    ],
})
export class Demo1Component {
    items = signal<number[]>([]);
    availableCounts = [64, 128, 256, 512, 1024, 2048, 4096, 8192];
    count = signal(0);
    margin = signal('-100px');

    constructor() {
        this.setItems(128);
    }

    setItems(count: number) {
        const items = [];

        while (items.length < count) {
            items.push(Math.random());
        }

        items.sort();

        this.count.set(count);
        this.items.set(items);
    }
}

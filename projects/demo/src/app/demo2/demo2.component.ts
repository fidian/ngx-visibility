import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { MarginComponent } from '../margin.component';
import { NgxVisibilityModule } from '../../../../ngx-visibility/src/public-api';

interface DemoItem {
    hiddenCount: number;
    value: number;
    visible: boolean;
    visibleCount: number;
}

@Component({
    selector: 'demo2',
    templateUrl: './demo2.component.html',
    imports: [CommonModule, MarginComponent, NgxVisibilityModule],
})
export class Demo2Component {
    items: DemoItem[] = [];
    availableCounts = [64, 128, 256, 512, 1024, 2048, 4096, 8192];
    count = this.availableCounts[2];
    margin = '-100px';

    constructor() {
        this.setItems(64);
    }

    hidden(item: DemoItem) {
        item.visible = false;
        item.hiddenCount += 1;
    }

    setItems(count: number) {
        const items = [];

        while (items.length < count) {
            items.push({
                hiddenCount: 0,
                value: Math.random(),
                visible: false,
                visibleCount: 0,
            });
        }

        this.count = count;
        this.items = items;
    }

    visible(item: DemoItem) {
        item.visible = true;
        item.visibleCount += 1;
    }
}

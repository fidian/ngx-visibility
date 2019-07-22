import { Component, HostBinding, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'demo2',
    templateUrl: './demo2.component.html'
})
export class Demo2Component {
    items = [];
    availableCounts = [ 64, 128, 256, 512, 1024, 2048, 4096, 8192 ];
    count = this.availableCounts[2];
    margin = '-100px';

    constructor() {
        this.setItems(64);
    }

    setItems(count) {
        const items = [];

        while (items.length < count) {
            items.push({
                value: Math.random(),
                visible: false
            });
        }

        this.count = count;
        this.items = items;
    }

    setVisibility(item, e: boolean) {
        item.visible = e;
    }
}

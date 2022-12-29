import { Component, HostBinding, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'demo1',
    templateUrl: './demo1.component.html'
})
export class Demo1Component {
    items: number[] = [];
    availableCounts = [ 64, 128, 256, 512, 1024, 2048, 4096, 8192 ];
    count = this.availableCounts[2];
    margin = '-100px';

    constructor() {
        this.setItems(64);
    }

    setItems(count: number) {
        const items = [];

        while (items.length < count) {
            items.push(Math.random());
        }

        items.sort();

        this.count = count;
        this.items = items;
    }
}

import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'margin',
    templateUrl: './margin.component.html',
    imports: [FormsModule],
})
export class MarginComponent implements OnChanges {
    @Input() value = '';
    @Output() valueChange = new EventEmitter<string>();
    num = signal(0);
    unit = signal('px');

    ngOnChanges() {
        const matches = this.value.match(/(-?[0-9]+)(px|%)?/);

        if (matches) {
            this.num.set(+matches[1]);
            this.unit.set(matches[2] || 'px');
        }
    }

    updateNum(num: number) {
        this.num.set(num);
        this.update();
    }

    updateUnit(unit: string) {
        this.unit.set(unit);
        this.update();
    }

    private update() {
        this.valueChange.emit('' + this.num + this.unit);
    }
}

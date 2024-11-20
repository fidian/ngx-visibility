import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
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
    num = 0;
    unit = 'px';

    ngOnChanges() {
        const matches = this.value.match(/(-?[0-9]+)(px|%)?/);

        if (matches) {
            this.num = +matches[1];
            this.unit = matches[2] || 'px';
        }
    }

    update() {
        this.valueChange.emit('' + this.num + this.unit);
    }
}

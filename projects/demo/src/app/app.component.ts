import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { Demo1Component } from './demo1/demo1.component';
import { Demo2Component } from './demo2/demo2.component';
import { Demo3Component } from './demo3/demo3.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [CommonModule, Demo1Component, Demo2Component, Demo3Component],
})
export class AppComponent {
    demo = 1;
}

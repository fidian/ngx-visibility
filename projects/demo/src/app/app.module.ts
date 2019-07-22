import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Demo1Component } from './demo1/demo1.component';
import { Demo1ItemComponent } from './demo1/demo1-item.component';
import { Demo2Component } from './demo2/demo2.component';
import { Demo3Component } from './demo3/demo3.component';
import { MarginComponent } from './margin.component';
import { NgxVisibilityModule } from '../../../ngx-visibility/src/public-api';

@NgModule({
    declarations: [
        AppComponent,
        Demo1Component,
        Demo1ItemComponent,
        Demo2Component,
        Demo3Component,
        MarginComponent
    ],
    imports: [BrowserModule, FormsModule, NgxVisibilityModule],
    bootstrap: [AppComponent]
})
export class AppModule {}

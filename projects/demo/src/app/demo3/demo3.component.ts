import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarginComponent } from '../margin.component';
import { NgxVisibilityModule } from '../../../../ngx-visibility/src/public-api';

@Component({
    selector: 'demo3',
    templateUrl: './demo3.component.html',
    imports: [CommonModule, FormsModule, MarginComponent, NgxVisibilityModule],
})
export class Demo3Component {
    images = [
        'angular-black.png',
        'angular.png',
        'animations.png',
        'augury.png',
        'cdk.png',
        'cli.png',
        'compiler.png',
        'components.png',
        'forms.png',
        'http.png',
        'i18n.png',
        'karma.png',
        'labs.png',
        'language-services.png',
        'material.png',
        'protractor.png',
        'pwa.png',
        'router.png',
        'universal.png',
    ];
    margin = '';
    threshold = 0.9;
}

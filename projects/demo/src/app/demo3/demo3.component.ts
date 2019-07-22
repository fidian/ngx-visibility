import { Component, HostBinding, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'demo3',
    templateUrl: './demo3.component.html'
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
        'universal.png'
    ];
    margin = '';
    threshold = 0.9;
}

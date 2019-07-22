import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[ngxVisibilityAnchor]'
})
export class NgxVisibilityAnchorDirective {
    constructor(private readonly elementRef: ElementRef) {}

    ngxVisibilityGetElementRef() {
        return this.elementRef;
    }
}

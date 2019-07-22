import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Host,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    SkipSelf
} from '@angular/core';

import { NgxVisibilityService } from './ngx-visibility.service';
import { NgxVisibilityAnchorDirective } from './ngx-visibility-anchor.directive';

@Directive({
    selector: '[ngxVisibility]'
})
export class NgxVisibilityDirective
    implements AfterViewInit, OnChanges, OnDestroy {
    @Input() ngxVisibilityMargin: string;
    @Input() ngxVisibilityThreshold: number | number[];
    @Output() ngxVisibility = new EventEmitter<boolean>();
    private observing = false;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly ngxVisibilityService: NgxVisibilityService,
        @Host()
        @Optional()
        @SkipSelf()
        private readonly ngxVisibilityAnchorDirective?: NgxVisibilityAnchorDirective
    ) {}

    ngAfterViewInit() {
        this.observe();
    }

    ngOnChanges(changes) {
        if (
            this.observing &&
            (changes.ngxVisibilityMargin ||
                changes.ngxVisibilityThresholds ||
                changes.ngxVisibility)
        ) {
            this.unobserve();
            this.observe();
        }
    }

    ngOnDestroy() {
        this.unobserve();
    }

    private observe() {
        if (!this.observing) {
            const config: IntersectionObserverInit = {};

            if (this.ngxVisibilityMargin) {
                config.rootMargin = this.ngxVisibilityMargin;
            }

            if (this.ngxVisibilityThreshold) {
                config.threshold = this.ngxVisibilityThreshold;
            }

            if (this.ngxVisibilityAnchorDirective) {
                config.root = this.ngxVisibilityAnchorDirective.ngxVisibilityGetElementRef().nativeElement;
            }

            this.ngxVisibilityService.observe(
                this.elementRef.nativeElement,
                isVisible => {
                    this.ngxVisibility.emit(isVisible);
                },
                config
            );
            this.observing = true;
        }
    }

    private unobserve() {
        if (this.observing) {
            this.ngxVisibilityService.unobserve(this.elementRef.nativeElement);
            this.observing = false;
        }
    }
}

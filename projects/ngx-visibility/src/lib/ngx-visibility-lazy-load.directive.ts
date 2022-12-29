import {
    Directive,
    ElementRef,
    Host,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    SimpleChanges,
    SkipSelf
} from "@angular/core";

import { NgxVisibilityAnchorDirective } from "./ngx-visibility-anchor.directive";
import { NgxVisibilityService } from "./ngx-visibility.service";

@Directive({
    selector: "[ngxVisibilityLazyLoad]"
})
export class NgxVisibilityLazyLoadDirective implements OnChanges {
    @Input() backgroundImage: string = "";
    @Input() src: string = "";
    @Input() srcset: string = "";
    @Input() ngxVisibilityMargin: string = "0px";
    @Input() ngxVisibilityThreshold: number | number[] = [0];
    @HostBinding("style.backgroundImage") backgroundImageStyle = "";
    private loadImage = false;
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

    ngOnChanges(changes: SimpleChanges) {
        if (this.loadImage) {
            if (changes["backgroundImage"]) {
                this.backgroundImageStyle = this.backgroundImage;
            }

            if (changes["src"]) {
                this.elementRef.nativeElement.src = this.src;
            }

            if (changes["srcset"]) {
                this.elementRef.nativeElement.srcset = this.srcset;
            }
        } else if (
            this.observing &&
            (changes["ngxVisibilityMargin"] ||
                changes["ngxVisibilityThresholds"] ||
                changes["ngxVisibility"])
        ) {
            this.unobserve();
            this.observe();
        }
    }

    ngOnDestroy() {
        this.unobserve();
    }

    private observe() {
        if (!this.observing && !this.loadImage) {
            const config: IntersectionObserverInit = {
                rootMargin: "0px",
                root: null,
                threshold: [0]
            };

            if (this.ngxVisibilityMargin) {
                config.rootMargin = this.ngxVisibilityMargin;
            }

            if (this.ngxVisibilityThreshold) {
                if (Array.isArray(this.ngxVisibilityThreshold)) {
                    config.threshold = this.ngxVisibilityThreshold;
                } else {
                    config.threshold = [0];
                }
            }

            if (this.ngxVisibilityAnchorDirective) {
                config.root =
                    this.ngxVisibilityAnchorDirective.ngxVisibilityGetElementRef().nativeElement;
            }

            this.ngxVisibilityService.observe(
                this.elementRef.nativeElement,
                (isVisible) => {
                    if (isVisible) {
                        this.loadImage = true;
                        this.unobserve();

                        if (this.backgroundImage) {
                            this.elementRef.nativeElement.style.backgroundImage =
                                this.backgroundImage;
                        }

                        if (this.src) {
                            this.elementRef.nativeElement.src = this.src;
                        }

                        if (this.srcset) {
                            this.elementRef.nativeElement.srcset = this.srcset;
                        }
                    }
                },
                config
            );

            this.observing = true;
        }
    }

    private unobserve() {
        if (this.observing) {
            this.observing = false;
            this.ngxVisibilityService.unobserve(this.elementRef.nativeElement);
        }
    }
}

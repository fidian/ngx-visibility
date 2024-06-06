# NgxVisibility

Angular 18.x library to monitor when elements are visible in the DOM. When you have a huge list of components, this is more performant than other libraries because it keeps the number of observers to a minimum. It uses IntersectionObserver to do the work.

If you only care about when elements are resized, including resize events due to browser window size changing, look at [ngx-resize-observer](https://github.com/fidian/ngx-resize-observer/).

If you want to be notified when DOM elements change properties, [ngx-mutation-observer](https://github.com/fidian/ngx-mutation-observer/) would be a good pick.


## Demonstration

There's a [live demo](https://codesandbox.io/s/github/fidian/ngx-visibility-demo/tree/master/) over at CodeSandbox.io.


## Installation

Install like other Angular libraries. First run a command to download the module.

    npm install ngx-visibility

Next, add the module to your project.

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';

    // Import the module
    import { NgxVisibilityModule } from 'ngx-visibility';

    import { AppComponent } from './app.component';

    @NgModule({
        declarations: [AppComponent, ItemComponent, NgxVisibilityDirective],

        // Include the module.
        imports: [BrowserModule, FormsModule, NgxVisibilityModule],
        providers: [NgxVisibilityService],
        bootstrap: [AppComponent]
    })
    export class AppModule {}

Finally, you leverage the service directly or use some directives for common uses.


## NgxVisibilityLazyLoadDirective

Load an image or a background image when the element is visible.

    <img src="myImage.png" ngxVisibilityLazyLoad />

    <img srcset="myImage.png 1x, betterImage.png 2x" ngxVisibilityLazyLoad />

    <div backgroundImage="myImage.png" style="height: 100px; width: 82px" ngxVisibilityLazyLoad></div>

Supports `src` and `srcset` for images, `backgroundImage` for all HTML elements. It's highly recommended that you set at least a placeholder size (possibly with `min-height` and `min-width`) for elements. Once the item is flagged visible, the observer is removed and the item stays visible.

Configuration is allowed through `ngxVisibilityAnchorDirective`, `ngxVisibilityMargin` and `ngxVisibilityThreshold`, which are discussed below.


## NgxVisibilityDirective

Emit a boolean when an item becomes visible or is hidden from view.

    <my-component (ngxVisibility)="updateVisibility($event)"></my-component>

Listener is automatically added and removed by the directive.

Configuration is allowed through `ngxVisibilityAnchorDirective`, `ngxVisibilityMargin` and `ngxVisibilityThreshold`, which are discussed below.


## NgxVisibilityService

This service maintains the list of observers and calls callbacks when items become visible or are invisible.

    import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
    import { NgxVisibilityService } from 'ngx-visibility';

    @Component({
        selector: 'my-component'
    })
    export class MyComponent implements OnDestroy, OnInit {
        constructor(
            private readonly ngxVisibilityService: NgxVisibilityService,
            private readonly elementRef: ElementRef
        ) {}

        ngOnInit() {
            this.ngxVisibilityService.observe(
                // The native element reference
                this.elementRef.nativeElement,

                // A callback that is called whenever the element crosses
                // a threshold. When you use thresholds, tracking how many
                // have been crossed is up to you.
                isVisible => {
                    console.log('I am now', isVisible ? 'visible' : 'hidden');
                },

                // The configuration object is optional. Look at
                // IntersectionObserver for what these values mean.
                // The config is of type IntersectionObserverInit.
                {
                    // The viewport native element to use as our window.
                    // Defaults to `window`.
                    root: null,

                    // How far outside the viewport to extend. Useful for
                    // loading items that are almost going to be seen.
                    // Negative margins will not load items until they
                    // progress that far into the view window.
                    // Must be specified in pixels or percent and use
                    // the typical CSS margin formats.
                    rootMargin: '40px',

                    // Thresholds. Default is [ 0 ]. Can be either a number or
                    // an array of thresholds. Values are from 0 (not visible)
                    // to 1 (completely visible).
                    threshold: [ 0, .33, .66 ]
                }
            );
        }

        ngOnDestroy() {
            this.ngxVisibiltyService.unobserve(this.elementRef.nativeElement);
        }
    }


## NgxVisibilityAnchorDirective

Used to flag a viewport instead of using the whole window. When using this directive, the component must also use the `ngxVisibility` or `ngxVisibilityLazyLoad` directive, otherwise this directive has no effect. Really, that's not too bad but it is a little wasteful because resources will be loading before you want them.

    <div ngxVisibilityAnchorDirective style="overflow: scroll; height: 40px; width: 40px">
        <div *ngFor="let item in itemList" ngxVisibility="setItemVisibility(item, $event)">
            {{ item.name }} is visible? {{ item.visibility }}
        </div>
    </div>


## ngxVisibilityMargin

This attribute is used with `ngxVisibility` or `ngxVisibilityLazyLoad` in order to set the margin when observing that element. Margins are specified as per the CSS properties and must be measured in pixels or percent.

    <!-- Load when it is within 100px of being seen. -->
    <img src="cool-image.png" ngxVisibilityLazyLoad ngxVisibilityMargin="100px" />

    <!-- Load if the element is within half of a screen away from being seen. -->
    <div (ngxVisibility)="setVisibility($event)" ngxVisibilityMargin="50%" />


## ngxVisibilityThreshold

Sets up one or more thresholds when combined with `ngxVisibility` or `ngxVisibilityLazyLoad`. It accepts an array, a number, or a string that will be converted to a number. Numbers need to be within the range of 0 to 1.

    <div ngxVisibility="setVisibility($event)" ngxVisibilityThreshold="1">...content...</div>

    <div ngxVisibility="setVisibility($event)" [ngxVisibilityThreshold]="[ 0, .5 ]">...content...</div>


## License

This project is licensed under an [MIT license](LICENSE.md).

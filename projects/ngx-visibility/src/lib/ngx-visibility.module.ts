import { NgModule } from '@angular/core';
import { NgxVisibilityAnchorDirective } from './ngx-visibility-anchor.directive';
import { NgxVisibilityDirective } from './ngx-visibility.directive';
import { NgxVisibilityLazyLoadDirective } from './ngx-visibility-lazy-load.directive';
import { NgxVisibilityService } from './ngx-visibility.service';

@NgModule({
    exports: [
        NgxVisibilityAnchorDirective,
        NgxVisibilityDirective,
        NgxVisibilityLazyLoadDirective,
    ],
    imports: [
        NgxVisibilityAnchorDirective,
        NgxVisibilityDirective,
        NgxVisibilityLazyLoadDirective,
    ],
    providers: [NgxVisibilityService],
})
export class NgxVisibilityModule {}

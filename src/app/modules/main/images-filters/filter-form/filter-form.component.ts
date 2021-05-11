import {
    Component,
    Input,
    OnInit,
    Output,
    ViewChildren,
    EventEmitter,
    ChangeDetectionStrategy,
    OnDestroy,
    ViewChild,
    ElementRef,
} from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { watch } from "rxjs-watcher";
import {
    BehaviorSubject,
    concat,
    fromEvent,
    merge,
    Observable,
    Subject,
    Subscription,
} from "rxjs";
import { concatMap, map, mergeMap, mergeMapTo, reduce, take, takeUntil, tap } from "rxjs/operators";
import { imageApiService } from "src/app/core/http/image/image.service";
import { ImageStateService } from "src/app/core/services/image-state/image-state.service";
import { ToggleLoadingBarService } from "src/app/core/services/toggle-loading-bar/toggle-loading-bar.service";
import { frequentErrors } from "src/app/utils/constants/frequentErrors";
import { errorMessageDataI } from "src/app/utils/interfaces/errorMessageData.interface";
import { ImageI } from "src/app/utils/interfaces/image/image.interface";
import { ImageFilterApiParams } from "src/app/utils/interfaces/image/imageFilterApiParams";

@Component({
    selector: "app-filter-form",
    templateUrl: "./filter-form.component.html",
    styleUrls: ["./filter-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterFormComponent implements OnInit, OnDestroy {

    resultImage = this.imageStateService.resultImageSubject

    selectedFilter = this.imageStateService.SelectedFilter

    isOriginalImageToggled = this.imageStateService.isOriginalImageToggledSubject

   @ViewChild("submitBtn", {static: true}) submitBtn: ElementRef|undefined;

    // SUBSCRIPTIONS

    imageServiceSub: Subscription | undefined;

    constructor(
        private imageService: imageApiService,
        private loadingService: ToggleLoadingBarService,
        private imageStateService: ImageStateService
    ) {}

    ngOnInit(): void {

        this.imageStateService.resultImageSubject.next(undefined);

        const observable$ = this.imageStateService.originalImageSubject.pipe(
            mergeMap((value) => 
                this.imageService
                .fetchCommonFilterImage({file: value.file, filter: this.selectedFilter.getValue()
                
                })
            ),
            tap(value => {
                this.imageStateService
                .resultImageSubject.next({file: value, src: URL.createObjectURL(value)});
                this.imageStateService.isOriginalImageToggledSubject.next(false);
            },
            
            )
        )

        

        const eventObservable$ = fromEvent(this.submitBtn?.nativeElement, "click").pipe(
            mergeMapTo(observable$)
            ).subscribe(console.log)

        /* const concat$ = concat(
            eventObservable$,
            observable$
        ).subscribe(console.log) */

    }

    ngOnDestroy() {
        if (this.imageServiceSub) {
            this.imageServiceSub.unsubscribe();
        }
    }

    toggleImage(): void {
        this.imageStateService.isOriginalImageToggledSubject
        .next(!this.imageStateService.isOriginalImageToggledSubject.getValue());
    }

    changeSelectedFilter(event: MatSelectChange) {
        this.imageStateService.SelectedFilter.next(event.value);
    }

    submitImage() {

        

        
            
            /* this.imageStateService.originalImageSubject.pipe(
                mergeMap((value) => 
                    this.imageService
                    .fetchCommonFilterImage({file: value.file, filter: this.selectedFilter.getValue()})
                ),
                tap(value => {
                    this.imageStateService
                    .resultImageSubject.next({file: value, src: URL.createObjectURL(value)});
                    this.imageStateService.isOriginalImageToggledSubject.next(false);
                    this.imageServiceSub?.unsubscribe();
                },
                watch("Filter odd numbers out", 10)
                )
            ).subscribe() */

    }
}

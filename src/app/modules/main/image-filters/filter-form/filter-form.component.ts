import {
    Component,
    Input,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
    ViewChild,
    ElementRef,
    OnChanges,
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
import { concatMap, map, mergeMap, mergeMapTo, reduce,
     shareReplay, skipUntil, skipWhile, take, takeLast, takeUntil, tap } from "rxjs/operators";
import { imageApiService } from "src/app/core/http/image/image.service";
import { ImageStateService } from "src/app/core/services/image-state/image-state.service";
import { ToggleLoadingBarService } from "src/app/core/services/toggle-loading-bar/toggle-loading-bar.service";
import { ImageI } from "src/app/utils/interfaces/image/image.interface";
@Component({
    selector: "app-filter-form",
    templateUrl: "./filter-form.component.html",
    styleUrls: ["./filter-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterFormComponent implements OnInit, OnDestroy {

    @Input() selectedFilter: string|null|undefined;

    @Input() isOriginalImageToggled: boolean | null | undefined;

    @Input() originalImage: Blob | null | undefined;

    @Input() resultImage: Blob | null | undefined;

    // SUBSCRIPTIONS

    imageServiceSub: Subscription | undefined;

    constructor(
        private imageService: imageApiService,
        private loadingService: ToggleLoadingBarService,
        private imageStateService: ImageStateService
    ) {}

    ngOnInit(): void {

        
           

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

    
        this.imageStateService.resetImageValues();

        this.imageService
                .fetchCommonFilterImage({
                    file: this.originalImage?? undefined, 
                    filter: this.selectedFilter?? "negative"
                })
                .pipe(
                    tap(
                        (image) => {
                            this.imageStateService.isOriginalImageToggledSubject.next(false);
                            this.loadingService.setNextValue(true);
                            this.imageStateService.resultImageSubject.next(
                                {
                                    file: image, 
                                    src: URL.createObjectURL(image),
                                    filter: this.selectedFilter || ''
                                }
                            )
                        }
                    )
                )
                .subscribe({complete: () => {
                    this.loadingService.setNextValue(false);
                }})

    }
}

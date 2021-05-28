import {
    Component,
    Input,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
} from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import {
     Subscription,
} from "rxjs";
import { tap } from "rxjs/operators";
import { imageApiService } from "src/app/core/http/image/image.service";
import { ImageStateService } from "src/app/core/services/image-state/image-state.service";
import { ToggleLoadingBarService } from "src/app/core/services/toggle-loading-bar/toggle-loading-bar.service";
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

    selectedColor: string = "red";

    selectedValue: string = "medium"

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

    changeSelectedValue(event: MatSelectChange) {
        this.selectedValue = event.value;
    }

    changeSelectedColor(event: MatSelectChange) {
        this.selectedColor = event.value;
    }

    submitImage() {

    
        this.imageStateService.resetImageValues();

        this.imageService
                .fetchCommonFilterImage({
                    file: this.originalImage?? undefined, 
                    filter: this.selectedFilter?? "negative",
                    value: this.selectedValue.toUpperCase(),
                    color: this.selectedColor.toUpperCase()

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

    isBasicFilter(filter: string) {

        const basicFilterEntries = ["unicolor", "brightness", "saturation"];

        return basicFilterEntries.some( entry => filter === entry);

    }
}

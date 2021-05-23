import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
} from "@angular/core";
import {
    EMPTY,
    Subscription,
} from "rxjs";
import { DetectorService } from "src/app/core/http/detector/detector.service";

import { catchError, tap } from "rxjs/operators";
import { ShareImageService } from "src/app/core/services/share-image/share-image.service";
import { ToggleLoadingBarService } from "src/app/core/services/toggle-loading-bar/toggle-loading-bar.service";
import { frequentErrors } from "src/app/utils/constants/frequentErrors";
import { Title } from "@angular/platform-browser";
import { ImageFilterApiParams } from "src/app/utils/interfaces/image/imageFilterApiParams";
import { ImageStateService } from "src/app/core/services/image-state/image-state.service";

@Component({
    selector: "app-images-filters",
    templateUrl: "./image-filters.component.html",
    styleUrls: ["./image-filters.component.scss"],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ImagesFiltersComponent implements OnInit, OnDestroy {
    // SUBJECTS

    // OBSERVABLES

    shareImageSubscription: Subscription | undefined = undefined;

    detectorServiceSubscription: Subscription | undefined

    constructor(
        private detectorService: DetectorService,
        private shareImageService: ShareImageService,
        private loadingService: ToggleLoadingBarService,
        private titleSevice: Title,
        public imageStateService: ImageStateService
    ) {}

    // LIFECICLE

    ngOnInit(): void {

        this.titleSevice.setTitle("filters - spring media");

        this.shareImageSubscription = this.shareImageService
            .getImageObservable()
            .pipe(
                tap((value: File) => {
                    if (value) {
                        this.imageStateService.originalImageSubject.next({
                            file: value,
                            src: URL.createObjectURL(value),
                        });
                        this.imageStateService.originalFileName.next(value.name);
                        this.imageStateService.errorData.next(undefined);
                    }
                }),
                catchError((error) => {
                    console.log(error);
                    return EMPTY;
                })
            )
            .subscribe();
    }

    ngOnDestroy() {
        
        this.imageStateService.resetImageValues();

        if (this.shareImageSubscription) this.shareImageSubscription.unsubscribe();

        if (this.detectorServiceSubscription) this.detectorServiceSubscription.unsubscribe()
    }

    // CLASS METHODS

    loadFile(event: Event|any): void {

        this.imageStateService.resetImageValues();

        let inputFile: File;

        if ((inputFile = event.target?.files[0])) {
           
            this.loadValidImage(inputFile);
            
        }

        this.imageStateService.originalFileName
        .next(inputFile.name?? event.target?.files[0]?? "");
    }

    loadValidImage(inputFile: File, ) {

        this.loadingService.setNextValue(true);

        if (inputFile.size > 10_485_760) {
            this.imageStateService.errorData.next(frequentErrors.fileToBig);
            this.loadingService.setNextValue(false);
        } else {
            this.detectorServiceSubscription = this.detectorService
                .getFileMimetype(inputFile)
                .pipe(
                    tap((value) => {
                        console.log(value)
                        if (this.detectorService.isValidTypeOrMimetype(
                                value.mimetype
                            )
                        ) {

                            this.loadingService.setNextValue(false);

                            this.imageStateService.originalImageSubject.next({
                                file: inputFile,
                                src: URL.createObjectURL(inputFile),
                            });

                            this.imageStateService.errorData.next(undefined);
                        } else {

                            this.imageStateService.errorData.next(frequentErrors.invalidMimetype)
                        }

                        this.loadingService.setNextValue(false);
                    }),

                    catchError((err) => {
                        this.imageStateService.errorData.next({ message: err.message });
                        this.imageStateService.originalImageSubject.next(undefined);
                        this.loadingService.setNextValue(false);
                        return EMPTY;
                    })
                )
                .subscribe();
        }

        
    }
    
    loadResultImage(value: ImageFilterApiParams) {

        console.log(value)

        this.imageStateService.resultImageSubject.next(value);

    }

    toggleImage() {
        this.imageStateService.isOriginalImageToggledSubject.next(
            !this.imageStateService.isOriginalImageToggledSubject.getValue()
        );
    }
}

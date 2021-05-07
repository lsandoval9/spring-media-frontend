import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
    OnChanges,
} from "@angular/core";

import {
    BehaviorSubject,
    EMPTY,
    ReplaySubject,
    Subject,
    Subscription,
} from "rxjs";
import { DetectorService } from "src/app/core/http/detector/detector.service";

import { catchError, finalize, scan, shareReplay, tap } from "rxjs/operators";
import { imageService } from "src/app/core/http/image/image.service";
import { errorMessageDataI } from "src/app/utils/interfaces/errorMessageData.interface";
import { ShareImageService } from "src/app/core/services/share-image/share-image.service";
import { ToggleLoadingBarService } from "src/app/core/services/toggle-loading-bar/toggle-loading-bar.service";
import { ImageI } from "src/app/utils/interfaces/image/image.interface";
import { BlobService } from "src/app/core/services/blob/blob.service";

@Component({
    selector: "app-images-filters",
    templateUrl: "./images-filters.component.html",
    styleUrls: ["./images-filters.component.scss"],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ImagesFiltersComponent implements OnInit, OnDestroy {
    // SUBJECTS
    errorMessage = new BehaviorSubject<errorMessageDataI>({});

    originalImageSubject = new ReplaySubject<ImageI>();

    resultImageSubject = new ReplaySubject<ImageI>();

    isOriginalImageToggledSubject = new BehaviorSubject<boolean>(true);

    originalFileName = new BehaviorSubject<string>("");

    // OBSERVABLES

    originalImage$ = this.originalImageSubject.asObservable();

    shareImageSubscription!: Subscription;

    constructor(
        private detectorService: DetectorService,
        private filterService: imageService,
        private shareImageService: ShareImageService,
        private loadingService: ToggleLoadingBarService,
        private blobService: BlobService
    ) {}

    // LIFECICLE

    ngOnInit(): void {
        this.shareImageSubscription = this.shareImageService
            .getImageObservable()
            .pipe(
                tap((value: File) => {
                    if (value) {
                        this.originalImageSubject.next({
                            file: value,
                            src: URL.createObjectURL(value),
                        });
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
        this.shareImageSubscription.unsubscribe();
    }

    // CLASS METHODS

    submitImage(event: Event) {
        event.preventDefault();

        this.originalImage$.subscribe({
            next: (value) => {
                console.log(value.src);
            },
        });
    }

    loadFile(event: Event): void {
        event.preventDefault();

        // @ts-ignore
        this.originalImageSubject.next(event.target?.files[0]);

        let inputFile: File;

        // @ts-ignore
        if ((inputFile = event.target?.files[0])) {
            /* this.filterService.fetchCommonFilterImage({file: inputFile, filter: "negative"}).subscribe(
                (value) => {console.log(value); this.originalImageSubject.next({
                    file: value, 
                    src:
                URL.createObjectURL(value)})}
            ) */

            this.detectorService
                .getFileMimetype(inputFile)
                .pipe(
                    tap((value) => {
                        if (
                            this.detectorService.isValidTypeOrMimetype(
                                value.mimetype
                            )
                        ) {
                            this.originalImageSubject.next({
                                file: inputFile,
                                src: URL.createObjectURL(inputFile),
                            });
                        } else {
                            throw (new Error(
                                "Invalid file"
                            ).message = `Invalid file, 
                            please insert an image (jpg, png, webp)`);
                        }
                    }),

                    catchError((err) => {
                        this.errorMessage.next({ message: err.message });
                        console.log(err);
                        return EMPTY;
                    })
                )
                .subscribe();

            this.originalFileName.next(inputFile.name);
        }
    }

    toggleImage() {
        this.isOriginalImageToggledSubject.next(
            !this.isOriginalImageToggledSubject.getValue()
        );
    }
}

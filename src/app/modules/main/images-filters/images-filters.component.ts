import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, OnChanges } from "@angular/core";

import { BehaviorSubject, EMPTY, ReplaySubject, Subject, Subscription } from "rxjs";
import { DetectorService } from "src/app/core/http/detector/detector.service";

import { catchError, finalize, shareReplay, tap } from "rxjs/operators";
import { imageService } from "src/app/core/http/image/image.service";
import { errorMessageDataI } from "src/app/utils/interfaces/errorMessageData.interface";
import { ShareImageService } from "src/app/core/services/share-image/share-image.service";
import { ToggleLoadingBarService } from "src/app/core/services/toggle-loading-bar/toggle-loading-bar.service";
import { ImageI } from "src/app/utils/interfaces/image/image.interface";

@Component({
    selector: "app-images-filters",
    templateUrl: "./images-filters.component.html",
    styleUrls: ["./images-filters.component.scss"],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ImagesFiltersComponent implements OnInit, OnDestroy, OnChanges {

    errorMessage = new BehaviorSubject<errorMessageDataI>({});

    originalImageSubject = new ReplaySubject<ImageI>();

    originalImage$ = this.originalImageSubject.asObservable()

    shareImageSubscription!: Subscription;

    constructor(private detectorService: DetectorService, 
        private filterService: imageService,
        private shareImageService: ShareImageService,
        private loadingService: ToggleLoadingBarService) {}

    // LIFECICLE
    
    ngOnInit(): void {

        this.originalImage$.subscribe((value) => console.log(value))

        this.shareImageSubscription = this.shareImageService
        .getImageObservable()
        .pipe(
            tap((value: File) => {
                if (value) {
                    this.originalImageSubject.next({file: value, src: URL.createObjectURL(value)})
                }
            }),
            shareReplay(1),
            catchError(error => {
                console.log(error)
                return EMPTY;
            })
        ).subscribe();
    }

    ngOnChanges() {
        console.log(this.originalImage$)
    }

    ngOnDestroy() {

    }

    // CLASS METHODS

    submitImage(event: Event) {

        event.preventDefault();

        this.originalImage$.subscribe({next: (value) => {console.log(value.src)}});
    }

    loadFile(event: Event): void {

        event.preventDefault();

        // @ts-ignore
        this.originalImageSubject.next(event.target?.files[0])

        let inputFile: File;
        
        // @ts-ignore
        if (inputFile = event.target?.files[0]) {

            

        }
            
        

    }
    
}


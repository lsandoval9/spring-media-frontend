import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

import { MatRadioChange } from "@angular/material/radio";
import { Observer, ReplaySubject } from "rxjs";
import { DetectorService } from "src/app/core/http/detector/detector.service";
import { ShareImageService } from "src/app/core/services/share-image/share-image.service";

@Component({
    selector: "app-images-filters",
    templateUrl: "./images-filters.component.html",
    styleUrls: ["./images-filters.component.scss"],
})
export class ImagesFiltersComponent implements OnInit, OnInit {
    selectedValue = "";

    isValidFiletype = false;

    selectedFilterValue = "";

    downloadSrc = "";

    imageAsSrc = "";

    resultImage: string | undefined;

    resultImageAsBlob: Blob | undefined;

    file!: File;

    url: string | ArrayBuffer | null = "";

    imageSubject!: ReplaySubject<File>;

    errors = false;

    private imageObserver: Observer<File> = {
        next: (file: File) => {
            this.addImage(file);
            this.errors = false;
        },
        error: (err: any) => {
            this.errors = true;
            console.error(err);
        },
        complete: () => {
            console.log("complete");
            this.errors = false;
        },
    };

    constructor(
        private changeDetector: ChangeDetectorRef,
        private imageService: ShareImageService,
        private detectorService: DetectorService
    ) {
        this.imageSubject = this.imageService.getImage();

        this.imageSubject.subscribe(this.imageObserver);
    }

    ngOnInit(): void {}
    

    public addImage = (event: any): void => {

        this.resultImage = "";

        if (event instanceof File) {
            const reader = new FileReader();

            this.file = event;

            reader.readAsDataURL(event); // read file as data url

            reader.onload = (event) => {
                // called once readAsDataURL is completed

                if (event?.target === null) {
                    throw new Error("bad image");
                }

                if (typeof event?.target.result === "string") {
                    this.imageAsSrc = event?.target.result;
                }
            };
        } else if (event.target?.files && event.target?.files[0]) {
            const reader = new FileReader();

            this.file = event.target.files[0];

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            // tslint:disable-next-line:no-shadowed-variable
            reader.onload = (event) => {
                // called once readAsDataURL is completed

                if (event?.target === null) {
                    throw new Error("bad image");
                }

                if (typeof event?.target.result === "string") {
                    this.imageAsSrc = event?.target.result;
                }
            };
        }

        this.isValidFiletype = this.isValidImage(this.file.type)
    };

    changeRadioValue = (event: MatRadioChange): void => {
        this.selectedValue = event.value;
    };

    showResultImage(event: Blob): void {
        this.resultImageAsBlob = event;
        const imageUrl = URL.createObjectURL(event);
        this.resultImage = imageUrl;
        this.randomFileName();
    }

    randomFileName(): void {
        let r, v;

        this.downloadSrc =
            "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
                (r = (Math.random() * 16) | 0),
                    (v = c == "x" ? r : (r & 0x3) | 0x8);
                return v.toString(16);
            }) + ".png";

        this.changeDetector.detectChanges();
    }

    changeSelectedFilterValue(event: string): void {
        this.selectedFilterValue = event;
    }

    isValidImage(extension: string | undefined): boolean {
        
        const validExtensions = [
            "image/png",
            "image/jpeg",
            "image/webp",
        ];

        if (this.file.type !== undefined) {
            if (validExtensions.some((str) => extension === str)) {

                console.log("VALID")

                return true;
            }
        }

        return false;
    }
}

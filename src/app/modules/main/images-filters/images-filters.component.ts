import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

import { MatRadioChange } from "@angular/material/radio";
import { Observer, ReplaySubject } from "rxjs";
import { DetectorService } from "src/app/core/http/detector/detector.service";
import { ShareImageService } from "src/app/core/services/share-image/share-image.service";
import { ShowErrorDialogService } from "src/app/core/services/show-error-dialog/show-error-dialog.service";
import { detectorResultI } from "src/app/utils/interfaces/detectorResult.inteface";
import { errorDialogData } from "src/app/utils/interfaces/errorDialogData.interface";

@Component({
    selector: "app-images-filters",
    templateUrl: "./images-filters.component.html",
    styleUrls: ["./images-filters.component.scss"],
})
export class ImagesFiltersComponent implements OnInit, OnInit {
    selectedValue = "";

    filetype = "";

    isValidFiletype = false;

    selectedFilterValue = "";

    downloadSrc = "";

    imageAsSrc = "";

    resultImage: string | undefined;

    resultImageAsBlob: Blob | undefined;

    file!: File;

    url: string | ArrayBuffer | null = "";

    imageSubject!: ReplaySubject<File>;

    errors: errorDialogData | undefined;

    private detectorObserver: Observer<detectorResultI> = {
        next: (result: detectorResultI) => {
            this.filetype = result.mimetype;
            this.isValidFiletype = this.detectorService.isValidTypeOrMimetype(
                this.filetype
            );

            console.log(this.isValidFiletype);
        },
        error: (err: any) => console.error(err),
        complete: () => console.log("completed"),
    };

    private imageObserver: Observer<File> = {
        next: (file: File) => {
            this.addImage(file);
            this.errors = undefined;
        },
        error: (err: any) => {
            this.errors = {
                message: err.error.message,
                date: err.error.date,
            };
            this.errorDialogService.openDialog(this.errors);
        },
        complete: () => {
            console.log("complete");
            this.errors = undefined;
        },
    };

    constructor(
        private changeDetector: ChangeDetectorRef,
        private imageService: ShareImageService,
        private detectorService: DetectorService,
        private errorDialogService: ShowErrorDialogService
    ) {
        this.imageSubject = this.imageService.getImage();

        this.imageSubject.subscribe(this.imageObserver);
    }

    ngOnInit(): void {}

    public addImage = (event: any): void => {
        this.resultImage = "";

        this.errors = undefined;

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

        if (this.file.size >= 10000) {
            this.errors;
        }

        this.detectorService
            .getFileMimetype(this.file)
            .subscribe(this.detectorObserver);
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

    checkFiletype(): boolean {
        if (this.detectorService.isValidTypeOrMimetype(this.filetype)) {
            return true;
        }

        return false;
    }

    showWebpError(): boolean {
        if (this.file?.type === "image/webp") {
            return true;
        }

        return false;
    }
}

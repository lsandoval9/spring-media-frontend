import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observer } from "rxjs";
import { DetectorService } from "src/app/core/http/detector/detector.service";
import { ShareImageService } from "src/app/core/services/share-image/share-image.service";
import { ShowErrorDialogService } from "src/app/core/services/show-error-dialog/show-error-dialog.service";
import { ToggleLoadingBarService } from "src/app/core/services/toggle-loading-bar/toggle-loading-bar.service";
import { detectorResultI } from "src/app/utils/interfaces/detectorResult.inteface";
import { errorDialogData } from "src/app/utils/interfaces/errorDialogData.interface";

@Component({
    selector: "app-detector",
    templateUrl: "./detector.component.html",
    styleUrls: ["./detector.component.scss"],
})
export class DetectorComponent implements OnInit {
    fileSize = 0;

    fileSizeFormated: string | number = 0;

    file!: File;

    result: detectorResultI | undefined;

    fileType = "";

    fileDate: Date | undefined | string;

    filename = "";

    detectorForm!: FormGroup;

    errors = 0;

    private resultObserver: Observer<detectorResultI> = {
        next: (result: detectorResultI) => {
            this.loadingService.setNextValue(false);

            this.result = result;
        },
        error: (err: errorDialogData) => {
            this.loadingService.setNextValue(false);
            console.error(err);
            this.errorDialogService.openDialog(err);
        },
        complete: () => {
            this.loadingService.setNextValue(false);
        },
    };

    constructor(
        public detectorService: DetectorService,
        private shareService: ShareImageService,
        private router: Router,
        private loadingService: ToggleLoadingBarService,
        private errorDialogService: ShowErrorDialogService
    ) {}

    ngOnInit(): void {
        this.detectorForm = new FormGroup({
            file: new FormControl("", [Validators.required]),
        });
    }

    onLoadFile(event: any): void {
        this.result = undefined;

        if (
            event.target.files &&
            event.target.files[0] &&
            event.target.files[0] !== undefined
        ) {
            this.filename = event.target.files[0].name
                ? event.target.files[0].name
                : "";

            this.fileSize = event.target.files[0].size
                ? event.target.files[0].size
                : "";

            this.fileType = event.target.files[0].type
                ? event.target.files[0].type
                : "";

            this.fileDate = event.target.files[0].lastModifiedDate
                ? event.target.files[0].lastModifiedDate
                : "";

            this.file = event.target.files[0];
        }
    }

    submitFile(): void {
        this.loadingService.setNextValue(true);

        if (this.file !== undefined && this.file !== null) {
            this.detectorService
                .getFileMimetype(this.file)
                .subscribe(this.resultObserver);
        }
    }

    navigateToFilters(): void {

        if (
            this.file !== undefined &&
            this.detectorService.isValidTypeOrMimetype(
                this.file.type,
                this.file
            )
        ) {

            this.shareService.pushImage(this.file);

            this.router.navigateByUrl("/filters");


        } else {

            this.file = this.detectorService.setImageExtension(
                this.result,
                this.file
            );

            this.shareService.pushImage(this.file);

            this.router.navigateByUrl("/filters");
        }
    }

    showWebpError(): boolean {
        if (this.file?.type === "image/webp") {
            return true;
        }

        return false;
    }
}

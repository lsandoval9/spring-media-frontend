import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observer } from "rxjs";
import { DetectorService } from "src/app/core/http/detector/detector.service";
import { ShareImageService } from "src/app/core/services/share-image/share-image.service";
import { ToggleLoadingBarService } from "src/app/core/services/toggle-loading-bar/toggle-loading-bar.service";
import { detectorResultI } from "src/app/utils/interfaces/detectorResult.inteface";

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

    fileDate: Date | undefined;

    filename = "";

    detectorForm!: FormGroup;

    errors = 0;

    private resultObserver: Observer<detectorResultI> = {

        next: (result: detectorResultI) => {
            this.loadingService.setNextValue(false)

            this.result = result;
        },
        error: (err: any) => {
            console.error(err);
        },
        complete: () => {this.loadingService.setNextValue(false)},

    };

    private fileObserver: Observer<any> = {

        next: (result: detectorResultI) => {
            console.log(result);
        },
        error: (err: any) => {
            console.error(err);
        },
        complete: () => {},
        
    };

    constructor(
        private detectorService: DetectorService,
        private shareService: ShareImageService,
        private router: Router,
        private loadingService: ToggleLoadingBarService
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

    getSizeInMB(): number {
        return this.fileSize / 1_000_000;
    }

    setImageExtension(): File {
        const validExtensions = [
            ".jpg",
            ".png",
            ".webp",
            "image/png",
            "image/jpg",
            "image/webp",
        ];

        console.log(this.result?.extension)

        if (this.result?.extension) {
            if (
                validExtensions.some((str) => this.result?.extension === str) &&
                this.file !== undefined
            ) {
                return new File([this.file], this.file.name + ".png", {
                    type: "image/png",
                });
            }
        }

        return new File([this.file], this.file.name, {
            type: "image/png",
        });
    }

    navigateToFilters(): void {
        if (this.file !== undefined && this.isValidImage(this.file.type)) {
            this.router.navigateByUrl("/filters");
        } else {
            this.file = this.setImageExtension();

            this.shareService.pushImage(this.file)

            this.router.navigateByUrl("/filters");
        }
    }

    isValidImage(extension: string | undefined): boolean {
        
        const validExtensions = [
            ".jpg",
            ".png",
            ".webp",
            "image/png",
            "image/jpg",
            "image/webp",
        ];

        if (this.file.type !== undefined) {
            if (validExtensions.some((str) => extension === str)) {
                return true;
            }
        }

        return false;
    }

    showWebpError(): boolean {

        if (this.file?.type === "image/webp") {
            return true;
        }

        return false;
    }

    /* changeExtension(file: File, extension: string): string {
        const basename = path.basename(file, path.extname(file))
        return path.join(path.dirname(file), basename + extension)
      } */
}

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observer } from "rxjs";
import { DetectorService } from "src/app/core/http/detector/detector.service";
import { ShareImageService } from "src/app/core/services/share-image/share-image.service";
import { detectorResultI } from "src/app/utils/interfaces/detectorResult.inteface";

@Component({
    selector: "app-detector",
    templateUrl: "./detector.component.html",
    styleUrls: ["./detector.component.scss"],
})
export class DetectorComponent implements OnInit {
    fileSize = 0;

    fileSizeFormated: string | number = 0;

    file: File | undefined;

    result: detectorResultI| undefined;

    fileType = "";

    fileDate: Date | undefined;

    filename = "";

    detectorForm!: FormGroup;

    private observer: Observer<detectorResultI> = {
        next: (result: detectorResultI) => {
            this.result = result;
        },
        error: (err: any) => {
            console.log(err);
        },
        complete: () => {
        },
    };

    constructor(private detectorService: DetectorService, private shareService: ShareImageService,
        private router: Router) {}

    ngOnInit(): void {
        this.detectorForm = new FormGroup({
            file: new FormControl("", [Validators.required]),
        });
    }

    onLoadFile(event: any): void {

        this.result = undefined

        if (event.target.files && event.target.files[0] && event.target.files[0] !== undefined) {

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

            this.shareService.pushImage(event.target.files[0])
        }
    }

    submitFile(): void {
        if (this.file !== undefined && this.file !== null) {
            this.detectorService
                .getFileMimetype(this.file)
                .subscribe(this.observer);
        }
    }


    getSizeInMB(): number {

        return this.fileSize / 1_048_576;
    }


    navigateToFilters():void {

        

        if (this.file !== undefined && this.isValidImage(this.result?.extension)) {

            this.router.navigateByUrl("/filters")

        } else {
            throw new Error("error processing image");
            
        }
        

    }


    isValidImage(extension: string | undefined): boolean {

        const validExtensions = [".png", ".jpg", ".webp"];

        if (extension !== undefined) {
            if (validExtensions.some(str => extension === str)) {
                return true;
             }
        }
        

        return false;
    }
}

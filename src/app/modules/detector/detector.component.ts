import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observer } from "rxjs";
import { DetectorService } from "src/app/core/http/detector/detector.service";
import { detectorResultI } from "src/app/utils/interfaces/detectorResult.inteface";

@Component({
    selector: "app-detector",
    templateUrl: "./detector.component.html",
    styleUrls: ["./detector.component.scss"],
})
export class DetectorComponent implements OnInit {
    fileSize: string | number = "";

    file: File | undefined;

    result: detectorResultI | undefined = undefined;

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
            console.log("completed");
        },
    };

    constructor(private detectorService: DetectorService) {}

    ngOnInit(): void {
        this.detectorForm = new FormGroup({
            file: new FormControl("", [Validators.required]),
        });
    }

    onLoadFile(event: any): void {
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files);

            console.log(event.target.files[0].name);

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
        if (this.file !== undefined && this.file !== null) {
            this.detectorService
                .getFileMimetype(this.file)
                .subscribe(this.observer);
        }

        console.log(this.file)
    }
}

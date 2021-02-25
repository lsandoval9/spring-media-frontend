import { Component, OnInit, EventEmitter } from "@angular/core";
import { API_ROUTES } from "src/app/utils/constants/requestImageRoutes";

import {
    ReplaceTexts,
    AngularFileUploaderConfig,
    UploadInfo,
} from "angular-file-uploader/lib/angular-file-uploader.types";
import { MatRadioChange } from "@angular/material/radio";

@Component({
    selector: "app-images-filters",
    templateUrl: "./images-filters.component.html",
    styleUrls: ["./images-filters.component.scss"],
})
export class ImagesFiltersComponent implements OnInit {

    selectedValue = "";

    imageAsSrc: string | ArrayBuffer | null = "";

    resultImage: string | undefined;

    resultImageAsBlob : Blob | undefined

    file: File | undefined;

    url: string | ArrayBuffer | null = "";

    constructor() {}

    ngOnInit(): void {}

    DocUpload = ($event: unknown): void => {
        console.log($event);
    };

    public addFile(event: any): void {
        if (event.target.files && event.target.files[0] && event !== null) {
            const reader = new FileReader();

            reader.onload = (event: Event) => {
                this.url = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    public setSrc(src: any): void {
        this.url = src;
    }

    public addImage(event: any): void {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            this.file = event.target.files[0];

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (event) => {
                // called once readAsDataURL is completed

                if (event?.target === null) {
                    throw new Error("bad image");
                }

                this.imageAsSrc = event?.target.result;
            };
        }
    }

    changeRadioValue = (event: MatRadioChange): void => {
        this.selectedValue = event.value;

        console.log(this.selectedValue);
    };

    showResultImage(event: Blob): void {
        this.resultImageAsBlob = event;
        const imageUrl = URL.createObjectURL(event);
        this.resultImage = imageUrl;
    }

    randomFileName(): string {
        
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          })+ ".png";

    }
}

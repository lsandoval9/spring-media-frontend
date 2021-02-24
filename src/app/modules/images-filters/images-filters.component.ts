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
    imageFilterRoute = API_ROUTES.HOST + API_ROUTES.IMAGE_FILTER;

    selectedValue = "";

    message = "";

    imagePath = "";

    imageAsSrc: string | ArrayBuffer | null = "";

    url: string | ArrayBuffer | null = "";

    constructor() {}

    ngOnInit(): void {
        this.imageFilterRoute = API_ROUTES.HOST + API_ROUTES.IMAGE_FILTER;
    }

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
        
        if (event?.target.files && event?.target.files[0] && event !== null) {
            const reader = new FileReader();

            reader.onload = () => {
                this.imageAsSrc = reader.result;
                console.log(this.imageAsSrc)
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    changeRadioValue = (event: MatRadioChange): void => {
        this.selectedValue = event.value;

        console.log(this.selectedValue);
    };
}

import { Component, OnInit } from "@angular/core";
import { API_ROUTES } from "src/app/utils/constants/requestRoutes";

import {
    ReplaceTexts,
    AngularFileUploaderConfig,
    UploadInfo,
} from "angular-file-uploader/lib/angular-file-uploader.types";

@Component({
    selector: "app-images-filters",
    templateUrl: "./images-filters.component.html",
    styleUrls: ["./images-filters.component.scss"],
})
export class ImagesFiltersComponent implements OnInit {
    imageFilterRoute = API_ROUTES.HOST + API_ROUTES.IMAGE_FILTER;

    afuConfig: AngularFileUploaderConfig = {
        multiple: false,
        formatsAllowed: ".jpg,.png,.jpeg",
        maxSize: 10,
        uploadAPI: {
            url: this.imageFilterRoute,
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=UTF-8",
                Authorization: `Bearer 2`,
            },
            params: {
                page: "1",
            },
            responseType: "blob",
        },
        theme: "attachPin",
        hideProgressBar: false,
        hideResetBtn: true,
        hideSelectBtn: true,
        fileNameIndex: true,
        replaceTexts: {
            selectFileBtn: "Select Files",
            resetBtn: "Reset",
            uploadBtn: "Upload",
            dragNDropBox: "Drag N Drop",
            attachPinBtn: "Attach Files...",
            afterUploadMsg_success: "Successfully Uploaded !",
            afterUploadMsg_error: "Upload Failed !",
            sizeLimit: "Size Limit",
        },
    };

    constructor() {}

    ngOnInit(): void {
        this.imageFilterRoute = API_ROUTES.HOST + API_ROUTES.IMAGE_FILTER;
    }

    DocUpload = ($event: any): void => {
        console.log($event);
    };
}

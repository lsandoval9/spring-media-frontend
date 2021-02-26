import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

import { MatRadioChange } from "@angular/material/radio";

@Component({
    selector: "app-images-filters",
    templateUrl: "./images-filters.component.html",
    styleUrls: ["./images-filters.component.scss"],
})
export class ImagesFiltersComponent implements OnInit {
    selectedValue = "";

    selectedFilterValue = "";

    downloadSrc = "";

    imageAsSrc: string | ArrayBuffer | null = "";

    resultImage: string | undefined;

    resultImageAsBlob: Blob | undefined;

    file: File | undefined;

    url: string | ArrayBuffer | null = "";

    constructor(private detector: ChangeDetectorRef) {}

    ngOnInit(): void {}

    public addFile(event: any): void {
        if (event.target.files && event.target.files[0] && event !== null) {
            const reader = new FileReader();

            reader.onload = (event: Event) => {
                this.url = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    public addImage(event: any): void {

        this.resultImage= "";

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
    };

    showResultImage(event: Blob): void {
        this.resultImageAsBlob = event;
        const imageUrl = URL.createObjectURL(event);
        this.resultImage = imageUrl;
        this.randomFileName();
    }

    randomFileName(): void {
        this.downloadSrc =
            "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                /[xy]/g,
                function (c) {
                    const r = (Math.random() * 16) | 0,
                        v = c == "x" ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                }
            ) + ".png";

        this.detector.detectChanges();
    }

    changeSelectedFilterValue(event: string): void {

        console.log(event);

        this.selectedFilterValue = event;
    }
}

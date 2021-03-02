import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

import { MatRadioChange } from "@angular/material/radio";
import { Observer, ReplaySubject } from "rxjs";
import { ShareImageService } from "src/app/core/services/share-image/share-image.service";

@Component({
    selector: "app-images-filters",
    templateUrl: "./images-filters.component.html",
    styleUrls: ["./images-filters.component.scss"],
})
export class ImagesFiltersComponent implements OnInit, OnInit {
    selectedValue = "";

    selectedFilterValue = "";

    downloadSrc = "";

    imageAsSrc: string | ArrayBuffer | null = "";

    resultImage: string | undefined;

    resultImageAsBlob: Blob | undefined;

    file: File | undefined;

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
        private detector: ChangeDetectorRef,
        private imageService: ShareImageService
    ) {
        this.imageSubject = this.imageService.getImage();

        this.imageSubject.subscribe(this.imageObserver);
    }

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

                this.imageAsSrc = event?.target.result;
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

                this.imageAsSrc = event?.target.result;
            };
        }
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

        this.detector.detectChanges();
    }

    changeSelectedFilterValue(event: string): void {
        this.selectedFilterValue = event;
    }

    /* changeExtension(file: File, extension: string): string {
        const basename = path.basename(file, path.extname(file))
        return path.join(path.dirname(file), basename + extension)
      } */
}

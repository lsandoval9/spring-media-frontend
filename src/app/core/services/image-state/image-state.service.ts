import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";
import { frequentErrors } from "src/app/utils/constants/frequentErrors";
import { errorMessageDataI } from "src/app/utils/interfaces/errorMessageData.interface";
import { ImageI } from "src/app/utils/interfaces/image/image.interface";
import { ImageFilterApiParams } from "src/app/utils/interfaces/image/imageFilterApiParams";


/**
 * 
 * @service
 * 
 * @var originalImageSubject
 */
@Injectable({
    providedIn: "root",
})
export class ImageStateService {

    originalImageSubject = new ReplaySubject<ImageI>();

    resultImageSubject = new Subject<ImageFilterApiParams|undefined>();

    isOriginalImageToggledSubject = new BehaviorSubject<boolean>(true);

    originalFileName = new BehaviorSubject<string>("");

    errorData = new BehaviorSubject<errorMessageDataI | undefined>(
        frequentErrors.selectImage
    );

    SelectedFilter = new BehaviorSubject<string>("negative");

    constructor() {}

    resetImageValues() {

        this.isOriginalImageToggledSubject.next(true);

        this.resultImageSubject.next(undefined);

    }
}

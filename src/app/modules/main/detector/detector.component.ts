import { HttpErrorResponse } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, Observer, Subject } from "rxjs";
import { DetectorService } from "src/app/core/http/detector/detector.service";
import { ShareImageService } from "src/app/core/services/share-image/share-image.service";
import { ShowErrorDialogService } from "src/app/core/services/show-error-dialog/show-error-dialog.service";
import { ToggleLoadingBarService } from "src/app/core/services/toggle-loading-bar/toggle-loading-bar.service";
import { fileDataI } from "src/app/utils/interfaces/detector/fileData";
import { detectorResultI } from "src/app/utils/interfaces/detectorResult.inteface";
import { errorMessageDataI } from "src/app/utils/interfaces/errorMessageData.interface";

@Component({
    selector: "app-detector",
    templateUrl: "./detector.component.html",
    styleUrls: ["./detector.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetectorComponent implements OnInit {


    // OBSERVABLES
    fileData$ = new BehaviorSubject<fileDataI|undefined>(undefined);
    result$ = new BehaviorSubject<detectorResultI|undefined>(undefined);
    file$ = new Subject<File>();

    // PROPERTIES

    

    detectorForm!: FormGroup;

    errors = 0;

    

    constructor(
        public detectorService: DetectorService,
        private shareService: ShareImageService,
        private loadingService: ToggleLoadingBarService,
        private errorDialogService: ShowErrorDialogService
    ) {}

    ngOnInit(): void {
        
    }

    

    setFile(value: File) {

        this.file$.next(value);

    }

    setResult(value: detectorResultI) {

        this.result$.next(value);

    }
}

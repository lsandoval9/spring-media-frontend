import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BehaviorSubject, Observer, ReplaySubject, Subject } from "rxjs";
import { DetectorService } from "src/app/core/http/detector/detector.service";
import { fileDataI } from "src/app/utils/interfaces/detector/fileData";
import { detectorResultI } from "src/app/utils/interfaces/detectorResult.inteface";

@Component({
    selector: "app-detector",
    templateUrl: "./detector.component.html",
    styleUrls: ["./detector.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetectorComponent {
    // OBSERVABLES
    fileData$ = new BehaviorSubject<fileDataI | undefined>(undefined);
    result$ = new BehaviorSubject<detectorResultI | undefined>(undefined);
    file$ = new ReplaySubject<File>();

    // PROPERTIES

    detectorForm!: FormGroup;

    errors = 0;

    constructor(public detectorService: DetectorService) {}

    setFile(value: File) {
        this.file$.next(value);
    }

    setResult(value: detectorResultI) {
        this.result$.next(value);
    }
}

import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import { DetectorService } from 'src/app/core/http/detector/detector.service';
import { ShowErrorDialogService } from 'src/app/core/services/show-error-dialog/show-error-dialog.service';
import { ToggleLoadingBarService } from 'src/app/core/services/toggle-loading-bar/toggle-loading-bar.service';
import { detectorResultI } from 'src/app/utils/interfaces/detectorResult.inteface';
import { errorMessageDataI } from 'src/app/utils/interfaces/errorMessageData.interface';

@Component({
  selector: 'app-detector-card',
  templateUrl: './detector-card-form.component.html',
  styleUrls: ['./detector-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetectorCardFormComponent implements OnInit {

    // INPUTS
    file: File|null|undefined;
    filename: string|null|undefined;
    fileDate: string|null|undefined;
    fileType: string|null|undefined;
    fileSize: number|null|undefined;
    @Output() resultEmitter: EventEmitter<detectorResultI> = new EventEmitter();
    @Output() fileEmitter: EventEmitter<File> = new EventEmitter();

    private resultObserver: Observer<detectorResultI> = {
        next: (result: detectorResultI) => {
            this.loadingService.setNextValue(false);

            this.resultEmitter.emit(result);
        },
        error: (err: errorMessageDataI) => {
            this.loadingService.setNextValue(false);
            console.error(err);
            this.errorDialogService.openDialog(err);
        },
        complete: () => {
            this.loadingService.setNextValue(false);
        },
    };

    detectorForm!: FormGroup;

    

  constructor(private loadingService: ToggleLoadingBarService,
    private detectorService: DetectorService,
    private errorDialogService: ShowErrorDialogService) { }

  ngOnInit(): void {
    this.detectorForm = new FormGroup({
        file: new FormControl("", [Validators.required]),
    });
  }

  onLoadFile(event: any): void {

    this.resultEmitter.emit(undefined);

    if (
        event.target.files &&
        event.target.files[0] &&
        event.target.files[0] !== undefined
    ) {
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

        if (this.file) {
            this.fileEmitter.emit(this.file);
        }
        
    }
}

  submitFile(): void {
    this.loadingService.setNextValue(true);

    if (this.file !== undefined && this.file !== null) {
        this.detectorService
            .getFileMimetype(this.file)
            .subscribe(this.resultObserver);
    }
}

}

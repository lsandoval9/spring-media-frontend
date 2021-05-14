import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observer, Subject } from 'rxjs';
import { DetectorService } from 'src/app/core/http/detector/detector.service';
import { ShowErrorDialogService } from 'src/app/core/services/show-error-dialog/show-error-dialog.service';
import { ToggleLoadingBarService } from 'src/app/core/services/toggle-loading-bar/toggle-loading-bar.service';
import { fileDataI } from 'src/app/utils/interfaces/detector/fileData';
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
    fileData = new BehaviorSubject<fileDataI|undefined>(undefined);
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
        event.target?.files &&
        event.target?.files[0]
    ) {

        console.log(event.target?.files[0])

        this.fileData.next({

            fileDate: event.target.files[0].lastModifiedDate?? "",
            fileName: event.target.files[0].name?? "",
            fileSize: event.target.files[0].size?? "",
            fileType: event.target.files[0].type?? "",
            file: event.target.files[0]
        })

        this.file = event.target.files[0];

        if (this.file) {
            this.fileEmitter.emit(this.file);
        }
        
    }
}

  submitFile(): void {

    this.loadingService.setNextValue(true);



    if (this.file) {

        this.detectorService
            .getFileMimetype(this.file)
            .subscribe(this.resultObserver);
    }
}

}

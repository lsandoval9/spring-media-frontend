import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    ChangeDetectorRef,
} from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { Observer } from "rxjs";
import { imageService } from "src/app/core/http/image/image.service";
import { ShowErrorDialogService } from "src/app/core/services/show-error-dialog/show-error-dialog.service";
import { ToggleLoadingBarService } from "src/app/core/services/toggle-loading-bar/toggle-loading-bar.service";
import { ImageI } from "src/app/utils/interfaces/image/image.interface";

@Component({
    selector: "app-common-form",
    templateUrl: "./common-form.component.html",
    styleUrls: ["./common-form.component.scss"],
})
export class CommonFormComponent implements OnInit {
    @Input() file: any = null;

    @Output()
    outputSelectedValue: EventEmitter<string> = new EventEmitter<string>();

    @Output() resultImage: EventEmitter<Blob> = new EventEmitter<Blob>();

    image: Blob | any;

    selectedValue: string | undefined;

    imageForm!: FormGroup;

    negative = "false";

    errors = false;

    imageObserver: Observer<any> = {
        next: (value: Blob) => {
            this.errors = false;
            
            this.toggleLoadBarService.setNextValue(false);

            this.resultImage.emit(value);
        },
        error: (err: any) => {
            this.errors = true;
            this.toggleLoadBarService.setNextValue(false);
            this.errorDialogService.openDialog(err.error);
        },
        complete: () => {
            this.toggleLoadBarService.setNextValue(false);
            this.errors = false;
        },
    };

    constructor(
        private imageService: imageService,
        private detector: ChangeDetectorRef,
        private toggleLoadBarService: ToggleLoadingBarService,
        private errorDialogService: ShowErrorDialogService
    ) {}

    ngOnInit(): void {
        this.imageForm = new FormGroup({
            filter: new FormControl("", [Validators.required]),
            negative: new FormControl("false", Validators.required),
        });
    }

    changeRadioValue = (): void => {
        this.selectedValue = this.imageForm.value["filter"];
        this.outputSelectedValue.emit(this.imageForm.value["filter"]);
        this.detector.detectChanges();
    };

    onSubmit = (): void => {

        let custom = {
            form: this.imageForm.value,
        }

        if (this.imageForm.valid) {
            const reader = new FileReader();

            if (this.file) {
                this.image = this.file;
                reader.readAsDataURL(this.image);
            }

            const result: ImageI = {
                file: this.image,
                ...this.imageForm.value,
            };
            this.toggleLoadBarService.setNextValue(true);

            this.imageService
                .fetchCommonFilterImage(result)
                .subscribe(this.imageObserver);
        }
    };
}

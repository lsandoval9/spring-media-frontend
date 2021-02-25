import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    AfterViewInit,
    Input,
} from "@angular/core";
import {
    FormBuilder,
    Validators,
    FormGroup,
    FormControl,
} from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";
import { DomSanitizer } from "@angular/platform-browser";
import { Observer } from "rxjs";
import { imageService } from "src/app/core/http/image/image.service";
import { API_ROUTES } from "src/app/utils/constants/requestImageRoutes";
import { ImageI } from "src/app/utils/interfaces/image.interface";

@Component({
    selector: "app-basic-form",
    templateUrl: "./basic-form.component.html",
    styleUrls: ["./form.component.scss"],
})
export class BasicFormComponent implements OnInit, AfterViewInit {
    @Input() file: any = null;

    image: Blob | any;

    selectedValue: string | undefined;

    imageForm!: FormGroup;

    @Output() resultImage: EventEmitter<Blob> = new EventEmitter<Blob>();

    errors = false;

    observer: Observer<any> = {
        next: (value: any) => {
            console.log("next" + value);

            this.errors = false;

            this.resultImage.emit(value);
        },
        error: (err: any) => {
            this.errors = true;
            console.log(err);
        },
        complete: () => {
            this.errors = false;
            console.log("complete");
        },
    };

    constructor(
        private imageService: imageService,
        private readonly sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.imageForm = new FormGroup({
            filter: new FormControl("", [Validators.required]),
        });
    }

    ngAfterViewInit(): void {}

    createFormGroup(): void {}

    changeRadioValue = (event: MatRadioChange): void => {
        this.selectedValue = event.value;
    };

    onSubmit = (): void => {

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

            this.imageService
                .fetchBasicFilterformData(result)
                .subscribe(this.observer);
            console.log("subscribed");
        }
    };
}

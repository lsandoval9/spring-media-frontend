import { HttpClient } from "@angular/common/http";
import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    AfterViewInit,
} from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";
import { ImageService } from "src/app/core/http/image/image.service";
import { API_ROUTES } from "src/app/utils/constants/requestImageRoutes";

@Component({
    selector: "app-basic-form",
    templateUrl: "./basic-form.component.html",
    styleUrls: ["./form.component.scss"],
})
export class BasicFormComponent implements OnInit, AfterViewInit {
    @Output() imageAsSrc: EventEmitter<
        string | ArrayBuffer | null
    > = new EventEmitter<string | ArrayBuffer | null>();

    selectedValue: string | undefined;

    imageForm!: FormGroup;

    constructor(private imageService: ImageService, private formBuilder: FormBuilder) {

        this.imageForm = this.formBuilder.group({

            file: ["", Validators.required]

        });

    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {}

    

    changeRadioValue = (event: MatRadioChange): void => {
        this.selectedValue = event.value;
    };

    onSubmit = (values: any): void => {
        const result = "";

        console.log(values);
    };
}

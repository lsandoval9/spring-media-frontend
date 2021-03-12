import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { buffer, debounceTime, filter, map } from "rxjs/operators";
import { ShowImageDialogService } from "src/app/core/services/show-image-dialog/show-image-dialog.service";
import { images } from "./images";
import { imageDialogI } from "../../../utils/interfaces/home/imageDialog.interface";
import { StepperSelectionEvent } from "@angular/cdk/stepper";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, AfterViewInit {
    images = images;

    isOpen = true;

    touchtime = 0;


    constructor(
        private route: ActivatedRoute,
        private imageDialogService: ShowImageDialogService,
        private router: Router,
    ) {}
    ngOnInit(): void {
    }
    ngAfterViewInit(): void {
    }

    showImage(path: imageDialogI): void {
        this.imageDialogService.openDialog(path);
    }

    navigateTo(value: StepperSelectionEvent): void {
        console.log(value);

        switch (value.selectedIndex) {
            case 0: console.log("Ok");break;

            case 1:
                break;

            case 2:
                break;
        }
    }


    testing(event: any):void {

        console.log(event)

        console.log("IN VIEW")

    }
}

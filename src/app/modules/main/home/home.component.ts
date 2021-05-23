import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from "@angular/core";
import { Router } from "@angular/router";
import { fromEvent } from "rxjs";
import { ShowImageDialogService } from "src/app/core/services/show-image-dialog/show-image-dialog.service";
import { images } from "./images";
import { imageDialogI } from "../../../utils/interfaces/home/imageDialog.interface";
import { MatStep, MatVerticalStepper } from "@angular/material/stepper";
import { ViewportScroller } from "@angular/common";
import { sections } from "./sections";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, AfterViewInit {
    images = images;

    isOpen = true;

    stepperSections!: NodeListOf<HTMLElement>;

    faLinkIcon: IconDefinition = faLink;

    @ViewChild("stepper") verticalStepper!: MatVerticalStepper;

    @ViewChildren("step") steps!: QueryList<MatStep>;

    @ViewChild("intro") introHeader!: ElementRef<HTMLElement>;

    constructor(
        private elRef: ElementRef,
        private imageDialogService: ShowImageDialogService,
        private router: Router,
    ) {}
    ngOnInit(): void {}
    ngAfterViewInit(): void {
        
    }

    showImage(path: imageDialogI): void {
        this.imageDialogService.openDialog(path);
    }

    changeOnView(value: { target: any; visible: any }): void {
        
        let currentIndex = value.target.getAttribute("index");

        this.steps.forEach((step, index) => {

            if (currentIndex == index && !value.visible) {
                step.select();
                step.completed = true;
            } else {

                step.completed = false;

            }
        });
    }
}

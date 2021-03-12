import {
    AfterViewInit,
    Component,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { BehaviorSubject, fromEvent, Subject } from "rxjs";
import { buffer, debounceTime, filter, map } from "rxjs/operators";
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

    constructor(
        private route: ActivatedRoute,
        private imageDialogService: ShowImageDialogService,
        private router: Router,
        private scroller: ViewportScroller
    ) {}
    ngOnInit(): void {}
    ngAfterViewInit(): void {
        console.log(this.steps);

        this.stepperSections = document.querySelectorAll("mat-step-header");
        if (this.stepperSections) {
            this.stepperSections.forEach((section, index) => {
                fromEvent(section, "click").subscribe((x) => {
                    this.scroller.scrollToAnchor(sections[index]);
                });
            });
        }
    }

    showImage(path: imageDialogI): void {
        this.imageDialogService.openDialog(path);
    }

    changeOnView(value: { target: any; visible: any }): void {
        let currentIndex = value.target.getAttribute("index");

        this.steps.forEach((step, index) => {
            step.completed = false;

            if (currentIndex == index && value.visible) {
                step.select();
                step.completed = true;
            }
        });
    }
}

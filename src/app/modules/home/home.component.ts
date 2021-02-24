import { Component, OnInit } from "@angular/core";

import {
    trigger,
    transition,
    state,
    style,
    animate,
    keyframes,
} from "@angular/animations";
import { testAnimation } from "./animations/test";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    animations: testAnimation,
})
export class HomeComponent implements OnInit {
    isOpen = true;

    constructor() {}

    ngOnInit(): void {}
}

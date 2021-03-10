import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import {images} from "./images";


@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

    images = images;

    isOpen = true;

    touchtime = 0;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.data.subscribe(
            {
                next: (data: Data) => {console.log(data)},
            },
        );
    }

    showImage(path: string):void {

        if (this.touchtime == 0) {
            // set first click
            this.touchtime = new Date().getTime();
        } else {
            // compare first click to this click and see if they occurred within double click threshold
            if (((new Date().getTime()) - this.touchtime) < 1500) {
                // double click occurred
                 
                alert("double click")

                this.touchtime = 0;
            } else {
                // not a double click so set as a new first click
                this.touchtime = new Date().getTime();
            }
        }

    }
}

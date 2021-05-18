import { Component, OnInit } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { RouterOutlet } from "@angular/router";
import { environment } from "src/environments/environment";
import { sliderAnimation } from "./routing-animation";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    animations: [
        sliderAnimation
    ],
})
export class AppComponent implements OnInit {
    
    title = "spring-media-front";

    ngOnInit(): void {
    }

    toggleLoader = (): void => {};

    // TOGGLE HEADER DRAWER
    toggleDrawer(drawer: MatDrawer, isOpened: boolean): void {
        if (isOpened) {
            drawer.toggle();
        }
    }

    prepareRoute(outlet: RouterOutlet): any {

        if (outlet && outlet.activatedRouteData) return outlet.activatedRouteData.animation;
    }
}

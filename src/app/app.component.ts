import { Component, OnInit } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { RouterOutlet } from "@angular/router";
import { sliderAnimation } from "./routing-animation";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    animations: [sliderAnimation],
})
export class AppComponent implements OnInit {
    title = "spring-media-front";

    ngOnInit(): void {}

    toggleLoader = (): void => {};

    /**
     *
     * @param drawer as
     * @param isOpened as
     *
     * toggleDrawer
     */
    toggleDrawer(drawer: MatDrawer, isOpened: boolean): void {
        if (isOpened) {
            drawer.close();
        }
    }

    prepareRoute(outlet: RouterOutlet): any {
        if (outlet && outlet.activatedRouteData)
            return outlet.activatedRouteData.animation;
    }
}

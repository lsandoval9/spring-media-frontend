import { Component, OnInit } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    animations: [],
})
export class AppComponent implements OnInit {
    
    title = "spring-media-front";

    ngOnInit(): void {}

    toggleLoader = (): void => {};

    // TOGGLE HEADER DRAWER
    toggleDrawer(drawer: MatDrawer, isOpened: boolean): void {
        if (isOpened) {
            drawer.toggle();
        }
    }
}

import { AfterViewInit, Component, OnInit } from "@angular/core";
import { interval } from "rxjs";
import { loaderAnimation } from "./core/animations/loader";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    animations: [loaderAnimation],
})
export class AppComponent implements OnInit {
    isLoaderOn = false;

    title = "spring-media-front";

    ngOnInit(): void {

        this.isLoaderOn = true
        
        setTimeout(() => {
            
            this.isLoaderOn = !this.isLoaderOn;
            console.log("WORKS");
        }, 5);

    }

    toggleLoader = (): void => {
        
    };
}

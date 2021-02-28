import {  Component, OnInit } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    animations: [],
})
export class AppComponent implements OnInit {

    title = "spring-media-front";

    ngOnInit(): void {

           
    }

    toggleLoader = (): void => {
        
    };
}

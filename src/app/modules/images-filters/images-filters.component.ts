import { Component, OnInit } from "@angular/core";
import { API_ROUTES } from "src/app/utils/constants/requestRoutes";

@Component({
    selector: "app-images-filters",
    templateUrl: "./images-filters.component.html",
    styleUrls: ["./images-filters.component.scss"],
})
export class ImagesFiltersComponent implements OnInit {
    imageFilterRoute = "";

    constructor() {}

    ngOnInit(): void {
        this.imageFilterRoute = API_ROUTES.HOST +  API_ROUTES.IMAGE_FILTER;
    }
}

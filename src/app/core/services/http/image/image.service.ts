import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ROUTES } from "src/app/utils/constants/requestImageRoutes";

@Injectable({
    providedIn: "root",
})
export class ImageService {

    imageFilterRoute = API_ROUTES.HOST + API_ROUTES.IMAGE_FILTER + "grayscale";

    constructor(private http: HttpClient) {}

    grayscaleFilter(image: any): void {

        this.http.post(this.imageFilterRoute, {

            file: ""

        })

    }
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_ROUTES } from "src/app/utils/constants/requestImageRoutes";
import { ImageI } from "src/app/utils/interfaces/image.interface";

@Injectable({
    providedIn: "root",
})
export class imageService {
    constructor(private http: HttpClient) {}

    fetchBasicFilterformData(formData: ImageI): Observable<unknown> {
        const form: FormData = new FormData();

        console.log(formData.filter)

        form.append("file", formData.file, "file");

        const headers = new Headers();
        /** In Angular 5, including the header Content-Type can invalidate your request */
        headers.append("Content-Type", "multipart/form-data");
        headers.append("Accept", "application/json");

        if (formData.filter === "ascii-text") {
            
            const observable = this.http.post(
                API_ROUTES.IMAGE_FILTER + formData.filter,
                form,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Accept": ["image/png", "image/jpg", "image/webp"],
                        "Access-Control-Allow-Methods":
                            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                        "Access-Control-Allow-Headers":
                            "Origin, Content-Type, X-Auth-Token",
                    },
                    responseType: 'blob'
                }
            );

            return observable;

        } else {
            const observable = this.http.post(
                API_ROUTES.IMAGE_FILTER + formData.filter,
                form,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Accept": ["image/png", "image/jpg", "image/webp"],
                        "Access-Control-Allow-Methods":
                            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                        "Access-Control-Allow-Headers":
                            "Origin, Content-Type, X-Auth-Token",
                    },
                    responseType: 'blob'
                }
            );

            return observable;
        }
    }
}

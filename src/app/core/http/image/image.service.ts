import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { API_ROUTES } from "src/app/utils/constants/requestImageRoutes";
import { ImageI } from "src/app/utils/interfaces/image/image.interface";
import { ImageFilterApiParams } from "src/app/utils/interfaces/image/imageFilterApiParams";
import { ToggleLoadingBarService } from "../../services/toggle-loading-bar/toggle-loading-bar.service";

@Injectable({
    providedIn: "root",
})
export class imageApiService {
    constructor(private http: HttpClient, private loadingService: ToggleLoadingBarService) {}

    fetchCommonFilterImage(imageAPiParams: ImageFilterApiParams): Observable<Blob> {

        const form: FormData = new FormData();

        console.log(imageAPiParams)

        if (imageAPiParams.file) {
            form.append("file", imageAPiParams.file, "file");
            form.append("negative", "false");
        } else {
            return EMPTY;
        }

        this.loadingService.setNextValue(true);
        
        const headers = new Headers();
        /** In Angular 5, including the header Content-Type can invalidate your request */
        headers.append("Content-Type", "multipart/form-data");
        headers.append("Accept", "application/json");

        const observable = this.http.post(
            API_ROUTES.IMAGE_FILTER + imageAPiParams.filter,
            form,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Accept: ["image/png", "image/jpg", "image/webp", "image/jpeg"],
                    "Access-Control-Allow-Methods":
                        "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers":
                        "Origin, Content-Type, X-Auth-Token",
                },
                responseType: "blob",
            }
        ).pipe(
            tap(() => this.loadingService.setNextValue(false)),
            catchError(err => {
                this.loadingService.setNextValue(false);
                return EMPTY;
            })
        )

        return observable;
    }
}

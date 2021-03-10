import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_ROUTES } from "src/app/utils/constants/requestImageRoutes";
import { detectorResultI } from "src/app/utils/interfaces/detectorResult.inteface";

@Injectable({
    providedIn: "root",
})
export class DetectorService {
    route = API_ROUTES.HOST + API_ROUTES.FILTERS + API_ROUTES.DETECT;

    constructor(private http: HttpClient) {}

    getFileMimetype(file: File): Observable<detectorResultI> {
        const formData = new FormData();

        formData.append("file", file);

        return this.http.post<detectorResultI>(this.route, formData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "*/*",
                "Access-Control-Allow-Methods":
                    "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers":
                    "Origin, Content-Type, X-Auth-Token",
            },
        });
    }

    setImageExtension(result: detectorResultI | undefined, file: File): File {
        const validExtensions = [
            ".jpg",
            ".png",
            ".webp",
            "image/png",
            "image/jpeg",
            "image/webp",
        ];

        if (result?.extension) {
            if (
                validExtensions.some((str) => result?.extension === str) &&
                file !== undefined
            ) {
                return new File([file], file.name + ".png", {
                    type: "image/png",
                });
            }
        }

        return new File([file], file.name, {
            type: "image/png",
        });
    }

    isValidTypeOrMimetype(extension?: string, file?: File, ): boolean {

        if (file && !extension) {
            extension = file.type;
        }

        const validExtensions = [
            ".jpg",
            ".png",
            ".webp",
            "image/png",
            "image/jpeg",
            "image/webp",
        ];

        if (extension) {
            if (validExtensions.some((str) => extension === str)) {
                return true;
            }
        }

        return false;
    }
}

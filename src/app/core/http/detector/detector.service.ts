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
}

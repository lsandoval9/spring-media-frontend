import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ShareImageService {

    private fileSubject = new ReplaySubject<File>();

    constructor() {}

    pushImage(file: File): void {

        this.fileSubject.next(file)

        
    }

    getImageObservable(): Observable<File> {

        return this.fileSubject.asObservable();

    }

}

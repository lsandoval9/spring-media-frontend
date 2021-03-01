import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ShareImageService {

    private fileSubject = new ReplaySubject<File>();

    constructor() {}

    pushImage(file: File): void {

        this.fileSubject.next(file)
    }

    getImage(): ReplaySubject<File> {

        return this.fileSubject

    }

}

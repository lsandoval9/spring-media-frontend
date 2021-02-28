import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ShareImageService {

    private fileSubject = new ReplaySubject<File>();

    private file: File | undefined;

    constructor() {}

    pushImage(file: File): void {

        console.log("pushed")

        console.log(file)

        this.fileSubject.next(file)
    }

    getImage(): ReplaySubject<File> {

        console.log("getter")

        return this.fileSubject

    }

}

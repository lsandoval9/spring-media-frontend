import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ToggleLoadingBarService {
    private toggleLoadingBarSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    setNextValue(value: boolean): void {
        this.toggleLoadingBarSubject.next(value);
    }

    getObservable(): Observable<boolean> {
        return this.toggleLoadingBarSubject.asObservable();
    }
}

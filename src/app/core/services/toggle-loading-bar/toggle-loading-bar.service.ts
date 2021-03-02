import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ToggleLoadingBarService {
    private toggleLoadingBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    private currentValue!: boolean;

    constructor() {
        this.toggleLoadingBar.subscribe(
            (value: boolean) => (this.currentValue = value)
        );
    }

    setNextValue(value: boolean): void {
        this.toggleLoadingBar.next(value);
    }

    getSubject(): BehaviorSubject<boolean> {
        return this.toggleLoadingBar;
    }

    getCurrentValue(): boolean {
        return this.currentValue;
    }
}

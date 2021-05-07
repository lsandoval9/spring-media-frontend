import { Component, Input, OnInit, Output, ViewChildren, EventEmitter } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Component({
    selector: "app-filter-form",
    templateUrl: "./filter-form.component.html",
    styleUrls: ["./filter-form.component.scss"],
})
export class FilterFormComponent implements OnInit {

    @Input() isOriginalImageToggled: any = true;

    @Output() changeImageStateEmitter: EventEmitter<void>= new EventEmitter()

    SelectedFilter= new Subject<string>();

    constructor() {}

    ngOnInit(): void {}

    toggleImage(): void {
        
        this.changeImageStateEmitter.emit();

    }

    changeSelectedFilter(event: MatSelectChange) {

        this.SelectedFilter.next(event.value);

    }
}

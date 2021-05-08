import { Component, Input, OnInit, Output, ViewChildren, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { frequentErrors } from "src/app/utils/constants/frequentErrors";
import { errorMessageDataI } from "src/app/utils/interfaces/errorMessageData.interface";

@Component({
    selector: "app-filter-form",
    templateUrl: "./filter-form.component.html",
    styleUrls: ["./filter-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterFormComponent implements OnInit {

    @Input() isOriginalImageToggled: any = true;

    @Output() changeImageStateEmitter: EventEmitter<void>= new EventEmitter()

    SelectedFilter= new BehaviorSubject<string>("negative");

    constructor() {}

    ngOnInit(): void {}

    toggleImage(): void {
        
        this.changeImageStateEmitter.emit();

    }

    changeSelectedFilter(event: MatSelectChange) {

       this.SelectedFilter.next(event.value);

    }
}

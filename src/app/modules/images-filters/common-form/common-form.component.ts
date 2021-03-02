import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-common-form",
    templateUrl: "./common-form.component.html",
    styleUrls: ["./common-form.component.scss"],
})
export class CommonFormComponent implements OnInit {

    
    @Input() file: any;

    constructor() {}

    ngOnInit(): void {}
}

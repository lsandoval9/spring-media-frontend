import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-basic-form",
    templateUrl: "./basic-form.component.html",
    styleUrls: ["./basic-form.component.scss"],
})
export class BasicFormComponent implements OnInit {

    
    @Input() file: any;

    constructor() {}

    ngOnInit(): void {}
}

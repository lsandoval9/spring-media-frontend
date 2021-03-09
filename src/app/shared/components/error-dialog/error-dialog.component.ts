import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { faTimesCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-error-dialog",
    templateUrl: "./error-dialog.component.html",
    styleUrls: ["./error-dialog.component.scss"],
})
export class ErrorDialogComponent implements OnInit {

    closeIcon: IconDefinition = faTimesCircle;
    

    constructor(@Inject(MAT_DIALOG_DATA) public data: HttpErrorResponse, 
    public dialogRef: MatDialogRef<ErrorDialogComponent>) {}

    ngOnInit(): void {}

    closeDialog() {

        this.dialogRef.close();

    }

}

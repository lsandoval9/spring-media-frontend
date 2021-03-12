import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {imageDialogI} from "../../../utils/interfaces/home/imageDialog.interface"

@Component({
    selector: "app-image-dialog",
    templateUrl: "./image-dialog.component.html",
    styleUrls: ["./image-dialog.component.scss"],
})
export class ImageDialogComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: imageDialogI,
        public dialogRef: MatDialogRef<ImageDialogComponent>
    ) {}

    ngOnInit(): void {console.log(this.data)}

    closeDialog() {
        this.dialogRef.close();
    }
}

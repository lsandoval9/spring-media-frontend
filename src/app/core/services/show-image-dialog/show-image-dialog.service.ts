import { Injectable } from "@angular/core";
import {
    DialogPosition,
    MatDialog,
    MatDialogRef,
} from "@angular/material/dialog";
import { ImageDialogComponent } from "src/app/shared/components/image-dialog/image-dialog.component";
import { imageDialogI } from "src/app/utils/interfaces/home/imageDialog.interface";

@Injectable({
    providedIn: "root",
})
export class ShowImageDialogService {
    
    dialogRef: MatDialogRef<ImageDialogComponent, any> | undefined;

    private dialogPosition: DialogPosition = {
        top: "10%",
    };

    constructor(private matDialog: MatDialog) {}

    openDialog(data: imageDialogI): void {
        if (this.dialogRef) {
            this.dialogRef.close();
        }

        this.dialogRef = this.matDialog.open(ImageDialogComponent, {
            data,
            hasBackdrop: true,
            panelClass: "image-dialog"
        });
    }
}

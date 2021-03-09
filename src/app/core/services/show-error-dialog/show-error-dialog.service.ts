import { Injectable } from "@angular/core";
import { MatDialog, DialogPosition } from "@angular/material/dialog";
import { ErrorDialogComponent } from "src/app/shared/components/error-dialog/error-dialog.component";
import { errorDialogData } from "src/app/utils/interfaces/errorDialogData.interface";

@Injectable({
    providedIn: "root",
})
export class ShowErrorDialogService {

    dialogPosition: DialogPosition= {
        top: "10%"
    }

    constructor(public matDialog: MatDialog) {



    }

    openDialog(data: errorDialogData | any): void {
        const dialogRef = this.matDialog.open(ErrorDialogComponent, {

            width: "75%",
            data,
            panelClass: 'error-dialog',
            hasBackdrop: true

        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
    }
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// MATERIAL MODULES

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";

// ?FileUpload module

import { AngularFileUploaderModule } from "angular-file-uploader";

const COMPONENTS = [
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFileUploaderModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatToolbarModule,
    MatSelectModule,
    MatRadioModule,
];

@NgModule({
    declarations: [],
    imports: [CommonModule, COMPONENTS],
    exports: [COMPONENTS],
})
export class MaterialModule {}

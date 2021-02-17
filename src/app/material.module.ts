import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// MATERIAL MODULES

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

const COMPONENTS = [
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
];

@NgModule({
    declarations: [],
    imports: [CommonModule, COMPONENTS],
    exports: [COMPONENTS],
})
export class MaterialModule {}

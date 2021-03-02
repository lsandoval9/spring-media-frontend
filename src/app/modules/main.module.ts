import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { ImagesFiltersComponent } from "./images-filters/images-filters.component";
import { DetectorComponent } from "./detector/detector.component";
import { MaterialModule } from "../material/material.module";
import { BasicFormComponent } from "./images-filters/basic-form/basic-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonFormComponent } from "./images-filters/common-form/common-form.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { AboutComponent } from "./about/about.component";

@NgModule({
    declarations: [
        HomeComponent,
        ImagesFiltersComponent,
        DetectorComponent,
        BasicFormComponent,
        CommonFormComponent,
        AboutComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule,
    ],
    providers: [],
})
export class MainModule {}

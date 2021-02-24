import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { ImagesFiltersComponent } from "./images-filters/images-filters.component";
import { DetectorComponent } from "./detector/detector.component";
import { MaterialModule } from "../material/material.module";
import { AsciiFilterComponent } from "./ascii-filter/ascii-filter.component";
import { MoreComponent } from "./more/more.component";
import { BasicFormComponent } from "./images-filters/basic-form/basic-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonFormComponent } from './images-filters/common-form/common-form.component';

@NgModule({
    declarations: [
        HomeComponent,
        ImagesFiltersComponent,
        DetectorComponent,
        AsciiFilterComponent,
        MoreComponent,
        BasicFormComponent,
        CommonFormComponent,
    ],
    imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class MainModule {}

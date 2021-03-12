import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { ImagesFiltersComponent } from "./images-filters/images-filters.component";
import { DetectorComponent } from "./detector/detector.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { BasicFormComponent } from "./images-filters/basic-form/basic-form.component";
import { CommonFormComponent } from "./images-filters/common-form/common-form.component";
import { MaterialModule } from "src/app/material/material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { IvyCarouselModule } from "angular-responsive-carousel";
import { InViewportModule } from "ng-in-viewport";

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
        IvyCarouselModule,
        InViewportModule
    ],
    providers: [],
})
export class MainModule {}

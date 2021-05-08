import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { ImagesFiltersComponent } from "./images-filters/images-filters.component";
import { DetectorComponent } from "./detector/detector.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { MaterialModule } from "src/app/material/material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { IvyCarouselModule } from "angular-responsive-carousel";
import { InViewportModule } from "ng-in-viewport";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FilterFormComponent } from './images-filters/filter-form/filter-form.component';
import { FilterImageComponent } from './images-filters/filter-image/filter-image.component';

@NgModule({
    declarations: [
        HomeComponent,
        ImagesFiltersComponent,
        DetectorComponent,
        AboutComponent,
        FilterFormComponent,
        FilterImageComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule,
        IvyCarouselModule,
        InViewportModule,
        FontAwesomeModule,
        FormsModule
    ],
    providers: [],
})
export class MainModule {}

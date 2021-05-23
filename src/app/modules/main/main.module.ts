import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { ImagesFiltersComponent } from "./image-filters/image-filters.component"
import { DetectorComponent } from "./detector/detector.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { MaterialModule } from "src/app/material/material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { IvyCarouselModule } from "angular-responsive-carousel";
import { InViewportModule } from "ng-in-viewport";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FilterFormComponent } from './image-filters/filter-form/filter-form.component';
import { FilterImageComponent } from './image-filters/filter-image/filter-image.component';
import { DetectorCardFormComponent } from './detector/detector-card-form/detector-card-form.component';
import { DetectorCardResultComponent } from './detector/detector-card-result/detector-card-result.component';

@NgModule({
    declarations: [
        HomeComponent,
        ImagesFiltersComponent,
        DetectorComponent,
        AboutComponent,
        FilterFormComponent,
        FilterImageComponent,
        DetectorCardFormComponent,
        DetectorCardResultComponent
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

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { ImagesFiltersComponent } from "./images-filters/images-filters.component";
import { DetectorComponent } from "./detector/detector.component";
import { MaterialModule } from "../material.module";
import { AsciiFilterComponent } from './ascii-filter/ascii-filter.component';
import { MoreComponent } from './more/more.component';

@NgModule({
    declarations: [
        HomeComponent,
        ImagesFiltersComponent,
        DetectorComponent,
        AsciiFilterComponent,
        MoreComponent,
    ],
    imports: [CommonModule, MaterialModule],
})
export class MainModule {}

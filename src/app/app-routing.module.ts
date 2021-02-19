import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AsciiFilterComponent } from "./modules/ascii-filter/ascii-filter.component";
import { DetectorComponent } from "./modules/detector/detector.component";
import { HomeComponent } from "./modules/home/home.component";
import { ImagesFiltersComponent } from "./modules/images-filters/images-filters.component";
import { MoreComponent } from "./modules/more/more.component";

const routes: Routes = [
    
    {
        path: "filters", component: ImagesFiltersComponent
    },
    {
        path: "detect", component: DetectorComponent
    },
    {
        path: "ascii", component: AsciiFilterComponent
    },
    {
        path: "about", component: MoreComponent
    },
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "**",
        redirectTo: "/",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

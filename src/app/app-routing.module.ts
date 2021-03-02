import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./modules/about/about.component";
import { DetectorComponent } from "./modules/detector/detector.component";
import { HomeComponent } from "./modules/home/home.component";
import { ImagesFiltersComponent } from "./modules/images-filters/images-filters.component";

const routes: Routes = [
    
    {
        path: "filters", component: ImagesFiltersComponent
    },
    {
        path: "detect", component: DetectorComponent
    },
    {
        path: "about", component: AboutComponent
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

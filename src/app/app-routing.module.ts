import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./modules/main/about/about.component";
import { DetectorComponent } from "./modules/main/detector/detector.component";
import { HomeComponent } from "./modules/main/home/home.component";
import { ImagesFiltersComponent } from "./modules/main/images-filters/images-filters.component";
import { ERRORS_ENUM } from "./utils/constants/errors";

const routes: Routes = [
    {
        path: "filters",
        component: ImagesFiltersComponent,
    },
    {
        path: "detect",
        component: DetectorComponent,
    },
    {
        path: "about",
        component: AboutComponent,
    },
    {
        path: "",
        component: HomeComponent,
        pathMatch: "full"
    },
    {
        path: "**",
        redirectTo: "",
        data: {errors: ERRORS_ENUM.NOT_FOUND_VIEW},
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

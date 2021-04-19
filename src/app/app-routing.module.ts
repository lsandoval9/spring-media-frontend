import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./modules/main/about/about.component";
import { DetectorComponent } from "./modules/main/detector/detector.component";
import { HomeComponent } from "./modules/main/home/home.component";
import { ImagesFiltersComponent } from "./modules/main/images-filters/images-filters.component";

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
    },
];
// hello
@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
})
export class AppRoutingModule {}

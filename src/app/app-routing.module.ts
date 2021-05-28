import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { environment } from "src/environments/environment";
import { AboutComponent } from "./modules/main/about/about.component";
import { DetectorComponent } from "./modules/main/detector/detector.component";
import { HomeComponent } from "./modules/main/home/home.component";
import { ImagesFiltersComponent } from "./modules/main/image-filters/image-filters.component";

const routes: Routes = [
    {
        path: "filters",
        component: ImagesFiltersComponent,
        data: {animation: "filters"}
    },
    {
        path: "detect",
        component: DetectorComponent,
        data: {animation: "detect"}
    },
    {
        path: "about",
        component: AboutComponent,
        data: {animation: "about"}
    },
    {
        path: "",
        component: HomeComponent,
        pathMatch: "full"
        ,data: {animation: "home"}
    },
    {
        path: "**",
        redirectTo: "",
        data: {animation: "home"}
    },
];
// hello
@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: environment.production})],
    exports: [RouterModule],
})
export class AppRoutingModule {}

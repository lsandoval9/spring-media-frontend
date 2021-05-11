import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MainModule } from "./modules/main/main.module";
import { SafeUrlPipe } from "./shared/pipes/safe-url/safe-url.pipe";
import { IvyCarouselModule } from "angular-responsive-carousel";
import { GetFileSrcPipe } from "./shared/pipes/get-file-src/get-file-src.pipe";

@NgModule({
    declarations: [AppComponent ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        MainModule,
        FontAwesomeModule,
        CoreModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        IvyCarouselModule
    ],
    exports: [MaterialModule, IvyCarouselModule],
    providers: [SafeUrlPipe, GetFileSrcPipe],
    bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { HeaderComponent } from "./shared/header/header.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CoreModule } from "./core/core.module";
import { MainModule } from "./modules/main.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
    declarations: [AppComponent, HeaderComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        MainModule,
        FontAwesomeModule,
        CoreModule,
        SharedModule
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

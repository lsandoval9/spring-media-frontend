import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from '../material/material.module';
import { DrawerComponent } from './drawer/drawer.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [LoaderComponent, DrawerComponent, SafeUrlPipe],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  exports: [LoaderComponent, DrawerComponent, SafeUrlPipe]
})
export class SharedModule { }

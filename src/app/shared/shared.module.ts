import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from '../material/material.module';
import { DrawerComponent } from './drawer/drawer.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';



@NgModule({
  declarations: [LoaderComponent, DrawerComponent, SafeUrlPipe],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [LoaderComponent, DrawerComponent, SafeUrlPipe]
})
export class SharedModule { }

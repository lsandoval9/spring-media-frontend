import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from '../material/material.module';
import { DrawerComponent } from './drawer/drawer.component';



@NgModule({
  declarations: [LoaderComponent, DrawerComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [LoaderComponent, DrawerComponent]
})
export class SharedModule { }

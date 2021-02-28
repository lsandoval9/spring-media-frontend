import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule, MaterialModule, FontAwesomeModule, AppRoutingModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }

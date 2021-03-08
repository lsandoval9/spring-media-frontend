import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from '../material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from '../app-routing.module';
import { ReadableSizePipe } from './pipes/readable-size/readable-size.pipe';
import { SafeUrlPipe } from './pipes/safe-url/safe-url.pipe';



@NgModule({
  declarations: [LoaderComponent, SafeUrlPipe, ReadableSizePipe],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  exports: [LoaderComponent, SafeUrlPipe, ReadableSizePipe]
})
export class SharedModule { }

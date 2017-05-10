import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdToolbarModule, MdIconModule,
  MdInputModule, MdCardModule, MdSelectModule, MdTooltipModule, MdMenuModule }
  from '@angular/material';
import { ToastModule } from 'ng2-toastr/ng2-toastr'
import { ToastOptions } from 'ng2-toastr';
import { ChartComponent } from './chart/chart.component';

export class CustomOption extends ToastOptions {
  positionClass = 'toast-bottom-center';
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  exports: [
    // Shared Modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // Angular Material Modules
    BrowserAnimationsModule,
    MdButtonModule,
    MdToolbarModule,
    MdIconModule,
    MdInputModule,
    MdCardModule,
    MdSelectModule,
    MdTooltipModule,
    MdMenuModule,
    // components
    ChartComponent
  ],
  declarations: [ChartComponent],
  providers: [{provide: ToastOptions, useClass: CustomOption}]
})
export class SharedModule { }

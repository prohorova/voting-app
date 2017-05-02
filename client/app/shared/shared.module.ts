import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdToolbarModule, MdIconModule, MdInputModule, MdCardModule, MdSelectModule, MdTooltipModule }
  from '@angular/material';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  exports: [
    // Shared Modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // Angular Material Modules
    BrowserAnimationsModule,
    MdButtonModule, MdToolbarModule, MdIconModule, MdInputModule, MdCardModule, MdSelectModule, MdTooltipModule,
    // components
    ChartComponent
  ],
  declarations: [ChartComponent]
})
export class SharedModule { }

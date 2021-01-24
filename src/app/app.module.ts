import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {CountryService} from './service/countryservice';
import {SliderModule} from 'primeng/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    FormsModule,
    CheckboxModule,
    FileUploadModule,
    HttpClientModule,
    DropdownModule,
    AppRoutingModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    SliderModule
  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

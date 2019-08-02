import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapService } from './service/map.service';
import { EventService }  from './service/event.service'

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { HomeComponent } from './home/home.component';
import { MapViewComponent } from './map-view/map-view.component';
import { EventListComponent } from './event-list/event-list.component';
import { HeaderComponent } from './header/header.component';

import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    MapViewComponent,
    EventListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoieGFjaWR4MTAxIiwiYSI6ImNqd2pmZmg4bDBybnc0YW14azZidjV1eGYifQ.JAUxgxeWx5zbq3UpUxOQ3g'})
  ],
  providers: [MapService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }

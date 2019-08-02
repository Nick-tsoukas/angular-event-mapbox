import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { MapService } from '../service/map.service';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../service/event.service';
import { retry } from 'rxjs/operators';
import { Map as MapboxMap } from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  events: any;
  centerPoint: any; // this sets the initial center point based off last event in time
  readmore: Boolean; // will use this to trigger some function and click read more 
  popup: Boolean;   // were any of the markers clicked on. If so, then create an instance of a popup with the event details
  popupCoordinates: Number[]; // Not sure if we are using this
  currentEvent: any;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    // sets the initial center
    this.eventService.currentCenter.subscribe(event => this.centerPoint = event)

    this.eventService.currentEvent.subscribe((event) => {
      this.popup = false;
      this.currentEvent = event;
    })

    // gets all events > sets the center point to last event >> 
    this.eventService.getEvents()
      .subscribe((events) => {
        this.events = events;
        this.centerPoint = events[0].coordinates;
        console.log(events)
        retry(3);
      });

  }

  readMore(event) {
    this.readmore = true;
  }
  //  adds a popup on click or through the event bar navigation 
  addPopup(event) {
    this.popup = false;
    this.currentEvent = event;
    this.popupCoordinates = event.coordinates;
    this.popup = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { MapService } from '../service/map.service';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';

//  What need to be done next is 
// Build popup on click marker >>> not just by clicking on fly to event in the event bar
// add fly to event on click marker >>> not just controlled by the event bar
// refactor code 

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-v9';
  data: [any];
  currentPopup;
  event: any;

  goToEvent(event) {
    if (this.currentPopup) {
      this.currentPopup.remove();
    }


    this.map.flyTo({
      center: event.coordinates
    });
    var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 25 })
      .setLngLat(event.coordinates)
      .setHTML(`<p>${event.title}</p>`)
      .addTo(this.map);
    this.currentPopup = popup;
  }

  constructor(private mapService: MapService, private http: HttpClient) { }

  ngOnInit() {
    // get all events from api then build map with markers
    this.mapService.getEvents().subscribe((val) => {
      // gets the coordinates from the last event >> map will use to center it
      let [lng, lat] = val[0].coordinates;
      (mapboxgl as any).accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 4,
        center: [lng, lat]
      });
      // for each event ... build a map marker
      this.data = val;
      this.data.forEach((event) => {
        const [lat, lng] = event.coordinates;
        const marker = new mapboxgl.Marker()
          .setLngLat([lat, lng])
          .addTo(this.map);
      })
    })
  }
}

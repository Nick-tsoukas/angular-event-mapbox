import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

/*
Currently all the map functionality is in the map service. This is 
the intended behavior.

Now I should explore the need for layers. Will this help achieve the next goal

Please define the next goal. Thank you for your time. I really appreciate it.
This could be a really helpful application. I will spend the rest of the 
evening working on it. If the app needs to have layers instead of just markers 
for the popup control, then we will add some layers to the map.

Also, we need a home page for the application. We need to start thinking about 
angular router.

Adding some angular animations will be a really nice feature to have.

Re formating the api for proper geojson format will also have to be looked at 
. It may be needed in creating layers

So what should I work on right now ????
*/

@Injectable({
  providedIn: 'root'
})
export class MapService {

  currentPopup;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-v9';

  constructor(private http: HttpClient) { }
  // get the events from the backend api 
  getEvents(): Observable<any> {
    return this.http.get('http://localhost:3000/events');
  }

  goTo(event) {
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
  // This builds the map ... container 'map' is the id on the map component html div
  // currently centers on 90 90 but this needs to be changed to the last event

  // build map will now take in the coordinates of the last event 
  // This must come from the getEvents method
  buildMap(events) {
    const centerPoint = events[0].coordinates;
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 4,
      center: centerPoint
    });
    
    // this.buildMarkers(events);
  }

  buildMarkers(events) {

    events.forEach((event) => {
      const [lat, lng] = event.coordinates;
      const marker = new mapboxgl.Marker()
        .setLngLat([lat, lng])
        .addTo(this.map);
        var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 25 })
        .setLngLat(event.coordinates)
        .setHTML(`<p>${event.title}</p>`)
        .addTo(this.map);
    })

  }

}

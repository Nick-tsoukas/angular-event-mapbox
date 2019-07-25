import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { MapService } from '../service/map.service';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';

//  I need to build the geojson from the api call

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-v9';

  names = ['nick', 'mike'];
  data: [any];

  log(event) {
    this.map.flyTo( {
      center: event.coordinates
    })
    // console.log(event.coordinates)
  }

  constructor(private mapService: MapService, private http: HttpClient) {
    
  }

  ngOnInit() {
    


    this.mapService.getEvents().subscribe((val) => {
      let [lng, lat] = val[0].coordinates;
      (mapboxgl as any).accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 4,
        center: [lng, lat]
      });
      this.data = val;
      this.data.forEach((event) => {
        // console.log(event.coordinates)
        const [lat, lng] = event.coordinates;
        const marker = new mapboxgl.Marker()
          .setLngLat([lat, lng])
          .addTo(this.map);
      })
    })
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private eventsData:any = [];
  
  constructor( private http : HttpClient) { }

  getEvents(): Observable<any>{
    return this.http.get('http://localhost:3000/events');
  }

}

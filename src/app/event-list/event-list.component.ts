import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from '../service/event.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: any;
  name: String;


  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents()
      .subscribe((events) => {
        this.events = events;
      });

      

    // this.eventService.currentCenter.subscribe(event => this.centerPoint = event)
  }
  setCenter(event){
    this.eventService.changeCenter(event);
  }
}

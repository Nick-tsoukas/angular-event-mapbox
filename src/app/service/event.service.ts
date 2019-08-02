import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  /*

  */
  private centerSource = new BehaviorSubject([0,0]);
  currentCenter = this.centerSource.asObservable();


  private currentEventSource = new BehaviorSubject({});
  currentEvent = this.currentEventSource.asObservable();
  

  private handleError(error) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};
  constructor(private http: HttpClient) { }

  changeCenter(event){
    this.centerSource.next(event.coordinates);
    this.currentEventSource.next(event);
  }

  
  getEvents(): Observable<any> {
    return this.http.get('http://localhost:3000/events')
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)  // then handle the error
    );
  }

}
 
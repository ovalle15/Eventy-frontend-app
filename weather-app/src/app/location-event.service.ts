import { Injectable } from '@angular/core';
import {HttpClient} from  '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LocationEventService {

  constructor(private http: HttpClient) { }

  getEventsForScope(cityEvent: any, countryCode: any, fromDate:any, toDate:any){
   return this.http.get(
     'https://app.ticketmaster.com/discovery/v2/events.json?size=6&sort=date,desc&apikey=tGRcyK1rm7xtXQL9UYzBJRN5bs3f2mi5' +
      "&startDateTime=" + fromDate +
      "&endDateTime=" + toDate +
      "&city=" + cityEvent +
      "&countryCode=" + countryCode
    );
 }

}
//countryCode

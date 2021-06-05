import { Injectable } from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class LocationEventService {

  constructor(private http: HttpClient) { }

  getEventsForScope(cityEvent: any, countryCode: any, fromDate:any, toDate:any){
   return this.http.get(
     'https://app.ticketmaster.com/discovery/v2/events.json?size=6&sort=date,desc&apikey=' + environment.TICKETMASTER_KEY +
      "&startDateTime=" + fromDate +
      "&endDateTime=" + toDate +
      "&city=" + cityEvent +
      "&countryCode=" + countryCode
    );
 }

}
//countryCode

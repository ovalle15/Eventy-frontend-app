import { Injectable } from '@angular/core';
import {HttpClient} from  '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LocationEventService {

  constructor(private http: HttpClient) { }

  getEventsForScope(cityEvent: any, fromDate:any, toDate:any){
    const accessToken = 'tGRcyK1rm7xtXQL9UYzBJRN5bs3f2mi5';
    const headers = {'Authorization': `Bearer ${accessToken}`,
                    'Access-Control-Allow-Origin': 'http://localhost:4200/'};
    // console.log('https://app.ticketmaster.com/discovery/v2/events', {headers});

   return this.http.get(
     'https://app.ticketmaster.com/discovery/v2/events.json?size=6&apikey=tGRcyK1rm7xtXQL9UYzBJRN5bs3f2mi5' +
      "&startDateTime=" + fromDate +
      "&endDateTime=" + toDate +
      "&city=" + cityEvent
    );
 }

}
//https://app.ticketmaster.com/discovery/v2/events.json?size=1&startDateTime=2021-06-07T14:00:00Z&endDateTime=2021-06-10T14:00:00Z&apikey=tGRcyK1rm7xtXQL9UYzBJRN5bs3f2mi5
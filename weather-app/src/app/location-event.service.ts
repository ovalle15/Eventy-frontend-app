import { Injectable } from '@angular/core';
import {HttpClient} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationEventService {

  constructor(private http: HttpClient) { }

  getEventsForScope(scope: any, fromDate:any, toDate:any){
    const accessToken = '-hKGRZ-x8_U1HYxRtHuhOxM1X_9hEPg2Ro6Hy1fF';
    const headers = {'Authorization': `Bearer ${accessToken}`};
    console.log('https://api.predicthq.com/v1/events', {headers});

   return this.http.get<any>(

     'https://api.predicthq.com/v1/events/?place.scope='+ scope +
      "&active.gte=" + fromDate +
      "&active.lte=" + toDate +
      "&category=expos,concerts,performing-arts"
      , {headers}
 );
 }

}

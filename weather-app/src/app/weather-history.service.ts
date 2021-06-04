import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Events {

  constructor(private http: HttpClient) {}

  getEvents(location: number){
     const accessToken = '-hKGRZ-x8_U1HYxRtHuhOxM1X_9hEPg2Ro6Hy1fF';
     const headers = {'Authorization': `Bearer ${accessToken}`};
     console.log('https://api.predicthq.com/v1/events', {headers});

    return this.http.get<any>(

      'https://api.predicthq.com/v1/places/?q='+ location, {headers}
  );
  }

}

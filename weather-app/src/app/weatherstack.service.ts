import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class WeatherStackService {


  constructor(private http: HttpClient) { }

  getWeather(location: any, dateStart: any, dateEnd: any){
    return this.http.get(
        'http://api.weatherstack.com/historical?access_key='+ environment.WEATHERSTACK_KEY +
        '&hourly=1&interval=6&units=f&query=' + location +
        '&historical_date_start=' + dateStart +
        "&historical_date_end=" + dateEnd
    );
  }
}




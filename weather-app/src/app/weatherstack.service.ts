import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherStackService {


  constructor(private http: HttpClient) { }

  getWeather(location: any, dateStart: any, dateEnd: any){
    return this.http.get(
        'http://api.weatherstack.com/historical?access_key=18198c7f2e93355da7666e5068bc4235&hourly=1&interval=6&units=f&query=' + location +
        '&historical_date_start=' + dateStart +
        "&historical_date_end=" + dateEnd
    );
  }
}




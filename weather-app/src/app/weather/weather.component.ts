import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { WeatherStackService } from "../weatherstack.service";
import {Events} from "../weather-history.service";
import { LocationEventService } from '../location-event.service';
import { icon, Marker } from 'leaflet';
import * as L from  'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon =  iconDefault;


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit  {
  public weatherSearchForm: FormGroup;
  public weatherData: any;
  public currentDate: any = new Date();
  public eventScopeId: any;
  public eventsToDisplay: any;
  public loc: any;
  public eventDateToday: any = new Date();
  public dayUnique: any = new Date().getDate()
  public map:any =null;
  public allEventsLocation = []


  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherStackService,
    private events: Events,
    private eventPerLocations:  LocationEventService
    ){
    this.weatherSearchForm = this.formBuilder.group({
      location: ['Boston']
    })
  }
  ngOnInit() {
    this.currentDate = this.formatDate(this.currentDate)
    this.weatherSearchForm = this.formBuilder.group({
      location: []
    });
  }

  formatDate(currentDate: any ) {
    var d = new Date(currentDate),
    month = '' + ("0" + (d.getMonth() + 1)).slice(-2),
    day = '' + this.dayUnique ,
    year =  d.getFullYear()
    return [year, month, day].join('-');
  }

  formatRealDate(eventDateToday: any) {
    var d = new Date(eventDateToday),
    month = '' + ("0" + (d.getMonth() + 1)).slice(-2),
    day = '' + (this.dayUnique + 1),
    year =  d.getFullYear()
    return [year, month, day].join('-');
  }

  sendToWeatherStack(formValues: any) {
    this.loc = formValues.location;
    console.log("formValues.location", formValues.location)
    this.weatherService
      .getWeather(formValues.location, this.currentDate, this.currentDate)
      .subscribe(data => {
        this.weatherData = data;
        console.log("this is weather data",this.weatherData)
      });
  }

  sendEvents() {
    console.log("before: this is the map", this.map);
    if (this.map){
        this.map.off();
        this.map.remove();
        this.map._container.removeAttribute('class');
        this.map = null
    }
    this.events
      .getEvents(this.loc)
      .subscribe(events => {
        this.eventScopeId = events.results[0].id;
        this.sendEventsPerLocation();
      })
  }

  sendEventsPerLocation() {
    this.eventDateToday = this.formatRealDate(this.eventDateToday)
    this.eventPerLocations
      .getEventsForScope(this.eventScopeId, this.eventDateToday, this.eventDateToday)
      .subscribe(e => {
        this.eventsToDisplay = e.results;
        console.log("this are the events per location", this.eventsToDisplay)
        if (this.eventsToDisplay.length === 0) {
          window.alert("No events were found for this location")
        }
      })
  }

  showOnMap(pos: any) {
      console.log("This is location for map ===>", pos)
      if (this.map ){
          this.map.off();
          this.map.remove();
      }

      this.map = L.map('mapid').setView([pos[1], pos[0]], 13)
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW92YWxsZTE1IiwiYSI6ImNrbzAxZ2kyMjAzZmgybm1iNW9rbXVvcWUifQ.jpD4Tb1EBDzz_--0J2AwAw', {
          maxZoom: 27,
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
              '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
              'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1
      }).addTo(this.map)
        this.addMarker(pos)
  }

  addMarker(pos:any) {
    var content = "Lat: " + pos[1] + ", Long: " + pos[0];
    var popup = L.popup().setLatLng([pos[1], pos[0]]).setContent(content)
    var marker = L.marker([pos[1], pos[0]]).bindPopup(popup).addTo(this.map);
    return marker
  }
}




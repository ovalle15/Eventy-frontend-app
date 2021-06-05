import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { WeatherStackService } from "../weatherstack.service";
import { LocationEventService } from '../location-event.service';
import countryList from '../_files/countries.json';
import { icon, Marker } from 'leaflet';
import {environment} from '../../environments/environment.prod';
import * as L from  'leaflet';
const iconRetinaUrl = 'assets/pngs/marker-icon-2x.png';
const iconUrl = 'assets/pngs/marker-icon.png';
const shadowUrl = 'assets/pngs/marker-shadow.png';

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
  public eventsToDisplayFinal : any;
  public loc: any;
  public eventDateToday: any = new Date();
  public dayUnique: any = new Date().getDate()
  public map:any =null;
  public allEventsLocation = []
  public stateEvent: any;
  public cityEvent: any;
  public dateForEvents: any = new Date();
  public dateForEventsNext: any = new Date();
  public country: any;
  public countryCode: any;


  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherStackService,
    private eventPerLocations:  LocationEventService,
    ){
    this.weatherSearchForm = this.formBuilder.group({
      location: ['Boston']
    })
  }
  ngOnInit() {

    this.dateForEvents = this.dateForEvents.toISOString().split('.')[0]+"Z";
    this.dateForEventsNext = this.dateForEventsNext.setDate(this.dateForEventsNext.getDate() + 1)
    this.dateForEventsNext = new Date(this.dateForEventsNext).toISOString().split('.')[0]+"Z"
    this.currentDate = this.formatDate(this.currentDate)
    this.weatherSearchForm = this.formBuilder.group({
      location: ['Boston']
    });

  }


  formatDate(currentDate: any ) {
    var d = new Date(currentDate),
    month = '' + ("0" + (d.getMonth() + 1)).slice(-2),
    day = '' + ("0" + this.dayUnique ).slice(-2),
    year =  d.getFullYear()
    return [year, month, day].join('-');
  }


  sendToWeatherStack(formValues: any) {
    this.loc = formValues.location;
    console.log("this is currentDate send to weatherStack", this.currentDate)
    this.weatherService
      .getWeather(formValues.location, this.currentDate, this.currentDate)
      .subscribe(data => {
        this.weatherData = data;
        this.country = this.weatherData.location.country
        this.findCountryCodes();
        this.sendEvents();
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
    this.sendEventsPerLocation();
  }

  findCountryCodes() {
    console.log("this is this country in findCountryCodes ==> ", this.country)
    for (const e in  Object.keys(countryList)) {
        this.countryCode = (countryList[e].Name === this.country) ? countryList[e].Code : "";
      }
    }
  sendEventsPerLocation() {
    console.log("this is countryCode=", this.countryCode, "  this is loc=", this.loc)
      this.eventPerLocations
        .getEventsForScope(this.loc, this.countryCode ,this.dateForEvents , this.dateForEventsNext)
        .subscribe(e => {
          this.eventsToDisplay = e;
          this.eventsToDisplayFinal = ((this.eventsToDisplay || {})._embedded || {}).events || []
          console.log("eventsToDisplayFinal ===>",this.eventsToDisplayFinal)
          if (this.eventsToDisplayFinal.length === 0) {
            window.alert("No events were found for this location")
          }
        })
  }

  showOnMap(pos: any) {
      console.log("This is location for map ===>", pos)
      pos = Object.values(pos)
      console.log("pos array === >", pos)

      if (this.map ){
          this.map.off();
          this.map.remove();
      }

      this.map = L.map('mapid').setView([pos[1], pos[0]], 13)
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + environment.MAPBOX_KEY , {
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




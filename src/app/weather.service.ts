import { Injectable, Signal, signal } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CurrentConditions } from './current-conditions/current-conditions.type';
import { ConditionsAndZip } from './conditions-and-zip.type';
import { Forecast } from './forecasts-list/forecast.type';
import { CachedDataService } from './cached-data.service';
import { catchError, map, tap } from 'rxjs/operators';
import { weatherDataBeSubject } from './model.interface' 
@Injectable()
export class WeatherService {

  static URL = 'https://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  private currentConditions = signal<ConditionsAndZip[]>([]);
  public dataWeather:BehaviorSubject<weatherDataBeSubject|{}>=new BehaviorSubject([])

  
  constructor(private http: HttpClient, private cacheService: CachedDataService) { }

  addCurrentConditions(zipcode: string): void {
    const cacheKey = `currentConditions_${zipcode}`;
    const cachedData = this.cacheService.getItem(cacheKey);
    if (cachedData) {
      
      this.currentConditions.update(conditions => [...conditions, { zip: zipcode, data: cachedData }]);
     setTimeout(()=>{
      this.dataWeather.next({ zip: zipcode, data:cachedData })
     },0)
     

    } else {
      this.http.get<CurrentConditions>(`${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`)
        .pipe(catchError(error => of(null))) // Handle errors gracefully
        .subscribe(data => {
          if (data) {
            this.cacheService.setItem(cacheKey, data);
            this.currentConditions.update(conditions => [...conditions, { zip: zipcode, data }]);
            this.dataWeather.next(Object.assign([], { zip: zipcode, data }))
          }
        });
    }
  }

  removeCurrentConditions(zipcode: string) {
    this.currentConditions.update(conditions => {
      for (let i in conditions) {
        if (conditions[i].zip == zipcode)
          conditions.splice(+i, 1);
      }
      return conditions;
    });
  }

  getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    const cacheKey = `forecast_${zipcode}`;
    const cachedData = this.cacheService.getItem(cacheKey);

    if (cachedData) {
      this.currentConditions.update(conditions => [...conditions, { zip: zipcode, data: cachedData }]);
      this.dataWeather.next({ zip: zipcode, data: cachedData })
    
      return of(cachedData);
    } else {
      
      return this.http.get<Forecast>(`${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`)
        .pipe(
          catchError(error => of(null)), // Handle errors gracefully
          tap(data => {
            if (data) {
              this.cacheService.setItem(cacheKey, data);
            }
          })
        );
    }
  }

  getWeatherIcon(id:number): string {
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else
      return WeatherService.ICON_URL + "art_clear.png";
  }

  getLocationName(zipcode: string): Observable<string> {
    const cacheKey = `locationName_${zipcode}`;
    const cachedName = this.cacheService.getItem(cacheKey);

    if (cachedName) {
      return of(cachedName);
    } else {
      return this.http.get<any>(`${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`)
        .pipe(
          map(data => data.name),
          tap(name => this.cacheService.setItem(cacheKey, name))
        );
    }
  }
}

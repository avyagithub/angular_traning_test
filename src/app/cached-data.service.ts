import { Injectable } from '@angular/core';
import {weatherData } from './model.interface'
@Injectable({
  providedIn: 'root'
})
export class CachedDataService {

   private durationCached:number=7200000;



  constructor() { }
 
  setItem(key:string,data:weatherData,duration:number=this.durationCached){

    // calculate expiry
    const expiryTime=new Date().getTime()+duration
    // console.log("Set Item",JSON.stringify(data))
    const cachDataObject={
      dataWeather:data,
      expiry:expiryTime
    }

    localStorage.setItem(key,JSON.stringify(cachDataObject))

  }


  getItem(key:string){
    const cachDataObject=localStorage.getItem(key)
    if (!cachDataObject) return null;     
    const {dataWeather,expiry}=JSON.parse(cachDataObject)
    if (new Date().getTime() > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return dataWeather;
  }






}

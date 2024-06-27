import { AfterContentChecked, Component, inject, Input, Signal } from '@angular/core';
import { WeatherService } from "../weather.service";
import { LocationService } from "../location.service"; 
import { Router } from "@angular/router";
import { ConditionsAndZip } from '../conditions-and-zip.type';
import { weatherDataBeSubject } from 'app/model.interface';


@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements AfterContentChecked {


  @Input() selectedIndex: number


  private weatherService = inject(WeatherService);
  private router = inject(Router);
  protected locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

  displayContent:weatherDataBeSubject[] = [];



  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }

  constructor() {

    








  }

  ngAfterContentChecked(): void {
    this.displayContent = [];
    this.displayContent = this.currentConditionsByZip();
    console.log("Display Content",this.displayContent)
    this.displayContent = Array.from(new Set(this.displayContent.map(a => a.zip)))
      .map(id => {
        return this.displayContent.find(a => a.zip === id)
      })



    this.displayContent = this.displayContent.filter((x) => x.zip == this.selectedIndex)
    const location = localStorage.getItem('locations')
    
    
    if (JSON.parse(location)!=null && JSON.parse(location).length < 1) {
      this.displayContent = []
    }
    


  }



}

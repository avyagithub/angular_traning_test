import { AfterContentInit, AfterViewChecked, Component, OnInit, Signal } from '@angular/core';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';
import { LocationService } from 'app/location.service';
import { WeatherService } from 'app/weather.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {
  tabs: any[] = [];
  selectedtab: Object = {
    name: '',
    zip: '',
    title: ''
  };

  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

  public displayContent = []


  constructor(private locationService: LocationService, private weatherService: WeatherService,) { }

  ngOnInit(): void {
    this.dataByZipCode()


  }


  dataByZipCode() {
    this.locationService.locations$.subscribe(locations => {
      this.tabs = locations.map(zip => ({ title: `Weather for ${zip}`, zip, name: '' }));
      locations.forEach(zip => {
        this.weatherService.addCurrentConditions(zip);
      });
    });

    this.weatherService.dataWeather.subscribe((data: any) => {


      this.tabs.map((dataTab) => {
        if (dataTab.zip == data.zip) {
          dataTab.name = data.data?.name
        }

      })

      this.onTabChange(data)

    })

  }






  onTabChange(selectedTabData: Object) {

    this.selectedtab = selectedTabData['zip'];
  }

  onTabClose(index: number) {
    this.locationService.removeLocation(this.tabs[index].zip);


  }


}
function toObservable(currentConditionsByZip: Signal<ConditionsAndZip[]>) {
  throw new Error('Function not implemented.');
}


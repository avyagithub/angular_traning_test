import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';
import { Forecast } from 'app/forecasts-list/forecast.type';
import { LocationService } from 'app/location.service';
import { tabs } from 'app/model.interface';
import { WeatherService } from 'app/weather.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements OnInit {
  constructor(private locationService: LocationService, private weatherService: WeatherService, public route : ActivatedRoute){

  }

  // -----------------
  zipcode: string;
  forecast: Forecast;



  @Input() tabs: any[] = [];
  @Input() selectedIndex: number=0;
  @Input() removeTabIndex:number


  tabselectedInd=0
  @Output() tabChange = new EventEmitter<tabs>();
  @Output() tabClose = new EventEmitter<number>();



  ngOnInit(): void {
    
  }


  

  selectTab(data:tabs,index) {
    // console.log("Selected tab",data)
    // this.selectedIndex=index
    // this.selectedIndex = data;
    this.tabselectedInd=index
    this.tabChange.emit(data);
  }

  closeTab(index: number) {
    this.removeTabIndex=index
    this.tabClose.emit(index);
    if (this.selectedIndex >= this.tabs.length) {
      this.selectedIndex = this.tabs.length - 1;
    }
    if (this.selectedIndex === index && this.selectedIndex > 0) {
      this.selectedIndex--;
    }
    // this.selectTab(this.selectedIndex,this.selectedIndex);
  }


}

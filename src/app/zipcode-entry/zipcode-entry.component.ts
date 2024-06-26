import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocationService } from "../location.service";

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  styles: [`.errorMsg {
       color: red;
    padding: 2px 8px;
    font-size: 11px;
    display: block;
    margin-bottom:10px
  }
  .messageDiv{
    margin-top:10px
  }
  
  `]
})
export class ZipcodeEntryComponent {

  constructor(private service: LocationService) { }
  @ViewChild('zipcode') myTestDiv: ElementRef;
  showError: boolean = false

  addLocation(zipcode: string) {
    this.showError = false
    // console.log(this.myTestDiv.nativeElement.value)
    let checkValue = this.myTestDiv.nativeElement.value
    if (checkValue.trim() == '') {
      this.showError = true
    } else {
      this.service.addLocation(zipcode);
    }

  }

}

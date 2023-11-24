import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  minYear: number = 0;
  maxYear: number = 0;
  minPrice: number = 0;
  maxPrice: number = 0;
  formattedSliderValue ='';

  constructor(private service: ConnectionService) { }
  ngOnInit(): void {
    this.getYearAndPrice();
  }

  getYearAndPrice(){
    this.service.getYearAndPrice(Routes.YEAR_AND_PRICE).subscribe(res => {
      this.minYear = res.minYear;
      this.maxYear = res.maxYear;
      this.minPrice = res.minPrice;
      this.maxPrice = res.maxPrice;
    })
  }

  formatLabel(value: number): string {
    return 'R$ '+ value;
  }

  onSliderChange(event: any, type: string) {
    console.log(event.target.value)
  }
}

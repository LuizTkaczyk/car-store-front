import { Component, OnInit } from '@angular/core';
import { ChangesService } from 'src/app/shared/changes.service';
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

  priceTo : number = 0;
  priceFrom : number = 0;
  yearTo : number = 0;
  yearFrom : number = 0;

  constructor(private service: ConnectionService,private changes: ChangesService) { }
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

  minPriceEvent(event : any) {
    this.priceFrom = event;
    this.changes.filter( {priceFrom: event,priceTo: this.priceTo ? this.priceTo : this.maxPrice});
  }

  maxPriceEvent(event : any) {
    this.priceTo = event;
    this.changes.filter({priceFrom: this.priceFrom ? this.priceFrom : this.minPrice, priceTo: event});
  }

  maxYearEvent(event : any) {
    this.yearTo = event;
    this.changes.filter({yearTo: event,yearFrom: this.yearFrom ? this.yearFrom : this.minYear});
  }

  minYearEvent(event : any) {
    this.yearFrom = event;
    this.changes.filter( {yearFrom: event,yearTo: this.yearTo ? this.yearTo : this.maxYear});
  }
}

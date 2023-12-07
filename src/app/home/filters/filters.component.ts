import { Component, Input, OnInit } from '@angular/core';
import { Observable, first } from 'rxjs';
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

  priceTo: number = 0;
  priceFrom: number = 0;
  yearTo: number = 0;
  yearFrom: number = 0;
  brandId: number = 0;
  categoryId: number = 0;

  brands: Array<any> = [];
  categories: Array<any> = [];

  filters: any = {
    minYear: 0,
    maxYear: 0,
    minPrice: 0,
    maxPrice: 0,
    brandId: 0,
    categoryId: 0
  };

  constructor(private service: ConnectionService, private changes: ChangesService) { }

  ngOnInit(): void {
    this.getDefaultFilterValues();
  }

  getDefaultFilterValues() {
    this.service.getFilterValues(Routes.FILTER_VALUES).pipe(first()).subscribe(res => {
      this.minYear = res.minYear;
      this.maxYear = res.maxYear;
      this.minPrice = res.minPrice;
      this.maxPrice = res.maxPrice;
      this.brands = res.brands;
      this.categories = res.categories;
    })
  }

  minPriceEvent(event: any) {
    this.priceFrom = event;
    this.changeFilter();
  }

  maxPriceEvent(event: any) {
    this.priceTo = event;
    this.changeFilter();
  }

  maxYearEvent(event: any) {
    this.yearTo = event;
    this.changeFilter();
  }

  minYearEvent(event: any) {
    this.yearFrom = event;
    this.changeFilter();
  }

  changeBrand(event: any = 0) {
    this.brandId = event.target.value;
    this.changeFilter();
  }

  changeCategory(event: any) {
    this.categoryId = event.target.value;
    this.changeFilter();
  }

  changeFilter() {
    this.filters = {
      brandId: this.brandId ?? 0,
      categoryId: this.categoryId ?? 0,
      priceFrom: this.priceFrom ? this.priceFrom : this.minPrice,
      priceTo: this.priceTo ? this.priceTo : this.maxPrice,
      yearFrom: this.yearFrom ? this.yearFrom : this.minYear,
      yearTo: this.yearTo ? this.yearTo : this.maxYear,
      itemPerPage: 10,
      page: 1
    }
    this.changes.filter(this.filters);
  }
}

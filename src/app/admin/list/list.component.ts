import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  displayedColumns: string[] = ['brand', 'model', 'year', 'price','edit'];
  dataSource = [
    {id: 1,  brand: 'Fiat', model: 'Uno mille', year: 2000, price: 10000},
    {id: 2,  brand: 'Ford', model: 'Escort', year: 2001,price: 10000},
    {id: 3,  brand: 'Volks', model: 'Golf', year: 2002, price: 10000},
    {id: 4,  brand: 'Volvo', model: 'S60', year: 2003,price: 10000},
    {id: 1,  brand: 'Fiat', model: 'Uno mille', year: 2000, price: 10000},
    {id: 2,  brand: 'Ford', model: 'Escort', year: 2001,price: 10000},
    {id: 3,  brand: 'Volks', model: 'Golf', year: 2002, price: 10000},
    {id: 4,  brand: 'Volvo', model: 'S60', year: 2003,price: 10000},
    {id: 1,  brand: 'Fiat', model: 'Uno mille', year: 2000, price: 10000},
    {id: 2,  brand: 'Ford', model: 'Escort', year: 2001,price: 10000},
    {id: 3,  brand: 'Volks', model: 'Golf', year: 2002, price: 10000},
    {id: 4,  brand: 'Volvo', model: 'S60', year: 2003,price: 10000},
    {id: 1,  brand: 'Fiat', model: 'Uno mille', year: 2000, price: 10000},
    {id: 2,  brand: 'Ford', model: 'Escort', year: 2001,price: 10000},
    {id: 3,  brand: 'Volks', model: 'Golf', year: 2002, price: 10000},
    {id: 4,  brand: 'Volvo', model: 'S60', year: 2003,price: 10000},
    {id: 1,  brand: 'Fiat', model: 'Uno mille', year: 2000, price: 10000},
    {id: 2,  brand: 'Ford', model: 'Escort', year: 2001,price: 10000},
    {id: 3,  brand: 'Volks', model: 'Golf', year: 2002, price: 10000},
    {id: 4,  brand: 'Volvo', model: 'S60', year: 2003,price: 10000},
    {id: 1,  brand: 'Fiat', model: 'Uno mille', year: 2000, price: 10000},
    {id: 2,  brand: 'Ford', model: 'Escort', year: 2001,price: 10000},
    {id: 3,  brand: 'Volks', model: 'Golf', year: 2002, price: 10000},
    {id: 4,  brand: 'Volvo', model: 'S60', year: 2003,price: 10000},
  
  ];
}

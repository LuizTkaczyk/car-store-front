import { Brand } from './../../admin/model/brand.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangesService } from 'src/app/shared/changes.service';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  brands = new Observable<Brand[]>();
  constructor(private service: ConnectionService, private changes: ChangesService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this.brands = this.service.getAll(Routes.BRAND);
  }

  changeBrand(event: any = 0) {
    // let brand = {
    //   brandId: event.target.value
    // }
    // this.service.get(Routes.CHANGE_BRAND, brand).subscribe(data => {
    //   console.log(data)
    // })

    this.changes.changeBrandId(event.target.value);
  }
}

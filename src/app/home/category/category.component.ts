import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/admin/model/category.model';
import { ChangesService } from 'src/app/shared/changes.service';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  categories = new Observable<Category[]>();

  constructor(private service: ConnectionService, private changes: ChangesService) { }

  ngOnInit(): void {
   this.getCategories();
  }
  getCategories() {
    this.categories = this.service.getAll(Routes.CATEGORY_HOME);
  }

  changeCategory(event: any) {
    this.changes.filter({categoryId:event.target.value});
  }

}

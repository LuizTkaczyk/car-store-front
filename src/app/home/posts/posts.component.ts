import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChangesService } from 'src/app/shared/changes.service';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PostsComponent implements OnInit {

  posts: Array<any> = [];
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "dots": true, "autoplay": true, "autoplaySpeed": 2000, "arrows": true };


  constructor(private service: ConnectionService, private changes: ChangesService) { }
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.changes.currentChangeId.subscribe((brandId : any)  => {
      if(brandId != 0){
        let brand = {
          brandId: brandId
        }
        this.service.get(Routes.CHANGE_BRAND, brand).subscribe(data => {
          this.posts = data
        })
      }else{
        this.getVehiclesPost();
      }
    })
  }

  getVehiclesPost() {
    return this.service.getAll(Routes.HOME).subscribe(data => {
      this.posts = data;
    })
  }
}

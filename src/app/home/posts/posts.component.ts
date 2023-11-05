import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PostsComponent implements OnInit {

  posts : Array<any> = [];
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "dots": true, "autoplay": true, "autoplaySpeed": 2000, "arrows": true};


  constructor(private service : ConnectionService ){}
  ngOnInit(): void {
    this.getPosts()
  }


  getPosts(){
    return this.service.getAll(Routes.HOME).subscribe(data => {
      this.posts = data;;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {


  slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/666666"}
  ];
  posts : Array<any> = [];
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "dots": true, "autoplay": true, "autoplaySpeed": 2000, "arrows": true};


  constructor(private service : ConnectionService ){}
  ngOnInit(): void {
    this.getPosts()
  }


  getPosts(){
    return this.service.getAll(Routes.HOME).subscribe(data => {
      this.posts = data;
      console.log(data);
    })
  }
}

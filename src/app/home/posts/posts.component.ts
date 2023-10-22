import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {

  constructor(private service : ConnectionService ){}
  ngOnInit(): void {
    this.getPosts()
  }


  getPosts(){
    return this.service.getAll(Routes.HOME).subscribe(data => {
      console.log(data);
    })
  }
}

import { Vehicle } from './../../admin/model/vehicle.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewPostComponent implements OnInit {
  postId: any = null;
  vehicle: any = null;
  contacts: any = null;
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "dots": true, "autoplay": true, "autoplaySpeed": 3000, "arrows": true};

  constructor(private connectionService: ConnectionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.connectionService.getById(Routes.HOME, this.postId).subscribe(data => {
      this.vehicle = data.vehicle;
      this.contacts = data.contacts;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  info: any;
  constructor(private connection : ConnectionService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show('primary');
    this.connection.get(Routes.COMPANY_INFO).subscribe(data => {
      this.info = data;
      this.spinner.hide('primary');
    })
  }

}

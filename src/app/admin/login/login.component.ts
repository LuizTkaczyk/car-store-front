import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: any;

  constructor(private formBuilder: FormBuilder, private connectionService: ConnectionService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login(){
    this.connectionService.post(Routes.LOGIN,this.form.value).subscribe(data => {
      localStorage.setItem('token', data.access_token);
      console.log(data);
      this.router.navigate(['/admin/lista']);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';
import { MessageService } from '../shared/message.service';
import { AuthService } from '../shared/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: any;
  loading: Boolean = false;

  constructor(private formBuilder: FormBuilder, private connectionService: ConnectionService, private router: Router, private messageService: MessageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login(){
    this.loading = true;
    this.connectionService.post(Routes.LOGIN,this.form.value).subscribe(data => {
      this.authService.setToken(data.access_token);
      this.loading = false;
      this.router.navigate(['/admin/lista']);
    }, error => {
      if(error.status == 401){
        this.loading = false;
        this.messageService.show('Usuario ou senha inválidos', 'error');
      }
    });
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private router : Router) { }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  openLogin(){
    const token = localStorage.getItem('token');
    const route = token ? '/admin/lista' : '/login';

    window.open(route, '_blank');
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken: string | null = null;

  constructor() { }

  setToken(token: string) {
    this.authToken = token;
    localStorage.setItem('token', token);
  }

  getToken(){
    if(!this.authToken){
      this.authToken = localStorage.getItem('token');

    }
    return this.authToken;
  }

  clearToken() {
    this.authToken = null;
    localStorage.removeItem('token');
  }

}

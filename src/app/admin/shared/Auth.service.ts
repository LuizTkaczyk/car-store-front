import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    // Implemente a lógica de verificação de autenticação
    // Retorne true se o usuário estiver autenticado, false caso contrário
    return true; // ou false, dependendo da sua lógica
  }

}

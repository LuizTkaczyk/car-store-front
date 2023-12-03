import { tap, catchError, throwError } from 'rxjs';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './Auth.service';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';
import { MessageService } from './message.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router, private connectionService: ConnectionService, private messageService: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.getToken();

    if (token) {
      request = this.addToken(request, token);
    } else {
      this.auth.clearToken();
    }

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {

        }
      }),
      catchError((error) => {
        if (error.status === 401) {

          this.messageService.show('Sua sessão expirou, por favor realize o login', 'error');
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  refreshToken() {
    this.connectionService.refreshToken(Routes.REFRESH).subscribe(data => {
      console.log('refresh token: ' + data.access_token);
      this.auth.setToken(data.access_token);
    })
  }
}

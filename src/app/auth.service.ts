import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { tap, catchError, switchMap } from 'rxjs/operators';

interface User {
  id: string;
  name: string;
  iat: Date;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new ReplaySubject<User>(1);
  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.user.next({ ...jwt_decode<User>(token), token });
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  emailSignIn(email: string, password: string) {
    return this.http
      .post<{ token: string }>(environment.apiUrl + '/auth/login', {
        email,
        password,
      })
      .pipe(
        tap(({ token }) => {
          if (token) {
            localStorage.setItem('token', token);
            const decoded = jwt_decode<User>(token);
            this.user.next({ ...decoded, token });
            this.router.navigate(['/home']);
          }
        })
      );
  }
  emailSignUp(name: string, email: string, password: string) {
    return this.http
      .post<{ ok: string }>(environment.apiUrl + '/auth/register', {
        name,
        email,
        password,
      })
      .pipe(
        tap((resp) => {
          if (resp.ok) {
            this.router.navigate(['/login']);
          }
        })
      );
  }
  updatePassword(code: string, password: string) {
    throw new Error('Method not implemented.');
  }
  sendResetCode(email: string) {
    throw new Error('Method not implemented.');
  }
}

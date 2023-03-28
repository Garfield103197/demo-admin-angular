import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // URL của API đăng nhập
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private loggedIn = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    const body = { username: username, password: password };
    return this.http.post<any>(`${this.apiUrl}/login`, body, this.httpOptions)
      .pipe(
        tap(response => {
          // Lưu thông tin người dùng vào localStorage
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          this.loggedIn = true;
        }),
        map(response => true),
        catchError(error => {
          console.error(error);
          return of(false);
        }),
      );
  }

  loginGoogle(data: any) {
    localStorage.setItem('token', JSON.stringify(data));
    this.loggedIn = true;
  }

  logout(): void {
    // Xóa thông tin người dùng và token khỏi localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    // Kiểm tra trạng thái đăng nhập trong localStorage
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    return this.loggedIn;
  }

  getToken(): string {
    // Lấy token từ localStorage
    return localStorage.getItem('token');
  }


}

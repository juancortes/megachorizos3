import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models';
import { routes } from '../../../consts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(routes.AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }

  public sign(name: string, email: string, password: string, password_confirmation: string): Observable<any> {
    const body=JSON.stringify({
      name,
      email,
      password,
      password_confirmation
    });
    return this.http.post(routes.AUTH_API + 'register', body, httpOptions);
  }

  public signOut(): void {
    localStorage.removeItem('token');
  }

  public getUser(): Observable<User> {
    return of({
      name: 'John',
      lastName: 'Smith'
    });
  }
}

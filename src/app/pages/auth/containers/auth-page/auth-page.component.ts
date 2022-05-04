import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';
import { routes } from '../../../../consts';
import { LoginFormComponent, SignFormComponent } from '../../components';
import { FormGroup } from '@angular/forms';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  public todayDate: Date = new Date();
  public routers: typeof routes = routes;
  @ViewChild(SignFormComponent) registro;
  @ViewChild(LoginFormComponent) login;
  public register: FormGroup;
  public isSuccessful = false;
  public isSignUpFailed = false;
  public errorMessage = '';
  public isLoggedIn = false;
  public isLoginFailed = false;
  roles: string[] = [];

  constructor(
    private service: AuthService,
    private router: Router, 
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }    
  }

  public sendLoginForm(): void {
    this.register = this.login;
    
    this.service.login(this.register['form'].value.email,this.register['form'].value.password)
      .subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          console.log(data)
          localStorage.setItem('token', data.token);
          this.router.navigate([this.routers.PERSONA]).then();
        },
        err => {
          this.errorMessage = err.error.messge;
          this.isLoginFailed = true;
        }
      );
    
  }

  reloadPage(): void {
    window.location.reload();
  }

  public sendSignForm(): void {
    this.register = this.registro;
    this.service.sign(this.register['form'].value.name,this.register['form'].value.email,this.register['form'].value.password,this.register['form'].value.password_confirmation)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          this.isSuccessful = true;
          this.isSignUpFailed = true;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    
    //this.router.navigate([this.routers.DASHBOARD]).then();
  }
}

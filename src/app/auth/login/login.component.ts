import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from '@abacritt/angularx-social-login';
import {AuthService} from '../auth-services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  socialUser!: SocialUser;
  constructor(
      private router: Router,
      private socialAuthService: SocialAuthService,
      private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.authService.loginGoogle(user);
      this.router.navigate(['/pages/dashboard']);
    });
  }


  loginWithGoogle(): void {
    console.log(this.socialAuthService);
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  logOut(): void {
    this.socialAuthService.signOut();
  }

}

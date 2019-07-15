import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';


import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { log } from '../../decorators/log';
import { OAuthService } from 'app/pages/login/oauth.service';

declare var FB: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})

export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  loading: HTMLIonLoadingElement;

  constructor(
    public userData: UserData,
    public router: Router,
    private oAuth: OAuthService,
    public loadingController: LoadingController,
    private platform: Platform,
    private nativeStorage: NativeStorage,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar) {

    this.platform.ready().then(() => {
      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time t hey open the app
      this.nativeStorage.getItem('user')
        .then(_data => {
          // user is previously logged and we have his data
          // we will let him access the app
          this.router.navigate(["/user/profile"]);
          this.splashScreen.hide();
        }, _err => {
          //we don't have the user data so we will ask him to log in
          this.router.navigate(["/login"]);
          this.splashScreen.hide();
        });

      this.statusBar.styleDefault();
    });
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  async doLogin(source: string) {
    this.oAuth.login(source);
  }

  private facebook() {
    // this.fbProvider.login();
    // FB.login();
    FB.login((response) => {
          console.log('submitLogin', response);
          if (response.authResponse) {
            this.nativeStorage.setItem('user', response)
        .then(_data => {
          // user is previously logged and we have his data
          // we will let him access the app
          this.router.navigate(["/user/profile"]);
          this.splashScreen.hide();
        }, _err => {
          //we don't have the user data so we will ask him to log in
          this.router.navigate(["/login"]);
          this.splashScreen.hide();
        });
            //login success
            //login success code here
            //redirect to home page
           }
           else
           {
           console.log('User login failed');
         }
      });
}

  async presentLoading() {
    return await this.loading.present();
  }
}

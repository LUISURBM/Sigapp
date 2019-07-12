import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OAuthService } from '../oauth/oauth.service';



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
    private fb: Facebook,
    public loadingController: LoadingController,
    private platform: Platform,
    private nativeStorage: NativeStorage,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    protected oauthService: OAuthService
  ) {
    console.log('LoginPage');
    this.platform.ready().then(() => {
      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time t hey open the app
      this.nativeStorage.getItem('facebook_user')
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
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    // this.presentLoading();
    // this.oauthService.login(source).then(
    //   () => this.router.navigate(["/pages/oauth/profile/oauth-profile"]),
    //   error => alert(error)
    // );
    // if (this.platform.is('desktop')) {

      this.fb.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
        .catch(e => console.log('Error logging into Facebook', e));


      this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
    // } else {
    //   this.doLogin('');
    // }

    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  async doFbLogin() {
    let permissions = ["public_profile", "email"];

    this.fb.login(permissions)
      .then(response => {
        let userId = response.authResponse.userID;

        //Getting name and gender properties
        this.fb.api("/me?fields=name,email", permissions)
          .then(user => {
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            //now we have the users info, let's save it in the NativeStorage
            this.nativeStorage.setItem('facebook_user',
              {
                name: user.name,
                email: user.email,
                picture: user.picture
              })
              .then(() => {
                this.router.navigate(["/tutorial"]);
                this.loading.dismiss();
              }, error => {
                console.log(error);
                this.loading.dismiss();
              })
          })
      }, error => {
        console.log(error);
        this.loading.dismiss();
      });
  }

  async presentLoading() {
    return await this.loading.present();
  }
}

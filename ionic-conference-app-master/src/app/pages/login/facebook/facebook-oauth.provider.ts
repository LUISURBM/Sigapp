import { Injectable } from '@angular/core';

import { Facebook } from 'ng2-cordova-oauth/provider/facebook';
import { Config } from '../../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IOathProvider } from '../oauth.provider.interface';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';


interface ILoginResponse {
    access_token: string;
}

interface IProfileResponse {
    first_name: string;
    last_name: string;
    email: string;
}

declare var FB: any;

const httpOptions = {
    headers: new HttpHeaders({
        'X-Frame-Options': 'ALLOW-FROM http://localhost:8000/',
        'Access-Control-Allow-Origin': '*'
    })
};

const httpNativeOptions = { 'Access-Control-Allow-Origin' : 'true',
'Content-Type': 'application/json'
    };

@Injectable()
export class FacebookOauthProvider implements IOathProvider {
    private http: HttpClient;
    private config: Config;
    private facebook: Facebook;

    constructor(http: HttpClient, config: Config, private httpNative: HTTP,
        private nativeStorage: NativeStorage,
        private splashScreen: SplashScreen,
        private router: Router) {
        this.http = http;
        this.config = config;
        (window as any).fbAsyncInit = function () {
            FB.init({
                appId: '334812790746569',
                cookie: true,
                xfbml: true,
                version: 'v3.1'
            });
            FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    login(): Promise<any> {
        // this.router.get();
        // return this.httpNative.get(this.getUrlLogin(), {}, httpNativeOptions).then((data) => {
        //     console.log(data);
        // });
        return new Observable((oberserver) => {
            this.doFacebook()
          }).toPromise();
    }

    private statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          this.testAPI();
        }
      }
       // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
    });
  }

  
  private doFacebook() {
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

    public getUrlLogin(): string {
        let toReturn = this.config.facebook.oAuthUrl;
        toReturn = toReturn.replace('clientId', this.config.facebook.appId);
        return toReturn;
    }
}

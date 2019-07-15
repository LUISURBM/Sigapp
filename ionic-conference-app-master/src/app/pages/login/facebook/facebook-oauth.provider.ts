import { Injectable } from '@angular/core';

import { Facebook } from 'ng2-cordova-oauth/provider/facebook';
import { Config } from '../../../config';
import { HttpClient } from '@angular/common/http';
import { IOathProvider } from '../oauth.provider.interface';

interface ILoginResponse {
    access_token: string;
}

interface IProfileResponse {
    first_name: string;
    last_name: string;
    email: string;
}

declare var FB: any;

@Injectable()
export class FacebookOauthProvider implements IOathProvider {
    private http: HttpClient;
    private config: Config;
    private facebook: Facebook;

    constructor(http: HttpClient, config: Config) {
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
        return this.http.get(this.getUrlLogin()).toPromise().then((data) =>{
            console.log(data);
        });
    }

    public getUrlLogin(): string {
        let toReturn = this.config.facebook.oAuthUrl;
        toReturn += toReturn.replace('clientId', this.config.facebook.appId);
        return toReturn;
    }
}

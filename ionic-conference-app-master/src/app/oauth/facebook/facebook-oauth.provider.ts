import { Injectable } from '@angular/core';

import { Facebook } from 'ng2-cordova-oauth/provider/facebook';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';
import { CALLBACK_API, ID_API_FB } from 'environments/environment';
import { IOathProvider } from '../oauth.provider.interface';
import { Observable } from 'rxjs';
import { OAuthProfile } from '../models/oauth-profile.model';

interface ILoginResponse {
    access_token: string;
}

interface IProfileResponse {
    first_name: string;
    last_name: string;
    email: string;
}

@Injectable()
export class FacebookOauthProvider implements IOathProvider{
    private http: HttpClient;
    private config: Config;
    private facebook: Facebook;

    constructor(http: HttpClient, config: Config) {
        this.http = http;
        this.config = config;
    }

    login():any  {
        return this.http.get('https://www.facebook.com/v3.3/dialog/oauth?client_id=' + ID_API_FB + '&redirect_uri=' + CALLBACK_API + '&state={"{st=state123abc,ds=123456789}"}')
        .subscribe((data)=>{
            console.log(data);
        });
    }

    getProfile(accessToken): any {
        return '';
    }
}

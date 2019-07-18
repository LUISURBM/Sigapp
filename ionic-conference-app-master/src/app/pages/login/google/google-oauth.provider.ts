import { Injectable } from '@angular/core';

import { IOathProvider } from '../oauth.provider.interface';
import { OAuthProfile } from '../models/oauth-profile.model';
import { Config } from '../../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { log } from 'app/decorators/log';
import { Router } from '@angular/router';

interface ILoginResponse {
    access_token: string;
}

declare var gapi: any;

@Injectable()
export class GoogleOauthProvider implements IOathProvider {
    private http: HttpClient;
    private config: Config;

    constructor(http: HttpClient, config: Config, private router: Router) {
        this.http = http;
        this.config = config;
        gapi.client.init({
            'apiKey': 'AIzaSyDXV593jPYDk3ixDjVRdFlBJcnorheuT0I',
            // Your API key will be automatically added to the Discovery Document URLs.
            'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
            // clientId and scope are optional if auth is not required.
            'clientId': '963354947120-b6ol79tmrd7h5diqe7qduat17hgd6t41.apps.googleusercontent.com',
            'scope': 'profile',
        });
    }

@log()
    login(): Promise<any> {
      return this.router.navigate(['/googleLogin', {externalUrl : this.getUrlLogin()}]);
        // return this.http.get(this.getUrlLogin(), this.getHttpOptions())
        //     .toPromise().then((data) => {
        //         console.log(data);
        //     });
    }

    getUrlLogin(): string {
        let toReturn = this.config.google.oAuthUrl;
        toReturn += toReturn.replace('clientId', this.config.google.appId);
        return toReturn;
    }

    getProfile(accessToken: string): any {
        return '';
    }

    getHttpOptions() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            })
        };
        return httpOptions;
    }
}

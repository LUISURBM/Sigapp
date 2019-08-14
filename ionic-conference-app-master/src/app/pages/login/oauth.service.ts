import { Injectable, Injector } from '@angular/core';
import { OAuthToken } from 'app/pages/login/models/oauth-token.model';
import { IOathProvider } from 'app/pages/login/oauth.provider.interface';
import { FacebookOauthProvider } from 'app/pages/login/facebook/facebook-oauth.provider';
import { GoogleOauthProvider } from 'app/pages/login/google/google-oauth.provider';



@Injectable()
export class OAuthService {
    private oauthTokenKey = 'oauthToken';
    private injector: Injector;

    constructor(injector: Injector) {
        this.injector = injector;
    }

    
    urlLogin(source: string): string {
        return this.getOAuthService(source).getUrlLogin();
    }

    async login(source: string): Promise<OAuthToken> {
        return this.getOAuthService(source).login().then(accessToken => {
            if (!accessToken) {
                return Promise.reject<OAuthToken>('No access token found');
            }

            let oauthToken = {
                accessToken: accessToken,
                source: source
            };
            this.setOAuthToken(oauthToken);
            return oauthToken;
        });
    }

    // getProfile(): any {
    //     if (!this.isAuthorized()) {
    //         return Promise.reject<OAuthProfile>('You are not authorized');
    //     }

    //     let oauthService = this.getOAuthService();
    //     return oauthService.getProfile(this.getOAuthToken().accessToken);
    // }

    isAuthorized(): boolean {
        return !!this.getOAuthToken();
    }

    getOAuthService(source?: string): IOathProvider {
        source = source || this.getOAuthToken().source;
        switch (source) {
            case 'facebook':
                return this.injector.get(FacebookOauthProvider);
            case 'google':
                return this.injector.get(GoogleOauthProvider);
            default:
                throw new Error(`Source '${source}' is not valid`);
        }
    }

    setOAuthToken(token: OAuthToken) {
        localStorage.setItem(this.oauthTokenKey, JSON.stringify(token));
    }

    getOAuthToken(): OAuthToken {
        let token = localStorage.getItem(this.oauthTokenKey);
        return token ? JSON.parse(token) : null;
    }
}

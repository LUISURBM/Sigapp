import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FacebookOauthProvider } from './facebook/facebook-oauth.provider';
import { GoogleOauthProvider } from './google/google-oauth.provider';
import { OAuthService } from 'app/pages/login/oauth.service';
import { Config } from 'app/config';
import { LoginPage } from './login';

@NgModule({
    imports: [IonicModule],
    declarations: [
    ],
    entryComponents: [
    ],
    providers: [
        OAuthService,
        GoogleOauthProvider,
        FacebookOauthProvider
    ]
})
export class OAuthModule {

}

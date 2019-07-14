import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FacebookOauthProvider } from './facebook/facebook-oauth.provider';

@NgModule({
    imports: [IonicModule],
    declarations: [
    ],
    entryComponents: [
    ],
    providers: [
        FacebookOauthProvider,
    ]
})
export class OAuthModule {

}

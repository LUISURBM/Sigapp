import { Injectable } from '@angular/core';
import { CALLBACK_API } from 'environments/environment';

@Injectable()
export class Config {
    public wordpressApiUrl = 'http://demo.titaniumtemplates.com/wordpress/?json=1';
    public facebook = {
        apiUrl: 'https://graph.facebook.com/v2.3/',
        appId: '334812790746569',
        scope: ['email'],
        oAuthUrl: 'https://www.facebook.com/v3.3/dialog/oauth?client_id=clientId&redirect_uri=' + CALLBACK_API
    };
    public google = {
        apiUrl: 'https://www.googleapis.com/oauth2/v4/',
        appId: '400671186930-m07eu77bm43tgr30p90k6b9e1qgsva4p.apps.googleusercontent.com',
        scope: ['email'],
        oAuthUrl: 'https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file&state=security_token%3D138r5719ru3e1%26url%3D'+CALLBACK_API+'&redirect_uri='+CALLBACK_API+'&response_type=code&client_id=clientId&prompt=consent&include_granted_scopes=true'
    };
}

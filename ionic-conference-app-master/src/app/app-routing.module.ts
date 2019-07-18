import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';
import { Config } from './config';
import { LoginPage } from './pages/login/login';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: './pages/account/account.module#AccountModule'
  },
  {
    path: 'support',
    loadChildren: './pages/support/support.module#SupportModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: 'signup',
    loadChildren: './pages/signup/signup.module#SignUpModule'
  },
  {
    path: 'app',
    loadChildren: './pages/tabs-page/tabs-page.module#TabsModule'
  },
  {
    path: 'tutorial',
    loadChildren: './pages/tutorial/tutorial.module#TutorialModule',
    canLoad: [CheckTutorial]
  },
  { path: 'profile', loadChildren: './pages/user/profile/profile.module#ProfilePageModule' },
  {
    path: 'google3805cbeecee9ab0b.html',
    redirectTo: '/google3805cbeecee9ab0b.html',
    pathMatch: 'full'
  },
  {
        path: 'externalRedirect',
        resolve: {
            url: 'https:%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fv2%2Fauth%3Fscope%3Dhttps%253A%252F%252Fwww.googleapis.com%252Fauth%252Fdrive.file&state%3Dsecurity_token%253D138r5719ru3e1%2526url%253Dhttps:%2F%2F8100-e1eacc3c-c7e0-4dc3-87ef-b973935f6032.ws-us0.gitpod.io%2Flogin&redirect_uri%3Dhttps:%2F%2F8100-e1eacc3c-c7e0-4dc3-87ef-b973935f6032.ws-us0.gitpod.io%2Flogin&response_type%3Dcode&client_id%3DclientId&prompt%3Dconsent&include_granted_scopes%3Dtruehttps:%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fv2%2Fauth%3Fscope%3Dhttps%253A%252F%252Fwww.googleapis.com%252Fauth%252Fdrive.file&state%3Dsecurity_token%253D138r5719ru3e1%2526url%253Dhttps:%2F%2F8100-e1eacc3c-c7e0-4dc3-87ef-b973935f6032.ws-us0.gitpod.io%2Flogin&redirect_uri%3Dhttps:%2F%2F8100-e1eacc3c-c7e0-4dc3-87ef-b973935f6032.ws-us0.gitpod.io%2Flogin&response_type%3Dcode&client_id%3D400671186930-m07eu77bm43tgr30p90k6b9e1qgsva4p.apps.googleusercontent.com&prompt%3Dconsent&include_granted_scopes%3Dtrue',
        },
        component: LoginPage
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

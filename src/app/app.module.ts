import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AddActivityComponent} from './components/add-activity/add-activity.component';
import {ActivityDetailsComponent} from './components/activity-details/activity-details.component';
import {ActivitiesListComponent} from './components/activities-list/activities-list.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {httpInterceptorProviders} from "./_helpers/http.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    AddActivityComponent,
    ActivityDetailsComponent,
    ActivitiesListComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders,
    {provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

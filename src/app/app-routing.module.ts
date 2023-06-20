import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivitiesListComponent} from "./components/activities-list/activities-list.component";
import {ActivityDetailsComponent} from "./components/activity-details/activity-details.component";
import {AddActivityComponent} from "./components/add-activity/add-activity.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  {path: '', redirectTo: 'activites', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inscription', component: RegisterComponent},
  {path: 'profil', component: ProfileComponent},
  {path: 'profil/:id', component: ProfileComponent},
  {path: 'activites', component: ActivitiesListComponent},
  {path: 'activite/:id', component: ActivityDetailsComponent},
  {path: 'ajouter', component: AddActivityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

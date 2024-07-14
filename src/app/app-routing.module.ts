import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileListComponent } from './pages/profiles/profile-list/profile-list.component';
import { CreateUpdateComponent } from './pages/profiles/create-update/create-update.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileListComponent,
  },
  {
    path: 'profile/create',
    component: CreateUpdateComponent,
  },
  {
    path: 'profile/edit/:id',
    component: CreateUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

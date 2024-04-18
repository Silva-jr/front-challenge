import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './config/guards/auth.guard';
import { AddRoomComponent } from './add-room/add-room.component';
import { GeralComponent } from './layout/geral/geral.component';
import { AuthComponent } from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: GeralComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
    ]
  },

  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

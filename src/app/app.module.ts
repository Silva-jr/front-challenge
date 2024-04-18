import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { AddRoomComponent } from './add-room/add-room.component';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { AuthComponent } from './layout/auth/auth.component';
import { GeralComponent } from './layout/geral/geral.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddRoomComponent,
    SideBarComponent,
    AuthComponent,
    GeralComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  exports:[
    MatDialogModule,
    MatDialogContent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//to fetch data from api
import { HttpClientModule } from '@angular/common/http';
import { SocketioService } from './services/socketio.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';


const appRoutes: Routes = [

  // { path: '', component: AppComponent }, //home page
  { path: 'login', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent }, 

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }

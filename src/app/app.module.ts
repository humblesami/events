import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from '../components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFound } from './pagenotfound';
import { HomeComponent } from '../components/home/home.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { HttpService } from 'src/services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFound,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

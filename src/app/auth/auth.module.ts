import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { MatError, MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatError,
    MatFormField,
  ]
})
export class AuthModule { }

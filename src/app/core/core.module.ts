import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authInterceptor } from './interceptors/auth.interceptor';
import {provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [provideHttpClient(withFetch(),withInterceptors([authInterceptor]))]
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from '../core/interceptors/auth.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      extend:true
    })
  ],
  exports: [TranslateModule],
  providers: [provideHttpClient(withFetch(),withInterceptors([authInterceptor]),withInterceptorsFromDi())]

})
export class SharedModule { }

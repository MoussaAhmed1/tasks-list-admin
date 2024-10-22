import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from '../core/interceptors/auth.interceptor';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { DirectDirective } from './directives/direct.directive';



@NgModule({
  declarations: [
    ConfirmComponent,
    DirectDirective
  ],
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

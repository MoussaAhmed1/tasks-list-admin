import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../core/interceptors/auth.interceptor';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [provideHttpClient(withFetch(),withInterceptors([authInterceptor]))]
})
export class DashboardModule { }

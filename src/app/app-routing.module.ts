import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardGuard } from './core/guards/dashboard.guard';

const routes: Routes = [
  {
    path: ``,
    // canActivate:[dashboardGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: `auth`,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

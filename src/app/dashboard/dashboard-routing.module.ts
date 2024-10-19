import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { dashboardGuard } from '../core/guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [
      dashboardGuard
    ],
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
      },
      {
        path:"tasks",
        loadChildren: () => import('./tasks-admin/tasks-admin.module').then(m => m.TasksAdminModule)
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

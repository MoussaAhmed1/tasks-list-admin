import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksAdminRoutingModule } from './tasks-admin-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';


@NgModule({
  declarations: [
    ListTasksComponent
  ],
  imports: [
    CommonModule,
    TasksAdminRoutingModule
  ]
})
export class TasksAdminModule { }

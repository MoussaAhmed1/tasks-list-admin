import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksAdminRoutingModule } from './tasks-admin-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { MatError, MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../core/interceptors/auth.interceptor';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MatPaginator } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ListTasksComponent,
    CreateTaskComponent,
    ConfirmationComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    TasksAdminRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatError,
    MatFormField,
    MatPaginator
  ],
  providers: [provideHttpClient(withFetch(),withInterceptors([authInterceptor]))]

})
export class TasksAdminModule { }

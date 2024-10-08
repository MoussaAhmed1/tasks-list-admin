import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskAdminService  {

  constructor(private httpclient:HttpClient) {

   }

   getTasks(){
    return this.httpclient.get(`${environment.baseApi}/tasks/all-tasks`)
   }
}

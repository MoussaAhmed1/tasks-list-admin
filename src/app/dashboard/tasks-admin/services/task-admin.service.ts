import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TaskFilter } from '../components/list-tasks/list-tasks.component';

@Injectable({
  providedIn: 'root'
})
export class TaskAdminService  {

  constructor(private httpClient:HttpClient) {

   }

   getTasks(filter?:TaskFilter){
    let params = new HttpParams();
    if(filter){
      Object.entries(filter).forEach(([key, value]: any) => {
        if (value != null && value != '' && value != 'Invalid date') {
          params = params.append(key, value);
        }
      })
      // if(filter?.keyword){
      //   params = params.append("keyword",filter?.keyword)
      // }
      // if(filter?.userId){
      //   params = params.append("userId",filter?.userId)
      // }
      // if(filter?.status){
      //   params = params.append("status",filter?.status)
      // }
      // if(filter?.fromDate && filter?.toDate && filter?.fromDate != 'Invalid date' && filter?.toDate != 'Invalid date'){
      //   params = params.append("fromDate",filter?.fromDate)
      //   params = params.append("toDate",filter?.toDate)
      // }
      // params = params.append("page",filter?.page)
      // params = params.append("limit",filter?.limit)
    }
    
    return this.httpClient.get(`${environment.baseApi}/tasks/all-tasks`,{params})
   }

   createTask(task:any){
    return this.httpClient.post(`${environment.baseApi}/tasks/add-task`,task)
   }

   deleteTask(id:string){
    // /tasks/delete-task/{id}
    return this.httpClient.delete(`${environment.baseApi}/tasks/delete-task/${id}`)
  }

  updateTask(task:any,id:string){
    return this.httpClient.put(`${environment.baseApi}/tasks/edit-task/${id}`,task)
  }
}

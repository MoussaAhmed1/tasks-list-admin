import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface ChangeStatus {
  id:string,
  status:string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  userData = new BehaviorSubject({})
  getAllUsers(filter:any) {
    let params = new HttpParams()
    if(filter) {
      Object.entries(filter).forEach(([key , value] : any) => {
        if(value) {
          params = params.append(key , value)
        }
      })
    }
    return this.http.get( environment.baseApi+'/auth/users' , {params})
}

getUsersData(model?:any) {
   
  this.getAllUsers(model).subscribe((res:any) => {
    this.userData.next({
      data:res.users,
      total:res.totalItems
    })
  })
}


deleteUser(id:string) {
  return this.http.delete( environment.baseApi+'/auth/user/'+id)
}

changeStatus(model:ChangeStatus) {
  return this.http.put( environment.baseApi+'/auth/user-status' , model)
}

}

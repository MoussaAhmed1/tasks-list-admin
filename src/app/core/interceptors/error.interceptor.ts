import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toaster = inject(ToastrService);
  return next(req).pipe(
    catchError((err:any) => {
      if(err.error.message == "jwt expired" || err.error.message == "jwt must provided" || err.error.message == "jwt malformed"){ 
       router.navigate(['/auth'])
        localStorage.removeItem('token')
      }
      toaster.error(err?.error?.message);
      return next(err);
      
  }));
};

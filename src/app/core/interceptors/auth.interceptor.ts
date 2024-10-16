import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const newRequest = req.clone({
    headers:req.headers.append("Authorization",`Bearer ${sessionStorage.getItem("token")}`)
  })
  console.log(newRequest);
  return next(newRequest);
};



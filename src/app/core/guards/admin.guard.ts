import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  if (localStorage.getItem('token')) {
    return true;
  }
  router.navigate(['/auth']);
  return false;
};

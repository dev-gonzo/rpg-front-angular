import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

export const AuthGuard: CanActivateFn = (): boolean => {
  const router: Router = inject(Router);
  const token: string | null = localStorage.getItem('token');
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};

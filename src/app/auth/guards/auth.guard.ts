import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const router: Router = inject(Router);
  const token: string | null = localStorage.getItem('token');
  const isAuthenticated: boolean = !!token;

  if (!isAuthenticated) {
    console.log("aaa", token)
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
}

export const AuthGuard: CanActivateFn = (): boolean => {
  const router = inject(Router);
  const token = localStorage.getItem('auth-token');

  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  try {
    const payload = jwtDecode<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000); // em segundos

    console.log('Token:', token);
    console.log('Payload:', payload);
    console.log('Agora:', now, 'Expiração:', payload.exp);

    if (payload.exp && payload.exp < now) {
      console.warn('Token expirado');
      localStorage.removeItem('auth-token');
      router.navigate(['/auth/login']);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Token inválido', err);
    localStorage.removeItem('auth-token');
    router.navigate(['/auth/login']);
    return false;
  }
};

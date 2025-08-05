import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '@/shared/components/toast/toast.service';

export const authErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const toast = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('auth-token');
        router.navigate(['/auth/login']);
      }

      if (error.status === 403) {
        toast.error('Acesso negado: recurso indisponível ou sem permissão.');
      }

      return throwError(() => error);
    }),
  );
};

import {
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { EnvironmentInjector } from '@angular/core';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { authErrorInterceptor } from './auth-error.interceptor';

describe('authErrorInterceptor', () => {
  let router: jasmine.SpyObj<Router>;
  let envInjector: EnvironmentInjector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    });

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    envInjector = TestBed.inject(EnvironmentInjector);

    localStorage.clear();
    localStorage.setItem('auth-token', 'token-teste');
  });

  const dummyRequest = new HttpRequest('GET', '/api/test');

  function runInterceptorWithError(status: number) {
    return envInjector.runInContext(() =>
      authErrorInterceptor(dummyRequest, () =>
        throwError(() => new HttpErrorResponse({ status })),
      ),
    );
  }

  it('deve redirecionar e remover token em erro 401', (done) => {
    runInterceptorWithError(401).subscribe({
      error: () => {
        expect(localStorage.getItem('auth-token')).toBeNull();
        expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
        done();
      },
    });
  });

  it('deve redirecionar e remover token em erro 403', (done) => {
    runInterceptorWithError(403).subscribe({
      error: () => {
        expect(localStorage.getItem('auth-token')).toBeNull();
        expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
        done();
      },
    });
  });

  it('não deve redirecionar ou remover token para outros erros', (done) => {
    runInterceptorWithError(500).subscribe({
      error: () => {
        expect(localStorage.getItem('auth-token')).toBe('token-teste');
        expect(router.navigate).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it('deve deixar requisição passar se não houver erro', (done) => {
    const result$ = envInjector.runInContext(() =>
      authErrorInterceptor(dummyRequest, () =>
        of(new HttpResponse({ status: 200, body: 'ok' })),
      ),
    );

    result$.subscribe({
      next: (res) => {
        expect(res instanceof HttpResponse).toBeTrue();

        if (res instanceof HttpResponse) {
          expect(res.body).toBe('ok');
        }

        expect(router.navigate).not.toHaveBeenCalled();
        done();
      },
    });
  });
});

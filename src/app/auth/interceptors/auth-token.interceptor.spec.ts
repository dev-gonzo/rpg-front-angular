import { TestBed } from '@angular/core/testing';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { authTokenInterceptor } from './auth-token.interceptor';
import { EnvironmentInjector } from '@angular/core';
import { Observable, of } from 'rxjs';

describe('authTokenInterceptor', () => {
  let envInjector: EnvironmentInjector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    envInjector = TestBed.inject(EnvironmentInjector);
    localStorage.clear();
  });

  function createRequest(): HttpRequest<any> {
    return new HttpRequest('GET', '/api/test');
  }

  it('deve adicionar o header Authorization quando há token', (done) => {
    const fakeToken = 'abc123';
    localStorage.setItem('auth-token', fakeToken);

    const req = createRequest();

    const next: HttpHandlerFn = (r: HttpRequest<any>) => {
      expect(r.headers.has('Authorization')).toBeTrue();
      expect(r.headers.get('Authorization')).toBe(`Bearer ${fakeToken}`);
      return of(new HttpResponse({ status: 200 }));
    };

    envInjector.runInContext(() => {
      authTokenInterceptor(req, next).subscribe(() => done());
    });
  });

  it('não deve adicionar o header Authorization quando não há token', (done) => {
    const req = createRequest();

    const next: HttpHandlerFn = (r: HttpRequest<any>) => {
      expect(r.headers.has('Authorization')).toBeFalse();
      return of(new HttpResponse({ status: 200 }));
    };

    envInjector.runInContext(() => {
      authTokenInterceptor(req, next).subscribe(() => done());
    });
  });
});

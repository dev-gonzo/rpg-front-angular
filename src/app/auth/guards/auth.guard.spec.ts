import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EnvironmentInjector } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { firstValueFrom, isObservable } from 'rxjs';

describe('AuthGuard', () => {
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
  });

  async function runGuard(): Promise<any> {
    const result = envInjector.runInContext(() =>
      AuthGuard({} as any, {} as any),
    );

    if (isObservable(result)) {
      return await firstValueFrom(result);
    }

    if (result instanceof Promise) {
      return await result;
    }

    return result;
  }

it('deve permitir acesso com token válido', async () => {
  const payload = { exp: Math.floor(Date.now() / 1000) + 3600 };
  const base64 = btoa(JSON.stringify(payload));
  const token = `aaa.${base64}.bbb`;

  localStorage.setItem('auth-token', token);

  const result = await runGuard();
  expect(result).toBeTrue();
  expect(router.navigate).not.toHaveBeenCalled();
});

  it('deve negar acesso se token estiver ausente', async () => {
    const result = await runGuard();
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('deve negar acesso se o token estiver expirado', async () => {
    (window as any).jwtDecode = () => ({
      exp: Math.floor(Date.now() / 1000) - 60,
    });

    localStorage.setItem('auth-token', 'expired-token');

    const result = await runGuard();
    expect(result).toBeFalse();
    expect(localStorage.getItem('auth-token')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('deve negar acesso se o token for inválido', async () => {
    (window as any).jwtDecode = () => {
      throw new Error('Invalid token');
    };

    localStorage.setItem('auth-token', 'invalid-token');

    const result = await runGuard();
    expect(result).toBeFalse();
    expect(localStorage.getItem('auth-token')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });
});

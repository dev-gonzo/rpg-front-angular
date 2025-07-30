import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { ToastService } from '@/shared/components/toast/toast.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: jasmine.SpyObj<Router>;
  let toast: jasmine.SpyObj<ToastService>;

  const TOKEN_KEY = 'auth-token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
        {
          provide: ToastService,
          useValue: jasmine.createSpyObj('ToastService', ['success']),
        },
      ],
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toast = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;

    localStorage.clear();
  });

  it('deve retornar null se não houver token', () => {
    expect(service.getToken()).toBeNull();
  });

  it('deve armazenar e retornar o token corretamente', () => {
    service.setToken('abc123');
    expect(localStorage.getItem(TOKEN_KEY)).toBe('abc123');
    expect(service.getToken()).toBe('abc123');
  });

  it('deve limpar o token', () => {
    service.setToken('abc123');
    service.clear();
    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
  });

  it('deve retornar true se estiver logado', () => {
    service.setToken('token');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('deve retornar false se não estiver logado', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('logout deve limpar token, navegar e exibir toast', () => {
    service.setToken('token');
    service.logout();

    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
    expect(toast.success).toHaveBeenCalledWith('Logout realizado com sucesso!');
  });
});

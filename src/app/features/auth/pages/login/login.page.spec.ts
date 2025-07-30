import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';


import { AuthApiService } from '@/api/auth/auth.api.service';
import { AuthService } from '@/auth/service/auth.service';
import { ToastService } from '@/shared/components/toast/toast.service';
import { provideNgxMask } from 'ngx-mask';
import { HomePrivatePage } from './login.page';

describe('HomePrivatePage', () => {
  let component: HomePrivatePage;
  let fixture: ComponentFixture<HomePrivatePage>;
  let authApi: jasmine.SpyObj<AuthApiService>;
  let authService: jasmine.SpyObj<AuthService>;
  let toast: jasmine.SpyObj<ToastService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePrivatePage],
      providers: [
         provideNgxMask(),
        {
          provide: AuthApiService,
          useValue: jasmine.createSpyObj('AuthApiService', ['login']),
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['setToken']),
        },
        {
          provide: ToastService,
          useValue: jasmine.createSpyObj('ToastService', ['success', 'error']),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePrivatePage);
    component = fixture.componentInstance;
    authApi = TestBed.inject(AuthApiService) as jasmine.SpyObj<AuthApiService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    toast = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('deve criar o formulário com os campos esperados', () => {
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
  });

  it('deve impedir submissão se o formulário for inválido', async () => {
    component.form.setValue({ email: '', password: '' });

    await component.onSubmit();

    expect(authApi.login).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });

  it('deve fazer login com sucesso', async () => {
    const mockToken = 'abc123';
    authApi.login.and.returnValue(of({ token: mockToken }));

    component.form.setValue({ email: 'user@email.com', password: '123456' });

    await component.onSubmit();

    expect(authApi.login).toHaveBeenCalledWith({
      email: 'user@email.com',
      password: '123456',
    });
    expect(authService.setToken).toHaveBeenCalledWith(mockToken);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(toast.success).toHaveBeenCalledWith('Login efetuado!');
  });

  it('deve exibir erro se o login falhar', async () => {
    authApi.login.and.returnValue(throwError(() => new Error('Erro')));

    component.form.setValue({ email: 'user@email.com', password: '123456' });

    await component.onSubmit();

    expect(authApi.login).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('E-mail ou senha inválidos');
  });
});

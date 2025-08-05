import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { authErrorInterceptor } from '@/core/interceptors/auth-error.interceptor';
import { authTokenInterceptor } from '@/core/interceptors/auth-token.interceptor';

import { HttpLoaderFactory } from '@/core/i18n/http-loader.factory';
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';
import { API_BASE_URL } from './app/core/tokens/api-base-url.token';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideNgxMask(),
    provideAnimations(),
    provideHttpClient(),
    provideHttpClient(
      withInterceptors([authTokenInterceptor, authErrorInterceptor]),
    ),
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        closeButton: true,
        timeOut: 2200,
        progressBar: true,
        preventDuplicates: true,
      }),
      TranslateModule.forRoot({}),
    ),
    { provide: API_BASE_URL, useValue: environment.apiUrl },
  ],
});

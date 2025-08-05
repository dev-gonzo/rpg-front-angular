import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { authErrorInterceptor } from '@/auth/interceptors/auth-error.interceptor';
import { authTokenInterceptor } from '@/auth/interceptors/auth-token.interceptor';

import { AppComponent } from './app/app';
import { routes } from './app/app.routes';
import { API_BASE_URL } from './app/core/tokens/api-base-url.token';
import { environment } from './environments/environment';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

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
      TranslateModule.forRoot({
        defaultLanguage: 'pt',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    { provide: API_BASE_URL, useValue: environment.apiUrl },
  ],
});

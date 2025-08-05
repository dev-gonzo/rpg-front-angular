import { API_BASE_URL } from '@/core/tokens/api-base-url.token';
import { HttpClient } from '@angular/common/http';
import { Directive, inject } from '@angular/core';

@Directive()
export abstract class ServiceAbstractClass {
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl = inject(API_BASE_URL);
}

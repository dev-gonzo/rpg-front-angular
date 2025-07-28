import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '@app/core/tokens/api-base-url.token';

import { UserResponse } from './user.types';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  user(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/user/me`);
  }
}

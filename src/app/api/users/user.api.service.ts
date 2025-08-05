import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { ServiceAbstractClass } from '../service-abstract-class';
import { UserResponse } from './user.types';

@Injectable({ providedIn: 'root' })
export class UserApiService extends ServiceAbstractClass {
  user(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/user/me`);
  }
}

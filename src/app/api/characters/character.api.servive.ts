import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '@app/core/tokens/api-base-url.token';

import { CharacterHomeDto } from './character.types';

@Injectable({ providedIn: 'root' })
export class CharacterHomeApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  characters(): Observable<CharacterHomeDto> {
    return this.http.get<CharacterHomeDto>(`${this.baseUrl}/characters`);
  }
}

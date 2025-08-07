import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServiceAbstractClass } from '../service-abstract-class';
import {
  CharacterInfoRequest,
  CharacterInfoResponse,
} from './character-info.types';

@Injectable({ providedIn: 'root' })
export class CharacterApiService extends ServiceAbstractClass {
  saveCharacter(data: CharacterInfoRequest): Observable<CharacterInfoResponse> {
    return this.http.post<CharacterInfoResponse>(
      `${this.baseUrl}/characters`,
      data,
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServiceAbstractClass } from '../service-abstract-class';
import {
  CharacterInfoRequest,
  CharacterInfoResponse,
} from './character-info.types';

@Injectable({ providedIn: 'root' })
export class CharacterInfoApiService extends ServiceAbstractClass {
  characterInfo(id: string): Observable<CharacterInfoResponse> {
    return this.http.get<CharacterInfoResponse>(
      `${this.baseUrl}/characters/${id}/info`,
    );
  }

  saveCharacterInfo(
    id: string,
    data: CharacterInfoRequest,
  ): Observable<CharacterInfoResponse> {

    return this.http.post<CharacterInfoResponse>(
      `${this.baseUrl}/characters/${id}/info`,
      data,
    );
  }
}

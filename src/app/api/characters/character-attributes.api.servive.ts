import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServiceAbstractClass } from '../service-abstract-class';
import { CharacterAttributesRequest, CharacterAttributesResponse } from './character-attributes.types';

@Injectable({ providedIn: 'root' })
export class CharacterAttributesApiService extends ServiceAbstractClass {
  characterAttributes(id: string): Observable<CharacterAttributesResponse> {
    return this.http.get<CharacterAttributesResponse>(
      `${this.baseUrl}/characters/${id}/attributes`,
    );
  }

  saveCharacterAttributes(
    id: string,
    data: CharacterAttributesRequest,
  ): Observable<CharacterAttributesResponse> {

    return this.http.post<CharacterAttributesResponse>(
      `${this.baseUrl}/characters/${id}/attributes`,
      data,
    );
  }
}

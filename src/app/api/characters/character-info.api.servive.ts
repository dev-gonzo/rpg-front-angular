import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { ServiceAbstractClass } from '../service-abstract-class';
import { CharacterInfoDto } from './character.types';

@Injectable({ providedIn: 'root' })
export class CharacterInfoApiService extends ServiceAbstractClass  {

  characterInfo(id: string): Observable<CharacterInfoDto> {
    return this.http.get<CharacterInfoDto>(`${this.baseUrl}/characters/${id}/info`);
  }
}

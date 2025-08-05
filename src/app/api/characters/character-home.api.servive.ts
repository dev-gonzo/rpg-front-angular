import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CharacterHomeDto } from './character.types';
import { ServiceAbstractClass } from '../service-abstract-class';

@Injectable({ providedIn: 'root' })
export class CharacterHomeApiService extends ServiceAbstractClass {

  characters(): Observable<CharacterHomeDto[]> {
    return this.http.get<CharacterHomeDto[]>(`${this.baseUrl}/characters`);
  }
}

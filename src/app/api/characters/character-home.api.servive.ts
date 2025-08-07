import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServiceAbstractClass } from '../service-abstract-class';
import { CharacterHomeDto } from './character-home.types';

@Injectable({ providedIn: 'root' })
export class CharacterHomeApiService extends ServiceAbstractClass {

  characters(): Observable<CharacterHomeDto[]> {
    return this.http.get<CharacterHomeDto[]>(`${this.baseUrl}/characters`);
  }
}

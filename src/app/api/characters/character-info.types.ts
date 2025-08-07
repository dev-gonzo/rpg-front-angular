import { UserResponse } from '../users/user.types';

export interface CharacterInfoRequest {
  name: string;
  profession?: string;
  birthDate: Date | string;
  birthPlace?: string;
  gender?: string;
  age?: number;
  apparentAge?: number;
  heightCm?: number;
  weightKg?: number;
  religion?: string;
}

export interface CharacterInfoResponse extends CharacterInfoRequest {
  id: string;
}

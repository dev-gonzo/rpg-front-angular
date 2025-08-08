import { UserResponse } from '../users/user.types';

export interface CharacterAttributesRequest {
  characterId: String;

  con: number;
  fr: number;
  dex: number;
  agi: number;
  int: number;
  will: number;
  per: number;
  car: number;

  conMod: number;
  frMod: number;
  dexMod: number;
  agiMod: number;
  intMod: number;
  willMod: number;
  perMod: number;
  carMod: number;
}

export interface CharacterAttributesResponse
  extends CharacterAttributesRequest {
  characterId: string;
}

import { CharacterAttributesRequest } from '@/api/characters/character-attributes.types';

export interface AttributesTypePage extends CharacterAttributesRequest {
  conPercent: number;
  frPercent: number;
  dexPercent: number;
  agiPercent: number;
  intPercent: number;
  willPercent: number;
  perPercent: number;
  carPercent: number;
  conPercentMod: number;
  frPercentMod: number;
  dexPercentMod: number;
  agiPercentMod: number;
  intPercentMod: number;
  willPercentMod: number;
  perPercentMod: number;
  carPercentMod: number;
  conPercentTotal: number;
  frPercentTotal: number;
  dexPercentTotal: number;
  agiPercentTotal: number;
  intPercentTotal: number;
  willPercentTotal: number;
  perPercentTotal: number;
  carPercentTotal: number;
}

import { UserResponse } from '../users/user.types';

export interface CharacterInfoDto {
  id: string;
  name: string;
  age: number;
  apparentAge: number;
  profession: string;

  hitPoints: number;
  currentHitPoints: number;
  initiative: number;
  currentInitiative: number;
  heroPoints: number;
  currentHeroPoints: number;
  magicPoints: number;
  currentMagicPoints: number;
  faithPoints: number;
  currentFaithPoints: number;
  protectionIndex: number;
  currentProtectionIndex: number;

  image: string;

  controlUserId: string;
  controlUser: UserResponse;

  edit: boolean;
}

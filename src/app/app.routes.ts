import { Routes } from '@angular/router';

import { AUTH_ROUTES } from './features/auth/auth.routes';
import { HOME_ROUTES } from './features/home/home.routes';
import { NOT_FOUND_ROUTES } from './features/not-found/not-found.routes';
import { CHARACTER_ROUTES } from './features/character/character.routes';

export const routes: Routes = [
  ...HOME_ROUTES,
  ...AUTH_ROUTES,
  ...CHARACTER_ROUTES,
  ...NOT_FOUND_ROUTES,
];

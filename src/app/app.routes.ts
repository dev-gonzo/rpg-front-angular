import { Routes } from '@angular/router';

import { AUTH_ROUTES } from './features/auth/auth.routes';
import { HOME_ROUTES } from './features/home/home.routes';

export const routes: Routes = [
  ...HOME_ROUTES,
  ...AUTH_ROUTES
];

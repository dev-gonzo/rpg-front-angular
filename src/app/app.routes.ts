import { Routes } from '@angular/router';

import { HOME_ROUTES } from './features/home/home.routes';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { CONTACTS_ROUTES } from './features/contacts/contacts.routes';

export const routes: Routes = [
  ...HOME_ROUTES,
  ...AUTH_ROUTES,
  ...CONTACTS_ROUTES,
];

import { Routes } from '@angular/router';

import { LayoutBlankComponent } from '../../layouts/layout-blank/layout-blank.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LayoutBlankComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/login/login.page').then(
                (m) => m.HomePrivatePage
              ),
          },
        ],
      },
    ],
  },
];

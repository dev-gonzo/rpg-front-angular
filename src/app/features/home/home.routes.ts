import { Routes } from '@angular/router';

import { AuthGuard } from '../../auth/guards/auth.guard';
import { LayoutBlankComponent } from '../../layouts/layout-blank/layout-blank.component';
import { LayoutMainComponent } from '../../layouts/layout-main/layout-main.component';

export const HOME_ROUTES: Routes = [

  {
    path: '',
    children: [
      {
        path: 'home',
        component: LayoutMainComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/private/home-private.component').then(
                (m) => m.HomePrivateComponent
              ),
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: '',
        component: LayoutBlankComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/public/home-public.component').then(
                (m) => m.HomePublicComponent
              ),
          },
        ],
      },
    ],
  },
];

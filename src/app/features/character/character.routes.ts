import { Routes } from '@angular/router';

import { AuthGuard } from '../../auth/guards/auth.guard';
import { LayoutMainComponent } from '../../layouts/layout-main/layout-main.component';

export const CHARACTER_ROUTES: Routes = [
  {
    path: 'character',
    component: LayoutMainComponent,
    children: [
      {
        path: 'create',
        loadComponent: () =>
          import('./pages/info/info.page').then((m) => m.InfoPage),
        canActivate: [AuthGuard],
      },
      {
        path: ':id/info',
        loadComponent: () =>
          import('./pages/info/info.page').then((m) => m.InfoPage),
        canActivate: [AuthGuard],
      },
      {
        path: ':id/info/:edit',
        loadComponent: () =>
          import('./pages/info/info.page').then((m) => m.InfoPage),
        canActivate: [AuthGuard],
      },
    ],
  },
];

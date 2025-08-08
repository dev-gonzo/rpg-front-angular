import { Routes } from '@angular/router';

import { AuthGuard } from '../../auth/guards/auth.guard';
import { LayoutMainComponent } from '../../layouts/layout-main/layout-main.component';

export const CHARACTER_ROUTES: Routes = [
  {
    path: 'character',
    component: LayoutMainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        loadComponent: () =>
          import('./pages/info/info.page').then((m) => m.InfoPage),
      },
      {
        path: ':id',

        children: [
          {
            path: 'info',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./pages/info/info.page').then((m) => m.InfoPage),
              },
              {
                path: ':edit',
                loadComponent: () =>
                  import('./pages/info/info.page').then((m) => m.InfoPage),
              },
            ],
          },
          {
            path: 'attributes',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./pages/attributes/attributes.page').then(
                    (m) => m.AttributesPage,
                  ),
              },
              {
                path: ':edit',
                loadComponent: () =>
                  import('./pages/attributes/attributes.page').then(
                    (m) => m.AttributesPage,
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
];

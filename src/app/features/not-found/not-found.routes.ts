import { Routes } from '@angular/router';

import { LayoutBlankComponent } from '@app/layouts/layout-blank/layout-blank.component';

export const NOT_FOUND_ROUTES: Routes = [
  {
    path: '**',
    children: [
      {
        path: '',
        component: LayoutBlankComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/not-found.component').then(
                (m) => m.NotFoundComponent,
              ),
          },
        ],
      },
    ],
  },
];

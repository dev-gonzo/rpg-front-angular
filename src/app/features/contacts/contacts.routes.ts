import { Routes } from '@angular/router';

// import { AuthGuard } from '@app/auth/guards/auth.guard';
import { LayoutMainComponent } from '@app/layouts/layout-main/layout-main.component';

export const CONTACTS_ROUTES: Routes = [
  {
    path: 'contato',
    children: [
      {
        path: '',
        component: LayoutMainComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/contact-us-page.component').then(
                (m) => m.ContactUsPageComponent,
              ),
            // canActivate: [AuthGuard],
          },
        ],
      },
    ],
  },
];

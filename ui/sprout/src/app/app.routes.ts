import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { AuthenticatedGuard } from './auth/authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    children: [
      {
        path: '',
        component: IndexComponent,
      }
    ],
    canActivate: [AuthenticatedGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
];

import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  }, {
    path: '',
    component: MainLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/main-layout/main-layout.module#MainLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: 'table'
  }
]

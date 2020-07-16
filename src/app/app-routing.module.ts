import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },

  // {
  //   path: 'add-new-item',
  //   loadChildren: () => import('./pages/add-new-item/add-new-item.module').then( m => m.AddNewItemPageModule)
  // },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  // {
  //   path: 'add-new-item',
  //   loadChildren: () => import('./pages/add-new-item/add-new-item.module').then( m => m.AddNewItemPageModule)
  // },
  // {
  //   path: 'view-edit-item',
  //   loadChildren: () => import('./pages/view-edit-item/view-edit-item.module').then( m => m.ViewEditItemPageModule)
  // },
  // {
  //   path: 'account',
  //   loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  // },
  // {
  //   path: 'view-details-modal',
  //   loadChildren: () => import('./pages/view-details-modal/view-details-modal.module').then( m => m.ViewDetailsModalPageModule)
  // },
  // {
  //   path: 'view-edit-item',
  //   loadChildren: () => import('./pages/view-edit-item/view-edit-item.module').then( m => m.ViewEditItemPageModule)
  // },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

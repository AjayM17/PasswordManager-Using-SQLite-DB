import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {

    path: '',
    component: DashboardPage
  },
  {
    path: 'add-new-item',
    loadChildren: () => import('../add-new-item/add-new-item.module').then( m => m.AddNewItemPageModule)
  },
  {
    path: 'view-edit-item',
    loadChildren: () => import('../view-edit-item/view-edit-item.module').then( m => m.ViewEditItemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}

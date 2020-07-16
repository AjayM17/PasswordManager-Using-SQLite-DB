import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewEditItemPage } from './view-edit-item.page';

const routes: Routes = [
  {
    path: '',
    component: ViewEditItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewEditItemPageRoutingModule {}

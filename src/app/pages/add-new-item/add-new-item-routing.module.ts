import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewItemPage } from './add-new-item.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewItemPageRoutingModule {}

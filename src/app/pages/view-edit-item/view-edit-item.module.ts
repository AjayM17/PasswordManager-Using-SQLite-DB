import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewEditItemPageRoutingModule } from './view-edit-item-routing.module';

import { ViewEditItemPage } from './view-edit-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewEditItemPageRoutingModule
  ],
  declarations: [ViewEditItemPage]
})
export class ViewEditItemPageModule {}

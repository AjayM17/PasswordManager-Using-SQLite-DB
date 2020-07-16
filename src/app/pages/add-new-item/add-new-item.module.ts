import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewItemPageRoutingModule } from './add-new-item-routing.module';

import { AddNewItemPage } from './add-new-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewItemPageRoutingModule
  ],
  declarations: [AddNewItemPage]
})
export class AddNewItemPageModule {}

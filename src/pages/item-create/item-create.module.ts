import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ItemCreatePage } from './item-create';
import { ModalContentPage } from './modalContentPage';

@NgModule({
  declarations: [
    ItemCreatePage, ModalContentPage
  ],
  imports: [
    IonicPageModule.forChild(ItemCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    ItemCreatePage, ModalContentPage
  ]
})
export class ItemCreatePageModule { }

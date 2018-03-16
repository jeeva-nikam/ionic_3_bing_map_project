import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Api } from '../../providers/providers';

@IonicPage({segment: 'Tasks/:?id'})
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams,private api: Api) {
    this.item = navParams.get('item');// || items.defaultItem;

    console.log(this.item);
    console.log(navParams);
    //console.log(items.defaultItem);
   // console.lo
   //this.getTaskById('Task', this.item);
  }

  getTaskById(task, id){
    this.api.get(task, {id: id}).subscribe(data => {
      console.log('single task', data);
    }, error => {

    })
  }

}

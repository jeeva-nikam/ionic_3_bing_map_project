import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Api } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage({segment: 'Tasks/:?id'})
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  data1: any = {Id:"",Title:"",Status:"",description:"",addedBy:0,addedOn:"",updatedBy:"",updatedOn:""};

  constructor(public navCtrl: NavController, navParams: NavParams,private api: Api) {
    this.item = navParams.get('item');
    console.log(this.item);
    console.log(navParams);
   this.getTaskById('Tasks', this.item);
  }

  getTaskById(task, id){
    var url = task + '/' + id;
      this.api.get(url).subscribe(data => {
      console.log('single task', data[0]);
      this.data1 =  data[0];
    }, error => {})
  }

  taskDone(){
    var url = 'Tasks/' +  this.item
    this.api.put(url, {status: 'done'}, this.item).subscribe(data => {
      this.navCtrl.push(MainPage);
      
    }, error => {})
  }

 

}

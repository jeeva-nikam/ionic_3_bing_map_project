import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { Api } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: any;

  constructor(private api: Api, public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) {
    //this.currentItems = this.items.query();
    this.getTasks();
    //console.log('DEFR'.toLowerCase());
  }

  getTasks(){
    this.api.get('Tasks').subscribe(
      data => {
        //console.log(data);      
        
        this.currentItems = data;
      },
      error => {

      })
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.api.get('Tasks').subscribe(
      data => {
        console.log(data);      
        
        this.currentItems = data;

            // set val to the value of the searchbar
        let val = ev.target.value;
        
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.currentItems = this.currentItems.filter((item: any) => {
            return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
      },
      error => {

      })
    
  }
}

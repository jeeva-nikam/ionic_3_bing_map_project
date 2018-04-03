import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Api } from '../../providers/providers';
import { MainPage } from '../pages';

//import { ModalPage } from './modal-page-bing-map';
import { ModalController, Platform, NavParams } from 'ionic-angular';
//import { GeoLocationService } from  '../../providers/providers';



 @Component({
    template: `
  <ion-header>
    <ion-toolbar>
      <ion-title>
        Description
      </ion-title>
      <ion-buttons start>
        <button ion-button (click)="dismiss()">
          <span ion-text color="primary" showWhen="ios">Cancel</span>
          <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
        </button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-list>
        <ion-item>
            <div class='panel panel-primary'>
              <div class='panel-heading'>
                  {{pageTitle}}
              </div>
              <div id='myMap' style="width:600vw;height:400vh;"></div> 
            </div>
        </ion-item>
       
    </ion-list>
  </ion-content>
  `
  })

  export class ModalContentPage implements OnInit, AfterViewInit {
    character;
    public pageTitle: string = "Map";
    @ViewChild('myMap') myMap;
    
    constructor( public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {
//public geoLocationService: GeoLocationService,
      //  geoLocationService.watchposition().subscribe(data => {
      //    console.log('location data', data);
      //  }, error => {
      //   console.log('location data error', error);
      //  })
     
      
     
    }
  
    dismiss() {
      this.viewCtrl.dismiss();
    }

    ngOnInit(){

    }

    ngAfterViewInit(){  
      var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
          credentials: 'ApLMBfuQR03OCFmq9p38JNXjqePXfoSsHepA767XrRAx58m0abLM7Yo7CX4BQ_MT'
      });
      var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
      var layer = new Microsoft.Maps.Layer();
      layer.add(pushpin);
      map.layers.insert(layer);
    }
}
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Api } from '../../providers/providers';
import { MainPage } from '../pages';

//import { ModalPage } from './modal-page-bing-map';
import { ModalController, Platform, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  constructor(public modalCtrl: ModalController, private api: Api, public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera) {
    this.form = formBuilder.group({
     // profilePic: [''],
      title: ['', Validators.required],
      description : ['', Validators.required],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  openModal(characterNum) {
    alert('called');
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }else{console.log(this.form)}
    //this.viewCtrl.dismiss(this.form.value);
    var body = this.form.value;
    this.api.post('Tasks', body).subscribe(data => {
      console.log('single task', data[0]);
      this.navCtrl.push(MainPage);
      //data = JSON.parse(data[0]);
      //this.data1 =  data[0];
    }, error => {})
  }
}






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
          <ion-avatar item-start>
            <img src="{{character.image}}">
          </ion-avatar>
          <h2>{{character.name}}</h2>
          <p>{{character.quote}}</p>
        </ion-item>
        <ion-item *ngFor="let item of character['items']">
          {{item.title}}
          <ion-note item-end>
            {{item.note}}
          </ion-note>
        </ion-item>
    </ion-list>
  </ion-content>
  `
  })

  export class ModalContentPage {
    character;
  
    constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
    ) {
      var characters = [
        {
          name: 'Gollum',
          quote: 'Sneaky little hobbitses!',
          image: 'assets/img/avatar-gollum.jpg',
          items: [
            { title: 'Race', note: 'Hobbit' },
            { title: 'Culture', note: 'River Folk' },
            { title: 'Alter Ego', note: 'Smeagol' }
          ]
        },
        {
          name: 'Frodo',
          quote: 'Go back, Sam! I\'m going to Mordor alone!',
          image: 'assets/img/avatar-frodo.jpg',
          items: [
            { title: 'Race', note: 'Hobbit' },
            { title: 'Culture', note: 'Shire Folk' },
            { title: 'Weapon', note: 'Sting' }
          ]
        },
        {
          name: 'Samwise Gamgee',
          quote: 'What we need is a few good taters.',
          image: 'assets/img/avatar-samwise.jpg',
          items: [
            { title: 'Race', note: 'Hobbit' },
            { title: 'Culture', note: 'Shire Folk' },
            { title: 'Nickname', note: 'Sam' }
          ]
        }
      ];
      this.character = characters[this.params.get('charNum')];
    }
  
    dismiss() {
      this.viewCtrl.dismiss();
    }
}

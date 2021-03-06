import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Api } from '../../providers/providers';
import { GeoLocationService} from '../../providers/providers';
import { MainPage } from '../pages';

//import { ModalPage } from './modal-page-bing-map';
import { ModalController, Platform } from 'ionic-angular';
import { ModalContentPage} from './modalContentPage';


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

  constructor( public modalCtrl: ModalController, private api: Api, public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera) {
   
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
    //alert('called');
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

 

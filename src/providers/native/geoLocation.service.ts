import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

export class GeoLocationService {

  constructor(private platform: Platform, private geolocation: Geolocation) {

    platform.ready().then(() => {

      // get current position
      geolocation.getCurrentPosition().then(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      });

      const watch = this.geolocation.watchPosition().subscribe(pos => {
                console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
              });
        
              //return watch;
              // to stop watching
              watch.unsubscribe();
      

    });
  }

//   watchposition(){
//     const watch = this.geolocation.watchPosition().subscribe(pos => {
//         console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
//       });

//       return watch;
//       // to stop watching
//       //watch.unsubscribe();
//   }
}

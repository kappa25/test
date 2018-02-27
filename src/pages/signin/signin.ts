import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading,AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
//import * as firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { RoomPage } from  '../room/room';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-signin',
   templateUrl: 'signin.html',
 })
 export class SigninPage {

   data = { nickname:"" };
   loading: Loading;
   constructor(public navCtrl: NavController, public navParams: NavParams, translate: TranslateService,
     public alertCtrl: AlertController,public authData: AuthProvider) {
     translate.setDefaultLang(window.navigator.language);
//     if (window.navigator.language === "fr") {
//  console.log(window.navigator.language); 
// }

}

ionViewDidLoad() {
  console.log('ionViewDidLoad SigninPage');
}

enterNickname(){
//   var user = firebase.auth().currentUser;
//   user.updateProfile({
//     displayName: this.data.nickname,
//     photoURL: ''
//   }).then(function(){
//     console.log('success'),
//     this.navCtrl.setRoot(RoomPage, {
//             nickname: this.data.nickname
//           });
//   //it print "displayName":null
// }, function(error){
//   console.log(error)
// });
this.navCtrl.setRoot(RoomPage, {
  nickname: this.data.nickname
});

}
logout(){
  this.authData.logoutUser().then(()=>{
    this.navCtrl.setRoot('LoginPage');
  });
}

}

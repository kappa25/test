import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddRoomPage } from '../add-room/add-room';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-room',
   templateUrl: 'room.html',
 })
 export class RoomPage {


   rooms =[];
   ref = firebase.database().ref('chatrooms/');
   user;
   mail;

   constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     translate: TranslateService,
     public authData: AuthProvider,
     public storage: Storage) {
     translate.setDefaultLang(window.navigator.language);
    //translate.setDefaultLang('fr');
    this.ref.on('value', resp =>{
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
    // this.init().then((values)=>{
    //   //this.getSeasonList();
    //   console.log('cons user', this.user);
    //   console.log('cons Retrived mail is', this.mail);
    // });
  }

  addRoom(){
  	this.navCtrl.push(AddRoomPage);
  }
  // public init(){

  //   let promiseList: Promise<any>[] = [];
  //   promiseList.push(
  //     this.storage.get('user').then((user) => {
  //       console.log('user', user);
  //       this.user = user;

  //     } ));
  //   promiseList.push(
  //     this.storage.get('mail').then((mail) => {
  //       console.log('Retrived mail is', mail);
  //       this.mail = mail;
  //     } ));

  //   return Promise.all(promiseList);
  // }
  joinRoom(key){
    console.log(key);
    this.navCtrl.setRoot(HomePage, {
      key:key,
      //nickname:this.user
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }
  logout(){
    this.authData.logoutUser().then(()=>{
      this.storage.clear();
      this.navCtrl.setRoot('LoginPage');
    });
  }

}
export const snapshotToArray = snapshot => {
	let returnArr = [];

	snapshot.forEach(childSnapshot =>{
		let item = childSnapshot.val();
		item.key = childSnapshot.key;
		returnArr.push(item);
	});
	return returnArr;
}

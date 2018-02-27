import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the AddRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-add-room',
 	templateUrl: 'add-room.html',
 })
 export class AddRoomPage {

 	data = {roomname:''};
 	ref = firebase.database().ref('chatrooms/');
 	constructor(public navCtrl: NavController, public navParams: NavParams, translate: TranslateService) {
translate.setDefaultLang(window.navigator.language);
 		//translate.setDefaultLang('fr');
 		
 	}

 	addRoom() {
 			let newData = this.ref.push();
 			newData.set({
 				roomname:this.data.roomname
 			});
 			this.navCtrl.pop();
 		}
 		
 	ionViewDidLoad() {
 		console.log('ionViewDidLoad AddRoomPage');
 	}

 }

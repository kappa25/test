import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { RoomPage } from '../room/room';
import * as firebase from 'firebase/app';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild(Content) content: Content;


data = {type:'', nickname:'',message:''};
chats = [];
roomkey:string;
nickname:string;
offStatus:boolean = false;
exitMessage:string;
joinMessage:string;
user;
test;
constructor(public navCtrl: NavController, public navParams: NavParams, translate: TranslateService,
  public storage: Storage) {
  translate.setDefaultLang(window.navigator.language);
  //translate.setDefaultLang('fr');
  this.roomkey = this.navParams.get("key") as string;
  this.init().then((values)=>{
      console.log('cons user', this.nickname);
      this.tes();
      console.log('test', this.test);
  //this.nickname = this.navParams.get("nickname") as string;
  this.data.type = 'message';
  this.data.nickname= this.nickname.split('"')[1];

  translate.get('has left this room.').subscribe(
  value => {
    // value is our translated string
    this.exitMessage = value;
  }
);

  let joinData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
  translate.get('has joined this room.').subscribe(
  value => {
    // value is our translated string
    this.joinMessage = value;
  }
),
  joinData.set({
    type:'join',
    user:this.nickname,
    message:this.joinMessage,
    sendDate:Date()
  });
  this.data.message='';
  firebase.database().ref('chatrooms/'+this.roomkey+'/chats').on('value', resp => {
    this.chats = [];
    this.chats = snapshotToArray(resp);
    setTimeout(() => {
      if(this.offStatus === false){
          this.content.scrollToBottom(300);
      }
  		}, 1000);//$*****************************************
  });
});
}
private async tes(){
  this.test= await this.storage.get('user');
  console.log('method', this.test);
}
public init(){

    let promiseList: Promise<any>[] = [];
    promiseList.push(
      this.storage.get('user').then((user) => {
        console.log('user', user.split('"')[1]);
        this.nickname = user.split('"')[1] as string;

      } ));
    // promiseList.push(
    //   this.storage.get('mail').then((mail) => {
    //     console.log('Retrived mail is', mail);
    //     this.mail = mail;
    //   } ));

    return Promise.all(promiseList);
  }

 sendMessage(){
  let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
  newData.set({
    type:this.data.type,
    user:this.nickname,
    message:this.data.message,
    sendDate:Date()
  });
  this.data.message = '';
}
exitChat(){
  let exitData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
  
  exitData.set({
    type:'exit',
    user:this.nickname,
    message:this.exitMessage,
    sendDate:Date()
  });
  this.offStatus = true;
  this.navCtrl.setRoot(RoomPage, {
    nickname:this.nickname
  });
}

}

export const snapshotToArray = snapshot =>{
	let returnArr = [];
	snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
        item.key = childSnapshot.key;
		returnArr.push(item);
	}); 
	return returnArr;
};

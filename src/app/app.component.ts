import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import * as firebase from 'firebase';

//import { HomePage } from '../pages/home/home';
//import { SigninPage } from '../pages/signin/signin';
//import { RoomPage } from '../pages/room/room';

import { AngularFireAuth } from 'angularfire2/auth';


// const config = {
//     apiKey: "AIzaSyAngEqBNtJfk9l6L7_DVTu2XVkmDUeHjZ8",
//     authDomain: "chat-b4b05.firebaseapp.com",
//     databaseURL: "https://chat-b4b05.firebaseio.com",
//     projectId: "chat-b4b05",
//     storageBucket: "chat-b4b05.appspot.com",
//     messagingSenderId: "516958347056"
//   };
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth,) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
   //  firebase.initializeApp(config);
     const authObserver = afAuth.authState.subscribe( user =>{
      if (user){
        this.rootPage = 'RoomPage';
        authObserver.unsubscribe();
      }else{
        this.rootPage= 'LoginPage';
        authObserver.unsubscribe();
      }
    });
  }
}


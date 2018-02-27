import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient} from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddRoomPage } from '../pages/add-room/add-room';
import { AuthProvider } from '../providers/auth/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAngEqBNtJfk9l6L7_DVTu2XVkmDUeHjZ8",
    authDomain: "chat-b4b05.firebaseapp.com",
    databaseURL: "https://chat-b4b05.firebaseio.com",
    projectId: "chat-b4b05",
    storageBucket: "chat-b4b05.appspot.com",
    messagingSenderId: "516958347056"
  };

@NgModule({
  declarations: [
      MyApp,
      HomePage,
      AddRoomPage
  ],
  imports: [
      BrowserModule,
      IonicModule.forRoot(MyApp),
      HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
          }
        }),
       AngularFireModule.initializeApp(firebaseConfig),
       AngularFireAuthModule,
       IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddRoomPage
  ],
  providers: [
  StatusBar,
  SplashScreen,
  {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})

export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/", ".json");
}
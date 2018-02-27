import { Component } from '@angular/core';
import { IonicPage,
  NavController,
  LoadingController,
  Loading,
  AlertController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
//import { RoomPage } from '../room/room';
import { EmailValidator } from '../../validators/email';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-login',
   templateUrl: 'login.html',
 })
 export class LoginPage {

   loginForm:FormGroup;
   loading: Loading;
   data = { nickname:"" };
   constructor(public navCtrl: NavController, public authData: AuthProvider, 
     public formBuilder: FormBuilder, public alertCtrl: AlertController,
     public loadingCtrl: LoadingController, public storage: Storage) {
     this.loginForm = formBuilder.group({
       email: ['', Validators.compose([Validators.required,EmailValidator.isValid])],
       password: ['', Validators.compose([Validators.minLength(6), Validators.required]) ],

     });
   }

   goToResetPassword(){
     this.navCtrl.push('ResetPasswordPage');
   }
   createAccount(){
     this.navCtrl.push('SignupPage');
   }

   loginUser(){
     if(!this.loginForm.valid){
       console.log(this.loginForm.value);
     }else{
       this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
       .then(authData => {
         let usr = this.loginForm.value.email.split('@');
         //this.storage.set('user', usr[0]);
         this.storage.set("user", JSON.stringify(usr[0]));
         this.storage.set("mail", JSON.stringify(usr[1]));
          this.navCtrl.push('RoomPage');
        }, error =>{
          this.loading.dismiss().then( ()=>{
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
              ]
            });
            alert.present();
          });
        });

       this.loading = this.loadingCtrl.create({
         dismissOnPageChange: true,
       });
       this.loading.present();
     }
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad LoginPage');
   }
 }

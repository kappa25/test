import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigninPage } from './signin';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient} from '@angular/common/http';

@NgModule({
  declarations: [
    SigninPage,
  ],
  imports: [
    IonicPageModule.forChild(SigninPage),
    HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
          }
        }),
  ],
})
export class SigninPageModule {}
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/", ".json");
}
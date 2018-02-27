import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomPage } from './room';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient} from '@angular/common/http';

@NgModule({
  declarations: [
    RoomPage,
  ],
  imports: [
   IonicPageModule.forChild(RoomPage),
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
export class RoomPageModule {}
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/", ".json");
}

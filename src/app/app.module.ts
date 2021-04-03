import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { registerLocaleData } from '@angular/common';
import { AngularFireStorageModule } from '@angular/fire/storage';
import localeEsCo from '@angular/common/locales/es-CO';

import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthModule } from './auth/auth.module';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

registerLocaleData(localeEsCo);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    HttpClientModule,
    ComponentsModule,
    SharedModule,
    PagesModule,
    ModalModule.forRoot(),
    AuthModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

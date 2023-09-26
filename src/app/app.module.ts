import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HeaderComponent } from './header/header.component';
import { FootmenuComponent } from './footmenu/footmenu.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { AppRoutingModule } from './app-routing.module';
import { InheaderComponent } from './inheader/inheader.component';
import { CalcuttaMatkaComponent } from './calcutta-matka/calcutta-matka.component';
import { GameResultComponent } from './game-result/game-result.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HeaderComponent,
    FootmenuComponent,
    LeftmenuComponent,
    InheaderComponent,
    CalcuttaMatkaComponent,
    GameResultComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

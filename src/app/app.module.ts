import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {DataTablesModule} from 'angular-datatables';


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
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddMoneyComponent } from './add-money/add-money.component';
import { BalanceComponent } from './balance/balance.component';
import { SettingsComponent } from './settings/settings.component';
import { TimerpipePipe } from './timerpipe.pipe';
import { WithdrawMoneyComponent } from './withdraw-money/withdraw-money.component';
import { MyBidComponent } from './my-bid/my-bid.component';
import { GameComponentComponent } from './game-component/game-component.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { DipositHistoryComponent } from './diposit-history/diposit-history.component';
import { WithdrawHistoryComponent } from './withdraw-history/withdraw-history.component';




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
    ContactComponent,
    DashboardComponent,
    AddMoneyComponent,
    BalanceComponent,
    SettingsComponent,
    TimerpipePipe,
    WithdrawMoneyComponent,
    MyBidComponent,
    GameComponentComponent,
    UpdateAccountComponent,
    DipositHistoryComponent,
    WithdrawHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

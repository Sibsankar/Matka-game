import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CalcuttaMatkaComponent } from './calcutta-matka/calcutta-matka.component';
import { GameResultComponent } from './game-result/game-result.component';
import {ContactComponent} from './contact/contact.component'
import { AuthguardGuard } from './authguard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BalanceComponent } from './balance/balance.component';
import { AddMoneyComponent } from './add-money/add-money.component';
import { SettingsComponent } from './settings/settings.component';
import { WithdrawMoneyComponent } from './withdraw-money/withdraw-money.component';
import { MyBidComponent } from './my-bid/my-bid.component';
import { GameComponentComponent } from './game-component/game-component.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { DipositHistoryComponent} from './diposit-history/diposit-history.component';
import { WithdrawHistoryComponent } from  './withdraw-history/withdraw-history.component'
import { GameTimingsComponent } from './game-timings/game-timings.component'
import { RulesRegulationComponent } from './rules-regulation/rules-regulation.component'
import { AppDownloadComponent } from './app-download/app-download.component'

const routes: Routes = [
  { path: '', component: AppDownloadComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: 'calcutta-matka', component: CalcuttaMatkaComponent, canActivate: [AuthguardGuard], data: { name: 'calcutta-matka' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard], data: { name: 'dashboard' } },
  { path: 'game-result', component: GameResultComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'game/:name/:id', component: CalcuttaMatkaComponent, canActivate: [AuthguardGuard], data: { name: 'game' } },
  { path: 'play-game/:id', component: GameComponentComponent, canActivate: [AuthguardGuard], data: { name: 'game-details' } },
  { path: 'balance', component: BalanceComponent, canActivate: [AuthguardGuard], data: { name: 'balance' } },
  { path: 'add-money', component: AddMoneyComponent, canActivate: [AuthguardGuard], data: { name: 'add-money' } },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthguardGuard], data: { name: 'settings' } },
  { path: 'withdraw-money', component: WithdrawMoneyComponent, canActivate: [AuthguardGuard], data: { name: 'withdraw-money' } },
  { path: 'my-bid', component: MyBidComponent, canActivate: [AuthguardGuard], data: { name: 'my-bid' } },
  { path: 'update-account', component: UpdateAccountComponent, canActivate: [AuthguardGuard], data: { name: 'update-account' } },
  { path: 'withdraw-history', component: WithdrawHistoryComponent, canActivate: [AuthguardGuard], data: { name: 'withdraw-history' } },
  { path: 'deposit-history', component: DipositHistoryComponent, canActivate: [AuthguardGuard], data: { name: 'deposit-history' } },
  { path: 'game-timings', component: GameTimingsComponent, canActivate: [AuthguardGuard], data: { name: 'game-timings' } },
  { path: 'rules-regulations', component: RulesRegulationComponent, canActivate: [AuthguardGuard], data: { name: 'rules-regulations' } },

]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule,]
})
export class AppRoutingModule { }

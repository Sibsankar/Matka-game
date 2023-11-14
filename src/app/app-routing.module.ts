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

const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: 'calcutta-matka', component: CalcuttaMatkaComponent, canActivate: [AuthguardGuard], data: { name: 'calcutta-matka' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard], data: { name: 'dashboard' } },
  { path: 'game-result', component: GameResultComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'game/:name/:id', component: CalcuttaMatkaComponent, canActivate: [AuthguardGuard], data: { name: 'game' } },
  { path: 'balance', component: BalanceComponent, canActivate: [AuthguardGuard], data: { name: 'balance' } },
  { path: 'add-money', component: AddMoneyComponent, canActivate: [AuthguardGuard], data: { name: 'add-money' } },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthguardGuard], data: { name: 'settings' } },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

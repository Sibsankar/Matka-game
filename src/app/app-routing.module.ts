import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CalcuttaMatkaComponent } from './calcutta-matka/calcutta-matka.component';
import { GameResultComponent } from './game-result/game-result.component';
import {ContactComponent} from './contact/contact.component'
import { AuthguardGuard } from './authguard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: 'calcutta-matka', component: CalcuttaMatkaComponent, canActivate: [AuthguardGuard], data: { name: 'calcutta-matka' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard], data: { name: 'dashboard' } },
  { path: 'game-result', component: GameResultComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'game/:name/:id', component: CalcuttaMatkaComponent, canActivate: [AuthguardGuard], data: { name: 'game' } },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

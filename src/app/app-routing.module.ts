import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CalcuttaMatkaComponent } from './calcutta-matka/calcutta-matka.component';
import { GameResultComponent } from './game-result/game-result.component';
import {ContactComponent} from './contact/contact.component'

const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: 'calcutta-matka', component: CalcuttaMatkaComponent },
  { path: 'game-result', component: GameResultComponent },
  { path: 'contact', component: ContactComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

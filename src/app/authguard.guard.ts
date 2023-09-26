import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private Authguardservice: AuthenticationService, private router: Router) {} 

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      var localH = localStorage.getItem('isAuthenticate');
      console.log('LocalhostValue:-'+localH);
    if (localH=='true') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { SessionService } from '../services/session.service'

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(public sessionService: SessionService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const roles = next.data.roles as Array<string>;
    const currentUser = this.sessionService.sessionUserValue;

    if (currentUser) { 
      // check for the logged user
      if (roles.includes(currentUser.role)) {
        // check if user has role
        return true;
      }
    }
    // redirect to login
    const options = this.sessionService.expired ? { queryParams: { expired: 'true' } } : undefined
    this.router.navigate(['/sign-in'], options);
    return false;
  }
  
}

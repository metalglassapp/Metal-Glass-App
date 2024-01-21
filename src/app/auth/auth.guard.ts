// import { CanActivateFn, Route, UrlSegment } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
//   interface CanLoad {
//     canLoad(route: Route, segments: UrlSegment[]): any;
//   }
// };
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service'; // Your authentication service
import { RoutesApp } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _authSvc: AuthService, private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // if (this._authSvc.isLoggedIn()) {
    //   return true; // If the user is logged in, allow access to the route
    // } else {
    //   // this.router.navigate(['/login']); // If the user is not logged in, redirect to the login page
    //   this._router.navigate([`${RoutesApp.auth}/${RoutesApp.logIn}`]); // If the user is not logged in, redirect to the login page
    //   return false;
    // }
    !this._authSvc.isLoggedIn()
      ? this._router.navigate([RoutesApp.auth])
      : false; // If the user is not logged in, redirect to the login page
    return this._authSvc.isLoggedIn();
  }
}

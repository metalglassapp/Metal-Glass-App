import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IDataForm } from '../../../../../../interfaces/form-data.interface';
import { RoutesApp } from '../../../../../constants';

@Injectable({
  providedIn: 'root',
})
export class FormGuard implements CanActivate, CanLoad {
  private _condition: boolean = false;
  private _accesToken: IDataForm | null = null;

  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this._condition = false;
    const dataForm = localStorage.getItem('dataForm');
    if (dataForm) {
      const dataFormParse: IDataForm = JSON.parse(dataForm);
      if (dataFormParse) {
        this._condition = true;
      } else {
        this._condition = false;
        this._router.navigate([
          `${RoutesApp.admin}/${RoutesApp.home}/${RoutesApp.quotes}`,
        ]);
      }
    } else {
      this._condition = false;
      this._router.navigate([
        `${RoutesApp.admin}/${RoutesApp.home}/${RoutesApp.quotes}`,
      ]);
    }
    return this._condition;
    // return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this._condition = false;
    const dataForm = localStorage.getItem('dataForm');
    if (dataForm) {
      const dataFormParse: IDataForm = JSON.parse(dataForm);
      if (dataFormParse) {
        this._condition = true;
      } else {
        this._condition = false;
        this._router.navigate([
          `${RoutesApp.admin}/${RoutesApp.home}/${RoutesApp.quotes}`,
        ]);
      }
    } else {
      this._condition = false;
      this._router.navigate([
        `${RoutesApp.admin}/${RoutesApp.home}/${RoutesApp.quotes}`,
      ]);
    }
    return this._condition;
    // return true;
  }
}

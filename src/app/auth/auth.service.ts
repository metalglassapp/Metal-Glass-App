import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
// import { Inject, Injectable, InjectionToken } from '@angular/core';
// export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
//   providedIn: 'root',
//   factory: () => localStorage,
// });

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _auth: Auth // @Inject(BROWSER_STORAGE) private _storage: Storage
  ) {}

  // PARA OBTENER STORAGE
  // get(key: string) {
  //   return this._storage.getItem(key);
  // }

  // PARA LOCALSTORAGE.SETITEM
  // set(key: string, value: string) {
  //   this._storage.setItem(key, value);
  // }

  isLoggedIn(): boolean {
    // const accessToken = localStorage.getItem('accessToken');
    return localStorage.getItem('accessToken') ? true : false;
    // return accessToken ? true : false;

    // return this._storage.getItem('accessToken') ? true : false;
  }

  setToken(token: any): void {
    // return this._storage.setItem('accessToken', JSON.stringify(token));
    return localStorage.setItem('accessToken', JSON.stringify(token));
  }

  removeToken(): void {
    // return this._storage.removeItem('accessToken');
    return localStorage.removeItem('accessToken');
  }

  register({ email, password }: any): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }

  login({ email, password }: any): Promise<UserCredential> {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this._auth);
  }
}

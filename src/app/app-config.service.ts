import { Injectable } from '@angular/core';
import { Users } from './models/users';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private urlBase = 'http://localhost:8080/pg2/api-laravel/public/api/';
  private localStorageService;
  private currentSession: any = null;
  constructor() {
    this.localStorageService = localStorage;
   }


  user: Users;
  propietarioId = 3;
  inquilinoId = 4;

  getUrlBase() {
    return this.urlBase;
  }

  setCurrentSession(any): void {
    this.currentSession = any;
    this.localStorageService.setItem('currentUser', JSON.stringify(any));
  }

  
  loadSessionData(): any{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <any> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): any {
    return this.loadSessionData();
  }


}

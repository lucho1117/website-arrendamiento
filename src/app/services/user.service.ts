import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  public getUsers() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'user') .pipe(
      catchError(this.handleError.handleError<any>(`getUsers`))
    );
  }

  public getUser( userId: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'user/' + userId) .pipe(
      catchError(this.handleError.handleError<any>(`getUser`))
    );
  }

  public getUserByRole( rolId: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'user/rol/' + rolId) .pipe(
      catchError(this.handleError.handleError<any>(`getUserByRole`))
    );
  }

  public setUser( user: Users ) {
    return this.http.post<any>( this.appConfig.getUrlBase() + 'register', user) .pipe(
      catchError(this.handleError.handleError<any>(`setUser`))
    );
  }

  public putUser( userId: number, user: Users ) {
    return this.http.put<any>( this.appConfig.getUrlBase() + 'user/' + userId, user) .pipe(
      catchError(this.handleError.handleError<any>(`putUser`))
    );
  }

  public putPassword( userId: number, user: any ) {
    return this.http.put<any>( this.appConfig.getUrlBase() + 'user/password/' + userId, user) .pipe(
      catchError(this.handleError.handleError<any>(`putPassword`))
    );
  }

  public postLogin( user: Users ) {
    return this.http.post<any>( this.appConfig.getUrlBase() + 'login', user) .pipe(
      catchError(this.handleError.handleError<any>(`postLogin`))
    );
  }
  
}

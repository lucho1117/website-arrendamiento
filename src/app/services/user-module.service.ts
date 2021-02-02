import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { UserModule } from '../models/user-module';

@Injectable({
  providedIn: 'root'
})
export class UserModuleService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  
  public getUserModules() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'user_module') .pipe(
      catchError(this.handleError.handleError<any>(`getUserModules`))
    );
  }

  public getUserModule(userModuleId: number) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'user_module/' + userModuleId) .pipe(
      catchError(this.handleError.handleError<any>(`getUserModule`))
    );
  }

  public setUserModule(user_module: UserModule) {
    return this.http.post<any>( this.appConfig.getUrlBase() + 'user_module', user_module) .pipe(
      catchError(this.handleError.handleError<any>(`setUserModule`))
    );
  }

  public putUserModule(userModuleId: number, user_module: UserModule) {
    return this.http.put<any>( this.appConfig.getUrlBase() + 'user_module/' + userModuleId, user_module) .pipe(
      catchError(this.handleError.handleError<any>(`putUserModule`))
    );
  }
}

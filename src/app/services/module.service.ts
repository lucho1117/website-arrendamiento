import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { Module } from '../models/module';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  
  public getModules() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'module') .pipe(
      catchError(this.handleError.handleError<any>(`getModules`))
    );
  }

  public getModule(moduleId: number) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'module/' + moduleId) .pipe(
      catchError(this.handleError.handleError<any>(`getModule`))
    );
  }

  public setModule(module: Module) {
    return this.http.post<any>( this.appConfig.getUrlBase() + 'module', module) .pipe(
      catchError(this.handleError.handleError<any>(`setModule`))
    );
  }

  public putModule(moduleId: number, module: Module) {
    return this.http.put<any>( this.appConfig.getUrlBase() + 'module/' + moduleId, module) .pipe(
      catchError(this.handleError.handleError<any>(`putModule`))
    );
  }
  
}

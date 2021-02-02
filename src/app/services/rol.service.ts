import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { catchError } from 'rxjs/operators';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  
  public getRoles() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'rol') .pipe(
      catchError(this.handleError.handleError<any>(`getRoles`))
    );
  }

  public getRol(rolId: number) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'rol/' + rolId) .pipe(
      catchError(this.handleError.handleError<any>(`getRol`))
    );
  }

  public setRol(rol: Rol) {
    return this.http.post<any>( this.appConfig.getUrlBase() + 'rol', rol) .pipe(
      catchError(this.handleError.handleError<any>(`setRol`))
    );
  }

  public putRol(rolId: number, rol: Rol) {
    return this.http.put<any>( this.appConfig.getUrlBase() + 'rol/' + rolId, rol) .pipe(
      catchError(this.handleError.handleError<any>(`putRol`))
    );
  }
}

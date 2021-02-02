import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { Local } from '../models/local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  public getLocales() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'local') .pipe(
      catchError(this.handleError.handleError<any>(`getLocales`))
    );
  }

  public getLocal( localId: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'local/' + localId) .pipe(
      catchError(this.handleError.handleError<any>(`getLocal`))
    );
  }

  public getLocalByInquilino( inquilinoId: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'local/inquilino/' + inquilinoId) .pipe(
      catchError(this.handleError.handleError<any>(`getLocalByInquilino`))
    );
  }

  public getLocalByPropietario( propietarioId: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'local/propietario/' + propietarioId) .pipe(
      catchError(this.handleError.handleError<any>(`getLocalByPropietario`))
    );
  }

  public getLocalesBySector( sector_id: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'local/sector/' + sector_id) .pipe(
      catchError(this.handleError.handleError<any>(`getLocalesBySector`))
    );
  }

  public setLocal( local: Local ) {
    return this.http.post<any>( this.appConfig.getUrlBase() + 'local', local) .pipe(
      catchError(this.handleError.handleError<any>(`setLocal`))
    );
  }

  public putLocal( localId: number, local: Local ) {
    return this.http.put<any>( this.appConfig.getUrlBase() + 'local/' + localId, local) .pipe(
      catchError(this.handleError.handleError<any>(`putLocal`))
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { LocalServiceService } from '../models/local-service';

@Injectable({
  providedIn: 'root'
})
export class ServiceLocalService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  public getLocalServices() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'local_service') .pipe(
      catchError(this.handleError.handleError<any>(`getLocalServices`))
    );
  }

  public getLocalServicesFilter( local_id: number, service_id: number, year: any, status: any, month: any ) {
    return this.http.get<any>( this.appConfig.getUrlBase()+ 'local_service/local/' + local_id + '/service/' + service_id + '/year/' + year + '/status/' + status + '/month/' + month ) .pipe(
      catchError(this.handleError.handleError<any>(`getLocalServicesFilter`))
    );
  }

  public getLocalService( local_service_id: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'local_service/' + local_service_id) .pipe(
      catchError(this.handleError.handleError<any>(`getLocalService`))
    );
  }

  public getLocalServiceByInquilino( inquilino_id: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'local_service/inquilino/' + inquilino_id) .pipe(
      catchError(this.handleError.handleError<any>(`getLocalServiceByInquilino`))
    );
  }

  public getLocalServiceByPropietario( propietario_id: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'local_service/propietario/' + propietario_id) .pipe(
      catchError(this.handleError.handleError<any>(`getLocalServiceByPropietario`))
    );
  }

  public getServicesSlopesByLocal() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'local_service/services_slopes/diagram').pipe(
      catchError(this.handleError.handleError<any>(`getServicesSlopesByLocal`))
    );
  }

  public getServicesSlopesByLocalArrendamiento() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'local_service/services_slopes/diagram/arrendamiento').pipe(
      catchError(this.handleError.handleError<any>(`getServicesSlopesByLocalArrendamiento`))
    );
  }

  public setLocalService( local_service: LocalServiceService ) {
    return this.http.post<any>( this.appConfig.getUrlBase() + 'local_service', local_service) .pipe(
      catchError(this.handleError.handleError<any>(`setLocalService`))
    );
  }

  public putLocalService( local_service_id: number, local_service: LocalServiceService ) {
    return this.http.put<any>( this.appConfig.getUrlBase() + 'local_service/' + local_service_id, local_service) .pipe(
      catchError(this.handleError.handleError<any>(`putLocalService`))
    );
  }

  public putLocalServiceStatus( local_service_id: number, local_service: any ) {
    return this.http.put<any>( this.appConfig.getUrlBase() + 'local_service/status/' + local_service_id, local_service) .pipe(
      catchError(this.handleError.handleError<any>(`putLocalService`))
    );
  }
}

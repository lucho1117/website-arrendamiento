import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  public getServices() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'service') .pipe(
      catchError(this.handleError.handleError<any>(`getServices`))
    );
  }

  public getService( serviceId: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'service/' + serviceId) .pipe(
      catchError(this.handleError.handleError<any>(`getService`))
    );
  }

  public setService( service: Service ) {
    return this.http.post<any>( this.appConfig.getUrlBase() + 'service', service) .pipe(
      catchError(this.handleError.handleError<any>(`setService`))
    );
  }

  public putService( serviceId: number, service: Service ) {
    return this.http.put<any>( this.appConfig.getUrlBase() + 'service/' + serviceId, service) .pipe(
      catchError(this.handleError.handleError<any>(`putService`))
    );
  }
}

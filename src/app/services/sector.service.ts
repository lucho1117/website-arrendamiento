import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { Sector } from '../models/sector';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  public getSectores() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'sector') .pipe(
      catchError(this.handleError.handleError<any>(`getSectores`))
    );
  }

  public getSector( sectorId: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'sector/' + sectorId) .pipe(
      catchError(this.handleError.handleError<any>(`getSector`))
    );
  }

  public setSector( sector: Sector ) {
    return this.http.post<any>( this.appConfig.getUrlBase() + 'sector', sector) .pipe(
      catchError(this.handleError.handleError<any>(`setSector`))
    );
  }

  public putSector( sectorId: number, sector: Sector ) {
    return this.http.put<any>( this.appConfig.getUrlBase() + 'sector/' + sectorId, sector) .pipe(
      catchError(this.handleError.handleError<any>(`putSector`))
    );
  }
}
